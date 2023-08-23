export const indicate = (element, onEnd) => {
  const tween = gsap.to(element, {
    opacity: 1,
    yoyo: true,
    repeat: -1,
  });

  tween.onComplete = () => {
    onEnd(tween);
  };

  return tween;
};
