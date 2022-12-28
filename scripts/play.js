function play(id) {
  answerCount = 0;
  rightCount = 0;
  const promise = axios.get(`${URI}/${id}`);

  promise.then(renderPlayQuiz).catch(logErr);
  renderLoader();
}

function renderPlayQuiz(response) {
  playQuiz = response.data;
  const questions = playQuiz.questions.reduce(
    (ac, question, idx) => ac + getQuestionHTML(question, idx),
    ""
  );

  main.innerHTML = `
  <div class="play-quizz">
    <div class="banner">
      <img
        src="${playQuiz.image}"
        alt="${playQuiz.title}" />
      <h2>${playQuiz.title}</h2>
    </div>
    ${questions}
    <div class="result-wrapper"></div>
    ${getRestartBtnsHTML()}
  </div>
  `;

  quests = document.querySelectorAll(".questions");

  const questionList = document.querySelectorAll(".question");
  questionList.forEach((question, idx) => {
    question.style.background = playQuiz.questions[idx].color;
  });
}

function getQuestionHTML(question, index) {
  question.answers.sort(() => Math.random() - 0.5);
  return `
  <div class="questions">
    <article>
      <div class="container">
        <h3 class="question">${question.title}</h3>
        <div class="answers">${getAnswersHTML(question.answers, index)}</div>
      </div>
    </article>
  </div>
  `;
}

function getAnswersHTML(answers, index) {
  return answers.reduce((ac, answer, idx) => {
    return (
      ac +
      `
      <div class="option" 
           onclick="select(this, ${index}, ${idx})">
        <img
          src="${answer.image}"
          alt="${answer.text}" />
        <p>${answer.text}</p>
      </div>
    `
    );
  }, "");
}

function select(option, indexQuestion, indexAnswer) {
  const answers = option.parentNode;
  const question = answers.parentNode;
  if (!question.classList.contains("played")) {
    const options = playQuiz.questions[indexQuestion].answers.map(
      ({ isCorrectAnswer }) => isCorrectAnswer
    );

    question.classList.add("played");
    option.classList.add("selected");

    const opts = answers.querySelectorAll(".option");
    for (let i = 0; i < options.length; i++) {
      if (options[i]) {
        if (indexAnswer === i) {
          rightCount++;
        }
        opts[i].classList.add("correct");
        break;
      }
    }

    if (++answerCount < playQuiz.questions.length) {
      setTimeout(() => scroll(quests[answerCount]), 2000);
    } else {
      setTimeout(renderScore, 2000);
    }
  }
}

function renderScore() {
  score = Math.round((rightCount * 100) / playQuiz.questions.length);
  const lvl = calcLevel();
  document.querySelector(".result-wrapper").innerHTML += `
  <article class="result">
    <div class="container">
      <h3>${score}% de acerto: ${lvl.title}</h3>
      <img src="${lvl.image}" alt="${lvl.title}" />
      <p>${lvl.text}</p>
    </div>
  </article>
  `;

  scroll(document.querySelector(".result"));
}

function calcLevel() {
  const levels = playQuiz.levels
    .map(level => ({ ...level, minValue: Number(level.minValue) }))
    .sort((a, b) => a.minValue - b.minValue);

  let i = 0;
  for (i = 0; i < levels.length; i++) {
    if (levels[i].minValue > score) {
      break;
    }
  }

  return levels[i - 1];
}

function getRestartBtnsHTML() {
  return `
  <div class="play-btns">
    <button class="red-btn" onclick="play(${playQuiz.id})">Reiniciar Quizz</button>
    <button class="transparent-btn" onclick="getQuizzes()">Voltar pra home</button>
  </div>
  `;
}
