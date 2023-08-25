import { playerInput } from "../player/playerInput.js";
import { getPokemon } from "./pokemonsApi.js";
import { openModal } from "../UI/modal.js";
import { setCurrentPokemon } from "./currentPokemon.js";
import { playerData } from "../player/playerData.js";
import { gameState } from "../game-state/gameState.js";
import { closeCatchScene, openCatchScene } from "../scenes/catchScene.js";
import { getCatchingPokemon, setCatchingPokemon } from "./currentPokemon.js";
import { showAnimation } from "../UI/lottieAnimations.js";
import { activateNotification } from "../UI/notifications.js";
import { pokemonsDiv, renderPokemons } from "../UI/pokemonsList.js";

export const findPokemon = async () => {
  if (gameState.battle || gameState.catch) return;

  const chance = 0.08;
  if (playerInput.x == 0 && playerInput.y == 0) return;
  if (Math.random() <= chance) {
    gameState.catch = true;
    const randomId = Math.round(Math.random() * 100000) % 200;
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
      activateNotification(`${pokemon.name} escaped!!!`);
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
  character.classList.add("throw-ball-active");
  setTimeout(() => {
    catchBtn.disabled = false;
    character.classList.remove("throw-ball-active");
  }, 800);
  const maxSpeed = 255;
  const chance = 5 / ((pokemon.speed / maxSpeed) * 100);
  if (Math.random() <= chance) {
    tries = 10;
    addPokemonToList();
    renderPokemons();
    pokemonsDiv.scrollLeft = pokemonsDiv.scrollWidth;
    closeCatchScene();
    setTimeout(() => {
      showAnimation("../assets/animations/pokeball.json");
      activateNotification("New pokemon added!");
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
