const _ = require("lodash");
const { applyLayer } = require("./layers");

const getMiniLists = (payload, options, wordlist) => {
  let miniObject = {
    positive: [],
    negative: [],
  };
  for (const key of options.languages) {
    let positiveList = wordlist[key].positive;
    let negativeList = wordlist[key].negative;
    let allPayloads = [];
    let modified = payload;
    // Push original payload
    allPayloads.push(modified);
    for (let layer of options.layers) {
      // Getting the payload as well as all matched index
      modified = applyLayer(layer, modified).modified;
      allPayloads.push(modified);
    }
    // Checking for all payload if a word exists in them or not
    if (positiveList) {
      miniObject.positive.push(
        ..._.filter(positiveList, (word) => {
          let isPresent = false;
          for (let disguised of allPayloads) {
            isPresent = isPresent || disguised.includes(word);
          }
          return isPresent;
        })
      );
    }
    miniObject.negative.push(
      ..._.filter(negativeList, (word) => {
        return payload.includes(word);
      })
    );
  }
  return miniObject;
};

const cleanPayload = (payload, options, { positive, negative }) => {
  let safe = { ignore: {}, upper: {} };
  let modified = payload;

  // converting to lowercase for better searching
  modified = modified.toLowerCase();
  negative.push(...options.exclude);

  negative.forEach((word) => {
    let tmp = modified;
    let index = tmp.indexOf(word);
    while(index!==-1){
      safe.ignore[index] = word;
      tmp = tmp.substring(index);
      index = tmp.indexOf(word);
    }
  });

  positive.forEach((word) => {
    modified = modified.replace(
      new RegExp(`${word}`, "gmi"),
      Array(word.length + 1).join(options.placeholder)
    );
  });

  // adding back negatives
  let index = 0;
  let cleaned = "";
  while (index <= modified.length) {
    let safeWord = safe.ignore[index];
    if (safeWord) {
      cleaned += safeWord;
      index += safeWord.length;
    }
    cleaned += modified.charAt(index);
    index++;
  }

  // adding all uppercase letters back
  for (const key of Object.keys(safe.upper)) {
    let i = parseInt(key);
    if (cleaned.charAt(i) !== options.placeholder) {
      cleaned =
        cleaned.substring(0, i) + safe.upper[i] + cleaned.substring(i + 1);
    }
  }
  return cleaned;
};

module.exports = {
  getMiniLists,
  cleanPayload,
};
