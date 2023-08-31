import { battleColliders, drawBattleZones } from "../maps/battleZonesMap.js";
import { colliders, drawColliders } from "../maps/collisionMap.js";
import { drawForeground, foregroundSprite } from "../maps/foregroundMap.js";
import { drawMap, mapSprite } from "../maps/mainMap.js";
import { drawPlayer, getSpeed } from "../player/player.js";
import { playerInput } from "../player/playerInput.js";
import { isOnline } from "../game-state/connection.js";
import { gameState } from "../game-state/gameState.js";
import { context } from "../UI/game-ui/canvas.js";
export const backgrounds = [
  ...colliders,
  ...battleColliders,
  foregroundSprite,
  mapSprite,
];
export const startAnimationLoop = () => {
  requestAnimationFrame(startAnimationLoop);

  if (gameState.battle || gameState.catch || gameState.pause) return;
  if (!isOnline) return;
  context.beginPath();
  drawMap();
  drawColliders();
  drawBattleZones();
  drawPlayer();
  drawForeground();
  backgrounds.forEach((b) => {
    const speed = getSpeed();
    b.position.x -= playerInput.x * speed;
    b.position.y += playerInput.y * speed;
  });
};
