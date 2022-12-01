const { LAYER_ONE_REGEX, LAYER_TWO_REGEX } = require("../config");

const getMatch = (regex, payload, replace = "") => {
  let match = null;
  let allMatch = [];
  while ((match = regex.exec(payload)) != null) {
    allMatch.push(match);
  }
  return { modified: payload.replace(regex, replace), matches: allMatch };
};

const applyLayer = (layer, payload) => {
  switch (layer) {
    case 1: {
      return getMatch(LAYER_ONE_REGEX, payload);
    }
    case 2: {
      return getMatch(LAYER_TWO_REGEX, payload, "$1");
    }
    default: {
      return getMatch(/(.)/gim, payload);
    }
  }
};

module.exports = { applyLayer };
