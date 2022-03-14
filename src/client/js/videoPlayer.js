console.log("video player");

const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("TotalTime");
const volumeRange = document.getElementById("volume");

let volume;
volume = 0.5;

const clickedPlayBtn = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};

const clickedMuteBtn = () => {
  if (video.muted) {
    video.muted = false;
    video.volume = volume;
  } else {
    video.muted = true;
    video.volume = 0;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : volume;
};

const inputVolumeRange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }

  volume = value;
  video.volume = volume;

  if (Number(value) === 0) {
    muteBtn.innerText = "Unmute";
    video.muted = true;
  } else {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
};

const referLoadedMetaData = () => {
  totalTime.innerText = `0:${Math.floor(video.duration)}`;
};
const currentTimeUpdate = () => {
  currentTime.innerText = Math.floor(video.currentTime);
};

playBtn.addEventListener("click", clickedPlayBtn);
muteBtn.addEventListener("click", clickedMuteBtn);
volumeRange.addEventListener("input", inputVolumeRange);
video.addEventListener("loadedmetadata", referLoadedMetaData);
video.addEventListener("timeupdate", currentTimeUpdate);
// currentTime.addEventListener("", )
// totalTime
