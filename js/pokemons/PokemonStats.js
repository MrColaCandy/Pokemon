import { createBar } from "../UI/game-ui/bar.js";
import { getCurrentPokemon } from "./currentPokemon.js";

export const getStatBar = ({
  stat,
  pokemon = getCurrentPokemon(),
  color = null,
  back = 95,
}) => {
  const value = pokemon[stat] / 255;

  if (!color) {
    if (value <= 0.3) {
      color = "orangered";
    } else if (value > 0.3 && value >= 0.7) {
      color = "yellowgreen";
    } else {
      color = "seagreen";
    }
  }
  const statBar = createBar(value * back, 10, back, color);
  return statBar;
};
