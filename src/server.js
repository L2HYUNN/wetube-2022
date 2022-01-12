import express from "express";
// const express = require("express");
// #3.1 GET Request
// #3.4 Recap

const PORT = 4000;

const app = express();

const gossipMiddleware = (req, res, next) => {
    console.log(`Someone is going to: ${req.url}`);
    next();
}

const handleHome = (req, res) => {
    return res.send("We Love MiddleWare");
} 

const handleLogin = (req, res) => {
    return res.send("Login... ");
}

app.get("/", gossipMiddleware, handleHome);
app.get("/login", handleLogin);

const handleListening = () => {
    console.log(`✅ Server Listening on port http://localhost:${PORT} 🚀`);
};

app.listen(PORT, handleListening);