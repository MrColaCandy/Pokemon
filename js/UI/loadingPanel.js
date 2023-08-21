const loading = document.querySelector(".loading-panel");

export const showLoading = () => {
  loading.style.display = "flex";
};
export const hideLoading = () => {
  loading.style.display = "none";
};
