import { battleColliders, drawBattleZones } from "./maps/battleZonesMap.js";
import { colliders, drawColliders } from "./maps/collisionMap.js";
import { drawForeground, foregroundSprite } from "./maps/foreground.js";
import { drawHealths, healths } from "./maps/healthMap.js";
import { drawMap, mapSprite } from "./maps/map.js";

import { drawPlayer } from "./player/player.js";

import { playerInput } from "./player/playerInput.js";
export const speed = { value: 1 };

const movables = [
  ...colliders,
  ...battleColliders,
  ...healths,
  foregroundSprite,
  mapSprite,
];
export const animate = () => {
  requestAnimationFrame(animate);
  drawMap();
  drawColliders();
  drawBattleZones();
  drawHealths();
  drawPlayer();
  drawForeground();
  movables.forEach((m) => {
    m.position.x -= playerInput.x * speed.value;
    m.position.y += playerInput.y * speed.value;
  });
};
