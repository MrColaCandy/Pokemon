import { playerData } from "./player/playerData.js";
import { createPokemonCard } from "./pokemonCard.js";
import { getPokemon } from "./pokemonsApi.js";

export const pokemonsDiv = document.getElementById("pokemons");
export const pokemonBtn = document.getElementById("pokemon-btn");

export const renderPokemons = () => {
  pokemonsDiv.innerHTML = "";
  pokemonBtn.style.display = "none";
  pokemonsDiv.style.display = "flex";

  playerData.playerPokemons.forEach(async (p) => {
    const pokemon = await getPokemon(p.name);
    const card = createPokemonCard(pokemon);
    pokemonsDiv.innerHTML += card;
  });
};
export function closePokemonList() {
  pokemonBtn.style.display = "block";
  pokemonsDiv.style.display = "none";
}
