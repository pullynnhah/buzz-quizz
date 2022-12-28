function play(id) {
  answerCount = 0;
  rightCount = 0;
  const promise = axios.get(`${URI}/quizzes/${id}`);

  promise.then(renderPlayQuiz).catch(logErr);
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
  </div>
  `;

  quests = document.querySelectorAll(".questions");
}

function getQuestionHTML(question, index) {
  question.answers.sort(() => Math.random() - 0.5);
  return `
  <div class="questions">
    <article>
      <div class="container">
        <h3 class="question">
          Em qual animal Olho-Tonto Moody transfigurou Malfoy?
        </h3>
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
      setTimeout(
        () =>
          quests[answerCount].scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          }),
        2000
      );
    } else {
      setTimeout(renderScore, 2000);
    }
  }
}

function renderScore() {
  main.innerHTML += `
  
  `;
  calcScore();
}

function calcScore() {
  const levels = playQuiz.levels
    .map(level => ({ ...level, minValue: Number(level.minValue) }))
    .sort((a, b) => a.minValue - b.minValue);
  const percentage = Math.round((rightCount * 100) / playQuiz.questions.length);
  let i = 0;
  for (i = 0; i < levels.length; i++) {
    if (levels[i].minValue > percentage) {
      break;
    }
  }

  return levels[i - 1];
}
