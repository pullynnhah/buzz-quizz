function loadLocalStorage() {
  return JSON.parse(localStorage.getItem("buzz-quizz"));
}

function saveLocalStorage(key, value) {
  const data = loadLocalStorage() ?? {};
  data[key] = value;
  localStorage.setItem("buzz-quizz", JSON.stringify(data));
}

function delLocalStorage(key) {
  const data = loadLocalStorage();
  if (data) {
    delete data[key];
    localStorage.setItem("buzz-quizz", JSON.stringify(data));
  }
}
