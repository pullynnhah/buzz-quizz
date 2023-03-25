function renderQuizzesPage(userQuizzes, allQuizzes) {
  mainEl.innerHTML = quizzesPageHTML(userQuizzes, allQuizzes);
}

const mainEl = document.querySelector("main");
