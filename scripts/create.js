function renderBasicInfo() {
  createQuiz = {};
  main.innerHTML = `
  <div class="create-quizz">
    <h2>Comece pelo começo</h2>
    <div class="container">
      <div class="form">
        <div>
          <input
          class="quizz-title"
          type="text"
          placeholder="Título do seu quizz" />
        <p class="err">O título deve ter entre 20 e 65 caracteres</p>
        </div>
        <div>
        <input
        class="quizz-image"
        type="url"
        placeholder="URL da imagem do seu quizz" />
        <p class="err">O valor informado não é uma URL válida</p>
        </div>
        <div>
          <input
          class="quizz-questions-amount"
          type="text"
          placeholder="Quantidade de perguntas do quizz" />
          <p class="err">O número de perguntas deve ser pelo menos 3</p>
        </div>
        <div>
          <input
          class="quizz-levels"
          type="text"
          placeholder="Quantidade de níveis do quizz" />
          <p class="err">A quantidade de níveis deve ser pelo menos 2</p>
        </div>
      </div>
    </div>
    <button class="red-btn" onclick="getBasicInfo()">Prosseguir pra criar perguntas</button>
  </div>
`;
}

function getBasicInfo() {
  const quizzTitle = document.querySelector(".quizz-title");
  const quizzImage = document.querySelector(".quizz-image");
  const quizzQuestionsAmount = document.querySelector(
    ".quizz-questions-amount"
  );
  const quizzLevels = document.querySelector(".quizz-levels");

  const quizzTitleCond =
    quizzTitle.value.length < 20 || quizzTitle.value.length > 65;
  const quizzImageCond =
    quizzImage.value.length === 0 || !quizzImage.checkValidity();
  const quizzQuestionsAmountCond =
    isNaN(quizzQuestionsAmount.value) || Number(quizzQuestionsAmount.value) < 3;
  const quizzLevelsCond =
    !isNaN(quizzLevels.value) || Number(quizzLevels.value) < 2;

  displayErr(quizzTitle, quizzTitleCond);
  displayErr(quizzImage, quizzImageCond);
  displayErr(quizzQuestionsAmount, quizzQuestionsAmountCond);
  displayErr(quizzLevels, quizzLevelsCond);

  if (
    quizzTitleCond &&
    quizzImageCond &&
    quizzQuestionsAmountCond &&
    quizzLevelsCond
  ) {
    createQuiz.title = quizzTitle.value;
    createQuiz.image = quizzImage.value;
    createQuestionsCount = Number(quizzQuestionsAmount.value);
    createLevelsCount = Number(quizzLevels.value);
    renderQuestions();
  }
}

function displayErr(el, cond) {
  if (cond) el.parentNode.classList.add("input-err");
  else el.parentNode.classList.remove("input-err");
}

let createQuestions;
let createLevels;
let createQuestionsCount;
let createLevelsCount;

renderBasicInfo();
