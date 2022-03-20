import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { connectToDevtools } from "react-query-connect-to-browser-extension";
import { ReactQueryDevtools } from "react-query/devtools";
import App from "./App";

const queryClient = new QueryClient();

connectToDevtools(queryClient);

export function _Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <App />
    </QueryClientProvider>
  );
}

export function Root() {
  return <_Root />;
}
