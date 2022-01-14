import express from "express";
import { handleWatch, handleEdit, handleDelete, handleUpload } from "../controllers/videoController"


const videoRouter = express.Router();

videoRouter.get("/upload", handleUpload);
videoRouter.get("/:id", handleWatch);
videoRouter.get("/:id/edit", handleEdit);
videoRouter.get("/:id/delete", handleDelete);

export default videoRouter;