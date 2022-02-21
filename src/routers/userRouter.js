import express from "express";
import {
  handleEdit,
  handleDelete,
  handleLogout,
  handleId,
  handleStartGithubLogin,
  handleFinishGithubLogin,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", handleLogout);
userRouter.get("/edit", handleEdit);
userRouter.get("/delete", handleDelete);
userRouter.get("/github/start", handleStartGithubLogin);
userRouter.get("/github/finish", handleFinishGithubLogin);
userRouter.get("/:id", handleId);

export default userRouter;
