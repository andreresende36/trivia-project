import { SET_LOGIN, INCREASE_SCORE } from '../actions/variablesTypes';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const defaultIncreaseScore = 10;

// Isso aqui tem que ser atualizado
const timer = 1;

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_LOGIN:
    return ({
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    });
  case INCREASE_SCORE:
    return ({
      ...state,
      score: state.score + defaultIncreaseScore + (timer * action.payload),
    });
  default:
    return state;
  }
};

export default player;
