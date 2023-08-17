import { animate } from "./animation.js";
import { physics } from "./physics.js";
import { pokemonBtn, renderPokemons, pokemonsDiv } from "./pokemons.js";
import { setCurrentPokemon } from "./currentPokemon.js";
import { getPokemon } from "./pokemonsApi.js";
import { modal, openModal } from "./modal.js";
// physics loop
physics();
// animations loop
animate();
addEventListener("click", async (e) => {
  const pokemonName = e.target.dataset.pokemon;
  if (!pokemonName) return;
  const pokemon = await getPokemon(pokemonName);
  setCurrentPokemon(pokemon);
  openModal(pokemon);
});

pokemonBtn.addEventListener("click", () => {
  renderPokemons();
});

addEventListener("click", (e) => {
  if (e.target.id !== "pokemon-btn" && e.target.id !== "pokemons") {
    pokemonBtn.style.display = "block";
    pokemonsDiv.style.display = "none";
  }

  if (e.target.dataset.modal === "close") {
    modal.style.display = "none";
  }
});
