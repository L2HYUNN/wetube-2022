import fetch from "node-fetch";

const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("volume");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");
const playBtnIcon = playBtn.querySelector("i");
const muteBtnIcon = muteBtn.querySelector("i");
const fullScreenIcon = fullScreenBtn.querySelector("i");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let activeVideo = null;
let volume;
volume = 0.5;

const keydownEnterFullScreen = (e) => {
  if (e.code === "Enter") {
    videoContainer.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress";
    activeVideo.removeEventListener("keydown", keydownEnterFullScreen);
    activeVideo.addEventListener("keydown", keydownExitFullScreen);
  }
};
const keydownExitFullScreen = (e) => {
  if (e.code === "Enter") {
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand";
    activeVideo.removeEventListener("keydown", keydownExitFullScreen);
    activeVideo.addEventListener("keydown", keydownEnterFullScreen);
  }
};

const keydownPlayVideo = (e) => {
  if (e.code === "Space" && e.target === document.body) {
    video.play();
    playBtnIcon.classList = "fas fa-pause";
    activeVideo.removeEventListener("keydown", keydownPlayVideo);
    activeVideo.addEventListener("keydown", keydownPauseVideo);
  }
};

const keydownPauseVideo = (e) => {
  if (e.code === "Space" && e.target === document.body) {
    console.log(e.target);
    video.pause();
    playBtnIcon.classList = "fas fa-play";
    activeVideo.removeEventListener("keydown", keydownPauseVideo);
    activeVideo.addEventListener("keydown", keydownPlayVideo);
  }
};

const clickedPlayBtn = () => {
  activeVideo = document.activeElement;
  if (video.paused) {
    video.play();
    activeVideo.addEventListener("keydown", keydownPauseVideo);
    activeVideo.addEventListener("keydown", keydownEnterFullScreen);
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const clickedVideo = () => {
  activeVideo = document.activeElement;
  if (video.paused) {
    video.play();
    activeVideo.addEventListener("keydown", keydownPauseVideo);
    activeVideo.addEventListener("keydown", keydownEnterFullScreen);
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const clickedMuteBtn = () => {
  if (video.muted) {
    video.muted = false;
    video.volume = volume;
  } else {
    video.muted = true;
    video.volume = 0;
  }

  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volume;
};

const inputVolumeRange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtnIcon.classList = "fas fa-volume-up";
  }

  volume = value;
  video.volume = volume;

  if (Number(value) === 0) {
    muteBtnIcon.classList = "fas fa-volume-mute";
    video.muted = true;
  } else {
    video.muted = false;
    muteBtnIcon.classList = "fas fa-volume-up";
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
const clickedFullScreenBtn = () => {
  activeVideo = document.activeElement;
  activeVideo.addEventListener("keydown", keydownExitFullScreen);
  activeVideo.addEventListener("keydown", keydownPlayVideo);
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress";
  }
};

const hideControls = () => {
  videoControls.classList.remove("showing");
};
const mouseMovedVideo = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }

  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};
const mouseLeavedVideo = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};
const endedVideo = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/views`, {
    method: "POST",
  });
};

playBtn.addEventListener("click", clickedPlayBtn);
muteBtn.addEventListener("click", clickedMuteBtn);
volumeRange.addEventListener("input", inputVolumeRange);
video.addEventListener("canplay", referLoadedMetaData);
video.addEventListener("timeupdate", currentTimeUpdate);
video.addEventListener("click", clickedVideo);
timeline.addEventListener("input", inputTimelineChange);
fullScreenBtn.addEventListener("click", clickedFullScreenBtn);
videoContainer.addEventListener("mousemove", mouseMovedVideo);
videoContainer.addEventListener("mouseleave", mouseLeavedVideo);
video.addEventListener("ended", endedVideo);

referLoadedMetaData();

// currentTime.addEventListener("", )
// totalTime
