import express from "express";
import morgan from "morgan";
import session from "express-session";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";
// const express = require("express");
// #3.1 GET Request
// #3.4 Recap


const app = express();
const logger = morgan("dev");

// console.log(process.cwd());

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: "hello",
    resave: true,
    saveUninitialized: true, 
}))

// app.use((req, res, next) => {
//   req.sessionStore.all((error, sessions) => {
//     console.log(sessions);
//     next();
//   })
// })

// app.get("/add-one", (req, res, next) => {
//   console.log(req.session.id)
//   return res.send(`${req.session.id}`);
// })

app.use(localsMiddleware);
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;

