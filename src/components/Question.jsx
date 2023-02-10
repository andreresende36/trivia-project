import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeIndexOfQuestions } from '../redux/actions';

const sortNumber = 0.5;
class Question extends Component {
  handleAnswer = () => {
    const { dispatch } = this.props;
    dispatch(changeIndexOfQuestions());
  };

  render() {
    const { questionData } = this.props;
    const { category, question, correctAnswer, incorrectAnswers } = questionData;
    return (
      <div>
        <h2 data-testid="question-category">{category}</h2>
        <h4 data-testid="question-text">{question}</h4>
        <div data-testid="answer-options">
          {[correctAnswer, ...incorrectAnswers]
            .sort(() => sortNumber - Math.random())
            .map((answer, index) => (
              <button
                type="button"
                key={ answer }
                data-testid={
                  answer !== correctAnswer
                    ? `wrong-answer-${index}`
                    : 'correct-answer'
                }
                name={ answer }
                onClick={ this.handleAnswer }
              >
                {answer}
              </button>
            ))}
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  dispatch: PropTypes.func.isRequired,
  questionData: PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    correctAnswer: PropTypes.string,
    incorrectAnswers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default connect()(Question);
