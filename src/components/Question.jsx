import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeIndexOfQuestions, increaseScore } from '../redux/actions';
import { calcDifficultyIndex } from '../services/calcDifficultyIndex';
import { randomAnswers } from '../services/randomAnswers';
import '../Styles/Questions.css';

class Question extends Component {
  state = {
    isAnswered: false,
    arrayAnswers: [],
    selected: false,
    seconds: 30,
    isDisable: false,
  };

  componentDidMount() {
    const { questionData } = this.props;
    const { correctAnswer, incorrectAnswers } = questionData;
    this.setState({ arrayAnswers: randomAnswers(correctAnswer, incorrectAnswers) });
    this.decreaseTimer();
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
    const { seconds } = this.state;
    const difficultyIndex = calcDifficultyIndex(difficulty);
    clearInterval(this.timer);
    this.setState({ isAnswered: true, selected: true });
    if (answer === correctAnswer) {
      dispatch(increaseScore(difficultyIndex, seconds));
    }
  };

  handleNextQuestion = () => {
    const { dispatch } = this.props;
    this.setState({ isAnswered: false });
    dispatch(changeIndexOfQuestions());
    this.setState({
      selected: false,
      isDisable: false,
      seconds: 30,
    });
    this.decreaseTimer();
  };

  decreaseTimer = () => {
    const oneSecond = 1000;
    this.timer = setInterval(() => {
      const { seconds } = this.state;
      this.setState(
        (prevState) => ({
          seconds: prevState.seconds - 1,
        }),
        () => {
          if (seconds === 1) {
            clearInterval(this.timer);
            this.setState({ isDisable: true });
          }
        },
      );
    }, oneSecond);
  };

  handleOptionStyle = (selectedAnswer, correctAnswer) => {
    if (selectedAnswer === correctAnswer) return 'correct';
    return 'wrong';
  };

  render() {
    const { selected, seconds, isDisable } = this.state;
    const { questionData } = this.props;
    const { isAnswered, arrayAnswers } = this.state;
    const { category, question, correctAnswer } = questionData;
    const nextButton = (
      <button
        type="button"
        onClick={ this.handleNextQuestion }
        data-testid="btn-next"
      >
        Próxima pergunta
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
              className={ selected ? this.handleOptionStyle(answer, correctAnswer)
                : '' }
              onClick={ this.handleAnswer }
              disabled={ isDisable }
            >
              {answer}
            </button>
          ))}
        </div>
        <div>
          { seconds }
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
