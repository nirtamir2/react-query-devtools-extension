import Browser from "webextension-polyfill";
import {MessageSource} from "./MessageSource";

console.log("content");

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
    if (!event || event.source !== window || typeof event.data !== "object") {
        console.log("FAIL",);
      return;
    }
    if (event.data.type === MessageSource.USER_LAND_SCRIPT) {
      console.log("Content script received: " + event.data.text);
      port.postMessage(event.data.text);
    }
  },
  false
);
