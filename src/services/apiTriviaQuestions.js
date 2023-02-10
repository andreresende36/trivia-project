const QUESTIONS_NUMBER = 5;
const API_TOKEN = `https://opentdb.com/api.php?amount=${QUESTIONS_NUMBER}&token`;

export const getQuestions = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const dataJson = await fetch(`${API_TOKEN}=${token}`);
      const data = await dataJson.json();
      return {
        responseCode: data.response_code,
        results: data.results,
      };
    } catch (error) {
      return {
        responseCode: 3,
        results: [],
      };
    }
  }
  return {
    responseCode: 3,
    results: [],
  };
};
