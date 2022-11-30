const express = require("express");
const rateLimiter = require("express-rate-limit");

const limiter = ratelimiter({
    windowMs: 1000, // 1 seconds
    max: 4, // Limit each IP to 4 Query/Second
    standardHeaders: true,
    legacyHeaders: false,
});

const api = express.Router();

api.get("/", (req, res) => {
    res.send({
      message: "API Server is Running 🟢",
      info: "online",
      maintenance: false,
    });
});


module.exports = api;