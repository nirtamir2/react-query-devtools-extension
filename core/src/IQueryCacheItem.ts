import type { QueryKey } from "react-query";
import type { QueryState } from "react-query/types/core/query";

export interface IQueryCacheItem {
  queryKey: QueryKey;
  queryHash: string;
  isFetching: boolean;
  observersCount: number;
  state: QueryState;
  isStale: boolean;
  isActive: boolean;
}
