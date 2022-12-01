const { applyLayer } = require("./layers");

test("returns the modified text after applying layer 1", () => {
  expect(
    applyLayer(1, "fucker b-i-t-c-h this might be off-ensiv_e fu ck").modified
  ).toBe("fuckerbitchthismightbeoffensivefuck");
});

test("returns the modified text after applying", () => {
  expect(
    applyLayer(2, "fucker b-i-t-c-h this might be off-ensiv_e fu ck").modified
  ).toBe("fucker b-i-t-c-h this might be o-ensiv_e fu ck");
});
