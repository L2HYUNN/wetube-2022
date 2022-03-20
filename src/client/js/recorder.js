import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream, recorder, videoFile;

const videoDownload = async () => {
  const ffmpeg = createFFmpeg({
    corePath: "/convert/ffmpeg-core.js",
    log: true,
  });
  await ffmpeg.load();

  ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));

  await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");

  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "VideoFile.webm";
  document.body.appendChild(a);
  a.click();
};

const clickedStopRecordBtn = () => {
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener("click", clickedStopRecordBtn);
  startBtn.addEventListener("click", videoDownload);
  recorder.stop();
};

const clickedRecordBtn = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", clickedRecordBtn);
  startBtn.addEventListener("click", clickedStopRecordBtn);

  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };
  recorder.start();
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  video.srcObject = stream;
  video.play();
};

init();

startBtn.addEventListener("click", clickedRecordBtn);
