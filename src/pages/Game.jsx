import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { deleteToken } from '../services/localStorage';
import Header from '../components/Header';
import Question from '../components/Question';
import logo from '../images/logo-trivia.svg';

class Game extends Component {
  componentDidMount() {
    const { questions, history } = this.props;
    if (questions.reload) {
      deleteToken();
      history.push('/');
    }
  }

  render() {
    const { questions } = this.props;
    const { apiQuestions } = questions;
    const { indexOfCurrentQuestion: index } = questions;
    const maxNumberOfQuestions = questions.apiQuestions.length;
    return (
      <div className="container-fluid gap-3 game">
        <div className="row">
          <Header />
        </div>
        {(apiQuestions.length > 0) && (index < maxNumberOfQuestions)
          ? (
            <div className="row">
              <img src={ logo } alt="logo" className="logo logo-game" />
              <Question
                questionData={ {
                  category: apiQuestions[index].category,
                  type: apiQuestions[index].type,
                  difficulty: apiQuestions[index].difficulty,
                  question: apiQuestions[index].question,
                  correctAnswer: apiQuestions[index].correct_answer,
                  incorrectAnswers: apiQuestions[index].incorrect_answers,
                } }
              />
            </div>
          )
          : (<Redirect to="feedback" />)}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  questions: PropTypes.shape({
    reload: PropTypes.bool.isRequired,
    apiQuestions: PropTypes.arrayOf(
      PropTypes.shape({
        category: PropTypes.string,
        type: PropTypes.string,
        difficulty: PropTypes.string,
        question: PropTypes.string,
        correct_answer: PropTypes.string,
        incorrect_answers: PropTypes.arrayOf(PropTypes.string),
      }),
    ),
    indexOfCurrentQuestion: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions,
});

export default connect(mapStateToProps)(Game);
