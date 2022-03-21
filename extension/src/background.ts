import { MessageSource } from "core";
import { sendMessage, onMessage } from "webext-bridge";

onMessage(MessageSource.CONTENT_SCRIPT, async (message) => {
  return sendMessage(
    MessageSource.BACKGROUND,
    {
      cacheData: message.data.cacheData,
    },
    `devtools@${message.sender.tabId}`
  );
});
