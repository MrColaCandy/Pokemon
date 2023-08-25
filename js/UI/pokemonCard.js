import { getCurrentPokemon } from "../pokemons/currentPokemon.js";

export const createPokemonCard = (pokemon) => {
  const image = pokemon.frontImage;
  image.id = pokemon.id;
  image.alt = pokemon.name;
  image.setAttribute("data-card", pokemon.id);

  const cardTitle = `<h6 class="self-center">${pokemon.name}</h6>`;

  const card = `
    <div class="card ${pokemon.id == getCurrentPokemon().id ? "selected" : ""}">
    <div class="card-image">
    ${image.outerHTML}
    </div >
       ${cardTitle}
      <div id="select" data-card="${
        pokemon.id
      }" class="btn btn-small self-center">
       SELECT
      </div>
    </div>`;
  return card;
};
