import { drawPlayer, playerImage } from "./player.js";
import { mapSprite } from "./map.js";
import { canvas, context } from "./canvas.js";
import { mapImage } from "./map.js";
import { animate } from "./animation.js";

mapImage.onload = () => {
  mapSprite.draw(context);
  drawPlayer();
};

animate();
