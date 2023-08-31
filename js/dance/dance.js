import { createElement, removeElement } from "../Utils/elementUtil.js";
import { gameState } from "../game-state/gameState.js";
import { showWrong } from "../scenes/danceScene.js";
let currentRow = { direction: "", position: "", pass: false };
export const getCurrentRow = () => {
  return currentRow;
};
export const createDanceBoard = () => {
  const board = createElement({
    elementName: "div",
    id: "dance-board",
    className:
      " bg-black overflow-hidden opacity-80 z-50 w-1/4 h-full  absolute  top-0 bottom-0 ",
    innerHTML: `
    <img id="board-arrows" class="w-3/4 mx-auto mt-5" src="../../assets/images/arrows/allArrows.png"/>
    <div id="new-row"></div>
    `,
  });

  return board;
};

export const createRow = (direction = "up") => {
  if (gameState.pause) return;
  let position = 1;
  const row = createElement({
    id: position,
    elementName: "img",
    className:
      "w-3/4 absolute  left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out",
  });

  row.src = `../../assets/images/arrows/${direction}.png`;
  row.style.bottom = `${position}%`;

  setInterval(() => {
    if (gameState.pause) return;
    row.id = position;
    if (row.style.bottom == "95%") {
      row.style.filter = `
      blur(5px) brightness(200%) saturate(200%)
      `;
      currentRow.direction = direction;
      currentRow.position = `${position}%`;
      setTimeout(() => {
        currentRow.position = 0;
        if (!currentRow.pass) {
          showWrong();
        }
      }, 300);
    }
    if (row.style.bottom == "100%") {
      removeElement(position - 1);
      return;
    }
    position += 1;

    row.style.bottom = `${position}%`;
  }, 100);

  return row;
};
