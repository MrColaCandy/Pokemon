import { createElement } from "../Utils/elementUtil.js";
import { gameRoot } from "./gameRoot.js";

export const showAnimation = (src, id, autoClose = true) => {
  const animation = `
    <lottie-player
        src="${src}"
        background="transparent"
        speed="1"
        style="width: 350px; height: 350px"
        autoPlay
        loop
      >
      </lottie-player>
    `;

  const div = createElement({
    elementName: "div",
    id: id,
    className:
      "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ",
  });
  div.innerHTML = animation;
  gameRoot.append(div);

  if (!autoClose) return;
  setTimeout(() => {
    document.querySelector(`#${id}`).remove();
  }, 1000);
};
