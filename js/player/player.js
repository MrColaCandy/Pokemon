import { canvas, context } from "../UI/canvas.js";
import { Sprite } from "../models/Sprite.js";
import { playerInput } from "./playerInput.js";

export const playerImageDown = new Image();
playerImageDown.src = "../assets/images/playerDown.png";
export const playerImageUp = new Image();
playerImageUp.src = "../assets/images/playerUp.png";
export const playerImageLeft = new Image();
playerImageLeft.src = "../assets/images/playerLeft.png";
export const playerImageRight = new Image();
playerImageRight.src = "../assets/images/playerRight.png";

let speed = 3;
let frame = 0;
let maxFrames = 1;
let timer = 0;

export const setSpeed = (value) => {
  speed = value;
};
export const getSpeed = () => {
  return speed;
};
export const playerSprit = new Sprite(
  {
    x: canvas.width / 2 - playerImageDown.width / 4 / 2,
    y: canvas.height / 2 - playerImageDown.height / 2,
  },
  playerImageDown
);

export const drawPlayer = () => {
  if (playerInput.y !== 0 || playerInput.x !== 0) {
    timer++;
    if (timer % 20 === 0) {
      if (frame < maxFrames) frame++;
      else frame = 0;
    }
  }

  if (playerInput.y < 0) {
    playerSprit.image = playerImageDown;
  } else if (playerInput.y > 0) {
    playerSprit.image = playerImageUp;
  } else if (playerInput.x > 0) {
    playerSprit.image = playerImageRight;
  } else if (playerInput.x < 0) {
    playerSprit.image = playerImageLeft;
  }
  playerSprit.draw(context, frame * (playerImageDown.width / 2), 2);
};
