import express from "express";
import { handleWatch, handleEdit, handlePostEdit, handleDelete, handleUpload, handlepostUpload } from "../controllers/videoController"


const videoRouter = express.Router();

videoRouter.route("/upload").get(handleUpload).post(handlepostUpload);

videoRouter.get("/:id([0-9a-f]{24})", handleWatch);

videoRouter.route("/:id([0-9a-f]{24})/edit").get(handleEdit).post(handlePostEdit);

videoRouter.get("/:id([0-9a-f]{24})/delete", handleDelete);

export default videoRouter;