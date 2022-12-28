function getQuizzes() {
  const promise = axios.get(`${URI}/quizzes`);
  promise.then(renderQuizzes).catch(logErr);
  renderLoader();
}

function renderQuizzes(response) {
  const userIds = getQuizzesIds();

  const userQuizzes = [];
  const otherQuizzes = [];

  response.data.forEach(quiz => {
    if (userIds.includes(quiz.id)) userQuizzes.push(quiz);
    else otherQuizzes.push(quiz);
  });

  main.innerHTML = `
  <div class="all-quizzes">
    ${getUserQuizzesHTML(userQuizzes)}
    ${getOtherQuizzesHTML(otherQuizzes)}
  </div>
  `;
}

function getUserQuizzesHTML(quizzes) {
  if (quizzes.length === 0) {
    return `
    <div class="no-quizzes">
      <p>
        Você não criou nenhum<br />
        quizz ainda :(
      </p>
      <button onclick="createTemp()">Criar Quizz</button>
    </div>
    `;
  }

  const html = quizzes.reduce((ac, quiz) => {
    return (
      ac +
      `
    <article class="quiz" onclick="play(${quiz.id})">
      <img
        src="${quiz.image}"
        alt="${quiz.title}" />
      <h3>${quiz.title}.</h3>

      <div class="container-btns">
        <ion-icon
          onclick="editTemp(event, ${quiz.id})"
          name="create-outline"></ion-icon>
        <ion-icon
          onclick="delTemp(event, ${quiz.id})"
          name="trash-outline"></ion-icon>
      </div>
    </article>
    `
    );
  }, "");

  return `
  <section class="user-quizzes" aria-labelledby="user-quizzes">
    <div class="title">
      <h2 id="user-quizzes">Seus Quizzes</h2>
      <ion-icon onclick="createTemp()" name="add-circle"></ion-icon>
    </div>
    <div class="quizzes">
    ${html}
    </div>
  </section>
  `;
}

function getOtherQuizzesHTML(quizzes) {
  const html = quizzes.reduce((ac, quiz) => {
    return (
      ac +
      `
    <article class="quiz" onclick="play(${quiz.id})">
      <img
        src="${quiz.image}"
        alt="${quiz.title}" />
      <h3>${quiz.title}.</h3>
    </article>
    `
    );
  }, "");

  return `
  <section class="other-quizzes" aria-labelledby=other-quizzes">
    <h2 id="other-quizzes">Todos os Quizzes</h2>
    <div class="quizzes">
    ${html}
    </div>
  </section>
  `;
}

// getQuizzes();
