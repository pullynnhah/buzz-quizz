function getQuizzes() {
  axios.get(API_URI).then(res => {
    const ids = [12];
    const [userQuizzes, allQuizzes] = res.data.reduce(
      (acc, quizz) =>
        ids.includes(quizz.id) ? [[...acc[0], quizz], acc[1]] : [acc[0], [...acc[1], quizz]],
      [[], []]
    );
    renderQuizzesPage(userQuizzes, allQuizzes);
  });
}

const API_URI = "https://mock-api.driven.com.br/api/vs/buzzquizz/quizzes";
getQuizzes();
