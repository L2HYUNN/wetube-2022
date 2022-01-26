import express from "express";
import { handleWatch, handleEdit, handleDelete, handleUpload } from "../controllers/videoController"


const videoRouter = express.Router();

videoRouter.get("/upload", handleUpload);
videoRouter.get("/:id(\\d+)", handleWatch);
videoRouter.get("/:id(\\d+)/edit", handleEdit);
videoRouter.get("/:id(\\d+)/delete", handleDelete);

export default videoRouter;