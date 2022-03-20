const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream, recorder;

const clickedStopRecordBtn = () => {
  startBtn.innerText = "Start Recording";
  startBtn.removeEventListener("click", clickedStopRecordBtn);
  startBtn.addEventListener("click", clickedRecordBtn);
  recorder.stop();
};

const clickedRecordBtn = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", clickedRecordBtn);
  startBtn.addEventListener("click", clickedStopRecordBtn);

  recorder = new MediaRecorder(stream);
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
