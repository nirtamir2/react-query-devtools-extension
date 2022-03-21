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

async function createPanel() {
  const { onShown } = await Browser.devtools.panels.create(
    "React Query",
    "assets/images/logo-32.png",
    "/devtools-panel.html"
  );

  onShown.addListener((window) => {
    renderRenderDevtools(window);
  });
}

void createPanel();
