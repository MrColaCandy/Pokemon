import {
  createElement,
  getElement,
  removeElement,
} from "../Utils/elementUtil.js";
import { playSoundEffect } from "../audio/audioManager.js";

export const createBattleResult = (isWon) => {
  isWon ? playSoundEffect("yeah.mp3") : playSoundEffect("no.mp3");
  const title = createElement({
    elementName: "h3",
    className: "title center",
    id: "battle-result-title",
    innerHTML: isWon ? "YOU WON!" : "YOU LOST!",
  });

  const result = createElement({
    elementName: "div",
    id: "result",
    className: "col-center",
    innerHTML: `
    <div class="center">
    <img src='../../assets/images/hpPotion.png'/>
    <div>health x${isWon ? 10 : 4}</div>
    </div>
    <div class="center">
     <img src='../../assets/images/monaPotion.png'/>
    <div>mona x${isWon ? 10 : 4}</div>
    </div>
    `,
  });
  const footer = createElement({
    elementName: "button",
    className: "btn center",
    id: "battle-result-btn",
    innerHTML: "OK",
  });
  const battleResult = createElement({
    elementName: "div",
    className: "battle-result col-center",
    id: "battle-result",
    innerHTML: `
      ${title.outerHTML}
      ${result.outerHTML}
      <div >${footer.outerHTML}</div>
    `,
  });

  getElement("base").append(battleResult);
};

export const closeBattleResult = () => {
  removeElement("battle-result");
};
