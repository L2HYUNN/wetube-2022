import express from "express";
// const express = require("express");
// #3.1 GET Request

const PORT = 4000;

const app = express();

const handleListening = () => {
    console.log(`✅ Server Listening on port http://localhost:${PORT} 🚀`);
};

app.listen(PORT, handleListening);