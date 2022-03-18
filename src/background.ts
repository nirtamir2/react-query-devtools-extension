import Browser from "webextension-polyfill";

console.log("background#()");

Browser.runtime.onMessage.addListener((event) => {
    console.log("event", event);
});