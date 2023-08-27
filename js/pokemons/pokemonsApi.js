import { activateNotification } from "../UI/notifications.js";
import { Pokemon } from "../models/Pokemon.js";

const url = new URL("https://pokeapi.co/api/v2/pokemon");
export const getPokemon = async (id) => {
  let response = null;
  try {
    response = await get(url + "/" + id);
  } catch (err) {
    console.log(err);
    activateNotification("Sorry something went wrong!");
    return;
  }

  const pokemon = new Pokemon({ name: response.data.name });

  pokemon.id = response.data.id;
  pokemon.level = 1;
  pokemon.frontImage = response.data.sprites.front_default;
  pokemon.backImage = response.data.sprites.back_default;
  pokemon.xp = response.data.base_experience;
  pokemon.hp = response.data.stats[0].base_stat;
  pokemon.attack = response.data.stats[1].base_stat;
  pokemon.defense = response.data.stats[2].base_stat;
  pokemon.specialAttack = response.data.stats[3].base_stat;
  pokemon.specialDefense = response.data.stats[4].base_stat;
  pokemon.speed = response.data.stats[5].base_stat;
  pokemon.maxHealth = pokemon.hp;
  pokemon.currentHealth = pokemon.hp;
  pokemon.maxMona = 100;
  pokemon.currentMona = 100;
  pokemon.type = response.data.types[0];
  const specie = await get(
    "https://pokeapi.co/api/v2/pokemon-species/" + pokemon.id
  );

  let descriptions = specie.data.flavor_text_entries.filter(
    (f) => f.language.name == "en"
  );
  descriptions = descriptions.map((d) =>
    d.flavor_text.replaceAll("\n", " ").replaceAll("\f", " ")
  );
  pokemon.description = descriptions;
  return pokemon;
};

export async function get(url) {
  try {
    const res = await axios.get(url);
    return res;
  } catch (err) {
    console.log(err);
  }
}
