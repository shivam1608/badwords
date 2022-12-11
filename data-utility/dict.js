/**
 * This is a utility file and it does not have to anything with the api backend 👍
 * (this file helps the developer/contributer to save time)
 *
 * This file get the words from the dictionary and generarte all word list contains the badwords
 */

const fs = require("fs");
const reader = require("readline");
const { positive } = require("../data/en_english");
let data = [];

(async () => {
  try {
    const lines = reader.createInterface({
      input: fs.createReadStream("./words.txt"),
      crlfDelay: Infinity,
    });

    for await (let word of lines) {
      word = word.toLowerCase();
      if (word.match(/[^\w\s]|_|\s/g)) {
        continue;
      }
      if (positive.indexOf(word) === -1) {
        positive.forEach((item) => {
          if (word.includes(item)) {
            data.push(word);
          }
        });
      }
    }

    fs.writeFileSync("./negative.json", JSON.stringify(data, null, 4), {
      encoding: "utf-8",
    });
  } catch (e) {
    console.log(e);
  }
})();
