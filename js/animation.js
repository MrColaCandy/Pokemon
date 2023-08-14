import { colliders, drawColliders } from "./collisionMap.js";
import { drawMap, mapSprite } from "./map.js";
import { drawPlayer, playerInput } from "./player.js";
import { isColliding } from "./playerCollider.js";

export const animate = () => {
  requestAnimationFrame(animate);
  drawMap();
  drawColliders();
  drawPlayer();
  colliders.forEach((c) => {
    c.position.x -= playerInput.x;
    c.position.y += playerInput.y;
    isColliding(c);
  });
  mapSprite.position.y += playerInput.y;
  mapSprite.position.x -= playerInput.x;
};
