export const createBar = (width, height, backWidth, color = "seagreen") => {
  const container = document.createElement("div");
  const bar = document.createElement("div");
  const back = document.createElement("div");
  back.style.height = height;
  back.style.width = `${backWidth}px`;

  back.style.position = "absolute";

  back.style.backgroundColor = "gray";
  bar.style.width = `${width}px`;
  bar.style.backgroundColor = color;
  bar.style.height = height;
  bar.style.borderRadius = "10px";
  back.style.borderRadius = "10px";
  bar.style.position = "relative";
  back.style.zIndex = 0;
  bar.style.zIndex = 1;
  container.append(back);
  container.append(bar);
  return container;
};
