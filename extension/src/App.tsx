import { useEffect } from "react";
import type { IQueryCacheItem } from "core";
import { MessageSource } from "core";
import { onMessage } from "webext-bridge";
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
    onMessage(MessageSource.BACKGROUND, (message) => {
      setUnsortedQueries(message.data.cacheData);
    });
  }, [setUnsortedQueries]);

  return (
    <ReactQueryDevtoolsPanel
      unsortedQueries={unsortedQueries}
      onInvalidateQueries={noop}
      onResetQueries={noop}
      onRemoveQueries={noop}
      onFetch={noop}
      // unsortedQueries={unsortedQueries}
      // onInvalidateQueries={(query) => {
      //   void queryClient.invalidateQueries(query);
      // }}
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
