export const playerInput = { x: 0, y: 0 };

addEventListener("keydown", (e) => {
  if (e.code === "KeyW") {
    playerInput.y = 1;
    playerInput.x = 0;

    return;
  }

  if (e.code === "KeyS") {
    playerInput.y = -1;
    playerInput.x = 0;
    return;
  }

  if (e.code === "KeyD") {
    playerInput.x = 1;
    playerInput.y = 0;
    return;
  }
  if (e.code === "KeyA") {
    playerInput.x = -1;
    playerInput.y = 0;
    return;
  }
});

addEventListener("keyup", (e) => {
  if (e.code === "KeyW" || e.code === "KeyS") {
    playerInput.y = 0;
  }

  if (e.code === "KeyA" || e.code === "KeyD") {
    playerInput.x = 0;
  }
});
