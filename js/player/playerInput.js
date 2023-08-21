import { gameState } from "../game-state/gameState.js";

export const playerInput = { x: 0, y: 0 };

addEventListener("keydown", (e) => {
  if (gameState.battle || gameState.catch) return;
  if (e.key === "w") {
    playerInput.y = 1;
    playerInput.x = 0;

    return;
  }

  if (e.key === "s") {
    playerInput.y = -1;
    playerInput.x = 0;
    return;
  }

  if (e.key === "d") {
    playerInput.x = 1;
    playerInput.y = 0;
    return;
  }
  if (e.key === "a") {
    playerInput.x = -1;
    playerInput.y = 0;
    return;
  }
});

addEventListener("keyup", (e) => {
  if (e.key === "w" || e.key === "s") {
    playerInput.y = 0;
  }

  if (e.key === "a" || e.key === "d") {
    playerInput.x = 0;
  }
});
