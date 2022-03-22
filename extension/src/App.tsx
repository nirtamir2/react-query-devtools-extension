import { useEffect } from "react";
import type { IQueryCacheItem } from "core";
import { MessageSource, QueryAction } from "core";
import { onMessage, sendMessage } from "webext-bridge";
import Browser from "webextension-polyfill";
import "./App.css";
import { ReactQueryDevtoolsPanel } from "./devtools";
import { useSafeState } from "./devtools/utils";

function sendPerformQueryActionMessageToContentScript({
  query,
  action,
}: {
  query: IQueryCacheItem;
  action: QueryAction;
}) {
  void sendMessage(
    MessageSource.DEVTOOLS_PERFORM_QUERY_ACTION_TO_CONTENT_SCRIPT,
    {
      query,
      action,
    },
    `content-script@${Browser.devtools.inspectedWindow.tabId}`
  );
}

export function App() {
  const [unsortedQueries, setUnsortedQueries] = useSafeState<
    Array<IQueryCacheItem>
  >([]);

  useEffect(() => {
    onMessage(
      MessageSource.BACKGROUND_CACHE_CHANGE_TO_DEVTOOLS_APP,
      (message) => {
        setUnsortedQueries(message.data.cacheData);
      }
    );
  }, [setUnsortedQueries]);

  return (
    <ReactQueryDevtoolsPanel
      unsortedQueries={unsortedQueries}
      onResetQuery={(query) => {
        sendPerformQueryActionMessageToContentScript({
          query,
          action: QueryAction.Reset,
        });
      }}
      onRemoveQuery={(query) => {
        sendPerformQueryActionMessageToContentScript({
          query,
          action: QueryAction.Remove,
        });
      }}
      onRefetchQuery={(query) => {
        sendPerformQueryActionMessageToContentScript({
          query,
          action: QueryAction.Refetch,
        });
      }}
      onInvalidateQuery={(query) => {
        sendPerformQueryActionMessageToContentScript({
          query,
          action: QueryAction.Invalidate,
        });
      }}
    />
  );
}
