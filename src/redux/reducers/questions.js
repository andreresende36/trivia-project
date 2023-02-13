import {
  RESPONSE_SUCCESS,
  RESPONSE_ERROR,
  CHANGE_INDEX_OF_QUESTIONS,
  CLEAR_GLOBAL_STATE,
} from '../actions/variablesTypes';

const INITIAL_STATE = {
  reload: true,
  apiQuestions: [],
  errorMessage: '',
  indexOfCurrentQuestion: 0,
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESPONSE_SUCCESS:
    return {
      ...state,
      reload: false,
      apiQuestions: action.payload,
      errorMessage: '',
    };
  case RESPONSE_ERROR:
    return {
      reload: true,
      apiQuestions: [],
      errorMessage: 'Token Inválido',
    };
  case CHANGE_INDEX_OF_QUESTIONS:
    return {
      ...state,
      indexOfCurrentQuestion: state.indexOfCurrentQuestion + 1,
    };
  case CLEAR_GLOBAL_STATE:
    return {
      ...INITIAL_STATE,
    };
  default:
    return state;
  }
};

export default questions;
