const notification = document.getElementById("notification");
export const activateNotification = (message, timeOut = 2) => {
  notification.querySelector("span").innerText = message;
  gsap.to(notification, {
    opacity: 1,
    duration: 0.5,
    onComplete: () => {
      gsap.to(notification, {
        delay: timeOut,
        opacity: 0,
        duration: 1,
      });
    },
  });
};
