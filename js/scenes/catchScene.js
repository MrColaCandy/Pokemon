import { gameRoot } from "../UI/gameRoot.js";
import { createElement } from "../Utils/elementUtil.js";
import { playAudio } from "../audio/audioManager.js";
import { gameState } from "../game-state/gameState.js";
import { getCatchingPokemon } from "../pokemons/currentPokemon.js";

export const openCatchScene = () => {
  const pokemon = getCatchingPokemon();
  playAudio("catch");
  const catchScene = createElement({
    className: "absolute w-full h-full top-0 left-0 bg-black",
    id: "catch-scene",
  });

  const character = createElement({
    className: "catch-scene-character",
  });
  character.setAttribute("data-catch", "character");

  const pokemonName = createElement({
    className:
      "w-96 text-center mt-5 ms-5 text-xl p-3 rounded-md border-4 bg-amber-300",
    innerHTML: `
    You found <span class="text-2xl">${pokemon.name}</span> try to catch it!
    `,
  });
  const pokemonImage = createElement({
    elementName: "img",
    className: "w-96 h-96 absolute bottom-1 end-32",
  });
  pokemonImage.src = pokemon.frontImage;
  const btnDiv = createElement({
    className:
      "flex flex-row gap-5 absolute bottom-9 left-1/2 transform -translate-x-1/2",
  });
  const catchBtn = createElement({
    elementName: "button",
    className: "bg-amber-400 border-2 py-3 px-2 rounded-md",
    innerHTML: "CATCH! 10",
  });
  catchBtn.setAttribute("data-catch", "catch-btn");

  const leaveBtn = createElement({
    elementName: "button",
    className: "bg-amber-400 border-2 py-3 px-2 rounded-md",
    innerHTML: "LEAVE",
  });
  leaveBtn.setAttribute("data-catch", "leave-btn");

  btnDiv.append(catchBtn, leaveBtn);
  catchScene.append(pokemonImage);
  catchScene.append(btnDiv);
  catchScene.append(character);
  catchScene.append(pokemonName);

  gameRoot.append(catchScene);
};

export const closeCatchScene = () => {
  playAudio("ambient");
  document.querySelector("#catch-scene").remove();
  gameState.catch = false;
};
