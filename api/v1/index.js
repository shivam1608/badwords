/**
 * API Specification
 * /langs -> [POST , GET] => get all the language codes
 * /check -> [POST , GET] => checks if a **single** word is present in the list
 * /listall -> [POST , GET] => list's all the badwords included in the payload (UTF-8)
 * /clean -> [POST , GET] => deep cleans (censor) payload (UTF-8)
 * /simpleclean -> [POST , GET] => simple cleans (censor) payload **word by word**
 */

const express = require("express");
const { DETA_RUNTIME } = require("../../config");
const {
  listAll,
  clean,
  simpleClean,
  langInfo,
  contains,
} = require("../../data");
const check = require("../../middleware");

const api = express.Router();
api.use(express.json());
api.use(express.urlencoded({ extended: true }));

// Ratelimiters don't work and are unnecessary on Deta, only enable ratelimiter if not on Deta
if (DETA_RUNTIME !== 'true') {
  const ratelimiter = require("express-rate-limit");
  const limiter = ratelimiter({
    windowMs: 1000, // 1 seconds
    max: 4, // Limit each IP to 4 Query/Second
    standardHeaders: true,
    legacyHeaders: false,
  });
  api.use(limiter);
}

api.get("/", (req, res) => {
  res.send({
    message: "API Server is Running 🟢",
    info: "online",
    maintenance: false,
    data: langInfo(),
  });
});

// Get language codes
api.all("/langs", (req, res) => {
  res.send(langInfo());
});

/**
 * Now all endpoints which require payload
 */
api.use(check);

api.all("/check", (req, res) => {
  res.send({ value: contains(req.payload.toLowerCase().trim(), req.options) });
});

api.all("/listall", (req, res) => {
  res.send(listAll(req.payload.toLowerCase().trim(), req.options));
});

// Deep Clean (only works for alphabetical based languages)
api.all("/clean", (req, res) => {
  res.send({ value: clean(req.payload.trim(), req.options) });
});

// Simple Clean
api.all("/simpleclean", (req, res) => {
  res.send({ value: simpleClean(req.payload.trim(), req.options) });
});

module.exports = api;
