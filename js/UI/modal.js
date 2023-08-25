import { createBar } from "./bar.js";
import { playerData } from "../player/playerData.js";
import { pokemonBtn, pokemonsDiv } from "../UI/pokemonsList.js";
import { levelUp } from "../pokemons/pokemonLevelUp.js";
import { heal } from "../pokemons/pokemonHealing.js";
import { charge } from "../pokemons/pokemonCharging.js";

import { getCurrentPokemon } from "../pokemons/currentPokemon.js";

export const modal = document.getElementById("modal");
const modalBody = modal.querySelector(".modal-body");
const modalHeader = modal.querySelector(".modal-header");
const modalFooter = modal.querySelector(".modal-footer");
export const openModal = () => {
  const pokemon = getCurrentPokemon();
  pokemonBtn.style.display = "block";
  pokemonsDiv.style.display = "none";
  modal.style.display = "flex";
  modalHeader.innerHTML = pokemon.name;
  const image = pokemon.frontImage;

  const itemsData = playerData.items;
  const hp = createBar((pokemon.hp / 255) * 120, "10px", 120);
  const attack = createBar((pokemon.attack / 255) * 120, "10px", 120);
  const defense = createBar((pokemon.defense / 255) * 120, "10px", 120);
  const special_attack = createBar(
    (pokemon.specialAttack / 255) * 120,
    "10px",
    120
  );
  const special_defense = createBar(
    (pokemon.specialDefense / 255) * 120,
    "10px",
    120
  );
  const speed = createBar((pokemon.speed / 255) * 120, "10px", 120);

  const health = createBar(
    (pokemon.currentHealth / pokemon.maxHealth) * 200,
    "10px",
    200,
    "salmon"
  );
  const mona = createBar(
    (pokemon.currentMona / pokemon.maxMona) * 200,
    "10px",
    200,
    "skyblue"
  );

  const levelUpBtn = document.createElement("button");
  levelUpBtn.innerText = "LEVEL UP";
  levelUpBtn.className = "btn";
  levelUpBtn.setAttribute("data-modal", "levelUp");
  const healBtn = document.createElement("button");
  healBtn.innerText = "HEAL";
  healBtn.className = "btn heal";
  healBtn.setAttribute("data-modal", "heal");
  const chargeBtn = document.createElement("button");
  chargeBtn.innerText = "CHARGE";
  chargeBtn.className = "btn charge";
  chargeBtn.setAttribute("data-modal", "charge");

  const monaImg = document.createElement("img");
  monaImg.src = "../assets/images/monaPotion.png";
  const hpImg = document.createElement("img");
  hpImg.src = "../assets/images/hpPotion.png";

  modalBody.innerHTML = `
  
  <div class="current-stats">
    <div class="current">${health.outerHTML}</div>
    <div class="current">${mona.outerHTML}</div>
  </div>
  <div class="avatar">
    ${image.outerHTML}
    <div class="level" >LEVEL: ${pokemon.level}</div>
    <div class="level" >XP: ${pokemon.xp}</div>
  </div>
  <div class="stats">
   <div class="powers">${hp.outerHTML} hp: ${pokemon.hp}</div>
   <div class="powers">${attack.outerHTML} attack: ${pokemon.attack}</div>
   <div class="powers">${defense.outerHTML} defense: ${pokemon.defense}</div>
   <div class="powers">${special_attack.outerHTML} special attack: ${pokemon.specialAttack}</div>
   <div class="powers">${special_defense.outerHTML} special defense : ${pokemon.specialDefense}</div>
   <div class="powers">${speed.outerHTML} speed: ${pokemon.speed}</div>
  </div>
  <div class="resources">
   <h3>Inventory</h3>
   <div class="hp" id="hp" >
     ${hpImg.outerHTML}
     <div>hp x${itemsData.health}</div>
   </div>
   <div class="mona" id="mona">
     ${monaImg.outerHTML}
     <div>mona x${itemsData.mona}</div>
   </div>
  </div>
  <div class="modal-description">
    <h3>Description</h3>
    <p>${pokemon.description[0]}</p>
 
  </div> 
   <div data-modal="close" class="close-btn col" >X<div>    
  `;

  modalFooter.innerHTML = `
  ${levelUpBtn.outerHTML}
  ${healBtn.outerHTML}
  ${chargeBtn.outerHTML}
  `;
};
export function closeModal() {
  modal.style.display = "none";
}
export const handleModalEvents = () => {
  addEventListener("click", async (e) => {
    if (e.target.dataset.modal === "close") {
      closeModal();
    }

    if (e.target.dataset.modal === "levelUp") {
      levelUp();
      openModal();
    }

    if (e.target.dataset.modal === "heal") {
      heal();
      openModal();
    }
    if (e.target.dataset.modal === "charge") {
      charge();
      openModal();
    }
  });
};
