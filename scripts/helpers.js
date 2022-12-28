function getQuizzesIds() {
  const ids = loadLocalStorage();
  return ids ? Object.keys(ids) : [];
}

function renderLoader() {
  main.innerHTML = `
  <div class="loader">
    <img src="./assets/load.gif" alt="gear loader" />
    <p>Carregando...</p>
  </div>
  `;
}
