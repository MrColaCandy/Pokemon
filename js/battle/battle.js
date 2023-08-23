import { getElement, removeElement } from "../Utils/elementUtil.js";
import { activateNotification } from "../UI/notifications.js";
import { calculateDamage } from "../damage/damageCalculator.js";
import { createAttackAnimation } from "../damage/damageVisuals.js";
import { nextTurn } from "../game-state/playerTurn.js";
import {
  getCurrentPokemon,
  getEnemyPokemon,
} from "../pokemons/currentPokemon.js";
import { closeBattleScene, renderStats } from "../scenes/battleScene.js";
import { gameState } from "../game-state/gameState.js";

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
  const damage = await calculateDamage(
    attacker,
    defender,
    attackType,
    defenseType
  );
  if (damage >= defender.currentHealth) {
    defender.currentHealth = 0;
    closeBattleScene();
    if (defender.id === getCurrentPokemon().id) {
      activateNotification("Your pokemon fainted!");
    } else {
      activateNotification("You Won!");
    }
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
  const DefenderStats = defenderDiv.querySelector("#health");
  DefenderStats.innerHTML = renderStats(defender);

  const attackAnimation = createAttackAnimation(attackType, "attack-animation");
  defenderDiv.append(attackAnimation);
  const attackerDiv =
    attacker.id === getCurrentPokemon().id
      ? getElement("player-pokemon")
      : getElement("enemy-pokemon");
  const attackerImage = attackerDiv.querySelector("#image");
  const attackerStats = attackerDiv.querySelector("#health");

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
    defender.defense -= defender.specialDefense * 0.8;
    defender.defenseType = "normal";
  }
  nextTurn();
};

export const defend = (defender) => {
  if (!gameState.battle) return;

  const playerPokemon = getCurrentPokemon();
  defender.defenseType = "special";
  const defenderDiv =
    defender.id === playerPokemon.id
      ? getElement("player-pokemon")
      : getElement("enemy-pokemon");

  defender.defense += defender.specialDefense * 0.8;
  const image = new Image();
  image.src = "../../assets/images/specialDefense.png";
  image.className = "special-defense";
  image.id = "special-defense";
  defenderDiv.querySelector("#defense").innerHTML = image.outerHTML;
  if (defender.currentMona <= 0) {
    defender.currentMona += 25;
  }
  nextTurn();
};
