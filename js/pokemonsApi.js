// here you can get pokemon and their related information

const url = new URL("https://pokeapi.co/api/v2/pokemon");
url.searchParams.set("limit", "100");
export const getPokemonAll = async () => {
  const { data } = await get(url);
  return data.results;
};

export const getPokemon = async (pokemonName) => {
  const { data } = await get(url);
  const pokemonUrl = data.results.find((p) => p.name === pokemonName).url;
  const pokemon = await get(pokemonUrl);
  console.log(pokemon.data);
  return pokemon.data;
};

export const getDamageRelations = async (pokemonName) => {
  const pokemon = await getPokemon(pokemonName);
  const typUrl = pokemon.types[0].type.url;
  const { data } = await get(typUrl);
  console.log(data.damage_relations);
};
// gets pokemon characteristics like hp, attack, defense and ....
export const getStats = async (pokemonName) => {
  const pokemon = await getPokemon(pokemonName);
  console.log(pokemon.stats);
};
async function get(url) {
  try {
    const res = await axios.get(url);
    return res;
  } catch (err) {
    console.log(err);
  }
}
