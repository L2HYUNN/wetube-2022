import express from "express";
import { handleEdit, handleDelete} from "../controllers/userController"

const userRouter = express.Router();

userRouter.get("/edit", handleEdit);
userRouter.get("/delete", handleDelete);

export default userRouter;