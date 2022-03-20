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

  const mp4File = ffmpeg.FS("readFile", "output.mp4");

  console.log(mp4File);

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });

  const mp4Url = URL.createObjectURL(mp4Blob);

  const a = document.createElement("a");
  a.href = mp4Url;
  a.download = "VideoFile.mp4";
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
