let currentPokemon = null;
let enemy = null;
let catchingPokemon = null;

export const setCurrentPokemon = (pokemon) => {
  currentPokemon = pokemon;
};
export const setEnemyPokemon = (pokemon) => {
  enemy = pokemon;
};

export const getCurrentPokemon = () => {
  return currentPokemon;
};
export const getEnemyPokemon = () => {
  return enemy;
};

export const getCatchingPokemon = () => {
  return catchingPokemon;
};

export const setCatchingPokemon = (pokemon) => {
  catchingPokemon = pokemon;
};
