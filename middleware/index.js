const { getTotal } = require("../data");

const check = (req, res, next) => {
  let method = req.method;
  let options = undefined;
  let payload = undefined;

  switch (method) {
    case "GET": {
      payload = req.query.payload;
      break;
    }
    case "POST": {
      payload = req.body.payload;
      options = req.body.options;
      break;
    }
  }

  if (!payload) {
    res.send({ error: true, message: "📄 payload not specified" });
    return;
  }

  if (!options) {
    options = {};
  }
  options.languages = options.languages ?? getTotal();
  options.placeholder =
    options.placeholder && options.placeholder.length === 1
      ? options.placeholder
      : "*";
  options.splitter = options.splitter ?? " ";
  options.joiner = options.joiner ?? " ";
  options.exclude = options.exclude ? options.exclude : [];
  options.layers = options.layers ?? 2;

  if (typeof options.layers === "number") {
    options.layers = [...Array(options.layers)].map((_, i) => i + 1);
  }

  req.payload = payload;
  req.options = options;

  next();
};

module.exports = check;
