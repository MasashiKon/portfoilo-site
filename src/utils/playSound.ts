let soundCorrect: HTMLAudioElement | null;
let clickSound: HTMLAudioElement | null;
let getSound: HTMLAudioElement | null;

if (typeof Audio !== "undefined") {
  soundCorrect = new Audio("/sounds/soundCorrect.mp3");
  soundCorrect.volume = 0.3;
  clickSound = new Audio("/sounds/click.mp3");
  clickSound.volume = 0.1;
  getSound = new Audio("/sounds/get.mp3");
  getSound.volume = 0.1;
}

export const playSoundCorrect = () => {
    if(!soundCorrect) return;
    soundCorrect.currentTime = 0;
    soundCorrect.play();
}

export const playClickSound = () => {
    if(!clickSound) return;
    clickSound.currentTime = 0;
    clickSound.play();
}

export const playGetSound = () => {
  if(!getSound) return;
  getSound.currentTime = 0;
  getSound.play();
}