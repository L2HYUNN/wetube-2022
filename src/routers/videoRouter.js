import express from "express";
import { handleWatch, handleEdit, handlePostEdit, handleDelete, handleUpload, handlepostUpload } from "../controllers/videoController"


const videoRouter = express.Router();

videoRouter.route("/upload").get(handleUpload).post(handlepostUpload);

videoRouter.get("/:id(\\d+)", handleWatch);

videoRouter.route("/:id(\\d+)/edit").get(handleEdit).post(handlePostEdit);

videoRouter.get("/:id(\\d+)/delete", handleDelete);

export default videoRouter;