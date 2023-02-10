const QUESTIONS_NUMBER = 5;
const API_TOKEN = `https://opentdb.com/api.php?amount=${QUESTIONS_NUMBER}&token`

const getQuestions = async () => {
  const token = localStorage.getItem('token');
  if(token) {
    try{
      const dataJson = await fetch(`${API_TOKEN}=${token}`);
      const data = dataJson.json();
      return data;
    } catch(error) {
      return {
        "response_code":3,
        "results":[]
      }
    }
  }
  return {
    "response_code":3,
    "results":[]
  }
};

export default getQuestions;