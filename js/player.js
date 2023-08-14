import { Sprite } from "./models/Sprite.js";
import { canvas, context } from "./canvas.js";
export const playerImage = new Image();
playerImage.src = "../assets/images/playerDown.png";

export const playerInput = { x: 0, y: 0 };

export const drawPlayer = () =>
  context.drawImage(
    playerImage,
    0,
    0,
    playerImage.width / 4,
    playerImage.height,
    canvas.width / 2 - playerImage.width / 4 / 2,
    canvas.height / 2 - playerImage.height / 2,
    playerImage.width / 4,
    playerImage.height
  );
addEventListener("keydown", (e) => {
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
  if (e.key === "w") {
    playerInput.y = 0;

    return;
  }

  if (e.key === "s") {
    playerInput.y = 0;

    return;
  }

  if (e.key === "d") {
    playerInput.x = 0;

    return;
  }
  if (e.key === "a") {
    playerInput.x = 0;

    return;
  }
});

export const getPlayerPosition = () => {
  return {
    x: canvas.width / 2 - playerImage.width / 4 / 2,
    y: canvas.height / 2 - playerImage.height / 2,
  };
};

export const getPlayerSize = () => {
  return {
    w: playerImage.width / 4,
    h: playerImage.height,
  };
};
