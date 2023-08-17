let currentPokemon = null;
let battlePokemon = null;
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
