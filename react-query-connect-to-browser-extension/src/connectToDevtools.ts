import type { IQueryCacheItem } from "core";
import { MessageSource } from "core";
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
      type: MessageSource.USER_LAND_SCRIPT,
      cacheData: queryCacheData,
    },
    "*"
  );
}

export function connectToDevtools(queryClient: QueryClient) {
  // TODO: listen to extension open and close and unsubscribe after the open devtools and close devtools happen
  const unsubscribe = queryClient.getQueryCache().subscribe(() => {
    sendCacheToContentScript(queryClient);
  });

  sendCacheToContentScript(queryClient);

  return unsubscribe;
}
