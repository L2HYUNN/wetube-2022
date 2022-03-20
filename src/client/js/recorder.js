const startBtn = document.getElementById("startBtn");

const clickedStartBtn = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
};

startBtn.addEventListener("click", clickedStartBtn);
