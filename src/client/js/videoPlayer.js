console.log("video player");

const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeBtn = document.getElementById("volume");

const clickedPlayBtn = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const clickedMuteBtn = (e) => {};

const playedvideo = (e) => {
  playBtn.innerText = "Pause";
};

const pausedVideo = (e) => {
  playBtn.innerText = "Play";
};
playBtn.addEventListener("click", clickedPlayBtn);
muteBtn.addEventListener("click", clickedMuteBtn);
video.addEventListener("played", playedVideo);
video.addEventListener("pause", pausedVideo);
