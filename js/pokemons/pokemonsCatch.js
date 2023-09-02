import { playerInput } from "../player/playerInput.js";
import { getPokemon } from "./pokemonsApi.js";
import { playerData } from "../player/playerData.js";
import { gameState } from "../game-state/gameState.js";
import { closeCatchScene, openCatchScene } from "../scenes/catchScene.js";
import { getCatchingPokemon, setCatchingPokemon } from "./currentPokemon.js";
import { showAnimation } from "../UI/game-ui/lottieAnimations.js";
import { activateNotification } from "../UI/game-ui/notifications.js";
import { list, renderPokemonsList } from "../UI/game-ui/list.js";
import { playAudio } from "../audio/audioManager.js";
let canCatch = true;
export const setCanCatch = (value) => {
  canCatch = value;
};

export const getCanCatch = () => {
  return canCatch;
};

export const findPokemon = async () => {
  if (!canCatch) return;

  if (gameState.catch || gameState.pause) return;

  const chance = 0.0008;
  if (playerInput.x == 0 && playerInput.y == 0) return;
  if (Math.random() <= chance && !gameState.catch) {
    gameState.catch = true;
    gameState.pause = true;
    const randomId = Math.round(Math.random() * 100000) % 500;
    showAnimation(
      "../../assets/animations/spinner.json",
      "spinner-lottie",
      false
    );
    const animation = document.getElementById("spinner-lottie");
    const pokemon = await getPokemon(randomId === 0 ? 1 : randomId);
    const exist = playerData.playerPokemons.find((p) => p.id == pokemon.id);
    if (exist) {
      gameState.catch = false;
      animation.remove();
      return;
    }
    canCatch = false;
    setCatchingPokemon(pokemon);
    openCatchScene();
    animation.remove();
  }
};
let tries = 10;

export const catchPokemon = () => {
  if (!gameState.catch) return;
  const pokemon = getCatchingPokemon();
  tries--;
  if (tries <= 0) {
    tries = 10;
    closeCatchScene();
    setTimeout(() => {
      showAnimation("../assets/animations/failed.json", "fail");
      playAudio("omg", false);
      activateNotification(`${pokemon.name} scaped!`);
    }, 500);
    return;
  }
  const catchBtn = document.querySelector('[data-catch="catch-btn"]');
  const leaveBtn = document.querySelector('[data-catch="leave-btn"]');
  leaveBtn.onclick = () => {
    tries = 10;
  };
  catchBtn.innerText = "CATCH! " + tries;
  catchBtn.disabled = true;
  const character = document.querySelector('[data-catch="character"]');
  character.classList.add("catch-scene-character-active");
  setTimeout(() => {
    catchBtn.disabled = false;
    character.classList.remove("catch-scene-character-active");
  }, 800);
  const maxSpeed = 255;
  const chance = 5 / ((pokemon.speed / maxSpeed) * 100);
  if (Math.random() <= chance) {
    tries = 10;
    addPokemonToList();
    renderPokemonsList();
    list.scrollTop = list.scrollHeight;
    closeCatchScene();
    setTimeout(() => {
      showAnimation("../assets/animations/pokeball.json");
      activateNotification("New pokemon added!");
      playAudio("wow", false);
    }, 500);
  } else {
    activateNotification("Catching failed!");
  }
};

const addPokemonToList = () => {
  const pokemon = getCatchingPokemon();
  const exist = playerData.playerPokemons.find((p) => p.id == pokemon.id);
  if (exist) return;
  playerData.playerPokemons.push(pokemon);
};

export const handleCatchSceneEvents = () => {
  addEventListener("click", (e) => {
    if (e.target.dataset.catch === "leave-btn") {
      closeCatchScene();
    }
    if (e.target.dataset.catch === "catch-btn") {
      catchPokemon();
    }
  });
};
