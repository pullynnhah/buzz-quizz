const URI = "https://mock-api.driven.com.br/api/vs/buzzquizz/quizzes";

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
  // TODO: replace all with reload
  console.log(err);
}

const main = document.querySelector("main");

// play.js variables
let playQuiz;
let quests;

let answerCount;
let rightCount;
let score;

// create.js variables
let createQuiz;
