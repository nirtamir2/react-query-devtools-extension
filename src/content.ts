// import Browser from "webextension-polyfill";
// import html from "./src/devtools.html";
//
// console.log("Browser.runtime.getURL(html);", Browser.runtime.getURL(html));
//
// export {};
import type { QueryClient } from "react-query";

console.log("content");

// @ts-expect-error - this is unsafe to get the user's queryClient
const queryClient = window.queryClient as QueryClient | undefined;
if (queryClient) {
  console.log("content", queryClient);
} else {
  console.log("NOT FOUNT", queryClient);
}
