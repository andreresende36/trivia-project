import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeIndexOfQuestions } from '../redux/actions';
import '../Styles/Questions.css';

const sortNumber = 0.5;
class Question extends Component {
  state = {
    selected: false,
    seconds: 30,
    questions: [],
    isDisable: false,
  };

  componentDidMount() {
    const { questionData: { correctAnswer, incorrectAnswers } } = this.props;
    this.setState({
      questions: [correctAnswer, ...incorrectAnswers]
        .sort(() => sortNumber - Math.random()),
    });
    this.decreaseTimer();
  }

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

  // resetCount = () => {
  //   this.setState({ seconds: 30 });
  //   this.decreaseTimer();
  // };

  handleAnswer = () => {
    const { dispatch } = this.props;
    dispatch(changeIndexOfQuestions());
    this.setState({
      selected: false,
      isDisable: false,
    });
  };

  handleOptionClick = () => {
    this.setState({
      selected: true,
    });
  };

  handleOptionStyle = (selectedAnswer, correctAnswer) => {
    if (selectedAnswer === correctAnswer) return 'correct';
    return 'wrong';
  };

  render() {
    const { selected, seconds, questions, isDisable } = this.state;
    const { questionData } = this.props;
    const { category, question, correctAnswer } = questionData;
    return (
      <div>
        <h2 data-testid="question-category">{category}</h2>
        <h4 data-testid="question-text">{question}</h4>
        <div data-testid="answer-options">
          {questions.map((answer, index) => (
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
              onClick={ this.handleOptionClick }
              disabled={ isDisable }
            >
              {answer}
            </button>
          ))}
          <button
            type="button"
            onClick={ this.handleAnswer }
          >
            Próxima Pergunta
          </button>
        </div>
        <div>
          { seconds }
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
