import Browser from "webextension-polyfill";
import { TypedObject } from "./utils";

console.log("background#()");

const connections: Partial<Record<string, Browser.Runtime.Port>> = {};

const extensionListener = (_message: unknown, port: Browser.Runtime.Port) => {
  const message = _message as {
    name: string;
    tabId: number;
  };
  // The original connection event doesn't include the tab ID of the
  // DevTools page, so we need to send it explicitly.
  if (message.name === "init") {
    connections[message.tabId] = port;
  }

  // other message handling
};

Browser.runtime.onConnect.addListener((port) => {
  // Listen to messages sent from the DevTools page
  port.onMessage.addListener(extensionListener);

  port.onDisconnect.addListener((port) => {
    port.onMessage.removeListener(extensionListener);

    for (const [tabId, connection] of TypedObject.entries(connections)) {
      if (connection === port) {
        delete connections[tabId];
      }
    }
  });
});

// Receive message from content script and relay to the devTools page for the
// current tab
Browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Messages from content scripts should have sender.tab set

  console.log("background# MESSAGE()", request);
  console.log("sender", sender);
  console.log("connections", connections);
  if (sender.tab) {
    const tabId = sender.tab.id;
    const connection = connections[tabId];
    if (connection != null) {
      connection.postMessage({text: "BACKGROUND SEND THIS", request});
    } else {
      console.log("Tab not found in connection list.");
    }
  } else {
    console.log("sender.tab not defined.");
  }

  return true;
});
