import { Collider } from "./models/Collider.js";
import { getPlayerPosition, getPlayerSize } from "./player.js";

const position = getPlayerPosition();
const size = getPlayerSize();

export const isColliding = (collider) => {
  if (
    position.x + size.w >= collider.position.x &&
    position.x &&
    position.x <= collider.position.x + Collider.size &&
    position.y + size.h >= collider.position.y &&
    position.y <= collider.position.y + Collider.size
  ) {
    console.log("collision");
  }
};
