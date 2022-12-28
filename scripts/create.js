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
        required
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
  const quizzImageCond = !quizzImage.checkValidity();
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

function renderQuestions() {
  let html = "";
  for (let i = 1; i <= createQuestionsCount; i++) {
    html += `
    <div class="container">
    <details>
      <summary>
        <h3>Pergunta ${i}</h3>
        <ion-icon name="create-outline"></ion-icon>
      </summary>
      <div class="form">
        <div>
          <input
            class="quizz-question-text"
            type="text"
            placeholder="Texto da pergunta" />
          <p class="err">O texto deve ter no mínimo 20 caracteres</p>
        </div>
        <div>
          <input
            class="quizz-question-color"
            type="text"
            placeholder="Cor de fundo da pergunta" />
          <p class="err">Cor de fundo deve estar em HEX</p>
        </div>

        <h3>Resposta correta</h3>
        ${getPair(0)}

        <h3>Respostas incorretas</h3>
        ${getPair(1)}
        ${getPair(2)}
        ${getPair(3)}
      </div>
    </details>
    </div>
    `;
  }

  main.innerHTML = `
  <div class="create-quizz">
    <h2>Crie suas perguntas</h2>
      ${html}
    <button class="red-btn" onclick="getQuestions()">
      Prosseguir pra criar níveis
    </button>
  </div>
  `;
  const dets = document.querySelectorAll("details");
  dets.forEach(target =>
    target.addEventListener("click", () =>
      dets.forEach(det => {
        if (det !== target) {
          det.removeAttribute("open");
        }
      })
    )
  );
}

function getPair(index) {
  const cls = index === 0 ? "right" : "wrong";
  const placeholder1 = index === 0 ? "correta" : `incorreta ${index}`;
  const placeholder2 = index === 0 ? "" : `${index}`;
  return `
  <div class="pair">
    <div>
      <input
        class="quizz-${cls}-answer"
        type="text"
        placeholder="Resposta ${placeholder1}" />
      <p class="err">A resposta não pode ser vazia</p>
    </div>
    <div>
      <input
        class="quizz-${cls}-answer-img"
        type="url"
        required
        placeholder="URL da imagem ${placeholder2}" />
      <p class="err">O valor informado não é uma URL válida</p>
    </div>
  </div>
  `;
}

function displayErr(el, cond) {
  if (cond) el.parentNode.classList.add("input-err");
  else el.parentNode.classList.remove("input-err");
}

let createQuestions;
let createLevels;
let createQuestionsCount = 3;
let createLevelsCount;

// renderBasicInfo();
renderQuestions();
