import type { IQueryCacheItem, MessageSource } from "core";

declare module "webext-bridge" {
  export interface ProtocolMap {
    [MessageSource.USER_LAND_CACHE_CHANGE_TO_BACKGROUND]: {
      cacheData: Array<IQueryCacheItem>;
    };
    [MessageSource.BACKGROUND_CACHE_CHANGE_TO_DEVTOOLS_APP]: {
      cacheData: Array<IQueryCacheItem>;
    };
    [MessageSource.DEVTOOLS_OPENED_TO_CONTENT_SCRIPT]: null;
    [MessageSource.DEVTOOLS_CLOSED_TO_CONTENT_SCRIPT]: null;
  }
}
