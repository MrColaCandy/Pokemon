import { colliders } from "./collisionMap.js";
import { playerSprit } from "./player.js";
import { isCollide } from "./playerCollider.js";
import { playerInput } from "./playerInput.js";
import { speed } from "./animation.js";
export const physics = () => {
  requestAnimationFrame(physics);
  speed.value = 1;
  if (playerInput.y > 0) {
    for (let i = 0; i < colliders.length; i++) {
      const collider = colliders[i];
      if (
        isCollide(playerSprit, {
          ...collider,
          position: { ...collider.position, y: collider.position.y + 1 },
        })
      ) {
        speed.value = 0;
        break;
      }
    }
  } else if (playerInput.y < 0) {
    speed.value = 1;
    for (let i = 0; i < colliders.length; i++) {
      const collider = colliders[i];
      if (
        isCollide(playerSprit, {
          ...collider,
          position: { ...collider.position, y: collider.position.y - 1 },
        })
      ) {
        speed.value = 0;
        break;
      }
    }
  } else if (playerInput.x < 0) {
    speed.value = 1;
    for (let i = 0; i < colliders.length; i++) {
      const collider = colliders[i];
      if (
        isCollide(playerSprit, {
          ...collider,
          position: { ...collider.position, x: collider.position.x + 1 },
        })
      ) {
        speed.value = 0;
        break;
      }
    }
  } else if (playerInput.x > 0) {
    speed.value = 1;
    for (let i = 0; i < colliders.length; i++) {
      const collider = colliders[i];
      if (
        isCollide(playerSprit, {
          ...collider,
          position: { ...collider.position, x: collider.position.x - 1 },
        })
      ) {
        speed.value = 0;
        break;
      }
    }
  }
};
