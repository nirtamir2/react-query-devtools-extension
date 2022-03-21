export interface IPokemonResponse {
  name: string;
  sprites?: {
    other?: {
      "official-artwork"?: { front_default?: string };
    };
  };
}
