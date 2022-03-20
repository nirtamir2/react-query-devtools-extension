import type { QueryClient } from "react-query";
import type { QueryState } from "react-query/types/core/query";
import { MessageSource } from "./MessageSource";

interface IQueryCacheItem {
  queryHash: string;
  isFetching: boolean;
  observersCount: number;
  state: QueryState;
  isStale: boolean;
  isActive: boolean;
}

function sendCacheToContentScript(queryClient: QueryClient): void {
  const queryCacheValues = Object.values(queryClient.getQueryCache().getAll());
  const queryCacheData: Array<IQueryCacheItem> = queryCacheValues.map(
    (data) => {
      return {
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
      data: queryCacheData,
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
