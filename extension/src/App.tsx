import "./App.css";
import { ReactQueryDevtoolsPanel } from "./devtools";

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

  return (
    <ReactQueryDevtoolsPanel
      unsortedQueries={[]}
      onInvalidateQueries={noop}
      onResetQueries={noop}
      onRemoveQueries={noop}
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
    />
  );
}
