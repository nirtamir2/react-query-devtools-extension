import React, { useEffect, useState } from "react";
import "./App.css";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { QueryState } from "react-query/types/core/query";

async function getPokemonDataById(id: number) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return (await response.json()) as Promise<{ name: string }>;
}

function postMessageToContentScript(data: object) {
  window.postMessage(
    {
      type: "USER_LAND_SCRIPT",
      text: "Hello from the webpage!",
      data,
    },
    "*"
  );
}

interface IQueryCacheItem {
  queryHash: string;
  isFetching: boolean;
  observersCount: number;
  state: QueryState;
  isStale: boolean;
  isActive: boolean;
}

function sendDataToContentScript(queryClient: QueryClient) {
  const queryCache = queryClient.getQueryCache();
  // TODO: listen to extension open and close and unsubscribe after the open devtools and close devtools happen

  function handleSendDataToContentScript() {
    const queryCacheData = Object.values(queryCache.getAll());
    const queryCacheMessage: Array<IQueryCacheItem> = queryCacheData.map((data) => {
      return {
        queryHash: data.queryHash,
        isFetching: data.isFetching(),
        isStale: data.isStale(),
        isActive: data.isActive(),
        observersCount: data.getObserversCount(),
        state: data.state,
      };
    });

    postMessageToContentScript(queryCacheMessage);
  }

  const unsubscribe = queryCache.subscribe(handleSendDataToContentScript);

  handleSendDataToContentScript();

  return unsubscribe;
}

function App() {
  const queryClient = useQueryClient();
  const [count, setCount] = useState(1);
  const { data, isSuccess, isLoading, isError } = useQuery(
    ["pokemon", count],
    () => getPokemonDataById(count)
  );

  useEffect(() => {
    const unsubscribe = sendDataToContentScript(queryClient);
    return () => {
      unsubscribe();
    };
  }, [queryClient]);

  function handlePostMessage() {
    window.postMessage(
      { type: "FROM_PAGE", text: "Hello from the webpage!" },
      "*"
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <button onClick={handlePostMessage}>Post message</button>
        <button onClick={() => sendDataToContentScript(queryClient)}>
          sendDataToContentScript
        </button>
        <p>
          {isLoading && <p>Loading...</p>}
          {isSuccess && <p>{data.name}</p>}
          {isError && <p>Error</p>}
        </p>
      </header>
    </div>
  );
}

export default App;
