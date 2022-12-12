/**
 * This is a utility file and it does not have to anything with the api backend 👍
 * (this file helps the developer/contributer to save time)
 *
 * This file sorts or arrange in lexicographicaly of the positive inputs in the word list
 */
const { positive } = require("../data/hen_hinglish");
const fs = require("fs");

try {
  fs.writeFileSync("./sorted.json", JSON.stringify(positive.sort(), null, 4), {
    encoding: "utf-8",
  });
} catch (e) {
  console.log(e);
}
