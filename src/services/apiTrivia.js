const TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';
import { setToken } from './localStorage';

const getToken = async () => {
  const response = await fetch(TOKEN_URL);
  const data = await response.json();
  setToken(data);
};

export default getToken;
