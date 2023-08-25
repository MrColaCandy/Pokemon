import { playerData } from "../player/playerData.js";
import { createPokemonCard } from "./pokemonCard.js";
import { scrollX } from "./scrollDrag.js";
import { canvas } from "./canvas.js";
import { setCurrentPokemon } from "../pokemons/currentPokemon.js";
import { openModal } from "./modal.js";

export const pokemonsDiv = document.getElementById("pokemons");
export const pokemonBtn = document.getElementById("pokemon-btn");

export const renderPokemons = () => {
  pokemonsDiv.innerHTML = "";
  pokemonsDiv.classList.add("pokemons-list-mask");
  pokemonBtn.style.display = "none";
  pokemonsDiv.style.display = "flex";

  playerData.playerPokemons.forEach((p) => {
    const card = createPokemonCard(p);

    pokemonsDiv.innerHTML += card;
  });
};
export function closePokemonList() {
  pokemonBtn.style.display = "block";
  pokemonsDiv.style.display = "none";
}

export const handlePokemonListEvents = () => {
  scrollX(pokemonsDiv);
  pokemonBtn.addEventListener("click", () => {
    renderPokemons();
  });
  canvas.addEventListener("click", (e) => {
    if (e.target.id !== "pokemon-btn" && e.target.id !== "pokemons") {
      closePokemonList();
    }
  });

  window.addEventListener("click", (e) => {
    const dataset = e.target.dataset.card;
    if (dataset) {
      const pokemon = playerData.playerPokemons.find((p) => p.id == dataset);
      setCurrentPokemon(pokemon);
      renderPokemons();
      if (e.target.id !== "select") openModal();
    }
  });
};
