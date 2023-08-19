import { activateNotification } from "../notifications.js";
import { showAnimation } from "../lottieAnimations.js";
export const levelUp = (pokemonData) => {
  if (pokemonData.xp >= 100 * pokemonData.level) {
    if (pokemonData.stats.hp === 255) {
      activateNotification("max level reached!");
      return;
    }
    pokemonData.xp -= 100;
    pokemonData.level++;
    pokemonData.stats.hp += 15;
    pokemonData.maxHealth += 15;
    pokemonData.maxMona += 15;
    pokemonData.stats.attack += 15;
    pokemonData.stats.defense += 15;
    pokemonData.stats.specialAttack += 15;
    pokemonData.stats.specialDefense += 15;
    pokemonData.stats.speed += 15;

    showAnimation("../../assets/animations/levelUp.json", "level-up");
  } else {
    activateNotification("Not enough xp!");
  }
};
