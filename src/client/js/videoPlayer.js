const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("TotalTime");
const volumeRange = document.getElementById("volume");
const timeline = document.getElementById("timeline");

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

const formatTime = (seconds) => {
  return new Date(seconds * 1000).toISOString().substring(11, 19);
};

const referLoadedMetaData = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};
const currentTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};
const inputTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

playBtn.addEventListener("click", clickedPlayBtn);
muteBtn.addEventListener("click", clickedMuteBtn);
volumeRange.addEventListener("input", inputVolumeRange);
video.addEventListener("loadedmetadata", referLoadedMetaData);
video.addEventListener("timeupdate", currentTimeUpdate);
timeline.addEventListener("input", inputTimelineChange);
// currentTime.addEventListener("", )
// totalTime
