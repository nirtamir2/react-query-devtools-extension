import React from "react";
import type { IPokemonResponse } from "./IPokemonResponse";

interface IProps {
  data: IPokemonResponse;
}

export function Pokemon(props: IProps) {
  const { data } = props;
  const pokemonImage = data.sprites?.other?.["official-artwork"]?.front_default;

  return (
    <div>
      <h2>{data.name.toUpperCase()}</h2>
      {pokemonImage != null ? (
        <img
          width={475}
          height={475}
          src={pokemonImage
            .toLowerCase()
            .replace("javascript:", "/javascript/:/")}
          alt={data.name}
        />
      ) : null}
    </div>
  );
}
