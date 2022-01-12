import express from "express";
// const express = require("express");
// #3.1 GET Request
// #3.4 Recap

const PORT = 4000;

const app = express();

const handleHome = (req, res) => {
    return res.end();
} 

const handleLogin = (req, res) => {
    return res.send("Login... ");
}

app.get("/", handleHome);
app.get("/login", handleLogin);

const handleListening = () => {
    console.log(`✅ Server Listening on port http://localhost:${PORT} 🚀`);
};

app.listen(PORT, handleListening);