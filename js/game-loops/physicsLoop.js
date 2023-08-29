import { colliders } from "../maps/collisionMap.js";
import { playerSprit, setSpeed } from "../player/player.js";
import { isCollide } from "../player/playerCollider.js";
import { playerInput } from "../player/playerInput.js";
import { battleColliders } from "../maps/battleZonesMap.js";
import { findPokemon } from "../pokemons/pokemonsCatch.js";
import { gameState } from "../game-state/gameState.js";
import { isOnline } from "../game-state/connection.js";
import { openBattleScene } from "../scenes/battleScene.js";

export const startPhysicsLoop = () => {
  requestAnimationFrame(startPhysicsLoop);

  if (gameState.battle || gameState.catch || gameState.pause) return;
  if (!isOnline) return;
  findPokemon();
  // detecting battle zones
  if (playerInput.x !== 0 || playerInput.y !== 0) {
    for (let i = 0; i < battleColliders.length; i++) {
      const collider = battleColliders[i];
      if (isCollide(playerSprit, collider)) {
        if (Math.random() < 0.008) {
          openBattleScene();
        }
        break;
      }
    }
  }

  // detecting colliders
  setSpeed(3);
  if (playerInput.y > 0) {
    for (let i = 0; i < colliders.length; i++) {
      const collider = colliders[i];
      if (
        isCollide(playerSprit, {
          ...collider,
          position: { ...collider.position, y: collider.position.y + 3 },
        })
      ) {
        setSpeed(0);
        break;
      }
    }
  } else if (playerInput.y < 0) {
    for (let i = 0; i < colliders.length; i++) {
      const collider = colliders[i];
      if (
        isCollide(playerSprit, {
          ...collider,
          position: { ...collider.position, y: collider.position.y - 3 },
        })
      ) {
        setSpeed(0);
        break;
      }
    }
  } else if (playerInput.x < 0) {
    for (let i = 0; i < colliders.length; i++) {
      const collider = colliders[i];
      if (
        isCollide(playerSprit, {
          ...collider,
          position: { ...collider.position, x: collider.position.x + 3 },
        })
      ) {
        setSpeed(0);
        break;
      }
    }
  } else if (playerInput.x > 0) {
    for (let i = 0; i < colliders.length; i++) {
      const collider = colliders[i];
      if (
        isCollide(playerSprit, {
          ...collider,
          position: { ...collider.position, x: collider.position.x - 3 },
        })
      ) {
        setSpeed(0);
        break;
      }
    }
  }
};
