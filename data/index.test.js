const { listAll, clean } = require(".");

test("Returns the json object with all positive & negative test in wordlist", () => {
  expect(
    listAll("fuck off assassin's bitch", {
      languages: [0],
      layers: [1,2],
      exclude: [],
    })
  ).toStrictEqual({
    positive: ["fuck", "ass"],
    negative: ["assassin"],
  });
});

test("returns censored cleaned text", () => {
  expect(
    clean("f-u-c-k off a s s h o l e with assassin's ass", {
      languages: [0],
      layers: [1,2],
      placeholder: "*",
      exclude: [],
    })
  ).toBe("******* off ************* with assassin's ***");
});
