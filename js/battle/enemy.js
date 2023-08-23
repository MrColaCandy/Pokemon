import {
  getCurrentPokemon,
  getEnemyPokemon,
} from "../pokemons/currentPokemon.js";
import { attack, defend } from "./battle.js";

export const getEnemyMove = () => {
  const chance = 0.5;
  const enemy = getEnemyPokemon();
  const player = getCurrentPokemon();
  if (Math.random() >= chance) {
    attack({ attacker: enemy, defender: player });
  } else if (player.defenseType !== "special") {
    defend(enemy);
  }
};
