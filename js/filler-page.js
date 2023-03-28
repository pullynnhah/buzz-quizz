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
