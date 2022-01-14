import express from "express";
import { handleHome } from "../controllers/videoController"
import { handleJoin } from "../controllers/userController"

const globalRouter = express.Router();

globalRouter.get("/", handleHome);
globalRouter.get("/join", handleJoin);

export default globalRouter;