import { MessageSource } from "core";
import { sendMessage, onMessage } from "webext-bridge";

onMessage(
  MessageSource.USER_LAND_CACHE_CHANGE_TO_BACKGROUND,
  async (message) => {
    return sendMessage(
      MessageSource.BACKGROUND_CACHE_CHANGE_TO_DEVTOOLS_APP,
      {
        cacheData: message.data.cacheData,
      },
      `devtools@${message.sender.tabId}`
    );
  }
);
