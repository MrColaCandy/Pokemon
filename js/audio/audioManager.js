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
  {
    name: "wow",
    audio: new Audio("../../assets/audio/wow.mp3"),
  },
  {
    name: "omg",
    audio: new Audio("../../assets/audio/omg.mp3"),
  },
  {
    name: "no",
    audio: new Audio("../../assets/audio/no.mp3"),
  },
  {
    name: "yeah",
    audio: new Audio("../../assets/audio/yeah.mp3"),
  },
  {
    name: "dance",
    audio: new Audio("../../assets/audio/dance.wav"),
  },
];
export const currentAudio = { name: "", audio: null };
export const playAudio = (name, only = true) => {
  const { audio } = audios.find((a) => a.name == name);
  if (only) {
    audios.forEach((a) => a.audio.pause());
    audio.loop = true;
  } else {
    audio.loop = false;
  }
  audio.play();
  currentAudio.audio = audio;
};

export const setVolume = (value) => {
  audios.forEach((a) => {
    a.audio.volume = value;
  });
};
