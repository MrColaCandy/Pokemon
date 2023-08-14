import { context } from "./canvas.js";
import { collisions } from "./data/collisions.js";
import { Collider } from "./models/Collider.js";
import { offset } from "./map.js";
const collisionMap = [];
export const colliders = [];
for (let i = 0; i < collisions.length; i += 70) {
  collisionMap.push(collisions.slice(i, i + 70));
}

collisionMap.forEach((row, i) => {
  row.forEach((col, j) => {
    if (col != 1025) return;

    const collider = new Collider({
      x: j * Collider.size + offset.x,
      y: i * Collider.size + offset.y,
    });
    colliders.push(collider);
  });
});

export const drawColliders = () =>
  colliders.forEach((c) => {
    c.draw(context);
  });
