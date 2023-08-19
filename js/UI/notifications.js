const notification = document.getElementById("notification");
export const activateNotification = (message) => {
  notification.querySelector("span").innerText = message;
  gsap.to(notification, {
    opacity: 1,
    duration: 0.5,
    onComplete: () => {
      gsap.to(notification, {
        delay: 0.5,
        opacity: 0,
        duration: 1,
      });
    },
  });
};
