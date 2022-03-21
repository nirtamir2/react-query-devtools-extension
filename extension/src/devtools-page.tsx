import React from "react";
import { MessageSource } from "core";
import ReactDOM from "react-dom";
import { sendMessage } from "webext-bridge";
import Browser from "webextension-polyfill";
import { App } from "./App";

function renderDevtoolsPanel(panelWindow: Window) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    panelWindow.document.querySelector("#root")
  );
}

function unmountDevtoolsPage(panelWindow: Window) {
  const element = panelWindow.document.querySelector("#root");
  if (element != null) {
    ReactDOM.unmountComponentAtNode(element);
  }
}

async function createPanel() {
  const { onShown, onHidden } = await Browser.devtools.panels.create(
    "React Query",
    "assets/images/logo-32.png",
    "/devtools-panel.html"
  );

  onShown.addListener((window) => {
    renderDevtoolsPanel(window);
    void sendMessage(
      MessageSource.DEVTOOLS_OPENED_TO_CONTENT_SCRIPT,
      null,
      `content-script@${Browser.devtools.inspectedWindow.tabId}`
    );
  });

  onHidden.addListener(() => {
    unmountDevtoolsPage(window);
    void sendMessage(
      MessageSource.DEVTOOLS_CLOSED_TO_CONTENT_SCRIPT,
      null,
      `content-script@${Browser.devtools.inspectedWindow.tabId}`
    );
  });
}

void createPanel();
