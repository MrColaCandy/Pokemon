import { animate } from "./animation.js";
import { physics } from "./physics.js";
import { pokemonBtn, renderPokemons, closePokemonList } from "./pokemons.js";
import {
  getCatchingPokemon,
  getCurrentPokemon,
  setCurrentPokemon,
} from "./currentPokemon.js";
import { getPokemon } from "./pokemonsApi.js";
import { closeModal, openModal } from "./modal.js";
import { levelUp } from "./player/playerProgress.js";
import { playerData } from "./player/playerData.js";
import { heal } from "./healing.js";
import { charge } from "./charging.js";
import { gameState } from "./gameState.js";
import { catchPokemon } from "./pokemonsCatch.js";
import { closeCatchScene } from "./catchScene.js";

// physics loop
physics();
// animations loop
animate();

// UI events
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
    closePokemonList();
  }

  if (e.target.dataset.modal === "close") {
    closeModal();
  }
  const pokemonData = playerData.playerPokemons.find(
    (p) => p.id === getCurrentPokemon()?.id
  );
  if (e.target.dataset.modal === "levelUp") {
    levelUp(pokemonData);
    openModal(getCurrentPokemon());
  }

  if (e.target.dataset.modal === "heal") {
    heal(pokemonData);
    openModal(getCurrentPokemon());
  }
  if (e.target.dataset.modal === "charge") {
    charge(pokemonData);
    openModal(getCurrentPokemon());
  }

  if (e.target.dataset.catchscene === "leave-btn") {
    closeCatchScene();
  }
  if (e.target.dataset.catchscene === "catch-btn") {
    catchPokemon(getCatchingPokemon());
  }
});
