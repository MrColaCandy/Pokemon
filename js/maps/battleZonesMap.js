import { context } from "../UI/canvas.js";
import { battleZones } from "../data/battleZonesData.js";
import { Collider } from "../models/Collider.js";
import { offset } from "./map.js";
const battleZoneMap = [];
export const battleColliders = [];
for (let i = 0; i < battleZones.length; i += 70) {
  battleZoneMap.push(battleZones.slice(i, i + 70));
}

battleZoneMap.forEach((row, i) => {
  row.forEach((col, j) => {
    if (col != 1025) return;

    const collider = new Collider({
      x: j * Collider.size + offset.x,
      y: i * Collider.size + offset.y,
    });
    battleColliders.push(collider);
  });
});

export const drawBattleZones = () =>
  battleColliders.forEach((c) => {
    c.draw(context);
  });
