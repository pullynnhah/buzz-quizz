function renderQuizzesPage(userQuizzes, allQuizzes) {
  mainEl.innerHTML = quizzesPageHTML(userQuizzes, allQuizzes);
}

function renderLoader() {
  mainEl.innerHTML = /*html*/ `
  <div class="loader">
    <img src="./assets/loader.gif" alt="loader" />
    <p>Carregando</p>
  </div>`;
}
const mainEl = document.querySelector("main");
