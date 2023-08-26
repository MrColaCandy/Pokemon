import { createElement } from "../Utils/elementUtil.js";
import { backgrounds } from "../game-loops/animationLoop.js";
import { battleColliders } from "../maps/battleZonesMap.js";
import { colliders } from "../maps/collisionMap.js";
import { foregroundSprite } from "../maps/foregroundMap.js";
import { mapSprite, offset } from "../maps/mainMap.js";
import {
  getCurrentPokemon,
  setCurrentPokemon,
} from "../pokemons/currentPokemon.js";
import { getPokemon } from "../pokemons/pokemonsApi.js";

export let playerData = {
  playerPokemons: [],
  items: {
    mona: 2,
    health: 1,
  },
};
export const setDefaultPokemon = async () => {
  if (playerData.playerPokemons.length == 0) {
    const pika = await getPokemon(25);
    playerData.playerPokemons.push(pika);
    setCurrentPokemon(pika);
  }
};

export const save = () => {
  setInterval(() => {
    const data = {
      items: playerData.items,
      playerPokemons: playerData.playerPokemons,
      currentPokemon: getCurrentPokemon(),
      position: {
        x: mapSprite.position.x,
        y: mapSprite.position.y,
      },
    };
    localStorage.setItem("PokemonGameData", JSON.stringify(data));
  }, 5000);
};

export const load = () => {
  const data = JSON.parse(localStorage.getItem("PokemonGameData")) || null;
  if (data === null) return;
  playerData.items = data.items;
  playerData.playerPokemons = [...data.playerPokemons];
  foregroundSprite.position.x = mapSprite.position.x = data.position.x;
  foregroundSprite.position.y = mapSprite.position.y = data.position.y;
  colliders.forEach((c) => {
    c.position.x += data.position.x - offset.x;
    c.position.y += data.position.y - offset.y;
  });
  battleColliders.forEach((c) => {
    c.position.x += data.position.x - offset.x;
    c.position.y += data.position.y - offset.y;
  });
};
