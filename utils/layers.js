const applyLayer = (layer, payload) => {
  switch (layer) {
    case 1: {
      return payload;
    }
    case 2: {
      return payload.replace(/[^\w\s]|_|/gim, "");
    }
    case 3: {
      return payload.replace(/\s/gim, "");
    }
    case 4: {
      let altered = "";
      for (let i = 0; i < altered.length; i++) {
        let char = payload.charAt(i);
        if (altered.charAt(altered.length - 1) !== char) {
          altered += char;
        }
      }
      return altered;
    }
    default: {
      return payload;
    }
  }
};

module.exports = applyLayer;
