import { playerData } from "../player/playerData.js";
import { createPokemonCard } from "./pokemonCard.js";
import { scrollX } from "./scrollDrag.js";
import { canvas } from "./canvas.js";
export const pokemonsDiv = document.getElementById("pokemons");
export const pokemonBtn = document.getElementById("pokemon-btn");

scrollX(pokemonsDiv);
export const renderPokemons = () => {
  pokemonsDiv.innerHTML = "";
  pokemonsDiv.classList.add("pokemons-list-mask");
  pokemonBtn.style.display = "none";
  pokemonsDiv.style.display = "flex";

  playerData.playerPokemons.forEach((p) => {
    console.log(p);
    const card = createPokemonCard(p);
    pokemonsDiv.innerHTML += card;
  });
};
export function closePokemonList() {
  pokemonBtn.style.display = "block";
  pokemonsDiv.style.display = "none";
}

export const handlePokemonListEvents = () => {
  pokemonBtn.addEventListener("click", () => {
    renderPokemons();
  });
  canvas.addEventListener("click", (e) => {
    if (e.target.id !== "pokemon-btn" && e.target.id !== "pokemons") {
      closePokemonList();
    }
  });
};
