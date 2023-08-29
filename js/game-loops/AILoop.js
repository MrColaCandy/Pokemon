import { getEnemyMove } from "../battle/enemy.js";
import { gameState } from "../game-state/gameState.js";
import { isMyTurn } from "../game-state/playerTurn.js";
import { isOnline } from "../game-state/connection.js";
let delay = -1;
export const startAILoop = () => {
  requestAnimationFrame(startAILoop);
  if (gameState.pause) return;
  if (!isOnline) return;
  if (!gameState.battle) {
    delay = -1;

    return;
  }
  if (isMyTurn) {
    return;
  }

  delay++;
  if (delay >= 400) {
    getEnemyMove();
    delay = -1;
  }
};
