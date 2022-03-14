// import Browser from "webextension-polyfill";
// import html from "./src/devtools.html";
//
// console.log("Browser.runtime.getURL(html);", Browser.runtime.getURL(html));
//
// export {};
import type { QueryClient } from "react-query";
import Browser from "webextension-polyfill";
// import mainWorld from "./main-world-script.ts?script";

console.log("content");

// @ts-expect-error - this is unsafe to get the user's queryClient
const queryClient = window.queryClient as QueryClient | undefined;
if (queryClient) {
  console.log("content", queryClient);
} else {
  console.log("NOT FOUNT", queryClient);
}

// content-script.ts
// const src = Browser.runtime.getURL(mainWorld as string);
// const script = document.createElement("script");
// script.src = src;
// // script.src = (src).toLowerCase().replace('javascript:', '/javascript/:/');
// document.body.append(script);

// https://developer.chrome.com/docs/extensions/mv3/content_scripts/#host-page-communication
// https://stackoverflow.com/questions/53953271/security-of-window-postmessage-on-chrome-extensions

const port = Browser.runtime.connect();

window.addEventListener(
  "message",
  (event) => {
    // We only accept messages from ourselves
    console.log("event caught in content script", event);

    if (event.source != window) {
      return;
    }

    if (event.data.type && event.data.type == "FROM_PAGE") {
      console.log("Content script received: " + event.data.text);
      port.postMessage(event.data.text);
    }
  },
  false
);
