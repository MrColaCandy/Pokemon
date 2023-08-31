import { createElement, getElement } from "../../Utils/elementUtil.js";
import { gameState } from "../../game-state/gameState.js";
import { gameRoot } from "./gameRoot.js";

export const createHomeButton = () => {
  const btn = createElement({
    elementName: "button",
    id: "home-btn",
    className:
      "absolute top-10 right-10 bg-amber-400 py-2 px-4 rounded-md border-4 text-xl text-white font-bold",
    innerHTML: "HOME",
  });
  gameRoot.append(btn);
  addEventListener("click", (e) => {
    if (e.target.id === "home-btn") {
      gameState.pause = true;
      getElement("start-menu").style.display = "block";
    }
  });
};
