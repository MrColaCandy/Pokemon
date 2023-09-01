import { createElement, getElement } from "../../Utils/elementUtil.js";
import { playAudio, setVolume } from "../../audio/audioManager.js";
import { gameState } from "../../game-state/gameState.js";

export const createStartMenu = () => {
  const startMenu = getElement("start-menu");
  startMenu.className = "start-menu";
  startMenu.innerHTML = `
  <div class="w-full flex justify-between items-center p-10">
    <button id="start-btn" class="bg-amber-400 border-4 py-3 px-4 rounded-md font-bold text-white" >START</button>
    <div class="flex gap-2 items-center">
    <div id="sound-icon"></div>
    <input id="volume" type="range" min="0" max="100" value="40" />
    </div>
  </div>

  `;
  let volume = 0.5;
  const soundOn = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
    </svg>
  `;

  const soundOff = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" />
    </svg>`;

  const menu = createElement({
    elementName: "div",
    id: "menu",
    className:
      "w-2/5 h-50 bg-amber-600 border-4 p-3 m-3 opacity-95 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2  drop-shadow-2xl  z-50 ",
    innerHTML: `
    <h2 class="text-center text-white font-bold text-xl mb-3">WELCOME</h2>
    <p class="font-bold text-white text-xl mb-2">
      Welcome to a captivating world of adventure
      and strategy in our Pokémon game, where players
      are immersed in a journey of discovery,
      camaraderie, and fierce battles. Embark
      on an epic quest to become a renowned Pokémon
      Trainer in a land brimming with diverse landscapes,
      untamed wilderness, and hidden mysteries.
    </p>

  `,
  });

  startMenu.append(menu);
  const soundIcon = getElement("sound-icon");
  soundIcon.innerHTML = soundOn;
  addEventListener("change", (e) => {
    if (e.target.id === "volume") {
      volume = e.target.value / 100;
      setVolume(volume);
      if (volume <= 0) {
        soundIcon.innerHTML = soundOff;
      } else {
        soundIcon.innerHTML = soundOn;
      }
    }
  });
  addEventListener("click", (e) => {
    if (e.target.id === "start-btn") {
      startMenu.style.display = "none";
      gameState.pause = false;
      playAudio("ambient");
    }
  });
};
