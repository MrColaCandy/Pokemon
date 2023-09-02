import { gameRoot } from "../UI/game-ui/gameRoot.js";
import { showAnimation } from "../UI/game-ui/lottieAnimations.js";
import { activateNotification } from "../UI/game-ui/notifications.js";
import {
  createElement,
  getElement,
  removeElement,
} from "../Utils/elementUtil.js";
import { currentAudio, playAudio } from "../audio/audioManager.js";
import {
  createDanceBoard,
  createRow,
  decreaseHealth,
  setHealth,
} from "../dance/dance.js";
import { backgrounds } from "../game-loops/animationLoop.js";
import { gameState } from "../game-state/gameState.js";
let score = 0;
let danceState = 1;
let interval = 2200;
let ready = false;
let danceTimeOut;
export const openDanceScene = () => {
  if (gameState.dance) {
    ready = false;
    return;
  }
  ready = false;
  interval = 2200;
  score = 0;
  gameState.dance = true;
  gameState.pause = true;
  playAudio("dance", true);
  currentAudio.audio.playbackRate = 0.75;
  const dancer = createElement({
    id: "dancer-gif",
    elementName: "img",
    className: "w-96 h-96 absolute right-96 bottom-10",
  });
  dancer.src = "../../assets/animations/dance/1.gif";

  const board = createDanceBoard();

  const danceScene = createElement({
    elementName: "div",
    id: "dance-scene",
    className: "dance-scene absolute top-0 bottom-0 left-0 right-0 z-50",
    innerHTML: `
    <div class="absolute top-1 right-40 bg-amber-400 rounded-md border-4 p-3 font-bold text-white" id="dance-health">HEALTH: 3 ❤</div>
    <div class="absolute top-1 right-1 bg-amber-400 rounded-md border-4 p-3 font-bold text-white" id="dance-score">SCORE: 0</div>
      ${dancer.outerHTML}
      ${board.outerHTML}
      
    `,
  });
  gameRoot.append(danceScene);
  setHealth(3);
  showAnimation("../../assets/animations/countDown.json", "count-down", false);
  danceTimeOut = setTimeout(() => {
    createNewRow();
    removeElement("count-down");
    ready = true;
  }, 5000);
};
const createNewRow = () => {
  if (!gameState.dance) return;
  const directions = ["KeyW", "KeyS", "KeyA", "KeyD"];
  const newRowDiv = getElement("new-row");
  const newRow = createRow(directions[Math.floor(Math.random() * 5)]);
  newRow.style.bottom = "5%";
  newRow.id = "false";
  newRowDiv.append(newRow);
  danceTimeOut = setTimeout(() => {
    createNewRow();
  }, interval);
};
addEventListener("keyup", (e) => {
  if (!gameState.dance) return;
  if (!ready) return;

  const currentRow = [...getElement("new-row").children][0];
  if (!currentRow) return;
  if (
    parseInt(currentRow.style.bottom) >= 95 &&
    parseInt(currentRow.style.bottom) <= 100 &&
    currentRow.dataset.direction === e.code
  ) {
    if (currentRow.style.bottom == "96%") {
      activateNotification("Perfect!");
      score += 1;
    } else {
      activateNotification("Good!");
    }
    [...getElement("new-row").children][0].id = "true";
    [...getElement("new-row").children][0].style.filter = `
     blur(5px) contrast(200%) saturate(200%)
    `;
    showRight();

    const danceScore = getElement("dance-score");
    danceScore.innerHTML = `SCORE: ${++score}
    `;
    if (score % 10 === 0) {
      const dancer = getElement("dancer-gif");
      dancer.src = `../../assets/animations/dance/${++danceState}.gif`;
      if (danceState >= 5) {
        danceState = 1;
      }
      if (currentAudio.audio.playbackRate < 1.5) {
        currentAudio.audio.playbackRate += 0.1;
      }
      if (interval > 300) {
        interval -= 400;
      }
    }
  } else {
    decreaseHealth();
    showWrong();
  }
});

export function showWrong() {
  const gameBoard = getElement("dance-board");
  gsap.to(gameBoard, {
    backgroundColor: "orangered",

    yoyo: true,
    onComplete: () => {
      gsap.to(gameBoard, {
        backgroundColor: "black",
        ease: true,
        yoyo: true,
      });
    },
  });
}
function showRight() {
  const gameBoard = getElement("dance-board");
  gsap.to(gameBoard, {
    backgroundColor: "seagreen",

    yoyo: true,
    onComplete: () => {
      gsap.to(gameBoard, {
        backgroundColor: "black",
        ease: true,
        yoyo: true,
      });
    },
  });
}
export const closeDanceScene = () => {
  gameState.pause = false;
  gameState.dance = false;
  clearTimeout(danceTimeOut);
  removeElement("dance-scene");
  playAudio("ambient");
  backgrounds.forEach((b) => {
    b.position.y -= 80;
  });
};
