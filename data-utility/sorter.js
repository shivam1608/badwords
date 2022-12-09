const { positive } = require("../data/en_english");
const fs = require("fs");

fs.writeFileSync("./sorted.json", JSON.stringify(positive.sort(), null, 4), {
  encoding: "utf-8",
});
