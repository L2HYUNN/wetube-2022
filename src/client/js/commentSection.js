const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const btn = form.querySelector("button");

const handleCommentSubmit = (event) => {
  event.preventDefault();
  const text = textarea.value;
  const video = videoContainer.dataset.id;
};

form.addEventListener("submit", handleCommentSubmit);
