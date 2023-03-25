function renderQuizzesPage(userQuizzes, allQuizzes) {
  mainEl.innerHTML = quizzesPageHTML(userQuizzes, allQuizzes);
}

function renderQuizzPage(quizz) {
  mainEl.innerHTML = quizzPageHTML(quizz);
  quizzQuestionsEl = document.querySelectorAll(".quizz");
  quizzIdx = 1;
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

let quizzQuestionsEl;
let quizzPercentage;
let quizzIdx;
const quizzQuestionsCounter = {
  questions: 0,
  answered: 0,
  correct: 0
};
