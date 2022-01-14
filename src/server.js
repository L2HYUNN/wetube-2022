import express from "express";
import morgan from "morgan";
// const express = require("express");
// #3.1 GET Request
// #3.4 Recap

const PORT = 4000;

const app = express();
const logger = morgan("dev");

const handleHome = (req, res) => {
    return res.send("We Love MiddleWare");
} 

const handleLogin = (req, res) => {
    return res.send("Login... ");
}

const handleProtected = (req, res) => {
    return res.send("Welcome to the private lounge.")
}

app.use(logger);

app.get("/", handleHome);
app.get("/login", handleLogin);
app.get("/protected", handleProtected);

const handleListening = () => {
    console.log(`✅ Server Listening on port http://localhost:${PORT} 🚀`);
};

app.listen(PORT, handleListening);