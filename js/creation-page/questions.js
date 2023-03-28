function questionsHTML() {
  return /*html*/ `
  <div class="creation-page">
    <h2>Crie suas perguntas</h2>
    ${detailsHTML(creationQuizz.questions.length)}
    <button class="red-btn">Prosseguir pra criar níveis</button>
  </div>
  `;
}

function detailsHTML(questionsCount) {
  let html = detailHTML(1, true);
  for (let i = 2; i <= questionsCount; i++) html += detailHTML(i, false);
  return html;
}

function detailHTML(questionIndex, isOpen) {
  return /*html*/ `
    <div class="quizz-questions">
      <details ${isOpen ? "open" : ""} ontoggle=openDetail(this)>
        <summary>
          <h3>Pergunta ${questionIndex}</h3>
          <ion-icon name="create-outline"></ion-icon>
        </summary>
        <div class="input-pair">
          <div class="input-container title">
            <input type="text" placeholder="Texto da pergunta" />
            <p>O título da pergunta deve ter no mínimo 20 caracteres</p>
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
    <div class="input-container right-answer">
      <input type="text" placeholder="Resposta correta" />
      <p>A resposta correta não pode ser vazia</p>
    </div>
    <div class="input-container right-image">
      <input type="text" placeholder="URL da imagem" />
      <p>Ovalor informado não é uma URL válida</p>
    </div>
  </div>`;
}

function wrongAnswersHTML() {
  return [1, 2, 3].reduce(
    (acc, num) =>
      acc +
      /*html*/ `
  <div class="input-pair">
    <div class="input-container wrong-answer">
      <input type="text" placeholder="Resposta incorreta ${num}" />
      <p>Esta resposta errada não pode ser vazia</p>
    </div>
    <div class="input-container wrong-image">
      <input type="text" placeholder="URL da imagem ${num}" />
      <p>O valor informado não é uma URL válida</p>
    </div>
  </div>
  `,
    ""
  );
}
