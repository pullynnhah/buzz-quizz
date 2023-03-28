function infoHTML() {
  return /*html*/ `
    <div class="creation-page">
      <h2>Comece pelo começo</h2>
      <div class="quizz-info">
        <div class="input-container title">
          <input type="text" placeholder="Título do seu quizz" />
          <p>O título do quizz deve ter entre 20 a 65 caracteres</p>
        </div>
        <div class="input-container image">
          <input type="url" inputmode="url" placeholder="URL da imagem do seu quizz" required />
          <p>O valor informado não é uma URL válida</p>
        </div>
        <div class="input-container questions-count">
          <input type="text" inputmode="numeric" placeholder="Quantidade de perguntas do quizz" />
          <p>O quizz deve ter no mínimo 3 perguntas</p>
        </div>
        <div class="input-container levels-count">
          <input type="text" inputmode="numeric" placeholder="Quantidade de níveis do quizz" />
          <p>O quizz deve ter no mínimo 2 levels</p>
        </div>
      </div>
      <button onclick="getInfo()" class="red-btn">Prosseguir pra criar perguntas</button>
    </div>
  `;
}

function getInfo() {
  const infoEl = document.querySelector(".creation-page .quizz-info");
  const titleEl = infoEl.querySelector(".title input");
  const imageEl = infoEl.querySelector(".image input");
  const questionsCountEl = infoEl.querySelector(".questions-count input");
  const levelsCountEl = infoEl.querySelector(".levels-count input");

  const title = getTitleInfo(titleEl);
  const image = getImageInfo(imageEl);
  const questionsCount = getQuestionsCountInfo(questionsCountEl);
  const levelsCount = getLevelsCountInfo(levelsCountEl);

  if (title && image && questionsCount && levelsCount) {
    creationQuizz = {
      title,
      image,
      questions: Array(questionsCount).fill({}),
      levels: Array(levelsCount).fill({})
    };
    renderCreationPage(creationIndex++, isCreationFill);
  }
}

function getTitleInfo(el) {
  if (el.value.length >= 20 && el.value.length <= 65) {
    delError(el);
    return el.value;
  }
  return addError(el);
}

function getImageInfo(el) {
  if (el.checkValidity()) {
    delError(el);
    return el.value;
  }
  return addError(el);
}

function getQuestionsCountInfo(el) {
  const val = Number(el.value);
  if (!isNaN(val) && val >= 3) {
    delError(el);
    return val;
  }
  return addError(el);
}

function getLevelsCountInfo(el) {
  const val = Number(el.value);
  if (!isNaN(val) && val >= 2) {
    delError(el);
    return val;
  }
  return addError(el);
}
