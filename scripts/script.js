const URI = "https://mock-api.driven.com.br/api/v4/buzzquizz";

function playTemp(id) {
  console.log("PLAY " + id);
}

function editTemp(e) {
  e.stopPropagation();
  console.log("EDIT");
}

function delTemp(e) {
  e.stopPropagation();
  console.log("DEL");
}

function createTemp() {
  console.log("CREATE");
}

function logErr(err) {
  console.log(err);
}

const main = document.querySelector("main");
