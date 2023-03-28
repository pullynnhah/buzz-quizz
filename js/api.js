function getQuizzes() {
  renderLoader();
  axios
    .get(API_URI)
    .then(res => {
      const ids = [12];
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

const API_URI = "https://mock-api.driven.com.br/api/vs/buzzquizz/quizzes";
getQuizzes();
// getQuizz(12);
// renderQuizzInfo();
