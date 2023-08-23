import { createBar } from "../UI/bar.js";
import { getElement } from "../Utils/elementUtil.js";
import { gameState } from "./gameState.js";
export let isMyTurn = true;
export let turn = 1;
export let start = 250;
let delay = 0;
const max = start;
export const nextTurn = () => {
  if (!gameState.battle) {
    isMyTurn = true;
    return;
  }
  start = max;
  if (turn % 2 === 0) {
    isMyTurn = true;
    getElement("battle-timer").classList.add("my-turn");
    getElement("battle-timer").classList.remove("enemy-turn");
  } else {
    isMyTurn = false;
    getElement("battle-timer").classList.add("enemy-turn");
    getElement("battle-timer").classList.remove("my-turn");
  }
  turn++;

  return isMyTurn;
};

export const startTurnTimer = () => {
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
  getElement("battle-timer").innerHTML = createBar(
    start,
    "5px",
    max,
    "red"
  ).outerHTML;
};
