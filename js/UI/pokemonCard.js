import { createElement } from "../Utils/elementUtil.js";
import { getCurrentPokemon } from "../pokemons/currentPokemon.js";

export const createPokemonCard = (pokemon) => {
  const src = pokemon.frontImage;
  const card = createElement({
    className: "card col-center",
    id: pokemon.id,
    innerHTML: `
    <div data-card="${pokemon.id}"><img src="${src}"/></div>
    <h3>${pokemon.name}</h3>
    <button  data-card="${pokemon.id}" class="btn btn-small">SELECT</button>
    `,
  });

  if (pokemon.id === getCurrentPokemon().id) card.classList.add("selected");
  else card.remove("selected");

  return card;
};
