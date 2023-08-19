import { animate } from "./game-loops/animation.js";
import { physics } from "./game-loops/physics.js";
import {
  pokemonBtn,
  renderPokemons,
  closePokemonList,
} from "./pokemons/pokemonsList.js";
import {
  getCatchingPokemon,
  getCurrentPokemon,
  setCurrentPokemon,
} from "./pokemons/currentPokemon.js";
import { getPokemon } from "./pokemons/pokemonsApi.js";
import { closeModal, openModal } from "./UI/modal.js";
import { levelUp } from "./player/playerProgress.js";
import { playerData } from "./player/playerData.js";
import { heal } from "./pokemons/pokemonHealing.js";
import { charge } from "./pokemons/pokemonCharging.js";
import { gameState } from "./gameState.js";
import { catchPokemon } from "./pokemons/pokemonsCatch.js";
import { closeCatchScene } from "./scenes/catchScene.js";

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
    if (gameState.catch) {
      catchPokemon(getCatchingPokemon());
    }
  }
});
