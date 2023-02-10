import { SET_LOGIN, RESPONSE_ERROR, RESPONSE_SUCCESS } from './variablesTypes';
import getQuestions from '../../services/apiTriviaQuestions';

// { name, email }
export const setNameAndEmail = (nameAndEmail) => ({
  type: SET_LOGIN,
  payload: nameAndEmail,
});

export const request_success = (responseAndQuestions) => ({
  type: RESPONSE_SUCCESS,
  payload: responseAndQuestions,
});

export const request_error = () => ({
  type: RESPONSE_ERROR,
});
