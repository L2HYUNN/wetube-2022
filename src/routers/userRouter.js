import express from "express";
import {
  handleEdit,
  handlePostEdit,
  handleDelete,
  handleLogout,
  handleId,
  handleStartGithubLogin,
  handleFinishGithubLogin,
  handleChangePassword,
  handlePostChangePassword,
} from "../controllers/userController";
import {
  avatarUploadFiles,
  protectorMiddleware,
  protectorSocialLogin,
  publicOnlyMiddleware,
} from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, handleLogout);
userRouter.get("/edit-profile", protectorMiddleware, handleEdit);
userRouter.post(
  "/edit-profile",
  protectorMiddleware,
  avatarUploadFiles.single("avatar"),
  handlePostEdit
);
userRouter.get("/delete", protectorMiddleware, handleDelete);
userRouter.get("/github/start", publicOnlyMiddleware, handleStartGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, handleFinishGithubLogin);
userRouter
  .route("/change-password")
  .all(protectorSocialLogin)
  .all(protectorMiddleware)
  .get(handleChangePassword)
  .post(handlePostChangePassword);
userRouter.get("/:id", handleId);

export default userRouter;
