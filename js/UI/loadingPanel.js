import { removeElement } from "../Utils/elementUtil.js";
import { gameRoot } from "./gameRoot.js";

export const showLoading = () => {
  const loading = document.createElement("div");
  loading.setAttribute("id", "loading-panel");
  gameRoot.append(loading);
};
export const hideLoading = () => {
  removeElement("loading-panel");
};
