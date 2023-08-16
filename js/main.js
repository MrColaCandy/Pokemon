import { animate } from "./animation.js";
import { inventoryBtn } from "./inventory.js";
import { physics } from "./physics.js";

// physics loop
physics();
// animations loop
animate();

// UI events
inventoryBtn.addEventListener("click", (e) => {
  console.log("inventory");
});
