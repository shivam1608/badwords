const express = require("express");
const api = require("./api/v1");
const { error } = require("./utils");

const app = express();

const pages = {
  "": "home",
  docs: "docs",
};

// serving static webpages
for (const url of Object.keys(pages)) {
  app.use(`/${url}`, express.static(`./web/${pages[url]}`));
}

// registering api v1
app.use("/api", api);

// registering default simple error handler
app.use(error);

// Serve 404 page not found
app.use((req, res) => {
  res.status(404).send("Not Found");
});

module.exports = app;
