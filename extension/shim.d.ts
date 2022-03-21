import type { IQueryCacheItem, MessageSource } from "core";

declare module "webext-bridge" {
  export interface ProtocolMap {
    [MessageSource.USER_LAND_SCRIPT]: { cacheData: Array<IQueryCacheItem> };
    [MessageSource.CONTENT_SCRIPT]: {
      cacheData: Array<IQueryCacheItem>;
    };
    [MessageSource.BACKGROUND]: {
      cacheData: Array<IQueryCacheItem>;
    };
  }
}
