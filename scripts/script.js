const URI = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";

function logErr(err) {
  console.log(err);
}

function delQuiz(e, id) {
  if (confirm("Deseja mesmo excluir esse quizz?")) {
    const key = loadLocalStorage()[`${id}`];
    const promise = axios.delete(`${URI}/${id}`, {
      headers: { "Secret-Key": key },
    });
    promise.then(getQuizzes).catch(logErr);
    renderLoader();
  }
}

function editQuiz(e, id) {
  e.stopPropagation();
  const promise = axios.get(`${URI}/${id}`);
  promise
    .then(response => {
      editId = id;
      editPages = formatInputs(response.data);
      renderBasicInfo();
    })
    .catch(logErr);
  renderLoader();
}

function formatInputs(quiz) {
  const { title, image, questions, levels } = quiz;
  const pages = [];
  pages.push([title, image, questions.length, levels.length]);
  pages.push(questionsToArray(questions));
  pages.push(
    levels
      .map(({ title, image, text, minValue }) => [title, minValue, image, text])
      .flat()
  );
  return pages;
}

const main = document.querySelector("main");

// play.js variables
let playQuiz;
let quests;

let answerCount;
let rightCount;
let score;

// create.js variables
let editPages = null;
let createQuiz;
let editId;
