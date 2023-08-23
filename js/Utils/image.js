import { createElement } from "./elementUtil.js";

export const createImage = ({ src, id, className }) => {
  const image = createElement({ elementName: "img", id, className });
  image.src = src;
  return image;
};
