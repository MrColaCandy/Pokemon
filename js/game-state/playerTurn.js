import { createBar } from "../UI/game-ui/bar.js";
import { getElement } from "../Utils/elementUtil.js";
import { gameState } from "./gameState.js";
export let isMyTurn = true;
export let turn = 1;
export let start = 250;
let delay = 0;
const max = start;
export const nextTurn = () => {
  const timer = getElement("battle-timer");
  if (!gameState.battle) {
    isMyTurn = true;
    timer.classList.add("my-turn");
    timer.classList.remove("enemy-turn");
    return;
  }

  const attackBtn = getElement("attack-button");
  const defenseBtn = getElement("defense-button");
  const specialBtn = getElement("special-attack-button");

  start = max;
  if (turn % 2 === 0) {
    isMyTurn = true;
    timer.classList.add("my-turn");
    timer.classList.remove("enemy-turn");
    attackBtn.disabled = false;
    defenseBtn.disabled = false;
    specialBtn.disabled = false;
  } else {
    isMyTurn = false;
    timer.classList.add("enemy-turn");
    timer.classList.remove("my-turn");
    attackBtn.disabled = true;
    defenseBtn.disabled = true;
    specialBtn.disabled = true;
  }
  turn++;

  return isMyTurn;
};

export const startTurnTimer = () => {
  const timer = getElement("battle-timer");
  if (!gameState.battle) {
    start = max;
    return;
  }
  requestAnimationFrame(startTurnTimer);

  delay++;
  if (delay % 10 !== 0) return;
  start--;
  if (start <= 0) {
    start = max;
    nextTurn();
  }
  timer.innerHTML = createBar(start, 10, max, "red").outerHTML;
};
