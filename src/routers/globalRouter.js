import express from "express";
import { handleHome, handleSearch } from "../controllers/videoController";
import {
  handleJoin,
  handleLogin,
  handlePostJoin,
  handlePostLogin,
} from "../controllers/userController";
import { publicOnlyMiddleware } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get("/", handleHome);
globalRouter
  .route("/join")
  .all(publicOnlyMiddleware)
  .get(handleJoin)
  .post(handlePostJoin);
globalRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(handleLogin)
  .post(handlePostLogin);
globalRouter.get("/search", handleSearch);

export default globalRouter;
