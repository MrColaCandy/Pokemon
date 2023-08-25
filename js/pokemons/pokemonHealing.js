import { activateNotification } from "../UI/notifications.js";
import { playerData } from "../player/playerData.js";
import { getCurrentPokemon } from "./currentPokemon.js";

export const heal = () => {
  const pokemon = getCurrentPokemon();
  if (playerData.items.health > 0) {
    if (pokemon.currentHealth >= pokemon.maxHealth - 15) {
      pokemon.currentHealth = pokemon.maxHealth;
      activateNotification("Max health reached!");
      return;
    }
    playerData.items.health--;
    pokemon.currentHealth += 15;
  } else {
    activateNotification("Not enough health potions!");
  }
};
