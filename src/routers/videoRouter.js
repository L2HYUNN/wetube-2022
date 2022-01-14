import express from "express";
import { handleWatch, handleEdit } from "../controllers/videoController"


const videoRouter = express.Router();

videoRouter.get("/watch", handleWatch);
videoRouter.get("/edit", handleEdit);

export default videoRouter;