function getQuizzesIds() {
  return [...Object.keys(loadLocalStorage())].map(Number);
}

function renderLoader() {
  main.innerHTML = `
  <div class="loader">
    <img src="./assets/load.gif" alt="gear loader" />
    <p>Carregando...</p>
  </div>
  `;
}

function scroll(el) {
  el.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });
}

function expandHEX(hex) {
  return [...hex.slice(1)].reduce((ac, digit) => ac + digit.repeat(2), "#");
}

function questionsToArray(questions) {
  return questions
    .map(({ title, color, answers }) => [
      title,
      color,
      ...answersToArray(answers),
    ])
    .flat();
}

function answersToArray(answers) {
  while (answers.length < 4) {
    answers.push({
      text: "",
      image: "",
      isCorrectAnswer: false,
    });
  }

  const [right, wrong] = answers.reduce(
    ([pass, fail], answer) =>
      answer.isCorrectAnswer
        ? [[...pass, answer], fail]
        : [pass, [...fail, answer]],
    [[], []]
  );
  const flatWrong = wrong.map(w => [w.text, w.image]).flat();
  return [right[0].text, right[0].image, ...flatWrong];
}
