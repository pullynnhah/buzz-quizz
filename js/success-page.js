function successPageHTML(quizzId, quizzImage, quizzTitle) {
  return /*html*/ `
  <div class="success-page">
    <h2>Seu quizz está pronto!</h2>
    <div class="quizz-banner">
      <img src="${quizzImage}" alt="${quizzTitle}" />
      <h3>${quizzTitle}</h3>
    </div>
    <div class="nav-buttons">
      <button class="red-btn" onclick="getQuizz(${quizzId})">Acessar Quizz</button>
      <button class="btn" onclick="getQuizzes()">Voltar pra home</button>
    </div>
  </div>`;
}
