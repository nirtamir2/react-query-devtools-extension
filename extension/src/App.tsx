import { useEffect } from "react";
import type { IQueryCacheItem } from "core";
import { MessageSource } from "core";
import { onMessage, sendMessage } from "webext-bridge";
import Browser from "webextension-polyfill";
import "./App.css";
import { ReactQueryDevtoolsPanel } from "./devtools";
import { useSafeState } from "./devtools/utils";

function noop() {
  // Do nothing
}

export function App() {
  // const queryCache = queryClient.getQueryCache();

  // const [unsortedQueries, setUnsortedQueries] = useState(
  // Object.values(queryCache.getAll())
  // []
  // );

  // React.useEffect(() => {
  //   const unsubscribe = queryCache.subscribe(() => {
  //     setUnsortedQueries(Object.values(queryCache.getAll()));
  //   });
  //   setUnsortedQueries(Object.values(queryCache.getAll()));
  //
  //   return unsubscribe;
  // }, [queryCache]);

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
      onResetQueries={noop}
      onRemoveQueries={noop}
      onFetch={noop}
      onInvalidateQuery={(query) => {
        void sendMessage(
          MessageSource.DEVTOOLS_CLICK_INVALIDATE_QUERY_TO_CONTENT_SCRIPT,
          {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            query,
          },
          `content-script@${Browser.devtools.inspectedWindow.tabId}`
        );
      }}
      // onResetQueries={(query) => {
      //   void queryClient.resetQueries(query);
      // }}
      // onRemoveQueries={(query) => {
      //   queryClient.removeQueries(query);
      // }}
      // onFetch={(query) => {
      //   query.fetch();
      // }}
    />
  );
}
