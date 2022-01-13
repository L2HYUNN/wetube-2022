import express from "express";
// const express = require("express");
// #3.1 GET Request
// #3.4 Recap

const PORT = 4000;

const app = express();

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}

const privateMiddleware = (req, res, next) => {
    const url = req.url;
    if(url === "/protected") {
        return res.send("<h1>Not Allowed</h1>");
    } 
    console.log("Allowed, you may continue.");
    next();
}

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
app.use(privateMiddleware);

app.get("/", handleHome);
app.get("/login", handleLogin);
app.get("/protected", handleProtected);

const handleListening = () => {
    console.log(`✅ Server Listening on port http://localhost:${PORT} 🚀`);
};

app.listen(PORT, handleListening);