import {
  createElement,
  getElement,
  removeElement,
} from "../Utils/elementUtil.js";

export const createBattleResult = (isWon) => {
  const title = createElement({
    elementName: "h3",
    className: "title",
    id: "battle-result-title",
    innerHTML: isWon ? "YOU WON!" : "YOU LOST!",
  });

  const result = createElement({
    elementName: "div",
    id: "result",
    className: "col",
    innerHTML: `
    <div class="row">
    <img src='../../assets/images/hpPotion.png'/>
    <div>health x${isWon ? 10 : 4}</div>
    </div>
    <div class="row">
     <img src='../../assets/images/monaPotion.png'/>
    <div>mona x${isWon ? 10 : 4}</div>
    </div>
    `,
  });
  const footer = createElement({
    elementName: "button",
    className: "btn self-center",
    id: "battle-result-btn",
    innerHTML: "OK",
  });
  const battleResult = createElement({
    elementName: "div",
    className: "battle-result center col",
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
