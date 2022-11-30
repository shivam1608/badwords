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

const check = () => {};

module.exports = {
  getMiniLists,
  check,
};
