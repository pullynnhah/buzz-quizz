function getQuizzes() {
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
const API_URI = "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes";
getQuizzes();
