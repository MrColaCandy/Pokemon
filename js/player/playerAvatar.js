import { createElement } from "../Utils/elementUtil.js";

export const setAvatar = (src) => {
  const image = createElement({ elementName: "img" });
  image.src = src;
};
