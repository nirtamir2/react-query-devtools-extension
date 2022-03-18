import React from "react";
import ReactDOM from "react-dom";
import Browser from "webextension-polyfill";
import { App } from "./App";

function renderRenderDevtools(panelWindow: Window) {
  console.log("devtools-page#createPanel()");

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    panelWindow.document.querySelector("#root")
  );
}

function connectToBackground() {
  // Create a connection to the background page
  const backgroundPageConnection = Browser.runtime.connect({
    name: "panel",
  });

  backgroundPageConnection.postMessage({
    name: "init",
    tabId: Browser.devtools.inspectedWindow.tabId,
  });

  backgroundPageConnection.onMessage.addListener((message) => {
    console.log("devtools-page#onMessage()", message);
    //   TODO: keep in state and rerender app
  });
}

async function createPanel() {
  const { onShown } = await Browser.devtools.panels.create(
    "React Query",
    "assets/images/logo-32.png",
    "/devtools-panel.html"
  );

  onShown.addListener((window) => {
    // connectToBackground();
    renderRenderDevtools(window);
  });
}

void createPanel();
