import {
  SET_LOGIN,
  RESPONSE_ERROR,
  RESPONSE_SUCCESS,
  CHANGE_INDEX_OF_QUESTIONS,
} from './variablesTypes';

// { name, email }
export const setNameAndEmail = (nameAndEmail) => ({
  type: SET_LOGIN,
  payload: nameAndEmail,
});

export const requestSuccess = (responseAndQuestions) => ({
  type: RESPONSE_SUCCESS,
  payload: responseAndQuestions,
});

export const requestError = () => ({
  type: RESPONSE_ERROR,
});

export const changeIndexOfQuestions = () => ({
  type: CHANGE_INDEX_OF_QUESTIONS,
});
