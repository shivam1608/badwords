const express = require("express");
const api = require("./api/v1");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get("/" , (req , res) => {
    res.send("Site is under development");
});

app.use("/api" , api);


module.exports = app;