import type { IQueryCacheItem } from "core";
import { MessageSource } from "core";
import { sendMessage } from "webext-bridge";

window.addEventListener(
  "message",
  (event) => {
    if (event.source !== window || typeof event.data !== "object") {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (event.data.type === MessageSource.USER_LAND_SCRIPT) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
