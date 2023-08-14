import { context } from "./canvas.js";
import { mapSprite } from "./map.js";
import { drawPlayer, playerInput } from "./player.js";

export const animate = () => {
  requestAnimationFrame(animate);
  mapSprite.draw(context);
  drawPlayer();

  mapSprite.position.y += playerInput.y;
  mapSprite.position.x -= playerInput.x;
};
