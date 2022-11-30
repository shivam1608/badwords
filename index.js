const express = require("express");
const api = require("./api/v1");
const { error } = require("./utils");

const app = express();

app.get("/", (req, res) => {
  res.send("Site is under development");
});

app.use("/api", api);

app.use(error);

module.exports = app;
