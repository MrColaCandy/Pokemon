import { getEnemyMove } from "../battle/enemy.js";
import { gameState } from "../game-state/gameState.js";
import { isMyTurn } from "../game-state/playerTurn.js";
let delay = -1;
export const AI = () => {
  requestAnimationFrame(AI);
  if (isMyTurn) return;
  if (!gameState.battle) return;
  delay++;
  if (delay >= 300) {
    delay = -1;
    getEnemyMove();
  }
};
