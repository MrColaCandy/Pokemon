export const createElement = ({
  elementName = "div",
  className,
  id,
  innerHTML,
}) => {
  const element = document.createElement(elementName);
  if (className) {
    element.className = className;
  }
  if (id) {
    element.id = id;
  }
  element.setAttribute("id", id);
  if (innerHTML) {
    element.innerHTML = innerHTML;
  }

  return element;
};

export const getElement = (id) => {
  return document.getElementById(id);
};
export const removeElement = (id) => {
  document.getElementById(id)?.remove();
};
