function getQuizzes() {
  isCreationFill = false;
  renderLoader();
  axios
    .get(API_URI)
    .then(res => {
      const ids = getUserQuizzIds();
      const [userQuizzes, allQuizzes] = res.data.reduce(
        (acc, quizz) =>
          ids.includes(quizz.id) ? [[...acc[0], quizz], acc[1]] : [acc[0], [...acc[1], quizz]],
        [[], []]
      );
      renderQuizzesPage(userQuizzes, allQuizzes);
    })
    .catch(err => console.error("getQuizzes: " + err));
}

function getQuizz(quizzId) {
  renderLoader();
  axios
    .get(`${API_URI}/${quizzId}`)
    .then(res => {
      playQuizz = res.data;
      renderQuizzPage(playQuizz);
    })
    .catch(err => console.error("getQuizz: " + err));
}

function getEditQuizz(quizzId) {
  renderLoader();
  axios
    .get(`${API_URI}/${quizzId}`)
    .then(res => {
      editQuizz = res.data;
      renderCreationPage(0, isCreationFill);
    })
    .catch(err => console.error("getEditQuizz: " + err));
}

function postQuizz() {
  renderLoader();
  axios
    .post(API_URI, creationQuizz)
    .then(res => {
      const { id, image, title, key } = res.data;
      saveUserQuizz(id, key);
      renderSuccessPage(id, image, title);
    })
    .catch(err => console.error("postQuizz: " + err));
}

function putQuizz(quizzId) {
  renderLoader();
  const key = getUserKey(quizzId);
  if (key) {
    axios
      .put(`${API_URI}/${quizzId}`, creationQuizz, { headers: { "Secret-Key": key } })
      .then(getQuizzes)
      .catch(err => console.error("putQuizz: " + err));
  } else alert("Esse quizz não pertence a você!");
}

function delQuizz(quizzId) {
  renderLoader();
  const key = getUserKey(quizzId);
  if (key) {
    axios
      .delete(`${API_URI}/${quizzId}`, { headers: { "Secret-Key": key } })
      .then(getQuizzes)
      .catch(err => console.error("delQuizz: " + err));
  } else alert("Esse quizz não pertence a você!");
}
const API_URI = "https://mock-api.driven.com.br/api/vs/buzzquizz/quizzes";
getQuizzes();
