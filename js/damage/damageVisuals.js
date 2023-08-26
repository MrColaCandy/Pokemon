import { createElement, removeElement } from "../Utils/elementUtil.js";

export const createAttackAnimation = (attackType, id) => {
  const animation = new Image();
  if (attackType === "special") {
    animation.src = `../../assets/animations/slashes/special-${
      Math.round(Math.random() * 1000) % 3
    }.gif`;
  } else if (attackType === "normal") {
    animation.src = `../../assets/animations/slashes/normal-${
      Math.round(Math.random() * 1000) % 4
    }.gif`;
  }

  const animationDiv = createElement({
    elementName: "div",
    id: id,
    className: "attack-animation",
    innerHTML: animation.outerHTML,
  });
  setTimeout(() => {
    removeElement(id);
  }, 1000);
  return animationDiv;
};
