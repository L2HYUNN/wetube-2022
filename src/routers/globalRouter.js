import express from "express";
import { handleHome, handleSearch } from "../controllers/videoController";
import { handleJoin, handleLogin, handlePostJoin, handlePostLogin } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get("/", handleHome);
globalRouter.route("/join").get(handleJoin).post(handlePostJoin);
globalRouter.route("/login").get(handleLogin).post(handlePostLogin);
globalRouter.get("/search", handleSearch);

export default globalRouter;