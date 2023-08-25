import { gameState } from "../game-state/gameState.js";

import {
  getCurrentPokemon,
  setEnemyPokemon,
  getEnemyPokemon,
} from "../pokemons/currentPokemon.js";
import { getPokemon } from "../pokemons/pokemonsApi.js";
import { showAnimation } from "../UI/lottieAnimations.js";
import {
  createElement,
  getElement,
  removeElement,
} from "../Utils/elementUtil.js";
import { createBar } from "../UI/bar.js";
import { isMyTurn, startTurnTimer } from "../game-state/playerTurn.js";

import { attack, defend } from "../battle/battle.js";
import { closeBattleResult } from "../battle/battleResult.js";
import { backgrounds } from "../game-loops/animationLoop.js";
import { activateNotification } from "../UI/notifications.js";

export const openBattleScene = async () => {
  if (gameState.battle || gameState.catch) return;
  const playerPokemonData = getCurrentPokemon();
  if (playerPokemonData.currentHealth < playerPokemonData.maxHealth) {
    activateNotification("Your pokemon is in a bad shape!");
    return;
  }
  showAnimation(
    "../../assets/animations/spinner.json",
    "battle-spinner",
    false
  );
  gameState.battle = true;

  const randomId = Math.round(Math.random() * 100000) % 500;
  const enemyPokemonData = await getPokemon(randomId === 0 ? 1 : randomId);
  setEnemyPokemon(enemyPokemonData);

  const playerPokemon = createPokemon(
    playerPokemonData,
    "player-pokemon",
    "player-pokemon col",
    playerPokemonData.backImage
  );

  const enemyPokemon = createPokemon(
    enemyPokemonData,
    "enemy-pokemon",
    "enemy-pokemon col",
    enemyPokemonData.frontImage
  );

  const attackButton = createElement({
    elementName: "div",
    className: "btn",
    id: "attack-button",
    innerHTML: "ATTACK",
  });
  const specialAttackButton = createElement({
    elementName: "div",
    className: "btn",
    id: "special-attack-button",
    innerHTML: "POWER ATTACK",
  });
  const defenseButton = createElement({
    elementName: "div",
    className: "btn",
    id: "defense-button",
    innerHTML: "DEFENSE",
  });
  const buttonsGroup = createElement({
    elementName: "div",
    className: "buttons-group",
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
    className: "battle-timer my-turn",
  });
  startTurnTimer();
  createScene(playerPokemon, enemyPokemon, buttonsGroup, timerDiv);
  removeElement("battle-spinner");
};

export const closeBattleScene = () => {
  removeElement("battle-scene");
  gameState.battle = false;
  backgrounds.forEach((b) => {
    b.position.y -= 48 * 2;
  });
};

function createScene(playerPokemon, enemyPokemon, buttonsGroup, timerDiv) {
  const scene = createElement({
    elementName: "div",
    className: "scene",
    id: "battle-scene",
    innerHTML: `
    ${playerPokemon.outerHTML}
    ${enemyPokemon.outerHTML}
    ${buttonsGroup.outerHTML}
    ${timerDiv.outerHTML}
    `,
  });

  const base = getElement("base");
  base.append(scene);
}

function createPokemon(data, id, className, image) {
  const playerStats = createElement({
    elementName: "div",
    id: id,
    className: "battle-stats",
    innerHTML: renderStats(data),
  });

  const playerPokemonImage = image;
  const playerPokemon = createElement({
    className: className,
    id: id,
    innerHTML: `
    ${playerStats.outerHTML}
    <div id="image" >${playerPokemonImage.outerHTML}</div>
    <div id="defense" ></div>
    `,
  });
  return playerPokemon;
}
export function renderStats(data) {
  return `
    <div id="stats">
    ${
      createBar(
        (data.currentHealth / data.maxHealth) * 100,
        "5px",
        100,
        "salmon"
      ).outerHTML
    }
     ${
       createBar((data.currentMona / data.maxMona) * 100, "5px", 100, "skyblue")
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
