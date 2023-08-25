import { activateNotification } from "../UI/notifications.js";
import { playerData } from "../player/playerData.js";
import { getCurrentPokemon } from "./currentPokemon.js";

export const charge = () => {
  const pokemon = getCurrentPokemon();
  if (playerData.items.mona > 0) {
    if (pokemon.currentMona >= pokemon.maxMona - 15) {
      pokemon.currentMona = pokemon.maxMona;
      activateNotification("Max mona reached!");
      return;
    }
    playerData.items.mona--;
    pokemon.currentMona += 15;
  } else {
    activateNotification("Not enough mona!");
  }
};
