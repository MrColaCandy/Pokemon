import {
  getCurrentPokemon,
  getEnemyPokemon,
} from "../pokemons/currentPokemon.js";
import { attack, defend } from "./battle.js";

export const getEnemyMove = () => {
  const enemy = getEnemyPokemon();
  const player = getCurrentPokemon();
  if (enemy.currentMona <= 0) {
    defend(enemy);
    return;
  }

  attack({
    attacker: enemy,
    defender: player,
    defenseType: player.defenseType,
  });
};
