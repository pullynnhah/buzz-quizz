function quizzInfoHTML() {
  return /*html*/ `
    <div class="creation-page">
      <h2>Comece pelo começo</h2>
      <div class="quizz-info">
        <div class="title">
          <input type="text" placeholder="Título do seu quizz" />
          <p>O título do quizz deve ter entre 20 a 65 caracteres</p>
        </div>
        <div class="image">
          <input type="url" inputmode="url" placeholder="URL da imagem do seu quizz" />
          <p>O valor informado não é uma URL válida</p>
        </div>
        <div class="questions-count">
          <input type="text" inputmode="numeric" placeholder="Quantidade de perguntas do quizz" />
          <p>O quizz deve ter no mínimo 3 perguntas</p>
        </div>
        <div class="levels-count">
          <input type="text" inputmode="numeric" placeholder="Quantidade de níveis do quizz" />
          <p>O quizz deve ter no mínimo 2 levels</p>
        </div>
      </div>
      <button onclick="getQuizzInfo()" class="red-btn">Prosseguir pra criar perguntas</button>
    </div>
  `;
}

function quizzQuestionsHTML() {
  const questionsCount = creationQuizz.questions.length;
  return /*html*/ `
  <div class="creation-page">
    <h2>Crie suas perguntas</h2>

    <button class="red-btn">Prosseguir pra criar níveis</button>
  </div>

  `;
}

function quizzQuestionsHTML(questionsCount) {
  const html = "";
}
function quizzQuestionHTML(questionIndex) {
  return /*html*/ `
    <div class="quizz-questions">
      <details ${questionIndex ? "" : "open"}>
        <summary>
          <h3>Pergunta ${questionIndex + 1}</h3>
          <ion-icon name="create-outline"></ion-icon>
        </summary>
        <div class="input-pair">
          <div class="title">
            <input type="text" placeholder="Texto da pergunta" />
            <p>O título da pergunta deve ter no mínimo 20 caracteres</p>
          </div>
          <div class="color">
            <input type="text" placeholder="Cor de fundo da pergunta" />
            <p>A cor da pergunta deve ter o formato HEX</p>
          </div>
        </div>

        <h3>Resposta correta</h3>
        <div class="input-pair">
          <div class="right-answer">
            <input type="text" placeholder="Resposta correta" />
            <p>A resposta correta não pode ser vazia</p>
          </div>
          <div class="right-image">
            <input type="text" placeholder="URL da imagem" />
            <p>Ovalor informado não é uma URL válida</p>
          </div>
        </div>

        <h3>Respostas incorretas</h3>
        ${wrongAnswersHTML()}
      
      </details>
    </div>
  </div>
  `;
}

function wrongAnswersHTML() {
  return [1, 2, 3].reduce(
    (acc, num) =>
      acc +
      /*html*/ `
  <div class="input-pair">
    <div class="wrong-answer">
      <input type="text" placeholder="Resposta incorreta ${wrongAnswerNumber}" />
      <p>Esta resposta errada não pode ser vazia</p>
    </div>
    <div class="wrong-image">
      <input type="text" placeholder="URL da imagem ${wrongAnswerNumber}" />
      <p>O valor informado não é uma URL válida</p>
    </div>
  </div>
  `,
    ""
  );
}

function getQuizzInfo() {
  const infoEl = document.querySelector(".creation-page .quizz-info");
  const titleEl = infoEl.querySelector(".title input");
  const imageEl = infoEl.querySelector(".image input");
  const questionsCountEl = infoEl.querySelector(".questions-count input");
  const levelsCountEl = infoEl.querySelector(".levels-count input");

  const title = getTitle(titleEl);
  const image = getImage(imageEl);
  const questionsCount = getQuestionsCount(questionsCountEl);
  const levelsCount = getLevelsCount(levelsCountEl);

  if (title && image && questionsCount && levelsCount) {
    creationQuizz = {
      title,
      image,
      questions: Array(questionsCount).fill({}),
      levels: Array(levelsCount).fill({})
    };
    renderQuizzQuestions();
  }
}

function addError(el) {
  el.parentNode.classList.add("error");
  return "";
}
function getTitle(el) {
  if (el.value.length >= 20 && el.value.length <= 65) {
    el.parentNode.classList.remove("error");
    return el.value;
  }
  return addError(el);
}

function getImage(el) {
  if (el.value.length > 0 && el.checkValidity()) {
    el.parentNode.classList.remove("error");
    return el.value;
  }
  return addError(el);
}

function getQuestionsCount(el) {
  const val = Number(el.value);
  if (!isNaN(val) && val >= 3) {
    el.parentNode.classList.remove("error");
    return val;
  }
  return addError(el);
}

function getLevelsCount(el) {
  const val = Number(el.value);
  if (!isNaN(val) && val >= 2) {
    el.parentNode.classList.remove("error");
    return val;
  }
  return addError(el);
}
