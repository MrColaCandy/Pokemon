import { Sprite } from "../models/Sprite.js";
import { context } from "../canvas.js";
export const foreground = new Image();
foreground.src = "../assets/images/foreground.png";
export const offset = { x: -233, y: -250 };
export const foregroundSprite = new Sprite(
  { x: offset.x, y: offset.y },
  foreground
);
export const drawForeground = () => foregroundSprite.draw(context);
