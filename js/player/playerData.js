import { activateNotification } from "../UI/notifications.js";
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
      const pika = await getPokemon(25);
      playerData.playerPokemons.push(pika);
    } catch {
      activateNotification("No Internet!");
    }
  }
};
