import { getElement, removeElement } from "../Utils/elementUtil.js";
import { activateNotification } from "../UI/notifications.js";
import { calculateDamage } from "../damage/damageCalculator.js";
import { createAttackAnimation } from "../damage/damageVisuals.js";
import { nextTurn } from "../game-state/playerTurn.js";
import {
  getCurrentPokemon,
  getEnemyPokemon,
} from "../pokemons/currentPokemon.js";
import { playerData } from "../player/playerData.js";
import { closeBattleScene, renderStats } from "../scenes/battleScene.js";
import { gameState } from "../game-state/gameState.js";
import { createBattleResult } from "./battleResult.js";

export const attack = async ({
  attacker = getCurrentPokemon(),
  defender = getEnemyPokemon(),
  attackType = "normal",
  defenseType = "normal",
}) => {
  if (!gameState.battle) return;
  if (attacker.currentMona <= 0) {
    if (attacker.id === getCurrentPokemon().id) {
      activateNotification("You lost all your mona!");
    }
    return;
  }
  const attackBtn = getElement("attack-button");
  const defenseBtn = getElement("defense-button");
  const specialBtn = getElement("special-attack-button");
  attackBtn.disabled = true;
  defenseBtn.disabled = true;
  specialBtn.disabled = true;
  const damage = await calculateDamage(
    attacker,
    defender,
    attackType,
    defenseType
  );
  setTimeout(() => {
    attackBtn.disabled = false;
    defenseBtn.disabled = false;
    specialBtn.disabled = false;
  }, 2000);
  if (damage >= defender.currentHealth) {
    defender.currentHealth = 0;
    setTimeout(() => {
      closeBattleScene();
      if (defender.id === getCurrentPokemon().id) {
        activateNotification("Your pokemon fainted!");
        playerData.items.health += 4;
        playerData.items.mona += 4;
        getCurrentPokemon().xp += 100;

        createBattleResult(false);
      } else {
        activateNotification("You Won!");
        createBattleResult(true);
        playerData.items.health += 10;
        playerData.items.mona += 10;
        getCurrentPokemon().xp += 250;
      }
    }, 1000);
  } else {
    defender.currentHealth -= damage;
  }
  if (attacker.currentMona <= (attackType === "normal" ? 25 : 50)) {
    attacker.currentMona = 0;
  } else {
    attacker.currentMona -= attackType === "normal" ? 25 : 50;
  }

  const defenderDiv =
    defender.id === getCurrentPokemon().id
      ? getElement("player-pokemon")
      : getElement("enemy-pokemon");
  const DefenderStats = defenderDiv.querySelector("#stats");
  DefenderStats.innerHTML = renderStats(defender);

  const attackAnimation = createAttackAnimation(attackType, "attack-animation");
  if (getElement("attack-animation") === null) {
    defenderDiv.append(attackAnimation);
  }
  const attackerDiv =
    attacker.id === getCurrentPokemon().id
      ? getElement("player-pokemon")
      : getElement("enemy-pokemon");
  const attackerImage = attackerDiv.querySelector("#image");
  const attackerStats = attackerDiv.querySelector("#stats");

  attackerStats.innerHTML = renderStats(attacker);
  gsap.to(attackerImage, {
    opacity: 0,
    ease: true,
    yoyo: true,
    onComplete: () => {
      gsap.to(attackerImage, {
        delay: 0.2,
        opacity: 1,
      });
    },
  });

  if (defender.defenseType === "special") {
    removeElement("special-defense");
    defender.defenseType = "normal";
  }
  setTimeout(() => {
    nextTurn();
  }, 2000);
};

export const defend = (defender) => {
  if (!gameState.battle) return;

  const playerPokemon = getCurrentPokemon();
  defender.defenseType = "special";
  const defenderDiv =
    defender.id === playerPokemon.id
      ? getElement("player-pokemon")
      : getElement("enemy-pokemon");

  const image = new Image();
  image.src = "../../assets/images/specialDefense.png";
  image.className = "special-defense";
  image.id = "special-defense";
  console.log(defenderDiv);
  defenderDiv.querySelector("#defense").innerHTML = image.outerHTML;
  if (defender.currentMona <= 0) {
    defender.currentMona += 25;
    defenderDiv.querySelector("#stats").innerHTML = renderStats(defender);
  }
  setTimeout(() => {
    nextTurn();
  }, 2000);
};
