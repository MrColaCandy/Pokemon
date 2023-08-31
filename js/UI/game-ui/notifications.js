import { removeElement } from "../../Utils/elementUtil.js";
import { gameRoot } from "./gameRoot.js";

const notification = document.createElement("div");
notification.id = "notification";
notification.className = "absolute bottom-0 right-0";
notification.innerHTML = `
<img src="../../assets/animations/notification.webp"><img>
<div class="bg-amber-400 w-96 rounded-full rounded-br-none py-2 px-3 text-center text-xl text-white font-bold absolute bottom-52 right-40" id="message"></div>
`;

export const activateNotification = (message) => {
  gameRoot.append(notification);
  notification.querySelector("#message").innerHTML = message;
  setTimeout(() => {
    removeElement("notification");
  }, 4000);
};
