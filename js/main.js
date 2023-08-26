import { animate } from "./game-loops/animationLoop.js";
import { physics } from "./game-loops/physicsLoop.js";
import { handlePokemonListEvents } from "./UI/pokemonsList.js";
import { handleModalEvents } from "./UI/modal.js";
import { load, save, setDefaultPokemon } from "./player/playerData.js";
import { handleCatchSceneEvents } from "./pokemons/pokemonsCatch.js";
import { setAvatar } from "./player/playerAvatar.js";
import { checkConnection } from "./game-state/connection.js";
import { handleBattleEvents } from "./scenes/battleScene.js";
import { AI } from "./game-loops/AILoop.js";

await setDefaultPokemon();

load();
checkConnection();

setAvatar("../assets/images/charAvatar.png");

// physics loop
physics();
// animations loop
animate();
// AI loop
AI();
// UI events
handlePokemonListEvents();
handleModalEvents();
handleCatchSceneEvents();
handleBattleEvents();

// managing player progress
save();
