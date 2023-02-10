import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeIndexOfQuestions } from '../redux/actions';
import '../Styles/Questions.css';

const sortNumber = 0.5;
const timeoutNumber = 10000;
class Question extends Component {
  state = {
    clicked: false,
  };

  handleAnswer = () => {
    const { dispatch } = this.props;
    dispatch(changeIndexOfQuestions());
  };

  handleOptionClick = () => {
    this.setState({
      clicked: true,
    });

    setTimeout(() => {
      this.handleAnswer();
      this.setState({
        clicked: false,
      });
    }, timeoutNumber);
  };

  render() {
    const { clicked } = this.state;
    const { questionData } = this.props;
    const { category, question, correctAnswer, incorrectAnswers } = questionData;
    return (
      <div>
        <h2 data-testid="question-category">{category}</h2>
        <h4 data-testid="question-text">{question}</h4>
        <div data-testid="answer-options">
          {[correctAnswer, ...incorrectAnswers]
            .sort(() => sortNumber - Math.random())
            .map((answer, index) => {
              const buttonStyle = answer === correctAnswer
                ? 'correct'
                : 'wrong';
              return (
                <button
                  type="button"
                  key={ answer }
                  data-testid={
                    answer !== correctAnswer
                      ? `wrong-answer-${index}`
                      : 'correct-answer'
                  }
                  name={ answer }
                  className={
                    clicked ? buttonStyle : ''
                  }
                  onClick={ this.handleOptionClick }
                >
                  {answer}
                </button>
              );
            })}
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
