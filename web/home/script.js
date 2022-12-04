const openGithub = () => {
  window.location = "https://github.com/shivam1608/badwords";
};


const sendDemoRequest = async (req) => {
  let time = Date.now();
  let response = await fetch("/api/clean" , {
    headers : {
      "Content-Type" : "application/json"
    },
    method : "POST",
    body : req , 
  });
  response = await response.json();
  response = response.value;
  time=(Date.now()-time)+"ms"
  return new Promise((resolve)=>{
    resolve({response , time});
  });
}

const getApiInfo = async () => {
  let response = await fetch("/api");
  response = await response.json();
  let totalwords = response.data.totalwords;
  let total = response.data.total;
  return new Promise((resolve) => {
    resolve({totalwords , total});
  })
}

window.onload = () => {
  document.getElementsByClassName("hidden-text")[0].classList.remove("hidden");
};
