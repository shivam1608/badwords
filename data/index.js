const _ = require("lodash");
const { applyLayer } = require("../utils/layers");
const { getMiniLists, cleanPayload } = require("../utils/payload");

const wordlist = {
  0: require("./en_english"), // English wordlist
  1: require("./hen_hinglish"), // Hinglish wordlist
  2: require("./hi_hindi"), // Hindi wordlist
};

/**
 * returns the array of all keys languages working in memory
 */
const getTotal = () => {
  return Object.keys(wordlist);
};

/**
 * returns all the language with their codes
 */
const langInfo = () => {
  let info = {};
  for (const key of Object.keys(wordlist)) {
    info[key] = wordlist[key].name;
  }
  info["total"] = Object.keys(wordlist).length;
  return info;
};

/**
 * checks if the world list contains a word or not returns boolean
 *
 * @param  word the single word to check for no spaces
 * @param options the options for calculations
 */
const contains = (word, options) => {
  let response = false;
  word = word.toLowerCase();
  for (const key of options.languages) {
    if (_.indexOf(wordlist[key].positive, word) != -1) {
      response = true;
      break;
    }
  }
  return response;
};

/**
 *
 * @param {string} payload the payload from user
 * @param {object} options the highly customisable set of options
 * @returns object containing all negative and positive tests
 */
const listAll = (payload, options) => {
  return getMiniLists(payload, options, wordlist);
};

/**
 * a simple function to replace badwords with a placeholder
 * @param {string} paragraph
 * @param {json object} options
 */
const simpleClean = (paragraph, options) => {
  let data = [];
  paragraph.split(options.splitter).forEach((word) => {
    data.push(
      contains(word, options)
        ? Array(word.length + 1).join(options.placeholder)
        : word
    );
  });
  return data.join(options.joiner);
};

/**
 *
 * @param {string} payload the payload from user
 * @param {object} options the highly customisable set of options
 * @returns cleaned text is returned
 */
const clean = (payload, options) => {
  let miniObject = listAll(payload, options);
  let cleaned = payload;
  let template = [];

  // Apply nested layers
  for (let layer of options.layers) {
    let layerTemplate = Array(cleaned.length);
    let { modified, matches } = applyLayer(layer, cleaned);

    matches.forEach((match) => {
      if (match[0].length !== 1) {
        for (let o = 0; o < match[0].length - 1; o++) {
          layerTemplate[match.index + o] = cleaned.charAt(match.index + o);
        }
      } else {
        layerTemplate[match.index] = cleaned.charAt(match.index);
      }
    });
    template.push(layerTemplate);
    cleaned = cleanPayload(modified, options, miniObject);
  }

  // Adding cleaned to original template
  while (template.length > 0) {
    let layerTemplate = template.pop();
    let count = 0;
    for (let i = 0; i < layerTemplate.length; i++) {
      if (layerTemplate[i] === undefined) {
        layerTemplate[i] = cleaned[count];
        count++;
      }
    }
    cleaned = layerTemplate.join("");
  }

  // final cleenup of cleaned content to prevent extra bypassing
  for (let i = 0; i < cleaned.length; i++) {
    let char = cleaned.charAt(i);
    let right = cleaned.charAt(i + 1);
    let left = cleaned.charAt(i - 1);
    if (
      right &&
      left &&
      right === options.placeholder &&
      left === options.placeholder &&
      char !== options.placeholder
    ) {
      cleaned =
        cleaned.substring(0, i) +
        options.placeholder +
        cleaned.substring(i + 1);
    }
  }

  return cleaned;
};

module.exports = {
  simpleClean,
  contains,
  getTotal,
  langInfo,
  listAll,
  clean,
};
