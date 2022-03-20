import React, {useState} from "react";
import {useQuery} from "react-query";
import "./App.css";

async function getPokemonDataById(id: number) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return (await response.json()) as Promise<{ name: string }>;
}

function App() {
  const [count, setCount] = useState(1);
  const { data, isSuccess, isLoading, isError } = useQuery(
    ["pokemon", count],
    () => getPokemonDataById(count)
  );

  return (
    <div className="App">
      <header className="App-header">
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
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
