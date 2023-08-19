import { colliders } from "./maps/collisionMap.js";
import { playerSprit } from "./player/player.js";
import { isCollide } from "./player/playerCollider.js";
import { playerInput } from "./player/playerInput.js";
import { speed } from "./animation.js";
import { battleColliders } from "./maps/battleZonesMap.js";
import { findPokemon } from "./pokemonsCatch.js";
import { gameState } from "./gameState.js";

export const physics = () => {
  requestAnimationFrame(physics);
  if (gameState.battle || gameState.catch) return;
  findPokemon();
  // detecting battle zones
  if (playerInput.x !== 0 || playerInput.y !== 0) {
    for (let i = 0; i < battleColliders.length; i++) {
      const collider = battleColliders[i];
      if (isCollide(playerSprit, collider)) {
        if (Math.random() < 0.01) {
          console.log("in battle zone");
        }
        break;
      }
    }
  }

  // detecting colliders
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
