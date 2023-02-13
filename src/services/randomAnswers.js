export const randomAnswers = (correctAnswer, incorrectAnswers) => {
  const sortNumber = 0.5;
  const randomArrayAnswers = [correctAnswer, ...incorrectAnswers]
    .sort(() => sortNumber - Math.random());
  return randomArrayAnswers;
};
