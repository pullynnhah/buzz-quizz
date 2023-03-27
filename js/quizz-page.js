function quizzOptionsHTML(options) {
  options.sort(() => Math.random() - 0.5);
  return /*html*/ `
  <div class="quizz-options">
    ${options.reduce((acc, option) => acc + quizzOptionHTML(option), "")}
  </div>`;
}

function quizzOptionHTML(option) {
  return /*html*/ `
  <div onclick="clickOption(this)" class="quizz-option${option.isCorrectAnswer ? " correct" : ""}">
    <img src=${option.image} alt=${option.text} />
    <p>${option.text}</p>
  </div>
  `;
}

function bannerHTML(quizz) {
  return /*html*/ `
  <div class="banner">
    <img
      src=${quizz.image}
      alt=${quizz.title} />
    <h2>${quizz.title}</h2>
  </div>`;
}

function quizzQuestionHTML(question) {
  return /*html*/ `
  <div class="quizz">
    <div class="quizz-question" style="background-color: ${question.color}">
      <h3>${question.title}</h3>
    </div>
    ${quizzOptionsHTML(question.answers)}
  </div>
  `;
}

function quizzQuestionsHTML(questions) {
  quizzQuestionsCounter.questions = questions.length;
  quizzQuestionsCounter.answered = 0;
  quizzQuestionsCounter.correct = 0;
  return questions.reduce((acc, question) => acc + quizzQuestionHTML(question), "");
}

function quizzResultHTML(result, percentage) {
  return /*html*/ `
  <div class="quizz-result">
    <div class="quizz-question" style="background-color: ${result.color}">
      <h3>${percentage}% de acerto: ${result.title}</h3>
    </div>
    <div class="result-container">
      <img src=${result.image} alt=${result.title} />
      <p>${result.text}</p>
    </div>
  </div>
  `;
}

function quizzPageHTML(quizz) {
  return /*html*/ `
  <div class="quizz-page">
    ${bannerHTML(quizz)}
    <div class="quizzes">${quizzQuestionsHTML(quizz.questions)}</div>
    <div class="nav-buttons">
      <button class="red-btn" onclick="getQuizz(playQuizz.id)">Reiniciar Quizz</button>
      <button class="btn" onclick="getQuizzes()">Voltar pra home</button>
    </div>
  </div>`;
}

function clickOption(el) {
  if (!el.parentNode.parentNode.classList.contains("played")) {
    el.parentNode.parentNode.classList.add("played");
    el.classList.add("selected");
    if (el.classList.contains("correct")) {
      quizzQuestionsCounter.correct++;
    }
    if (++quizzQuestionsCounter.answered === quizzQuestionsCounter.questions) {
      quizzPercentage = Math.round(
        (100 * quizzQuestionsCounter.correct) / quizzQuestionsCounter.questions
      );

      setTimeout(
        renderResults,
        2000,
        calculateResult(playQuizz.levels, quizzPercentage),
        quizzPercentage
      );
    } else {
      setTimeout(scroll, 2000, quizzEl[++quizzIdx]);
    }
  }
}

function calculateResult(results, percentage) {
  results.sort();

  let result;
  for (let i = 0; i < results.length; i++) {
    if (results[i].minValue > percentage) break;
    result = results[i];
  }

  return result;
}
