import express from "express";
import {
  handleWatch,
  handleEdit,
  handlePostEdit,
  handleDelete,
  handleUpload,
  handlePostUpload,
} from "../controllers/videoController";
import { protectorMiddleware } from "../middlewares";

const videoRouter = express.Router();

videoRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(handleUpload)
  .post(handlePostUpload);

videoRouter.get("/:id([0-9a-f]{24})", handleWatch);

videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(handleEdit)
  .post(handlePostEdit);

videoRouter.get("/:id([0-9a-f]{24})/delete", protectorMiddleware, handleDelete);

export default videoRouter;
