import { gameState } from "../game-state/gameState.js";
import {
  getCurrentPokemon,
  setEnemyPokemon,
  getEnemyPokemon,
} from "../pokemons/currentPokemon.js";
import { getPokemon } from "../pokemons/pokemonsApi.js";
import { showAnimation } from "../UI/lottieAnimations.js";
import { createElement, removeElement } from "../Utils/elementUtil.js";
import { createBar } from "../UI/bar.js";
import { isMyTurn, startTurnTimer } from "../game-state/playerTurn.js";
import { attack, defend } from "../battle/battle.js";
import { closeBattleResult } from "../battle/battleResult.js";
import { backgrounds } from "../game-loops/animationLoop.js";
import { activateNotification } from "../UI/notifications.js";
import { playAudio } from "../audio/audioManager.js";
import { playerData } from "../player/playerData.js";
import { gameRoot } from "../UI/gameRoot.js";

export const openBattleScene = async () => {
  if (gameState.battle || gameState.catch || gameState.pause) return;
  gameState.battle = true;
  const playerPokemonData = getCurrentPokemon();
  if (playerPokemonData.currentHealth < playerPokemonData.maxHealth) {
    activateNotification("Your pokemon is in a bad shape!");
    gameState.battle = false;
    return;
  }

  showAnimation(
    "../../assets/animations/spinner.json",
    "battle-spinner",
    false
  );

  const randomId = Math.round(Math.random() * 100000) % 500;
  const enemyPokemonData = await getPokemon(randomId === 0 ? 1 : randomId);
  const exist = playerData.playerPokemons.find(
    (p) => p.id == enemyPokemonData.id
  );
  if (exist) {
    gameState.battle = false;
    removeElement("battle-spinner");
    return;
  }

  setEnemyPokemon(enemyPokemonData);
  playAudio("battle");
  const playerPokemon = createPokemon(
    playerPokemonData,
    "player-pokemon",
    "flex flex-col justify-center items-center w-96 absolute bottom-10 left-32",
    playerPokemonData.backImage
  );

  const enemyPokemon = createPokemon(
    enemyPokemonData,
    "enemy-pokemon",
    "flex flex-col justify-center items-center w-64 absolute bottom-64 right-64",
    enemyPokemonData.frontImage
  );

  const attackButton = createElement({
    elementName: "button",
    className: "py-2 px-3 bg-amber-400 rounded-md border-2 mx-2",
    id: "attack-button",
    innerHTML: "ATTACK",
  });
  const specialAttackButton = createElement({
    elementName: "button",
    className: "py-2 px-3 bg-amber-400 rounded-md border-2 mx-2",
    id: "special-attack-button",
    innerHTML: "POWER ATTACK",
  });
  const defenseButton = createElement({
    elementName: "button",
    className: "py-2 px-3 bg-amber-400 rounded-md border-2 mx-2",
    id: "defense-button",
    innerHTML: "DEFENSE",
  });
  const buttonsGroup = createElement({
    elementName: "div",
    className: "absolute bottom-9 left-1/2 transform -translate-x-1/2",
    id: "battle-buttons",
    innerHTML: `
    ${attackButton.outerHTML}
    ${specialAttackButton.outerHTML}
    ${defenseButton.outerHTML}
    `,
  });
  const timerDiv = createElement({
    elementName: "div",
    id: "battle-timer",
    className: "my-turn",
  });
  createScene(playerPokemon, enemyPokemon, buttonsGroup, timerDiv);
  startTurnTimer();
  removeElement("battle-spinner");
};

export const closeBattleScene = () => {
  playAudio("ambient");
  removeElement("battle-scene");
  gameState.battle = false;
  backgrounds.forEach((b) => {
    b.position.y -= 48 * 2;
  });
};

function createScene(playerPokemon, enemyPokemon, buttonsGroup, timerDiv) {
  const scene = createElement({
    elementName: "div",
    className: "absolute top-0 left-0 w-full h-full bg-black ",
    id: "battle-scene",
    innerHTML: `
    ${playerPokemon.outerHTML}
    ${enemyPokemon.outerHTML}
    ${buttonsGroup.outerHTML}
    ${timerDiv.outerHTML}
    `,
  });

  gameRoot.append(scene);
}

function createPokemon(data, id, className, src) {
  const stats = createElement({
    elementName: "div",
    className: "",
    id: id,
    innerHTML: renderStats(data),
  });

  const imageSrc = src;
  const pokemon = createElement({
    className: className,
    id: id,
    innerHTML: `
    ${stats.outerHTML}
    <div id="image" ><img src="${imageSrc}" /></div>
    <div id="defense" ></div>
    `,
  });
  return pokemon;
}
export function renderStats(data) {
  return `
    <div   id="stats" >
    ${
      createBar((data.currentHealth / data.maxHealth) * 100, 5, 100, "salmon")
        .outerHTML
    }
     ${
       createBar((data.currentMona / data.maxMona) * 100, 5, 100, "skyblue")
         .outerHTML
     }
    </div>
    `;
}
export const handleBattleEvents = () => {
  window.addEventListener("click", (e) => {
    const id = e.target.id;
    if (id === "battle-result-btn") {
      closeBattleResult();
    }
    if (!id) return;
    if (!isMyTurn) return;
    if (id === "attack-button") {
      attack({
        attackType: "normal",
        defenseType: getEnemyPokemon().defenseType,
      });
    }

    if (id === "defense-button") {
      defend(getCurrentPokemon());
    }

    if (id === "special-attack-button") {
      attack({ attackType: "special" });
    }
  });
};
