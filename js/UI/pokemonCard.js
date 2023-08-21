import { createBar } from "./bar.js";

export const createPokemonCard = (pokemon) => {
  const image = pokemon.frontImage;
  image.id = pokemon.id;
  image.alt = pokemon.name;
  image.setAttribute("data-card", pokemon.id);

  const cardTitle = `<h6>${pokemon.name}</h6>`;

  function cartBar(name) {
    const bar = `
    <div>${createBar((pokemon[name] / 255) * 60, "10px", 60).outerHTML}
      <div>${name}</div>
    </div>`;

    return bar;
  }
  const card = `
    <div class="card">
    <div class="card-image">
    ${image.outerHTML}
    </div>
    ${cardTitle}
        <div class="stats" >
        ${cartBar("hp")}
        ${cartBar("attack")}
        ${cartBar("defense")}
        </div>
    </div>`;
  return card;
};
