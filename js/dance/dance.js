import { showAnimation } from "../UI/game-ui/lottieAnimations.js";
import { createElement, getElement } from "../Utils/elementUtil.js";
import { playAudio } from "../audio/audioManager.js";
import { closeDanceScene, showWrong } from "../scenes/danceScene.js";
import { gameState } from "../game-state/gameState.js";

let health = 3;

export const getCurrentRow = () => {
  return currentRow;
};

export const getHealth = () => {
  return health;
};

export const decreaseHealth = () => {
  if (health === 1) {
    gameOver();
  }
  if (health > 0) {
    const healthDiv = getElement("dance-health");
    if (!healthDiv) return;
    health--;
    healthDiv.innerHTML = `HEALTH: ${health} ❤`;
  }
};
export const setHealth = (value) => {
  health = value;
  getElement("dance-health").innerHTML = `HEALTH: ${health} ❤`;
};
export const createDanceBoard = () => {
  const board = createElement({
    elementName: "div",
    id: "dance-board",
    className:
      " bg-black overflow-hidden opacity-80 z-50 w-1/4 h-full left-1/2   absolute  top-0 bottom-0 transform -translate-x-1/2 ",
    innerHTML: `
    <img id="board-arrows" class="w-3/4 mx-auto mt-5" src="../../assets/images/arrows/allArrows.png"/>
    <div id="new-row"></div>
    `,
  });

  return board;
};

export const createRow = (direction = "KeyW") => {
  let position = 0;
  const row = createElement({
    id: "false",
    elementName: "img",
    className:
      "w-3/4 absolute  left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out",
  });

  row.setAttribute("data-direction", direction);
  row.src = `../../assets/images/arrows/${direction}.png`;

  let rowTimeOut;
  function moveRow() {
    if (!gameState.dance) return;

    row.style.bottom = `${position}%`;
    position++;
    if (row.style.bottom == "102%") {
      if (row.id === "false") {
        decreaseHealth();
        showWrong();
      }
      row.remove();
      clearTimeout(rowTimeOut);
    }
    rowTimeOut = setTimeout(() => {
      moveRow();
    }, 100);
  }
  moveRow();

  return row;
};
export const gameOver = () => {
  closeDanceScene();
  showAnimation("../../assets/animations/failed.json", "dance-failed");
  playAudio("omg", false);
};
