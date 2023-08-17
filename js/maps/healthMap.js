import { context } from "../canvas.js";
import { healthAreas } from "../data/healthAreas.js";

import { Item } from "../models/Item.js";
import { offset } from "./map.js";
const healthMap = [];
export const healths = [];
for (let i = 0; i < healthAreas.length; i += 70) {
  healthMap.push(healthAreas.slice(i, i + 70));
}
const image = new Image();
image.src = "../../assets/images/health.png";
healthMap.forEach((row, i) => {
  row.forEach((col, j) => {
    if (col != 1025) return;

    const health = new Item(
      image,
      {
        x: j * 48 + offset.x,
        y: i * 48 + offset.y,
      },
      "health",
      { healing: 15 },
      10
    );
    healths.push(health);
  });
});

export const drawHealths = () =>
  healths.forEach((h) => {
    h.draw(context);
  });
