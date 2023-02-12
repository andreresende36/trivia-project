import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeIndexOfQuestions, increaseScore } from '../redux/actions';
import { calcDifficultyIndex } from '../services/calcDifficultyIndex';
import { randomAnswers } from '../services/randomAnswers';

class Question extends Component {
  state = {
    isAnswered: false,
    arrayAnswers: [],
  };

  componentDidMount() {
    const { questionData } = this.props;
    const { correctAnswer, incorrectAnswers } = questionData;
    this.setState({ arrayAnswers: randomAnswers(correctAnswer, incorrectAnswers) });
  }

  componentDidUpdate(prevProps) {
    const { questionData } = this.props;
    const { correctAnswer, incorrectAnswers } = questionData;
    if (questionData !== prevProps.questionData) {
      this.setState({ arrayAnswers: randomAnswers(correctAnswer, incorrectAnswers) });
    }
  }

  handleAnswer = ({ target: { name: answer } }) => {
    const { dispatch, questionData: { correctAnswer, difficulty } } = this.props;
    const difficultyIndex = calcDifficultyIndex(difficulty);
    this.setState({ isAnswered: true });
    if (answer === correctAnswer) {
      dispatch(increaseScore(difficultyIndex));
    }
  };

  handleNextQuestion = () => {
    const { dispatch } = this.props;
    this.setState({ isAnswered: false });
    dispatch(changeIndexOfQuestions());
  };

  render() {
    const { questionData } = this.props;
    const { isAnswered, arrayAnswers } = this.state;
    const { category, question, correctAnswer } = questionData;
    const nextButton = (
      <button
        type="button"
        onClick={ this.handleNextQuestion }
        data-testid="btn-next"
      >
        Next question
      </button>);
    return (
      <div>
        <h2 data-testid="question-category">{category}</h2>
        <h4 data-testid="question-text">{question}</h4>
        <div data-testid="answer-options">
          {arrayAnswers.map((answer, index) => (
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
        { isAnswered ? nextButton : null}
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
