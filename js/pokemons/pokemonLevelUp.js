import { activateNotification } from "../UI/game-ui/notifications.js";
import { showAnimation } from "../UI/game-ui/lottieAnimations.js";
import { getCurrentPokemon } from "./currentPokemon.js";
export const levelUp = () => {
  const pokemon = getCurrentPokemon();
  if (pokemon.xp >= 100 * pokemon.level) {
    if (pokemon.hp >= 255) {
      pokemon.hp = 255;
      pokemon.activateNotification("max level reached!");
      return;
    }
    pokemon.xp -= 100 * pokemon.level;
    pokemon.level++;
    pokemon.hp += 15;
    pokemon.maxHealth += 15;
    pokemon.maxMona += 15;
    pokemon.attack += 15;
    pokemon.defense += 15;
    pokemon.specialAttack += 15;
    pokemon.specialDefense += 15;
    pokemon.speed += 15;

    showAnimation("../../assets/animations/levelUp.json", "level-up");
  } else {
    activateNotification(`You need ${100 * pokemon.level} xps!`);
  }
};
