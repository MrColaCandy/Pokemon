import { createElement } from "../Utils/elementUtil.js";
import { gameState } from "../game-state/gameState.js";
import { getCatchingPokemon } from "../pokemons/currentPokemon.js";

export const openCatchScene = () => {
  const pokemon = getCatchingPokemon();

  const catchScene = createElement({
    className: "catch-scene scene",
    id: "catch-scene",
  });

  const character = createElement({
    className: "throw-ball",
  });
  character.setAttribute("data-catch", "character");

  const pokemonName = createElement({
    className: "pokemon-name pokemon-name-mask",
    innerHTML: `
    You found <span>${pokemon.name}</span> try to catch it!
    `,
  });
  const pokemonImage = pokemon.frontImage;
  const btnDiv = createElement({ className: "catch-scene-btns row" });
  const catchBtn = createElement({
    elementName: "button",
    className: "btn catch-btn",
    innerHTML: "CATCH! 10",
  });
  catchBtn.setAttribute("data-catch", "catch-btn");

  const leaveBtn = createElement({
    elementName: "button",
    className: "btn leave-btn",
    innerHTML: "LEAVE",
  });
  leaveBtn.setAttribute("data-catch", "leave-btn");

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
