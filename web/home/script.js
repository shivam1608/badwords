const openGithub = () => {
  window.location = "https://github.com/shivam1608/badwords";
};

const intToString = (num) => {
  num = num.toString().replace(/[^0-9.]/g, '');
  if (num < 1000) {
      return num;
  }
  let si = [
    {v: 1E3, s: "K"},
    {v: 1E6, s: "M"},
    {v: 1E9, s: "B"},
    {v: 1E12, s: "T"},
    {v: 1E15, s: "P"},
    {v: 1E18, s: "E"}
    ];
  let index;
  for (index = si.length - 1; index > 0; index--) {
      if (num >= si[index].v) {
          break;
      }
  }
  return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
}

const sendDemoRequest = async (req) => {
  let time = Date.now();
  let response = await fetch("/api/clean", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: req,
  });
  response = await response.json();
  response = response.value;
  time = Date.now() - time + "ms";
  return new Promise((resolve) => {
    resolve({ response, time });
  });
};

const getApiInfo = async () => {
  let response = await fetch("/api");
  response = await response.json();
  let totalwords = intToString(response.data.totalwords);
  let total = response.data.total;
  return new Promise((resolve) => {
    resolve({ totalwords, total });
  });
};

window.onload = () => {
  document.getElementsByClassName("hidden-text")[0].classList.remove("hidden");
};
