// here you can get pokemon and their related information
const pokemons = new Map(JSON.parse(localStorage.getItem("pokemons")));
const url = new URL("https://pokeapi.co/api/v2/pokemon");
url.searchParams.set("limit", "100");
export const getPokemonAll = async () => {
  const { data } = await get(url);
  return data.results;
};

export const getPokemon = async (pokemonName) => {
  let _pokemon = getPokemonFromLocalStorage(pokemonName);
  if (_pokemon) return _pokemon;
  const { data } = await get(url);
  const pokemonUrl = data.results.find((p) => p.name === pokemonName).url;
  const pokemon = await get(pokemonUrl);

  const frontSpritUrl = pokemon.data.sprites.front_default;
  const backSpritUrl = pokemon.data.sprites.back_default;
  const stats = {
    hp: pokemon.data.stats[0].base_stat,
    attack: pokemon.data.stats[1].base_stat,
    defense: pokemon.data.stats[2].base_stat,
    specialAttack: pokemon.data.stats[3].base_stat,
    specialDefense: pokemon.data.stats[4].base_stat,
    speed: pokemon.data.stats[5].base_stat,
  };
  const type = pokemon.data.types[0].type;
  const name = pokemon.data.name;
  const id = pokemon.data.id;
  _pokemon = {
    id,
    name,
    frontSpritUrl,
    backSpritUrl,
    stats,
    type,
  };
  pokemons.set(_pokemon.name, _pokemon);

  localStorage.setItem(
    "pokemons",
    JSON.stringify(Array.from(pokemons.entries()))
  );
  return _pokemon;
};

export const getDamageRelations = async (pokemonName) => {
  const pokemon = await getPokemon(pokemonName);
  const typUrl = pokemon.types[0].type.url;
  const { data } = await get(typUrl);
  console.log(data.damage_relations);
};

async function get(url) {
  try {
    const res = await axios.get(url);
    return res;
  } catch (err) {
    console.log(err);
  }
}

function getPokemonFromLocalStorage(pokemonName) {
  if (pokemons.has(pokemonName)) {
    return pokemons.get(pokemonName);
  }
  return null;
}
