const _ = require("lodash");
const { options } = require("..");
const { getMiniLists } = require("../utils/payload");

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

const clean = (payload, options) => {};

module.exports = {
  contains,
  getTotal,
  langInfo,
};
