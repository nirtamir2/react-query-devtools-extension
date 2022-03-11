import React from "react";
import ReactDOM from "react-dom";
import type { QueryClient } from "react-query";
import Browser from "webextension-polyfill";
import { App } from "./App";

async function createPanel() {
  const url = "/devtools-panel.html";
  const { onShown } = await Browser.devtools.panels.create(
    "React Query",
    "assets/images/logo-32.png",
    url
  );

  function handleRenderDevtools(panelWindow: Window) {
    const inspectedWindow = Browser.devtools
      .inspectedWindow as unknown as typeof Browser.devtools & {
      queryClient?: QueryClient;
    };
    /**
     * Trying to ecal queryClient returns an error
     * sdk.js:1 Object reference chain is too long
     * evaluateGlobal  sdk.js:1
     * extensions.js:1 Extension server error: Inspector protocol error: Object reference chain is too long
     *
     * TODO: use contentScript to get the queryClient data and send it via background script
     */

    // const a = await inspectedWindow.eval(
    //   "window.queryClient.getQueryCache().findAll().map(a => a.queryKey)"
    // );

    // https://developer.chrome.com/docs/extensions/mv3/devtools/
    // const inspectedWindowTabId = inspectedWindow.tabId;
    //
    // const backgroundPageConnection = Browser.runtime.connect({
    //   name: "devtools-page",
    // });
    //
    // backgroundPageConnection.onMessage.addListener((message) => {
    //   // Handle responses from the background page, if any
    //   console.log("message", message);
    // });
    //
    // // Relay the tab ID to the background page
    // backgroundPageConnection.postMessage({
    //   tabId: Browser.devtools.inspectedWindow.tabId,
    //   scriptToInject: "content_script.js",
    // });

    console.log("Browser.devtools.inspectedWindow", inspectedWindow);
    console.log("window", panelWindow);
    const { queryClient } = inspectedWindow;
    ReactDOM.render(
      <React.StrictMode>
        {queryClient ? <App queryClient={queryClient} /> : "NOT FOUNT"}
      </React.StrictMode>,
      document.querySelector("#root")
    );
  }

  onShown.addListener((window) => {
    handleRenderDevtools(window);
  });
}

async function main() {
  try {
    await Browser.runtime.getBackgroundPage();
    await createPanel();
  } catch {
    console.log("main#main()");
    await createPanel();
  }
}

void main();
