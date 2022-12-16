const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  DETA_RUNTIME : process.env.DETA_RUNTIME,
  LAYER_ONE_REGEX: /[^\w\s]|_|\s/gim,
  LAYER_TWO_REGEX: /([a-zA-Z0-9])\1+/gim,
};
