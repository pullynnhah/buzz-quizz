function levelsHTML() {
  return /*html*/ `
  <div class="creation-page">
    <h2>Agora, decida os níveis!</h2>
    ${levelDetailsHTML(creationQuizz.levels)}
    <button onclick="getLevels()" class="red-btn">Finalizar Quizz</button>
  </div>`;
}

function levelDetailsHTML(levelsCount) {
  let html = levelDetailHTML(1, true);
  for (let i = 2; i <= levelsCount; i++) html += levelDetailHTML(i, false);
  return html;
}

function levelDetailHTML(levelIndex, isOpen) {
  return /*html*/ `
  <div class="quizz-level">
    <details ${isOpen ? "open" : ""} ontoggle="openDetail(this)">
      <summary>
        <h3>Nível ${levelIndex}</h3>
        <ion-icon name="create-outline"></ion-icon>
      </summary>
      <div class="inputs">
        <div class="input-container title">
          <input type="text" placeholder="Título do nível" />
          <p>O título do nível deve ter no mínimo 10 caracteres</p>
        </div>
        <div class="input-container min-value">
          <input type="text" placeholder="% de acerto mínima" />
          <p>O valor do nível deve ser um número entre 0 e 100</p>
        </div>
        <div class="input-container image">
          <input type="url" inputmode="url" placeholder="URL da imagem do nível" required />
          <p>O valor informado não é uma URL válida</p>
        </div>
        <div class="input-container text">
          <textarea type="text" placeholder="Descrição do nível"></textarea>
          <p>A descrição do nível deve ter no mínimo 30 caracteres</p>
        </div>
      </div>
    </details>
  </div>`;
}

function getLevels() {
  const levelsEl = document.querySelectorAll(".creation-page .quizz-level");
  const levels = [...levelsEl].map(getLevel);
  if (!levels.includes(false)) {
    console.log(levels.map(level => level.minValue).includes(0));
    if (levels.map(level => level.minValue).includes(0)) {
      creationQuizz.levels = levels;
      postQuizz();
    } else alert("Pelo menos um nível tem que ter 0.");
  }
}

function getLevel(el) {
  const titleEl = el.querySelector(".title input");
  const minValueEl = el.querySelector(".min-value input");
  const imageEl = el.querySelector(".image input");
  const textEl = el.querySelector(".text textarea");

  const title = getTitleLevel(titleEl);
  const minValue = getMinValue(minValueEl);
  const image = getImage(imageEl);
  const text = getText(textEl);

  if (title && minValue !== "" && image && text) {
    return { title, minValue, image, text };
  }
  return false;
}

function getTitleLevel(el) {
  if (el.value.length >= 10) {
    delError(el);
    return el.value;
  }
  return addError(el);
}

function getMinValue(el) {
  const val = Number(el.value);
  if (el.value !== "" && val >= 0 && val <= 100) {
    delError(el);
    return val;
  }
  return addError(el);
}

function getTextLevel(el) {
  if (el.value.length >= 30) {
    delError(el);
    return el.value;
  }
  return addError(el);
}
