import express from "express";
import morgan from "morgan";
// const express = require("express");
// #3.1 GET Request
// #3.4 Recap

const PORT = 4000;

const app = express();
const logger = morgan("dev");

const globalRouter = express.Router();
const userRouter = express.Router();
const videoRouter = express.Router();


const handleHome = (req, res) => {
    return res.send("Home");
} 

globalRouter.get("/", handleHome);

const handleEdit = (req, res) => { 
    return res.send("Edit");
}

userRouter.get("/edit", handleEdit);

const handleWatch = (req, res) => {
    return res.send("Watch");
}

videoRouter.get("/watch", handleWatch);

app.use(logger);

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

app.get("/", handleHome);


const handleListening = () => {
    console.log(`✅ Server Listening on port http://localhost:${PORT} 🚀`);
};

app.listen(PORT, handleListening);