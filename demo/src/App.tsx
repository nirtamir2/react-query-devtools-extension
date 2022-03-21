import { useState } from "react";
import { useQuery } from "react-query";
import styles from "./App.module.css";
import type { IPokemonResponse } from "./IPokemonResponse";
import { Pokemon } from "./Pokemon";

async function getPokemonDataById(id: number) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return (await response.json()) as Promise<IPokemonResponse>;
}

const POKEMON_FIRST_ID = 1;

function App() {
  const [count, setCount] = useState(POKEMON_FIRST_ID);
  const { data, isSuccess, isLoading, isError } = useQuery(
    ["pokemon", count],
    async () => getPokemonDataById(count)
  );

  function handleFetchNextPokemon() {
    setCount((count) => count + 1);
  }

  function handleFetchPrevPokemon() {
    setCount((count) => Math.max(0, count - 1));
  }

  const isPrevNavigationDisabled = count === POKEMON_FIRST_ID;

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <button
          type="button"
          disabled={isPrevNavigationDisabled}
          onClick={
            isPrevNavigationDisabled ? undefined : handleFetchPrevPokemon
          }
        >
          ⬅️
        </button>
        <div className={styles.count}>{count}</div>
        <button type="button" onClick={handleFetchNextPokemon}>
          ➡️
        </button>
      </header>
      <main>
        {isLoading ? <div>Loading...</div> : null}
        {isSuccess ? <Pokemon data={data} /> : null}
        {isError ? <div>Error</div> : null}
      </main>
    </div>
  );
}

export default App;
