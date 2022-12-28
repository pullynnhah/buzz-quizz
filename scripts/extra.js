function delQuiz(e, id) {
  if (confirm("Deseja mesmo excluir esse quizz?")) {
    const key = loadLocalStorage()[`${id}`];
    const promise = axios.delete(`${URI}/${id}`, {
      headers: { "Secret-Key": key },
    });
    promise.then(getQuizzes).catch(logErr);
    renderLoader();
  }
}
