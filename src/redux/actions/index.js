import { SET_LOGIN } from './variablesTypes';

// { name, email }
export const setNameAndEmail = (nameAndEmail) => ({
  type: SET_LOGIN,
  payload: nameAndEmail,
});
