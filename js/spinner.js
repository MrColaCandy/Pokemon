export const spinner = (size) => {
  const spinner = document.createElement("div");
  spinner.className = "spinner";
  spinner.style.width = size;
  spinner.style.height = size;

  return spinner;
};
