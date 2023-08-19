import { playerInput } from "../player/playerInput.js";
import { getPokemon, getPokemonAll } from "./pokemonsApi.js";
import { playerData } from "../player/playerData.js";
import { gameState } from "../gameState.js";
import { closeCatchScene, openCatchScene } from "../scenes/catchScene.js";
import { getCatchingPokemon, setCatchingPokemon } from "./currentPokemon.js";
import { showAnimation } from "../UI/lottieAnimations.js";
import { activateNotification } from "../UI/notifications.js";
export const findPokemon = async () => {
  if (gameState.battle || gameState.catch) return;
  const chance = 0.001;
  if (playerInput.x == 0 && playerInput.y == 0) return;
  if (Math.random() <= chance) {
    const pokemons = await getPokemonAll();
    const found = pokemons[Math.floor((Math.random() * 10000) % 100)];
    const pokemon = await getPokemon(found.name);
    console.log(pokemon);
    const exist = playerData.playerPokemons.find((p) => p.id == pokemon.id);
    if (exist) return;
    gameState.catch = true;
    setCatchingPokemon(pokemon);
    openCatchScene(pokemon);
  }
};
let tries = 10;
export const catchPokemon = (pokemon) => {
  if (!gameState.catch) return;
  tries--;
  if (tries <= 0) {
    tries = 10;
    closeCatchScene();
    setTimeout(() => {
      showAnimation("../assets/animations/failed.json", "fail");
    }, 500);
    return;
  }
  const catchBtn = document.querySelector('[data-catchscene="catch-btn"]');
  const leaveBtn = document.querySelector('[data-catchscene="leave-btn"]');
  leaveBtn.onclick = () => {
    tries = 10;
  };
  catchBtn.innerText = "CATCH! " + tries;
  catchBtn.disabled = true;
  const character = document.querySelector('[data-catchscene="character"]');
  character.classList.add("throw-ball-active");
  setTimeout(() => {
    catchBtn.disabled = false;
    character.classList.remove("throw-ball-active");
  }, 800);
  const maxSpeed = 255;
  const chance = 5 / ((pokemon.stats.speed / maxSpeed) * 100);
  if (Math.random() <= chance) {
    tries = 10;
    addPokemonToList();
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
  const catching = getCatchingPokemon();
  const pokemon = {
    id: catching.id,
    name: catching.name,
    front: catching.front,
    back: catching.back,
    level: 1,
    health: catching.stats.hp,
    mona: 100,
    xp: 112,
    maxHealth: catching.stats.hp,
    maxMona: 100,
    stats: {
      hp: catching.stats.hp,
      attack: catching.stats.attack,
      defense: catching.stats.defense,
      specialAttack: catching.stats.specialAttack,
      specialDefense: catching.stats.specialDefense,
      speed: catching.stats.speed,
    },
  };
  const exist = playerData.playerPokemons.find((p) => p.id == pokemon.id);
  if (exist) return;
  playerData.playerPokemons.push(pokemon);
};
