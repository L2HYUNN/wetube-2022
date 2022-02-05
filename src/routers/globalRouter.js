import express from "express";
import { handleHome, handleSearch } from "../controllers/videoController";
import { handleJoin, handleLogin, handlePostJoin } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get("/", handleHome);
globalRouter.route("/join").get(handleJoin).post(handlePostJoin);

globalRouter.get("/login", handleLogin);
globalRouter.get("/search", handleSearch);

export default globalRouter;