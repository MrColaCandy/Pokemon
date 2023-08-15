import { colliders, drawColliders } from "./collisionMap.js";
import { drawForeground, foregroundSprite } from "./foreground.js";
import { drawMap, mapSprite } from "./map.js";
import { drawPlayer, playerSprit } from "./player.js";
import { isCollide } from "./playerCollider.js";

import { playerInput } from "./playerInput.js";
export const speed = { value: 1 };

export const animate = () => {
  requestAnimationFrame(animate);
  drawMap();
  drawColliders();
  drawPlayer();

  drawForeground();

  colliders.forEach((c) => {
    c.position.x -= playerInput.x * speed.value;
    c.position.y += playerInput.y * speed.value;
  });

  foregroundSprite.position.x = mapSprite.position.x -=
    playerInput.x * speed.value;
  foregroundSprite.position.y = mapSprite.position.y +=
    playerInput.y * speed.value;
};
