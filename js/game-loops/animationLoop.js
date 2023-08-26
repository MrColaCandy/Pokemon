import { gameState } from "../game-state/gameState.js";
import { battleColliders, drawBattleZones } from "../maps/battleZonesMap.js";
import { colliders, drawColliders } from "../maps/collisionMap.js";
import { drawForeground, foregroundSprite } from "../maps/foregroundMap.js";

import { drawMap, mapSprite } from "../maps/mainMap.js";

import { drawPlayer } from "../player/player.js";

import { playerInput } from "../player/playerInput.js";

export const speed = { value: 1 };

export const backgrounds = [
  ...colliders,
  ...battleColliders,
  foregroundSprite,
  mapSprite,
];
export const animate = () => {
  requestAnimationFrame(animate);
  if (gameState.battle || gameState.catch) return;
  drawMap();
  drawColliders();
  drawBattleZones();
  drawPlayer();
  drawForeground();
  backgrounds.forEach((b) => {
    b.position.x -= playerInput.x * speed.value;
    b.position.y += playerInput.y * speed.value;
  });
};
