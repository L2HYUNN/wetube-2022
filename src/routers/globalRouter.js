import express from "express";
import { handleHome, handleSearch } from "../controllers/videoController";
import { handleJoin, handleLogin } from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get("/", handleHome);
globalRouter.get("/join", handleJoin);
globalRouter.get("/login", handleLogin);
globalRouter.get("/search", handleSearch);

export default globalRouter;