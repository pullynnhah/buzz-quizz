function saveUserQuizz(id, key) {
  const data = getUserQuizzes();
  data[id] = key;
  localStorage.setItem("buzz-quizz", JSON.stringify(data));
}

function getUserQuizzes() {
  const localItem = localStorage.getItem("buzz-quizz");
  return localItem ? JSON.parse(localItem) : {};
}

function getUserQuizzIds() {
  return Object.keys(getUserQuizzes()).map(Number);
}

function getUserKey(quizzId) {
  const quizzes = getUserQuizzes();
  return quizzes[quizzId];
}
