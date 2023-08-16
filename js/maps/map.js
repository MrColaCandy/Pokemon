import { Sprite } from "../models/Sprite.js";
import { context } from "../canvas.js";
export const mapImage = new Image();
mapImage.src = "../assets/images/map.png";
export const offset = { x: -233, y: -250 };
export const mapSprite = new Sprite({ x: offset.x, y: offset.y }, mapImage);
export const drawMap = () => mapSprite.draw(context);
