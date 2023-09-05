import { context } from "../UI/game-ui/canvas.js";
import { danceZoneData } from "../data/danceZoneData.js";
import { Collider } from "../models/Collider.js";
import { offset, rowLength, tileSize } from "./mainMap.js";
const danceZoneMap = [];
export const danceColliders = [];

for (let i = 0; i < danceZoneData.length; i += rowLength) {
  danceZoneMap.push(danceZoneData.slice(i, i + rowLength));
}

danceZoneMap.forEach((row, i) => {
  row.forEach((col, j) => {
    if (col != 33814) return;

    const collider = new Collider({
      x: j * tileSize + offset.x,
      y: i * tileSize + offset.y,
    });

    danceColliders.push(collider);
  });
});

export const drawDanceZones = () =>
  danceColliders.forEach((c) => {
    c.draw(context);
  });
