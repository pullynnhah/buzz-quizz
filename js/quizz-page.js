function quizzOptionsHTML(options) {
  quizzQuestionsCounter.questions = options.length;
  quizzQuestionsCounter.answers = 0;
  quizzQuestionsCounter.correct = 0;

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
  return questions.reduce((acc, question) => acc + quizzQuestionHTML(question), "");
}

function quizzPageHTML(quizz) {
  return /*html*/ `
  <div class="quizz-page">
    ${bannerHTML(quizz)}
    ${quizzQuestionsHTML(quizz.questions)}
  </div>`;
}

function clickOption(el) {
  if (!el.parentNode.parentNode.classList.contains("played")) {
    el.parentNode.parentNode.classList.add("played");
    el.classList.add("selected");
    if (el.classList.contains("correct")) {
      quizzQuestionsCounter.correct++;
    }
    quizzTotalQuestionsCount++;
    if (quizzQuestionsCounter.questions === ++quizzQuestionsCounter.answered) {
      quizzPercentage = Math.round(
        (100 * quizzQuestionsCounter.correct) / quizzQuestionsCounter.questions
      );
      // renderResults(quizzPercentage);
    } else {
      setTimeout(scroll, 2000, quizzQuestionsEl[quizzIdx++]);
    }
  }
}
