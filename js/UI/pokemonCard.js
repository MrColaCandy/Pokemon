import { createBar } from "./bar.js";

export const createPokemonCard = (pokemon) => {
  console.log(pokemon.front);
  const image = document.createElement("img");
  image.src = pokemon.front;
  image.id = pokemon.id;
  image.alt = pokemon.name;
  image.setAttribute("data-pokemon", pokemon.name);

  const cardTitle = `<h6>${pokemon.name}</h6>`;

  function cardStat(name) {
    const stat = `
    <div>${
      createBar((pokemon.stats[name] / 255) * 60, "10px", "orangered", 60)
        .outerHTML
    }
      <div>${name}</div>
    </div>`;

    return stat;
  }
  const card = `
    <div class="card">
    <div class="card-image">
    ${image.outerHTML}
    </div>
    ${cardTitle}
        <div class="stats" >
        ${cardStat("hp")}
        ${cardStat("attack")}
        ${cardStat("defense")}
        </div>
    </div>`;
  return card;
};
