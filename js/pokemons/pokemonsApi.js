import { showAnimation } from "../UI/lottieAnimations.js";
import { Pokemon } from "../models/Pokemon.js";

const url = new URL("https://pokeapi.co/api/v2/pokemon");
export const getPokemon = async (id) => {
  const { data } = await get(url + "/" + id);
  const pokemon = new Pokemon({ name: data.name });

  pokemon.id = data.id;
  pokemon.level = 1;
  pokemon.frontImage = data.sprites.front_default;
  pokemon.backImage = data.sprites.back_default;
  pokemon.xp = data.base_experience;
  pokemon.hp = data.stats[0].base_stat;
  pokemon.attack = data.stats[1].base_stat;
  pokemon.defense = data.stats[2].base_stat;
  pokemon.specialAttack = data.stats[3].base_stat;
  pokemon.specialDefense = data.stats[4].base_stat;
  pokemon.speed = data.stats[5].base_stat;
  pokemon.maxHealth = pokemon.hp;
  pokemon.currentHealth = pokemon.hp;
  pokemon.maxMona = 100;
  pokemon.currentMona = 100;
  pokemon.type = data.types[0];
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
