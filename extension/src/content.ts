import type { IQueryCacheItem } from "core";
import { MessageSource } from "core";
import { sendMessage } from "webext-bridge";


window.addEventListener(
  "message",
  (event) => {
    if (!event || event.source !== window || typeof event.data !== "object") {
      console.log("FAIL");
      return;
    }
    if (event.data.type === MessageSource.USER_LAND_SCRIPT) {
      const cacheData = event.data.data as unknown as Array<IQueryCacheItem>;

      void sendMessage(
        MessageSource.CONTENT_SCRIPT,
        {
          cacheData,
        },
        "background"
      );
    }
  },
  false
);