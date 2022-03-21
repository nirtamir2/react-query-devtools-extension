import { MessageSource } from "core";
import { sendMessage, onMessage } from "webext-bridge";

console.log("background#()");

onMessage(MessageSource.CONTENT_SCRIPT, async (message) => {
    console.log("message", message);
    console.log("message.sender.tabId", message.sender.tabId);
  return sendMessage(
    MessageSource.BACKGROUND,
    {
      cacheData: message.data.cacheData,
    },
    `devtools@${message.sender.tabId}`
  );
});
