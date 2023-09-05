import { context } from "../UI/game-ui/canvas.js";
import { battleZones } from "../data/battleZonesData.js";
import { Collider } from "../models/Collider.js";
import { offset, rowLength, tileSize } from "./mainMap.js";
const battleZoneMap = [];
export const battleColliders = [];

for (let i = 0; i < battleZones.length; i += rowLength) {
  battleZoneMap.push(battleZones.slice(i, i + rowLength));
}

battleZoneMap.forEach((row, i) => {
  row.forEach((col, j) => {
    if (col != 33814) return;

    const collider = new Collider({
      x: j * tileSize + offset.x,
      y: i * tileSize + offset.y,
    });
    battleColliders.push(collider);
  });
});

export const drawBattleZones = () =>
  battleColliders.forEach((c) => {
    c.draw(context);
  });
