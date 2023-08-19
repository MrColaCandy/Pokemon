import { activateNotification } from "./notifications.js";
import { playerData } from "./player/playerData.js";

export const charge = (pokemonData) => {
  if (playerData.items.mona > 0) {
    if (pokemonData.mona >= pokemonData.maxMona) {
      pokemonData.mona = pokemonData.maxMona;
      activateNotification("Max mona reached!");
      return;
    }
    playerData.items.mona--;
    pokemonData.mona += 15;
  } else {
    activateNotification("Not enough mona!");
  }
};
