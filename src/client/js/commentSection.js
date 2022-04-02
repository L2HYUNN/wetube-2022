import fetch from "node-fetch";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const commentList = document.getElementById("commentList");
const deleteBtns = commentList.querySelectorAll("#delete");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const chatIcon = document.createElement("i");
  chatIcon.className = "fas fa-comment";
  const span = document.createElement("span");
  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fa-solid fa-delete-left";
  deleteIcon.id = "delete";
  deleteIcon.addEventListener("click", handleCommentDeleteBtn);
  span.innerText = ` ${text}`;
  newComment.appendChild(chatIcon);
  newComment.appendChild(span);
  newComment.appendChild(deleteIcon);
  videoComments.prepend(newComment);
};

const handleCommentSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  });
  textarea.value = "";
  const { newCommentId } = await response.json();
  if (response.status === 201) {
    addComment(text, newCommentId);
  }
};

if (form) {
  form.addEventListener("submit", handleCommentSubmit);
}

const handleCommentDeleteBtn = async (e) => {
  const comment = e.target.parentElement;
  const commentId = e.target.parentElement.dataset.id;
  await fetch(`/api/comments/${commentId}/delete`, {
    method: "DELETE",
  });
  comment.remove();
};

if (deleteBtns) {
  Object.values(deleteBtns).forEach((icon) => {
    icon.addEventListener("click", handleCommentDeleteBtn);
  });
}
