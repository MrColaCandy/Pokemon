import { Sprite } from "../models/Sprite.js";
import { context } from "../UI/game-ui/canvas.js";
export const foreground = new Image();
foreground.src = "../assets/images/foreground.png";
import { offset } from "./mainMap.js";
export const foregroundSprite = new Sprite(
  { x: offset.x, y: offset.y },
  foreground
);
export const drawForeground = () => foregroundSprite.draw(context);
