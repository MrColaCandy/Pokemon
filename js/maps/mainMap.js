import { Sprite } from "../models/Sprite.js";
import { context } from "../UI/game-ui/canvas.js";
export const mapImage = new Image();
mapImage.src = "../../assets/images/map.png";
export const rowLength = 250;
export const tileSize = 5;
export const offset = { x: -200, y: -300 };
export const mapSprite = new Sprite({ x: offset.x, y: offset.y }, mapImage);
export const drawMap = () => mapSprite.draw(context);
