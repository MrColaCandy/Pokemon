export const showAnimation = (src, id) => {
  const animation = `
    <lottie-player
        id="${id}"
        class="lottie"
        src="${src}"
        background="transparent"
        speed="1"
        style="width: 300px; height: 300px"
        autoPlay
        loop
      >
      </lottie-player>
    `;

  const div = document.createElement("div");
  div.innerHTML = animation;
  document.querySelector("#base").append(div);
  setTimeout(() => {
    document.querySelector(`#${id}`).remove();
  }, 1000);
};
