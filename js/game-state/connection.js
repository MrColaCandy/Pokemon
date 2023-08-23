import { hideLoading, showLoading } from "../UI/loadingPanel.js";

export let isOnline = false;

export const checkConnection = () => {
  isOnline = window.navigator.onLine;
  setInterval(() => {
    isOnline = window.navigator.onLine;
    if (!isOnline) {
      showLoading();
    } else {
      hideLoading();
    }
  }, 1000);
};
