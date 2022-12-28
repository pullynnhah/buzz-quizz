function loadLocalStorage() {
  return JSON.parse(localStorage.getItem("buzz-quizz"));
}

function saveLocalStorage(key, value) {
  const data = loadLocalStorage() ?? {};
  data[key] = value;
  localStorage.setItem("buzz-quizz", JSON.stringify(data));
}
