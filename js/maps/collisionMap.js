import { context } from "../UI/game-ui/canvas.js";
import { collisions } from "../data/collisionsData.js";
import { Collider } from "../models/Collider.js";
import { offset, rowLength, tileSize } from "./mainMap.js";
const collisionMap = [];
export const colliders = [];

for (let i = 0; i < collisions.length; i += rowLength) {
  collisionMap.push(collisions.slice(i, i + rowLength));
}

collisionMap.forEach((row, i) => {
  row.forEach((col, j) => {
    if (col != 33814) return;

    const collider = new Collider({
      x: j * tileSize + offset.x,
      y: i * tileSize + offset.y,
    });
    colliders.push(collider);
  });
});

export const drawColliders = () =>
  colliders.forEach((c) => {
    c.draw(context);
  });
