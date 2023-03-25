function renderQuizzesPage(userQuizzes, allQuizzes) {
  mainEl.innerHTML = quizzesPageHTML(userQuizzes, allQuizzes);
}

function renderQuizzPage(quizz) {
  mainEl.innerHTML = quizzPageHTML(quizz);
  quizzEl = document.querySelectorAll(".quizz");
  quizzIdx = 0;
}

function renderResults(result, percentage) {
  console.log("renderrrr");
  mainEl.querySelector(".quizz-page").innerHTML += quizzResultHTML(result, percentage);
  scroll(mainEl.querySelector(".quizz-result"));
}

function renderLoader() {
  mainEl.innerHTML = /*html*/ `
  <div class="loader">
    <img src="./assets/loader.gif" alt="loader" />
    <p>Carregando</p>
  </div>`;
}

function scroll(el) {
  el.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center"
  });
}

const mainEl = document.querySelector("main");

let quizzEl;
let quizzPercentage;
let quizzIdx;
let playQuizz;
const quizzQuestionsCounter = {
  questions: 0,
  answered: 0,
  correct: 0
};
