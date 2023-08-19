import { createBar } from "./bar.js";
import { playerData } from "./player/playerData.js";
import { pokemonBtn, pokemonsDiv } from "./pokemons.js";

export const modal = document.getElementById("modal");
const modalBody = modal.querySelector(".modal-body");
const modalHeader = modal.querySelector(".modal-header");
const modalFooter = modal.querySelector(".modal-footer");
export const openModal = (pokemon) => {
  pokemonBtn.style.display = "block";
  pokemonsDiv.style.display = "none";
  modal.style.display = "flex";
  modalHeader.innerHTML = pokemon.name;
  const image = document.createElement("img");
  image.src = pokemon.frontSpritUrl;
  console.log(pokemon.frontSpritUrl);
  const pokemonData = playerData.playerPokemons.find(
    (p) => p.id === pokemon.id
  );
  const itemsData = playerData.items;
  const hp = createBar(
    (pokemonData.stats.hp / 255) * 150,
    "10px",
    "orangered",
    150
  );
  const attack = createBar(
    (pokemonData.stats.attack / 255) * 150,
    "10px",
    "orangered",
    150
  );
  const defense = createBar(
    (pokemonData.stats.defense / 255) * 150,
    "10px",
    "orangered",
    150
  );
  const special_attack = createBar(
    (pokemonData.stats.specialAttack / 255) * 150,
    "10px",
    "orangered",
    150
  );
  const special_defense = createBar(
    (pokemonData.stats.specialDefense / 255) * 150,
    "10px",
    "orangered",
    150
  );
  const speed = createBar(
    (pokemonData.stats.speed / 255) * 150,
    "10px",
    "orangered",
    150
  );

  const health = createBar(
    (pokemonData.health / pokemonData.maxHealth) * 300,
    "10px",
    "seagreen",
    300
  );
  const mona = createBar(
    (pokemonData.mona / pokemonData.maxMona) * 300,
    "10px",
    "blue",
    300
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
  
  <div class="stats">
    <div class="current">${health.outerHTML}</div>
    <div class="current">${mona.outerHTML}</div>
  </div>
  <div class="avatar">
    ${image.outerHTML}
    <div class="level" >level: ${pokemonData.level}</div>
  </div>
  <div class="powers">${hp.outerHTML} hp: ${pokemonData.stats.hp}</div>
  <div class="powers">${attack.outerHTML} attack: ${pokemonData.stats.attack}</div>
  <div class="powers">${defense.outerHTML} defense: ${pokemonData.stats.defense}</div>
  <div class="powers">${special_attack.outerHTML} special attack: ${pokemonData.stats.specialAttack}</div>
  <div class="powers">${special_defense.outerHTML} special defense : ${pokemonData.stats.specialDefense}</div>
  <div class="powers">${speed.outerHTML} speed: ${pokemonData.stats.speed}</div>
  <div class="resources">
   <div class="xp" id="xp">
    <div>Xp: </div>
    <div>${pokemonData.xp} </div>
   </div>
   <div class="hp" id="hp" >
    ${hpImg.outerHTML}
    <div>hp x${itemsData.health}</div>
   </div>
   <div class="mona" id="mona">
   ${monaImg.outerHTML}
    <div>mona x${itemsData.mona}</div>
   </div>
   </div> 
   <div data-modal="close" class="close-btn" >X<div>    
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
