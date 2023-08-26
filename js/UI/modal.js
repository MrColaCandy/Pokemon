import { playerData } from "../player/playerData.js";
import { pokemonBtn, pokemonsDiv } from "../UI/pokemonsList.js";
import { levelUp } from "../pokemons/pokemonLevelUp.js";
import { heal } from "../pokemons/pokemonHealing.js";
import { charge } from "../pokemons/pokemonCharging.js";

import { getCurrentPokemon } from "../pokemons/currentPokemon.js";
import {
  createElement,
  getElement,
  removeElement,
} from "../Utils/elementUtil.js";
import { getStatBar } from "../pokemons/PokemonStats.js";
import { createBar } from "./bar.js";

export const openModal = () => {
  pokemonBtn.style.display = "none";
  const pokemon = getCurrentPokemon();
  const itemsData = playerData.items;
  const buttonsDiv = createElement({
    className: "buttons-div between",
    id: "buttons-div",
    innerHTML: `
    ${
      createElement({
        className: "btn",
        id: "level-up-btn",
        innerHTML: "LEVEL UP",
      }).outerHTML
    }
    ${
      createElement({
        className: "btn",
        id: "heal-btn",
        innerHTML: "HEAL",
      }).outerHTML
    }
    ${
      createElement({
        className: "btn",
        id: "charge-btn",
        innerHTML: "CHARGE",
      }).outerHTML
    }`,
  });

  const condition = createElement({
    className: "condition col",
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
    className: "stats col",
    id: "stats",
    innerHTML: `
   <div class="between">
   ${getStatBar({ stat: "hp" }).outerHTML} <div>hp: ${pokemon.hp}</div>
   </div>
   <div class="between">
   ${getStatBar({ stat: "attack" }).outerHTML} attack: ${pokemon.attack}
    </div>
   <div class="between">
   ${getStatBar({ stat: "defense" }).outerHTML} defense: ${pokemon.defense}
    </div>
   <div class="between">
   ${getStatBar({ stat: "specialAttack" }).outerHTML} special attack: ${
      pokemon.specialAttack
    }
    </div>
   <div class="between">${
     getStatBar({ stat: "specialDefense" }).outerHTML
   } special defense : ${pokemon.specialDefense}
   </div>
   <div class="between">${getStatBar({ stat: "speed" }).outerHTML} speed: ${
      pokemon.speed
    }
    </div>
    `,
  });

  const monaImg = document.createElement("img");
  monaImg.src = "../assets/images/monaPotion.png";
  const healthImg = document.createElement("img");
  healthImg.src = "../assets/images/hpPotion.png";
  const inventory = createElement({
    className: "inventory",
    id: "inventory",
    innerHTML: `
    <h3>Inventory</h3>
    <div class="between">
       ${healthImg.outerHTML}
       <div>hp  x${itemsData.health}</div>
    </div>
    <div class="between">
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
    <h3>Description</h3>
    <p>${pokemon.description[0]}</p>
  
    `,
  });
  const rightPage = createElement({
    className: "right-page",
    id: "right",
    innerHTML: `
    ${inventory.outerHTML}
    ${description.outerHTML}
    `,
  });

  const leftPage = createElement({
    className: "left-page",
    id: "left",
    innerHTML: `
    ${condition.outerHTML}
    <div class="col pokemon-image">
    <img src="${imageSrc}" />
    </div>
    <div class="col level-info">
    <div>XP: ${pokemon.xp}</div>
    <div>LEVEL: ${pokemon.level}</div>
    </div>
    ${stats.outerHTML}
    ${buttonsDiv.outerHTML}
    `,
  });
  const modal = createElement({
    className: "modal between",
    id: "modal",
    innerHTML: `
    ${leftPage.outerHTML}
    ${rightPage.outerHTML}
    <div id="close-btn" class="close-btn">X</div>
    `,
  });
  getElement("base").append(modal);
};
export function closeModal() {
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
