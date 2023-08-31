import { playerData } from "../../player/playerData.js";
import { levelUp } from "../../pokemons/pokemonLevelUp.js";
import { heal } from "../../pokemons/pokemonHealing.js";
import { charge } from "../../pokemons/pokemonCharging.js";
import { getCurrentPokemon } from "../../pokemons/currentPokemon.js";
import { createElement, removeElement } from "../../Utils/elementUtil.js";
import { getStatBar } from "../../pokemons/PokemonStats.js";
import { createBar } from "./bar.js";
import { gameRoot } from "./gameRoot.js";
import { gameState } from "../../game-state/gameState.js";

export const openModal = () => {
  gameState.pause = true;

  const pokemon = getCurrentPokemon();
  const itemsData = playerData.items;
  const buttonsDiv = createElement({
    className: "w-full flex justify-between items-center gap-3 my-4  ",
    id: "buttons-div",
    innerHTML: `
    ${
      createElement({
        elementName: "button",
        className: "bg-emerald-400 text-white font-bold  px-3 py-2 rounded-md",
        id: "level-up-btn",
        innerHTML: "LEVEL UP",
      }).outerHTML
    }
    ${
      createElement({
        className: "bg-emerald-400 text-white font-bold  px-3 py-2 rounded-md",
        id: "heal-btn",
        innerHTML: "HEAL",
      }).outerHTML
    }
    ${
      createElement({
        className: "bg-emerald-400 text-white font-bold px-3 py-2 rounded-md",
        id: "charge-btn",
        innerHTML: "CHARGE",
      }).outerHTML
    }`,
  });

  const condition = createElement({
    className: " transform -translate-x-48",
    id: "condition",
    innerHTML: `
      <div>${
        createBar(
          (pokemon.currentHealth / pokemon.maxHealth) * 250,
          10,
          250,
          "salmon"
        ).outerHTML
      }</div>
      <div>${
        createBar(
          (pokemon.currentMona / pokemon.maxMona) * 250,
          10,
          250,
          "skyblue"
        ).outerHTML
      }</div>
    `,
  });
  const stats = createElement({
    className: "flex flex-col justify-center items-center w-full",
    id: "stats",
    innerHTML: `
   <div class="flex justify-between items-center gap-5 w-full">
   ${getStatBar({ stat: "hp" }).outerHTML} <div>hp: ${pokemon.hp}</div>
   </div>
   <div class="flex justify-between items-center gap-5 w-full">
   ${getStatBar({ stat: "attack" }).outerHTML} attack: ${pokemon.attack}
    </div>
   <div class="flex justify-between items-center gap-5 w-full">
   ${getStatBar({ stat: "defense" }).outerHTML} defense: ${pokemon.defense}
    </div>
   <div class="flex justify-between items-center gap-5 w-full">
   ${getStatBar({ stat: "specialAttack" }).outerHTML} special attack: ${
      pokemon.specialAttack
    }
    </div>
   <div class="flex justify-between items-center gap-5 w-full">${
     getStatBar({ stat: "specialDefense" }).outerHTML
   } special defense : ${pokemon.specialDefense}
   </div>
   <div class="flex justify-between items-center gap-5 w-full">${
     getStatBar({ stat: "speed" }).outerHTML
   } speed: ${pokemon.speed}
    </div>
    `,
  });

  const monaImg = document.createElement("img");
  monaImg.width = 25;
  monaImg.height = 25;
  monaImg.src = "../assets/images/monaPotion.png";
  const healthImg = document.createElement("img");
  healthImg.height = 25;
  healthImg.width = 25;
  healthImg.src = "../assets/images/hpPotion.png";
  const inventory = createElement({
    className: "mb-10 w-full",
    id: "inventory",
    innerHTML: `
    <h3 class="font-bold mb-3" >Inventory</h3>
    <div class="flex justify-between flex-row gap-5 w-full">
       ${healthImg.outerHTML}
       <div>hp  x${itemsData.health}</div>
    </div>
    <div class="flex flex-row justify-between gap-5 w-full">
      ${monaImg.outerHTML}
      <div>mona  x${itemsData.mona}</div>
    </div>
    `,
  });
  const imageSrc = pokemon.frontImage;

  const description = createElement({
    className: "description",
    id: "description",
    innerHTML: `
    <h3 class="font-bold mb-3">Description</h3>
    <p>${pokemon.description[0]}</p>
  
    `,
  });
  const rightPage = createElement({
    className:
      "flex flex-col justify-start items-center w-1/2 border-2 rounded-md m-1 p-3  h-full",
    id: "right",
    innerHTML: `
    ${inventory.outerHTML}
    ${description.outerHTML}
    `,
  });

  const leftPage = createElement({
    className:
      "flex flex-col justify-between items-end w-1/2 border-2 rounded-md m-1 p-3   h-full",
    id: "left",
    innerHTML: `
    ${condition.outerHTML}
    <div class="w-full">
    <img width="150px" height="150px" class="transform translate translate-x-24" src="${imageSrc}" />
    </div>
    <div class="flex justify-between items-center gap-4">
    <div class="font-bold text-xl">XP: ${pokemon.xp}</div>
    <div class="font-bold text-xl">LEVEL: ${pokemon.level}</div>
    </div>
    ${stats.outerHTML}
    ${buttonsDiv.outerHTML}
    `,
  });
  const modal = createElement({
    className:
      "flex justify-between items-center w-2/5 h-3/5 rounded-md border-2 p-3  bg-amber-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
    id: "modal",
    innerHTML: `
    ${leftPage.outerHTML}
    ${rightPage.outerHTML}
    <div id="close-btn" class=" cursor-pointer absolute w-9 h-9 rounded-full bg-amber-300 flex flex-col justify-center items-center font-bold text-white top-0 right-0">X</div>
    `,
  });
  gameRoot.append(modal);
};
export function closeModal() {
  gameState.pause = false;
  removeElement("modal");
}
export const handleModalEvents = () => {
  addEventListener("click", async (e) => {
    if (e.target.id === "close-btn") {
      closeModal();
    }

    if (e.target.id === "level-up-btn") {
      levelUp();
      closeModal();
      openModal();
    }

    if (e.target.id === "heal-btn") {
      heal();
      closeModal();
      openModal();
    }
    if (e.target.id === "charge-btn") {
      charge();
      closeModal();
      openModal();
    }
  });
};
