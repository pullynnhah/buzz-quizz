function infoFiller() {
  const infoEl = document.querySelector(".creation-page .quizz-info");
  const titleEl = infoEl.querySelector(".title input");
  const imageEl = infoEl.querySelector(".image input");
  const questionsCountEl = infoEl.querySelector(".questions-count input");
  const levelsCountEl = infoEl.querySelector(".levels-count input");

  titleEl.value = editQuizz.title;
  imageEl.value = editQuizz.image;
  questionsCountEl.value = String(editQuizz.questions.length);
  levelsCountEl.value = String(editQuizz.levels.length);
}

function questionsFiller() {
  const questionsEl = document.querySelectorAll(".creation-page .quizz-question");
  questionsEl.forEach(questionFiller);
}

function questionFiller(el, index) {
  const titleEl = el.querySelector(".title input");
  const colorEl = el.querySelector(".color input");

  const rightTextEl = el.querySelector(".right-text input");
  const rightImageEl = el.querySelector(".right-image input");

  const wrongTextEls = el.querySelectorAll(".wrong-text input");
  const wrongImageEls = el.querySelectorAll(".wrong-image input");

  titleEl.value = editQuizz.questions[index].title;
  colorEl.value = editQuizz.questions[index].color;
  let idx = 0;
  editQuizz.questions[index].answers.forEach(answer => {
    if (answer.isCorrectAnswer) {
      rightTextEl.value = answer.text;
      rightImageEl.value = answer.image;
    } else {
      wrongTextEls[idx].value = answer.text;
      wrongImageEls[idx++].value = answer.image;
    }
  });
}

function levelsFiller() {
  const levelsEl = document.querySelectorAll(".creation-page .quizz-level");
  levelsEl.forEach(levelFiller);
}

function levelFiller(el, index) {
  const titleEl = el.querySelector(".title input");
  const minValueEl = el.querySelector(".min-value input");
  const imageEl = el.querySelector(".image input");
  const textEl = el.querySelector(".text textarea");

  titleEl.value = editQuizz.levels[index].title;
  minValueEl.value = editQuizz.levels[index].minValue;
  imageEl.value = editQuizz.levels[index].image;
  textEl.value = editQuizz.levels[index].text;
}
