import { activateNotification } from "./notifications.js";
import { playerData } from "./player/playerData.js";

export const heal = (pokemonData) => {
  if (playerData.items.health > 0) {
    if (pokemonData.health >= pokemonData.maxHealth) {
      pokemonData.health = pokemonData.maxHealth;
      activateNotification("Max health reached!");
      return;
    }
    playerData.items.health--;
    pokemonData.health += 15;
  } else {
    activateNotification("Not enough health potions!");
  }
};
