const _ = require("lodash");
const applyLayer = require("./layers");

const getMiniLists = (payload, options, wordlist) => {
  let miniObject = {
    positive: [],
    negative: [],
  };
  for (const key of options.languages) {
    let positiveList = wordlist[key].positive;
    let negativeList = wordlist[key].negative;
    if (positiveList) {
      miniObject.positive.push(
        ..._.filter(positiveList, (word) => {
          let isPresent = false;
          for (let layer in options.layers) {
            isPresent = isPresent || applyLayer(layer, payload).includes(word);
          }
          return payload.includes(word);
        })
      );
      miniObject.negative.push(
        ..._.filter(negativeList, (word) => {
          return payload.includes(word);
        })
      );
    }
  }
  return miniObject;
};

const cleanPayload = (payload, options, wordlist) => {
  let safe = { special: {}, ignore: {}, upper: {} };
  // spearating special chars
  let count = 0;
  for (let i = 0; i < payload.length; i++) {
    let char = payload.charAt(i);
    if (char.match(/[^\w\s]|_|\s/gim)) {
      safe.special[i - count] = char;
      count++;
    }
    if (char.match(/[A-Z]/g)) {
      safe.upper[i] = char;
    }
  }

  // converting to lowercase for better searching
  payload = payload.toLowerCase();
  negative.push(...options.exclude);

  const { positive, negative } = getMiniLists(payload, options, wordlist);

  for (let layer in options) {
    // Looping through all filtering layers
    payload = applyLayer(layer, payload);

    negative.forEach((word) => {
      let index = payload.indexOf(word);
      safe.ignore[index] = word;
    });

    positive.forEach((word) => {
      payload = payload.replace(
        new RegExp(`${word}`, "gmi"),
        Array(word.length + 1).join(options.placeholder)
      );
    });
  }

  let index = 0;
  let cleaned = "";
  while (index <= payload.length) {
    let safeWord = safe.ignore[index];
    if (safeWord) {
      cleaned += safeWord;
      index += safeWord.length === 1 ? 0 : safeWord.length;
    }
    cleaned += payload.charAt(index);
    index++;
  }

  count = 0;
  for (const key of Object.keys(safe.special)) {
    let i = parseInt(key) + count;
    cleaned =
      cleaned.substring(0, parseInt(key) + count) +
      safe.special[key] +
      cleaned.substring(parseInt(key) + count);
    count++;
  }

  // adding all uppercase letters back
  for (const key of Object.keys(safe.upper)) {
    let i = parseInt(key);
    if (cleaned.charAt(i) !== options.placeholder) {
      cleaned =
        cleaned.substring(0, i) + safe.upper[i] + cleaned.substring(i + 1);
    }
  }

  // final clean up
  for (let i = 0; i < cleaned.length; i++) {
    let char = cleaned.charAt(i);
    let right = cleaned.charAt(i + 1);
    let left = cleaned.charAt(i - 1);
    if (
      right &&
      left &&
      right === options.placeholder &&
      left === options.placeholder &&
      char.match(/[^\w\s]|_|\s/gim) &&
      char !== options.placeholder
    ) {
      cleaned = cleaned.substring(0, i) + cleaned.substring(i + 1);
    }
  }

  return cleaned;
};

module.exports = {
  getMiniLists,
  cleanPayload,
};
