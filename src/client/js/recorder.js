const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream, recorder;

const videoDownload = () => {};

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
    const videoFile = URL.createObjectURL(event.data);
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

// init();

startBtn.addEventListener("click", clickedRecordBtn);
