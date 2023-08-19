import { playerData } from "../player/playerData.js";
import { createPokemonCard } from "../UI/pokemonCard.js";

export const pokemonsDiv = document.getElementById("pokemons");
export const pokemonBtn = document.getElementById("pokemon-btn");

export const renderPokemons = () => {
  pokemonsDiv.innerHTML = "";
  pokemonBtn.style.display = "none";
  pokemonsDiv.style.display = "flex";

  playerData.playerPokemons.forEach(async (p) => {
    const card = createPokemonCard(p);
    pokemonsDiv.innerHTML += card;
  });
};
export function closePokemonList() {
  pokemonBtn.style.display = "block";
  pokemonsDiv.style.display = "none";
}
