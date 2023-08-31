import { playerData } from "../../player/playerData.js";
import { createPokemonCard } from "./card.js";
import { scroll } from "./scrollDrag.js";
import { canvas } from "./canvas.js";
import { setCurrentPokemon } from "../../pokemons/currentPokemon.js";
import { closeModal, openModal } from "./modal.js";
import { createElement, removeElement } from "../../Utils/elementUtil.js";
import { gameRoot } from "./gameRoot.js";

export const list = createElement({
  elementName: "div",
  id: "list",
  className:
    "w-40 h-full no-scrollbar bg-amber-400 absolute top-0 left-0 p-3 flex-col grow-1 justify-start items-center overflow-y-scroll	",
});
export const pokemonBtn = createElement({
  elementName: "button",
  id: "pokemon-btn",
  className: "w-32 absolute top-2 left-2",
  innerHTML: ` <img src="../../assets/images/pokemonBall.png" />`,
});

gameRoot.append(pokemonBtn);

export const renderPokemonsList = async () => {
  list.innerHTML = "";

  playerData.playerPokemons.forEach((p) => {
    const card = createPokemonCard(p);

    list.append(card);
  });

  gameRoot.append(list);
};
export function closePokemonList() {
  removeElement("list");
}

export const handlePokemonListEvents = () => {
  scroll(list);
  pokemonBtn.addEventListener("click", () => {
    renderPokemonsList();
  });
  canvas.addEventListener("click", (e) => {
    if (e.target.id !== "pokemon-btn" && e.target.id !== "pokemons") {
      closePokemonList();
    }
  });

  window.addEventListener("click", (e) => {
    const data = e.target.dataset.card;
    if (!data) return;
    setCurrentPokemon(playerData.playerPokemons.find((p) => p.id == data));
    if (e.target.nodeName === "IMG") {
      renderPokemonsList();
    }

    if (e.target.nodeName === "BUTTON") {
      closeModal();
      openModal();
    }
  });
};
