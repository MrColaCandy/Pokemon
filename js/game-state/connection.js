import { hideLoading, showLoading } from "../UI/loadingPanel.js";
import { closeBattleScene } from "../scenes/battleScene.js";
import { gameState } from "./gameState.js";

export let isOnline = true;

export const checkConnection = () => {
  setInterval(() => {
    isOnline = window.navigator.onLine;
    if (!isOnline) {
      showLoading();
    } else {
      hideLoading();
    }
  }, 0);

  addEventListener("offline", () => {
    if (gameState.battle) {
      closeBattleScene();
    }
  });
};
