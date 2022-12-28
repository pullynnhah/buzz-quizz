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

function scroll(el) {
  el.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });
}

function verifyHex(hex) {
  if (/^#([\dA-Fa-f]{3}){1,2}$/i.test(hex)) {
    return hex;
  }
  return false;
}
