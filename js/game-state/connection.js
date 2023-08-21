import { hideLoading, showLoading } from "../UI/loadingPanel.js";

export let isOnline = false;

export const checkConnection = () => {
  setInterval(() => {
    isOnline = window.navigator.onLine;
    if (!isOnline) {
      showLoading();
    } else {
      hideLoading();
    }
  }, 500);
};
