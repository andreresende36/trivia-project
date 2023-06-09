import { combineReducers } from 'redux';
import player from './player';
import questions from './questions';

const reducer = combineReducers({
  player,
  questions,
});

export default reducer;
