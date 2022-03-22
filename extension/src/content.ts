import type { IQueryCacheItem } from "core";
import { MessageSource, WindowMessage } from "core";
import { onMessage, sendMessage } from "webext-bridge";

let isDevtoolsOpen = false;

window.addEventListener(
  "message",
  (event) => {
    if (event.source !== window || typeof event.data !== "object") {
      return;
    }
    if (
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      event.data.type ===
        WindowMessage.USER_LAND_CACHE_CHANGE_TO_CONTENT_SCRIPT &&
      isDevtoolsOpen
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const cacheData = event.data
        .cacheData as unknown as Array<IQueryCacheItem>;

      void sendMessage(
        MessageSource.USER_LAND_CACHE_CHANGE_TO_BACKGROUND,
        {
          cacheData,
        },
        "background"
      );
    }
  },
  false
);

onMessage(MessageSource.DEVTOOLS_OPENED_TO_CONTENT_SCRIPT, () => {
  isDevtoolsOpen = true;
  window.postMessage(
    {
      type: WindowMessage.DEVTOOLS_OPENED_TO_USER_LAND_SCRIPT,
    },
    "*"
  );
});

onMessage(MessageSource.DEVTOOLS_CLOSED_TO_CONTENT_SCRIPT, () => {
  isDevtoolsOpen = false;
  window.postMessage(
    {
      type: WindowMessage.DEVTOOLS_CLOSED_TO_USER_LAND_SCRIPT,
    },
    "*"
  );
});

onMessage(
  MessageSource.DEVTOOLS_CLICK_INVALIDATE_QUERY_TO_CONTENT_SCRIPT,
  (message) => {
    window.postMessage(
      {
        type: WindowMessage.DEVTOOLS_CLICK_INVALIDATE_QUERY_TO_USER_LAND_SCRIPT,
        query: message.data.query,
      },
      "*"
    );
  }
);
