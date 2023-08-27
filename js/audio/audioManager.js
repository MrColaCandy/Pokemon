const audios = [
  {
    name: "ambient",
    audio: new Audio("../../assets/audio/ambient.wav"),
  },
  {
    name: "catch",
    audio: new Audio("../../assets/audio/catch.wav"),
  },
  {
    name: "battle",
    audio: new Audio("../../assets/audio/battle.wav"),
  },
];

audios[0].audio.volume = 0.1;
audios[1].audio.volume = 0.5;
audios[2].audio.volume = 0.8;
export const playAudio = (name) => {
  audios.forEach((a) => a.audio.pause());
  const { audio } = audios.find((a) => a.name == name);
  audio.loop = true;
  audio.play();
};

export const playSoundEffect = (name) => {
  const sound = new Audio(`../../assets/audio/${name}`);
  sound.loop = false;
  sound.volume = 0.2;
  sound.play();
};
