import { battleColliders, drawBattleZones } from "../maps/battleZonesMap.js";
import { colliders, drawColliders } from "../maps/collisionMap.js";
import { drawForeground, foregroundSprite } from "../maps/foregroundMap.js";
import { drawMap, mapSprite } from "../maps/mainMap.js";
import { drawPlayer, getSpeed } from "../player/player.js";
import { playerInput } from "../player/playerInput.js";
import { isOnline } from "../game-state/connection.js";
import { gameState } from "../game-state/gameState.js";

import { danceColliders, drawDanceZones } from "../maps/danceZoneMap.js";
export const backgrounds = [
  ...danceColliders,
  ...colliders,
  ...battleColliders,
  foregroundSprite,
  mapSprite,
];
export const startAnimationLoop = () => {
  requestAnimationFrame(startAnimationLoop);

  if (gameState.pause) return;
  if (!isOnline) return;

  drawMap();
  drawColliders();
  drawBattleZones();
  drawDanceZones();
  drawPlayer();
  drawForeground();
  backgrounds.forEach((b) => {
    const speed = getSpeed();
    b.position.x -= playerInput.x * speed;
    b.position.y += playerInput.y * speed;
  });
};
