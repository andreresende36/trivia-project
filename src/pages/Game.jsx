import React, { Component } from 'react';
import getQuestions from './../services/apiTriviaQuestions';
import { deleteToken } from '../services/localStorage';

export default class Game extends Component {
  state = {
    questions: [],
  }

  setQuestions = async () => {
    const { response_code, results } = await getQuestions()
    const { history } = this.props;
    if(response_code !== 3 ) {
      deleteToken();
      history.push('/');
    };
    this.setState({
      questions: results,
    });
  };

  render() {
    const { questions } = this.state;
    return (
      <div>
        Game
      <div>
    );
  };
};
