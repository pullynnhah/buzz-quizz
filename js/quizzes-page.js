function noQuizzesHTML() {
  return /*html*/ `
  <div class="no-quizzes">
    <p>Você não criou nenhum<br />quizz ainda :(</p>
    <button onclick="renderCreationPage(${creationIndex++}, ${isCreationFill})">Criar Quizz</button>
  </div>
  `;
}

function allQuizzesHTML(quizzes) {
  const quizzesHTML = quizzes.reduce(
    (acc, quizz) =>
      acc +
      /*html*/ `
    <article class="quizz" onclick="getQuizz(${quizz.id})">
      <img src=${quizz.image} alt=${quizz.title} />
      <h3>${quizz.title}</h3>
    </article>
    `,
    ""
  );

  return /*html*/ `
  <section class="all-quizzes" aria-labelledby="all-quizzes-title">
    <div class="quizzes-header">
      <h2 id="all-quizzes-title">Todos os Quizzes</h2>
    </div>
    <div class="quizzes-list">${quizzesHTML}</div>
  </section>
  `;
}

function userQuizzesHTML(quizzes) {
  const quizzesHTML = quizzes.reduce(
    (acc, quizz) =>
      acc +
      /*html*/ `
    <article class="quizz" onclick="getQuizz(${quizz.id})">
      <img src=${quizz.image} alt=${quizz.title} />
      <h3>${quizz.title}</h3>
      <div class="edit-container">
        <ion-icon name="create-outline"></ion-icon>
        <ion-icon name="trash-outline"></ion-icon>
      </div>
    </article>
    `,
    ""
  );

  return /*html*/ `
  <section class="user-quizzes" aria-labelledby="user-quizzes-title">
    <div class="quizzes-header">
      <h2 id="user-quizzes-title">Seus Quizzes</h2>
      <ion-icon onclick="renderCreationPage(${creationIndex++}, ${isCreationFill})" name="add-circle"></ion-icon>
    </div>
    <div class="quizzes-list">${quizzesHTML}</div>
  </section>
  `;
}

function quizzesPageHTML(userQuizzes, allQuizzes) {
  return /*html*/ `
  <div class="quizzes-page">
    ${userQuizzes.length === 0 ? noQuizzesHTML() : userQuizzesHTML(userQuizzes)}
    ${allQuizzesHTML(allQuizzes)}
  </div>
  `;
}
