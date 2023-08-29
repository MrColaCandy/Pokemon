import { Sprite } from "../models/Sprite.js";
import { context } from "../UI/canvas.js";
export const mapImage = new Image();
mapImage.src = "../../assets/images/map.webp";
export const rowLength = 23;
export const tileSize = 352;
export const offset = { x: -1600, y: -1600 };
export const mapSprite = new Sprite({ x: offset.x, y: offset.y }, mapImage);
export const drawMap = () => mapSprite.draw(context);
