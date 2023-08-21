import { gameState } from "../game-state/gameState.js";
import { getCatchingPokemon } from "../pokemons/currentPokemon.js";

export const openCatchScene = () => {
  gameState.catch = true;
  const pokemon = getCatchingPokemon();
  const catchScene = document.createElement("div");
  catchScene.className = "catch-scene";
  catchScene.setAttribute("id", "catch-scene");

  const character = document.createElement("div");
  character.className = "throw-ball";
  character.setAttribute("data-catchScene", "character");

  const pokemonName = document.createElement("div");
  pokemonName.className = "pokemon-name pokemon-name-mask";
  pokemonName.innerHTML = `You found <span>${pokemon.name}</span> try to catch it!`;

  const pokemonImage = pokemon.frontImage;
  const btnDiv = document.createElement("div");
  btnDiv.className = "catch-scene-btns";
  const catchBtn = document.createElement("button");
  catchBtn.innerText = "CATCH! 10";
  catchBtn.className = "btn catch-btn";
  catchBtn.setAttribute("data-catchScene", "catch-btn");

  const leaveBtn = document.createElement("button");
  leaveBtn.className = "btn leave-btn";
  leaveBtn.innerText = "LEAVE!";
  leaveBtn.setAttribute("data-catchScene", "leave-btn");
  btnDiv.append(catchBtn, leaveBtn);

  catchScene.append(pokemonImage);
  catchScene.append(btnDiv);

  catchScene.append(character);
  catchScene.append(pokemonName);

  document.querySelector("#base").append(catchScene);
};

export const closeCatchScene = () => {
  document.querySelector("#catch-scene").remove();
  gameState.catch = false;
};
