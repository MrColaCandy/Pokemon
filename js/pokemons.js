import { canvas } from "./canvas.js";
import { createPokemonCard } from "./pokemonCard.js";
import { getPokemon } from "./pokemonsApi.js";

export const pokemons = ["pikachu"];
export const pokemonsDiv = document.getElementById("pokemons");
export const pokemonBtn = document.getElementById("pokemon-btn");

export const renderPokemons = () => {
  pokemonsDiv.innerHTML = "";
  pokemonBtn.style.display = "none";
  pokemonsDiv.style.display = "flex";

  pokemons.forEach(async (p) => {
    const pokemon = await getPokemon(p);
    const card = createPokemonCard(pokemon);
    pokemonsDiv.innerHTML += card;
  });
};
