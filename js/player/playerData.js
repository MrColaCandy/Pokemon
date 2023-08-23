import { showAnimation } from "../UI/lottieAnimations.js";
import { activateNotification } from "../UI/notifications.js";
import { removeElement } from "../Utils/elementUtil.js";
import { setCurrentPokemon } from "../pokemons/currentPokemon.js";
import { getPokemon } from "../pokemons/pokemonsApi.js";

export const playerData = {
  playerPokemons: [],
  items: {
    mona: 2,
    health: 1,
  },
};

export const addPikachu = async () => {
  if (playerData.playerPokemons.length === 0) {
    try {
      showAnimation("../../assets/animations/spinner.json", "add-pika", false);
      const pika = await getPokemon(25);
      playerData.playerPokemons.push(pika);
      setCurrentPokemon(pika);
    } catch {
      activateNotification("No Internet!");
    }

    removeElement("add-pika");
  }
};
