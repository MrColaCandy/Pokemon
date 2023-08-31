import { gameRoot } from "../UI/game-ui/gameRoot.js";
import { createElement, getElement } from "../Utils/elementUtil.js";
import { createDanceBoard, createRow, getCurrentRow } from "../dance/dance.js";
import { gameState } from "../game-state/gameState.js";
let score = 0;
let interval = 3000;
export const openDanceScene = () => {
  if (gameState.pause) return;
  const dancer = createElement({
    elementName: "img",
    className: "w-96 h-96 absolute right-0 bottom-10",
  });
  dancer.src = "../../assets/animations/dance/1.gif";

  const board = createDanceBoard();

  const danceScene = createElement({
    elementName: "div",
    className: "dance-scene absolute top-0 bottom-0 left-0 right-0",
    innerHTML: `
      ${dancer.outerHTML}
      ${board.outerHTML}
      
    `,
  });
  const directions = ["up", "down", "left", "right"];
  gameRoot.append(danceScene);
  setInterval(() => {
    const newRow = getElement("new-row");
    if (gameState.pause) {
      newRow.innerHTML = "";
      return;
    }
    newRow.append(createRow(directions[Math.floor(Math.random() * 5)]));
  }, interval);
};

addEventListener("keyup", (e) => {
  const currentRow = getCurrentRow();
  if (e.code == "KeyW") {
    getKey(currentRow, "up");
  }
  if (e.code == "KeyS") {
    getKey(currentRow, "down");
  }
  if (e.code == "KeyD") {
    getKey(currentRow, "right");
  }
  if (e.code == "KeyA") {
    getKey(currentRow, "left");
  }
});
function getKey(currentRow, direction) {
  if (currentRow.position === "95%") {
    currentRow.position = 0;
    if (currentRow.direction === direction) {
      const arrows = getElement("board-arrows");
      arrows.style.filter = `brightness(200%) contrast(200%) hue-rotate(218deg) saturate(200%)`;
      currentRow.pass = true;
      setTimeout(() => {
        arrows.style.filter = `brightness(100%) contrast(100%) hue-rotate(0deg) saturate(100%)`;
      }, 100);
      setTimeout(() => {
        arrows.style.filter = `brightness(200%) contrast(200%) hue-rotate(218deg) saturate(200%)`;
      }, 200);
      setTimeout(() => {
        arrows.style.filter = `brightness(100%) contrast(100%) hue-rotate(0deg) saturate(100%)`;
        currentRow.pass = false;
      }, 400);
      score++;
      if (score % 5 === 0 && interval > 600) {
        interval -= 500;
      }
      return;
    }
  }

  showWrong();
}
export function showWrong() {
  score = 0;
  const gameBoard = getElement("dance-board");
  gameBoard.style.backgroundColor = "orangered";
  setTimeout(() => {
    gameBoard.style.backgroundColor = "black";
  }, 100);
  setTimeout(() => {
    gameBoard.style.backgroundColor = "orangered";
  }, 200);
  setTimeout(() => {
    gameBoard.style.backgroundColor = "black";
  }, 400);
}
