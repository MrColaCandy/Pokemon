import { createElement } from "../Utils/elementUtil.js";
import { getCurrentPokemon } from "../pokemons/currentPokemon.js";

export const createPokemonCard = (pokemon) => {
  const src = pokemon.frontImage;
  const card = createElement({
    className:
      "flex flex-col justify-center items-center bg-emerald-300 rounded mb-5",
    id: pokemon.id,
    innerHTML: `
    <div><img data-card="${pokemon.id}" width="96" height="96" src="${src}"/></div>
    <h3>${pokemon.name}</h3>
    <button  data-card="${pokemon.id}" class="bg-amber-400 px-3 py-2 my-2 rounded-md">MORE...</button>
    `,
  });

  if (pokemon.id === getCurrentPokemon().id) card.classList.add("border-4");
  else card.remove("border-4");

  return card;
};
