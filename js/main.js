import { animate } from "./game-loops/animationLoop.js";
import { physics } from "./game-loops/physicsLoop.js";
import { handlePokemonListEvents } from "./UI/pokemonsList.js";
import { handleModalEvents } from "./UI/modal.js";
import { addPikachu } from "./player/playerData.js";
import { handleCatchSceneEvents } from "./pokemons/pokemonsCatch.js";
import { setAvatar } from "./player/playerAvatar.js";
import { checkConnection } from "./game-state/connection.js";

checkConnection();

setAvatar("../assets/images/charAvatar.png");

await addPikachu();

// physics loop
physics();
// animations loop
animate();

// UI events

handlePokemonListEvents();
handleModalEvents();
handleCatchSceneEvents();
