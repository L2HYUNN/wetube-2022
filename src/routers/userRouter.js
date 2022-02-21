import express from "express";
import {
  handleEdit,
  handlePostEdit,
  handleDelete,
  handleLogout,
  handleId,
  handleStartGithubLogin,
  handleFinishGithubLogin,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", handleLogout);
userRouter.get("/edit-profile", handleEdit);
userRouter.post("/edit-profile", handlePostEdit);
userRouter.get("/delete", handleDelete);
userRouter.get("/github/start", handleStartGithubLogin);
userRouter.get("/github/finish", handleFinishGithubLogin);
userRouter.get("/:id", handleId);

export default userRouter;
