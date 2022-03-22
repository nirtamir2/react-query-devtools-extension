import type { IQueryCacheItem } from "core";
import { QueryAction, WindowMessage } from "core";
import type { QueryClient } from "react-query";

function sendCacheToContentScript(queryClient: QueryClient): void {
  const queryCacheValues = Object.values(queryClient.getQueryCache().getAll());
  const queryCacheData: Array<IQueryCacheItem> = queryCacheValues.map(
    (data) => {
      return {
        queryKey: data.queryKey,
        queryHash: data.queryHash,
        isFetching: data.isFetching(),
        isStale: data.isStale(),
        isActive: data.isActive(),
        observersCount: data.getObserversCount(),
        state: data.state,
      };
    }
  );

  window.postMessage(
    {
      type: WindowMessage.USER_LAND_CACHE_CHANGE_TO_CONTENT_SCRIPT,
      cacheData: queryCacheData,
    },
    "*"
  );
}

let unsubscribe: (() => void) | null = null;

export function connectToDevtools(queryClient: QueryClient) {
  const subscribe = () => {
    return queryClient.getQueryCache().subscribe(() => {
      sendCacheToContentScript(queryClient);
    });
  };

  const handleMessage = (event: MessageEvent) => {
    if (event.source !== window || typeof event.data !== "object") {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (event.data.type === WindowMessage.DEVTOOLS_OPENED_TO_USER_LAND_SCRIPT) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      sendCacheToContentScript(queryClient);
      unsubscribe = subscribe();
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (event.data.type === WindowMessage.DEVTOOLS_CLOSED_TO_USER_LAND_SCRIPT) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      unsubscribe?.();
    }
    if (
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      event.data.type ===
      WindowMessage.DEVTOOLS_PERFORM_QUERY_ACTION_TO_USER_LAND_SCRIPT
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const query = event.data.query as IQueryCacheItem;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const action = event.data.action as QueryAction;
      switch (action) {
        case QueryAction.Refetch: {
          void queryClient.refetchQueries({
            queryKey: query.queryKey,
            exact: true,
          });
          break;
        }
        case QueryAction.Invalidate: {
          void queryClient.invalidateQueries({
            queryKey: query.queryKey,
            exact: true,
          });
          break;
        }
        case QueryAction.Reset: {
          void queryClient.resetQueries({
            queryKey: query.queryKey,
            exact: true,
          });
          break;
        }
        case QueryAction.Remove: {
          queryClient.removeQueries({
            queryKey: query.queryKey,
            exact: true,
          });
          break;
        }
      }
    }
  };

  window.addEventListener("message", handleMessage);

  return () => {
    window.removeEventListener("message", handleMessage);
  };
}
