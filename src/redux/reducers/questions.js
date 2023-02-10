import {RESPONSE_SUCCESS, RESPONSE_ERROR} from '../actions/variablesTypes';

const INITIAL_STATE = {
  reload: true,
  questions: [],
  errorMessage: '',
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESPONSE_SUCCESS:
      return {
        reload: false,
        questions: action.payload,
        errorMessage: '',
      };
    case RESPONSE_ERROR: 
      return {
        reload: true,
        questions: [],
        errorMessage: 'Token Inválido',
      };
    default:
      return state;
  }
};

export default questions;