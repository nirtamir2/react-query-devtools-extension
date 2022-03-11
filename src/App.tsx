import type { QueryClient } from "react-query";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtoolsPanel } from "react-query/devtools";
import "./App.css";

function noop() {
  // Do nothing
}

interface IProps {
  queryClient: QueryClient;
}

export function App({ queryClient }: IProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtoolsPanel setIsOpen={noop} handleDragStart={noop} />
    </QueryClientProvider>
  );
}
