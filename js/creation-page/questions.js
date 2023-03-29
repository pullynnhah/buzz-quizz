function questionsHTML() {
  return /*html*/ `
  <div class="creation-page">
    <h2>Crie suas perguntas</h2>
    ${questionDetailsHTML(creationQuizz.questions)}
    <button onclick="getQuestions()" class="red-btn">Prosseguir pra criar níveis</button>
  </div>
  `;
}

function questionDetailsHTML(questionsCount) {
  let html = questionDetailHTML(1, true);
  for (let i = 2; i <= questionsCount; i++) html += questionDetailHTML(i, false);
  return html;
}

function questionDetailHTML(questionIndex, isOpen) {
  return /*html*/ `
    <div class="quizz-question">
      <details ${isOpen ? "open" : ""} ontoggle=openDetail(this)>
        <summary>
          <h3>Pergunta ${questionIndex}</h3>
          <ion-icon name="create-outline"></ion-icon>
        </summary>
        <div class="input-pair">
          <div class="input-container title">
            <input type="text" placeholder="Texto da pergunta" />
            <p>O texto da pergunta deve ter no mínimo 20 caracteres</p>
          </div>
          <div class="input-container color">
            <input type="text" placeholder="Cor de fundo da pergunta" />
            <p>A cor da pergunta deve ter o formato HEX</p>
          </div>
        </div>

        <h3>Resposta correta</h3>
        ${rightAnswerHTML()}

        <h3>Respostas incorretas</h3>
        ${wrongAnswersHTML()}
      
      </details>
    </div>
  `;
}

function rightAnswerHTML() {
  return /*html*/ `
  <div class="input-pair">
    <div class="input-container right-text">
      <input type="text" placeholder="Resposta correta" />
      <p>A resposta correta não pode ser vazia</p>
    </div>
    <div class="input-container right-image">
      <input type="url" inputmode="url" placeholder="URL da imagem" required />
      <p>O valor informado não é uma URL válida</p>
    </div>
  </div>`;
}

function wrongAnswersHTML() {
  return [1, 2, 3].reduce(
    (acc, num) =>
      acc +
      /*html*/ `
  <div class="input-pair">
    <div class="input-container wrong-text">
      <input type="text" placeholder="Resposta incorreta ${num}" />
      <p>Esta resposta errada não pode ser vazia</p>
    </div>
    <div class="input-container wrong-image">
      <input type="url" inputmode="url" placeholder="URL da imagem ${num}" />
      <p>O valor informado não é uma URL válida</p>
    </div>
  </div>
  `,
    ""
  );
}

function getQuestions() {
  const questionsEl = document.querySelectorAll(".creation-page .quizz-question");
  const questions = [...questionsEl].map(getQuestion);
  if (!questions.includes(false)) {
    creationQuizz.questions = questions;
    renderCreationPage(creationIndex, isCreationFill);
  }
}

function getQuestion(el) {
  const titleEl = el.querySelector(".title input");
  const colorEl = el.querySelector(".color input");

  const title = getTitleQuestion(titleEl);
  const color = getColorQuestion(colorEl);
  const answers = getAnswers(el);

  if (title && color && answers) {
    return {
      title,
      color,
      answers
    };
  }
  return false;
}

function getAnswers(el) {
  const rightTextEl = el.querySelector(".right-text input");
  const rightImageEl = el.querySelector(".right-image input");

  const wrongTextEls = el.querySelectorAll(".wrong-text input");
  const wrongImageEls = el.querySelectorAll(".wrong-image input");

  wrongTextEls.forEach(delError);
  wrongImageEls.forEach(delError);

  const rightText = getText(rightTextEl);
  const rightImage = getImage(rightImageEl);

  const wrongTexts = [...wrongTextEls].map(getWrongText);
  const wrongImages = [...wrongImageEls].map(getImage);

  let hasRightError = true;
  const answers = [];
  if (rightText && rightImage) {
    answers.push({
      text: rightText,
      image: rightImage,
      isCorrectAnswer: true
    });
    hasRightError = false;
  }

  let hasWrongError = false;
  for (let i = 0; i < wrongTexts.length; i++) {
    if (wrongTexts[i] || wrongImages[i]) {
      if (wrongTexts[i] && wrongImages[i]) {
        answers.push({
          text: wrongTexts[i],
          image: wrongImages[i],
          isCorrectAnswer: false
        });
      } else if (wrongImages[i]) {
        addError(wrongTextEls[i]);
        hasError = true;
      } else {
        addError(wrongImageEls[i]);
        hasError = true;
      }
    }
  }

  if ((hasRightError && answers.length < 1) || (!hasRightError && answers.length < 2)) {
    addError(wrongTextEls[0]);
    addError(wrongImageEls[0]);
    return false;
  }
  if (hasRightError) return false;
  if (hasWrongError) return false;
  return answers;
}

function getTitleQuestion(el) {
  if (el.value.length >= 20) {
    delError(el);
    return el.value;
  }
  return addError(el);
}

function getColorQuestion(el) {
  if (/^#[\dA-F]{6}$/i.test(el.value)) {
    delError(el);
    return el.value;
  }
  return addError(el);
}

function getText(el) {
  if (el.value.length > 0) {
    delError(el);
    return el.value;
  }

  return addError(el);
}

function getWrongText(el) {
  delError(el);
  return el.value;
}
