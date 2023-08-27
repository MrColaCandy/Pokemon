import { getEnemyMove } from "../battle/enemy.js";
import { gameState } from "../game-state/gameState.js";
import { isMyTurn } from "../game-state/playerTurn.js";

let delay = -1;
export const AI = () => {
  requestAnimationFrame(AI);
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
