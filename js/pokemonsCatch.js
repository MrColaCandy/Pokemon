import { playerInput } from "./player/playerInput.js";
import { getPokemon, getPokemonAll } from "./pokemonsApi.js";
import { playerData } from "./player/playerData.js";
import { gameState } from "./gameState.js";
import { closeCatchScene, openCatchScene } from "./catchScene.js";
import { setCatchingPokemon } from "./currentPokemon.js";
import { showAnimation } from "./lottieAnimations.js";
import { activateNotification } from "./notifications.js";
export const findPokemon = async () => {
  if (gameState.battle || gameState.catch) return;
  const chance = 0.001;
  if (playerInput.x == 0 && playerInput.y == 0) return;
  if (Math.random() < chance) {
    const pokemons = await getPokemonAll();
    const found = pokemons[Math.floor((Math.random() * 10000) % 100)];
    const pokemon = await getPokemon(found.name);
    const exist = playerData.playerPokemons.find((p) => p.id == pokemon.id);
    if (exist) return;
    gameState.catch = true;
    setCatchingPokemon(pokemon);
    openCatchScene(pokemon);
  }
};
let tries = 10;
export const catchPokemon = (pokemon) => {
  tries--;
  document.querySelector('[data-catchscene="leave-btn"]').onclick = () => {
    tries = 10;
  };
  const character = document.querySelector('[data-catchscene="character"]');
  character.classList.add("throw-ball-active");
  setTimeout(() => {
    character.classList.remove("throw-ball-active");
  }, 900);
  document.querySelector(
    '[data-catchscene="catch-btn"]'
  ).innerText = `CATCH! ${tries}`;
  if (tries <= 0) {
    setTimeout(() => {
      tries = 10;
      closeCatchScene();
      showAnimation("../assets/animations/failed.json", "failed-animation");
      activateNotification("Catching new pokemon failed!");
    });
    return;
  }
  const maxSpeed = 255;
  const chance = 10 / ((pokemon.stats.speed / maxSpeed) * 100);

  if (Math.random() <= chance) {
    showAnimation("../assets/animations/pokeball.json");
    tries = 10;
    setTimeout(() => {
      closeCatchScene();
      activateNotification("New pokemon added!");
    }, 1000);
  } else {
    showAnimation("../assets/animations/failed.json", "failed-animation");
  }
};
