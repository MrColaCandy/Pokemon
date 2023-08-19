let currentPokemon = null;
let battlePokemon = null;
let catchingPokemon = null;
export const currentStats = { hp: 0, mona: 0 };
export const setCurrentPokemon = (pokemon) => {
  currentPokemon = pokemon;
};
export const setBattlePokemon = (pokemon) => {
  battlePokemon = pokemon;
};

export const getCurrentPokemon = () => {
  return currentPokemon;
};
export const getBattlePokemon = () => {
  return battlePokemon;
};

export const getCatchingPokemon = () => {
  return catchingPokemon;
};

export const setCatchingPokemon = (pokemon) => {
  catchingPokemon = pokemon;
};
