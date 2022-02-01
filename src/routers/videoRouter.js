import express from "express";
import { handleWatch, handleEdit, handlePostEdit, handleDelete, handleUpload } from "../controllers/videoController"


const videoRouter = express.Router();

videoRouter.get("/upload", handleUpload);
videoRouter.get("/:id(\\d+)", handleWatch);

videoRouter.route("/:id(\\d+)/edit").get(handleEdit).post(handlePostEdit);

videoRouter.get("/:id(\\d+)/delete", handleDelete);

export default videoRouter;