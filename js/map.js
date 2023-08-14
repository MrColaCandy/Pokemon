import { Sprite } from "./models/Sprite.js";
import { playerInput } from "./player.js";
export const mapImage = new Image();
mapImage.src = "../assets/images/map.png";
export const mapSprite = new Sprite({ x: 5, y: -50 }, mapImage);
