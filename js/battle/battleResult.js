import { gameRoot } from "../UI/gameRoot.js";
import { createElement, removeElement } from "../Utils/elementUtil.js";
import { playSoundEffect } from "../audio/audioManager.js";
import { gameState } from "../game-state/gameState.js";

export const createBattleResult = (isWon) => {
  gameState.pause = true;
  isWon ? playSoundEffect("yeah.mp3") : playSoundEffect("no.mp3");
  const title = createElement({
    elementName: "h3",
    className: "font-bold text-xl text-center mb-5",
    id: "battle-result-title",
    innerHTML: isWon ? "YOU WON!" : "YOU LOST!",
  });

  const result = createElement({
    elementName: "div",
    id: "result",
    className: "flex flex-col justify-center items-center",
    innerHTML: `
    <div class="flex flex-row justify-center items-center">
    <img width="25px" height="25px" src='../../assets/images/hpPotion.png'/>
    <div class="text-white font-bold mt-2">health x${isWon ? 5 : 2}</div>
    </div>
    <div class="flex flex-row justify-center items-center">
     <img width="25px" height="25px"  src='../../assets/images/monaPotion.png'/>
    <div class="text-white font-bold mt-2">mona x${isWon ? 5 : 2}</div>
    </div>
    `,
  });
  const btn = createElement({
    elementName: "button",
    className:
      " bg-amber-600 text-center text-white font-bold py-2 px-3 rounded-md",
    id: "battle-result-btn",
    innerHTML: "OK",
  });
  const battleResult = createElement({
    elementName: "div",
    className:
      "w-96 h-84 flex flex-col justify-center items-center bg-amber-400 border-3 p-5 m-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2",
    id: "battle-result",
    innerHTML: `
      ${title.outerHTML}
      ${result.outerHTML}
      <div class="  flex justify-center items-center  mt-10" >${btn.outerHTML}</div>
    `,
  });

  gameRoot.append(battleResult);
};

export const closeBattleResult = () => {
  gameState.pause = false;
  removeElement("battle-result");
};
