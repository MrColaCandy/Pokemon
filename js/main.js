import { startAnimationLoop } from "./game-loops/animationLoop.js";
import { startPhysicsLoop } from "./game-loops/physicsLoop.js";
import { handlePokemonListEvents } from "./UI/game-ui/list.js";
import { handleModalEvents } from "./UI/game-ui/modal.js";
import { load, save, setDefaultPokemon } from "./player/playerData.js";
import { handleCatchSceneEvents } from "./pokemons/pokemonsCatch.js";
import { setAvatar } from "./player/playerAvatar.js";
import { checkConnection } from "./game-state/connection.js";
import { handleBattleEvents } from "./scenes/battleScene.js";
import { startAILoop } from "./game-loops/AILoop.js";
import { createStartMenu } from "./UI/start-menu-ui/startMenu.js";
import { createHomeButton } from "./UI/game-ui/home.js";
import { openDanceScene } from "./scenes/danceScene.js";
import { gameState } from "./game-state/gameState.js";

openDanceScene();
// createStartMenu();
// createHomeButton();
// await setDefaultPokemon();

// load();
// checkConnection();

// setAvatar("../assets/images/charAvatar.png");

// // physics loop
// startPhysicsLoop();
// // animations loop
// startAnimationLoop();
// // AI loop
// startAILoop();
// // UI events
// handlePokemonListEvents();
// handleModalEvents();
// handleCatchSceneEvents();
// handleBattleEvents();

// save();
addEventListener("blur", () => {
  gameState.pause = true;
});

addEventListener("focus", () => {
  gameState.pause = false;
});
