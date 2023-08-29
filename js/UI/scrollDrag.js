export const scroll = (element) => {
  const slider = element;
  let isDown = false;
  let startY;
  let scrollTop;
  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    startY = e.pageY - slider.offsetLeft;
    scrollTop = slider.scrollTop;
  });
  slider.addEventListener("mouseleave", () => {
    isDown = false;
  });
  slider.addEventListener("mouseup", () => {
    isDown = false;
  });
  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const y = e.pageY - slider.offsetLeft;
    const walk = (y - startY) * 3;
    slider.scrollTop = scrollTop - walk;
  });
};
