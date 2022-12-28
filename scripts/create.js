function renderBasicInfo() {
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
  createQuiz = {};
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
    isNaN(quizzLevels.value) || Number(quizzLevels.value) < 2;

  displayErr(quizzTitle, quizzTitleCond);
  displayErr(quizzImage, quizzImageCond);
  displayErr(quizzQuestionsAmount, quizzQuestionsAmountCond);
  displayErr(quizzLevels, quizzLevelsCond);

  if (
    !(
      quizzTitleCond ||
      quizzImageCond ||
      quizzQuestionsAmountCond ||
      quizzLevelsCond
    )
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
        ${getPairHTML(0)}

        <h3>Respostas incorretas</h3>
        ${getPairHTML(1)}
        ${getPairHTML(2)}
        ${getPairHTML(3)}
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
  autoCloseDetails();
}

function getQuestions() {
  const forms = document.querySelectorAll(".form");
  createQuestions = [];

  forms.forEach(form => {
    const quizzQuestionText = form.querySelector(".quizz-question-text");
    const quizzQuestionColor = form.querySelector(".quizz-question-color");

    const quizzRightAnswer = form.querySelector(".quizz-right-answer");
    const quizzRightAnswerImg = form.querySelector(".quizz-right-answer-img");

    const quizzWrongAnswers = form.querySelectorAll(".quizz-wrong-answer");
    const quizzWrongAnswersImg = form.querySelectorAll(
      ".quizz-wrong-answer-img"
    );

    const quizzQuestionTextCond = quizzQuestionText.value.length < 20;
    const quizzQuestionColorCond = !/^#([\dA-Fa-f]{3}){1,2}$/i.test(
      quizzQuestionColor.value
    );

    const quizzRightAnswerCond = quizzRightAnswer.value.length === 0;
    const quizzRightAnswerImgCond =
      quizzRightAnswerImg.value.length === 0 ||
      !quizzRightAnswerImg.checkValidity();

    displayErr(quizzQuestionText, quizzQuestionTextCond);
    displayErr(quizzQuestionColor, quizzQuestionColorCond);
    displayErr(quizzRightAnswer, quizzRightAnswerCond);
    displayErr(quizzRightAnswerImg, quizzRightAnswerImgCond);

    const wrongs = [];
    let firstWrong;
    for (let i = 0; i < 3; i++) {
      const wrong = quizzWrongAnswers[i];
      const wrongImg = quizzWrongAnswersImg[i];

      if (wrong.value || wrongImg.value) {
        const wrongCond = wrong.value.length === 0;
        const wrongImgCond =
          wrongImg.value.length === 0 || !wrongImg.checkValidity();
        displayErr(wrong, wrongCond);
        displayErr(wrongImg, wrongImgCond);
        if (!(wrongCond || wrongImgCond)) {
          wrongs.push({
            text: wrong.value,
            image: wrongImg.value,
            isCorrectAnswer: false,
          });
        }
      } else {
        displayErr(wrong, false);
        displayErr(wrongImg, false);
      }
    }

    if (wrongs.length === 0) {
      displayErr(quizzWrongAnswers[0], quizzWrongAnswers[0].value.length === 0);
      displayErr(
        quizzWrongAnswersImg[0],
        quizzWrongAnswersImg[0].value.length === 0 ||
          !quizzWrongAnswersImg[0].checkValidity()
      );
    } else if (
      !(
        quizzQuestionTextCond ||
        quizzQuestionColorCond ||
        quizzRightAnswerCond ||
        quizzRightAnswerImgCond
      )
    ) {
      const hexColor = quizzQuestionColor.value;

      createQuestions.push({
        title: quizzQuestionText.value,
        color: hexColor.length === 7 ? hexColor : expandHEX(hexColor),
        answers: [
          ...wrongs,
          {
            text: quizzRightAnswer.value,
            image: quizzRightAnswerImg.value,
            isCorrectAnswer: true,
          },
        ],
      });
    }
  });

  if (createQuestions.length === createQuestionsCount) {
    createQuiz.questions = createQuestions;
    renderLevels();
  }
}

function getPairHTML(index) {
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
        placeholder="URL da imagem ${placeholder2}" />
      <p class="err">O valor informado não é uma URL válida</p>
    </div>
  </div>
  `;
}

function renderLevels() {
  let html = "";
  for (let i = 1; i <= createLevelsCount; i++) {
    html += `
    <div class="container">
    <details>
      <summary>
        <h3>Nível ${i}</h3>
        <ion-icon name="create-outline"></ion-icon>
      </summary>
      <div class="form">
        <div>
          <input
            class="quizz-level-title"
            type="text"
            placeholder="Título do nível" />
          <p class="err">O título deve ter no mínimo 10 caracteres</p>
        </div>
        <div>
          <input
            class="quizz-level-percentage"
            type="text"
            placeholder="% de acerto mínima" />
          <p class="err">Porcentagem deve estar entre 0 e 100</p>
        </div>

        <div>
          <input
          class="quizz-level-image"
          type="url"
          required
          placeholder="URL da imagem do nível" />
          <p class="err">O valor informado não é uma URL válida</p>
        </div>
        <div>
          <textarea class="quizz-level-desc" placeholder="Descrição do nível"></textarea>
          <p class="err">A descrição deve ter no mínimo 30 caracteres</p>
        </div>
      </div>
    </details>
    </div>
    `;
  }

  main.innerHTML = `
  <div class="create-quizz">
    <h2>Crie suas perguntas</h2>
      ${html}
      <p class="err-level"></p>
    <button class="red-btn" onclick="getLevels()">
      Finalizar Quizz
    </button>
  </div>
`;

  autoCloseDetails();
}

function getLevels() {
  const forms = document.querySelectorAll(".form");
  const createLevels = [];
  let hasZero = false;
  forms.forEach(form => {
    const quizzLevelTitle = form.querySelector(".quizz-level-title");
    const quizzLevelPercentage = form.querySelector(".quizz-level-percentage");
    const quizzLevelImage = form.querySelector(".quizz-level-image");
    const quizzLevelDesc = form.querySelector(".quizz-level-desc");

    const quizzLevelTitleCond = quizzLevelTitle.value.length < 10;
    const quizzLevelPercentageCond = !isValidPercentage(
      quizzLevelPercentage.value
    );
    const quizzLevelImageCond = !quizzLevelImage.checkValidity();
    const quizzLevelDescCond = quizzLevelDesc.value.length < 30;

    displayErr(quizzLevelTitle, quizzLevelTitleCond);
    displayErr(quizzLevelPercentage, quizzLevelPercentageCond);
    displayErr(quizzLevelImage, quizzLevelImageCond);
    displayErr(quizzLevelDesc, quizzLevelDescCond);

    if (!quizzLevelPercentageCond) {
      if (parseInt(quizzLevelPercentage.value) === 0) hasZero = true;
      if (!(quizzLevelTitleCond || quizzLevelImageCond || quizzLevelDescCond)) {
        createLevels.push({
          title: quizzLevelTitle.value,
          image: quizzLevelImage.value,
          text: quizzLevelDesc.value,
          minValue: parseInt(quizzLevelPercentage.value),
        });
      }
    }
  });

  displayErrLevel(!hasZero);
  if (hasZero && createLevels.length === createLevelsCount) {
    createQuiz.levels = createLevels;
    postQuizz();
  }
}

function postQuizz() {
  const promise = axios.post(URI, createQuiz);
  promise
    .then(response => {
      const { id, key, title, image } = response.data;
      saveLocalStorage(id, key);
      renderSuccess(id, title, image);
    })
    .catch(logErr);
  renderLoader();
}

function renderSuccess(id, title, image) {
  main.innerHTML = `
  <div class="create-quizz">
    <h2>Seu quizz está pronto!</h2>
    <article class="quiz">
      <img
        src="${image}"
        alt="${title}" />
      <h3>${title}</h3>
    </article>
    <div class="play-btns">
      <button class="red-btn" onclick="play(${id})">Acessar Quizz</button>
      <button class="transparent-btn" onclick="getQuizzes()">Voltar pra home</button>
    </div>
  </div>
  `;
}

function isValidPercentage(percentage) {
  if (isNaN(percentage)) return false;
  percentage = parseInt(percentage);
  return percentage >= 0 && percentage <= 100;
}

function autoCloseDetails() {
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

function displayErr(el, cond) {
  if (cond) el.parentNode.classList.add("input-err");
  else el.parentNode.classList.remove("input-err");
}

function displayErrLevel(cond) {
  const errLevel = document.querySelector(".err-level");
  errLevel.textContent = cond ? "Pelo menos um nível deve ter 0%" : "";
}

let createQuestions;
let createAnswers;
let createLevels;
let createQuestionsCount;
let createLevelsCount;
