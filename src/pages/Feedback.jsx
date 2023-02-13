import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  handleMessage = () => {
    const { assertions } = this.props;
    const mediumScore = 3;
    if (assertions < mediumScore) {
      return (<p data-testid="feedback-text">Could be better...</p>);
    }
    return (<p data-testid="feedback-text">Well Done!</p>);
  };

  render() {
    const { assertions, score, history } = this.props;
    return (
      <div>
        <Header />
        { this.handleMessage() }
        <label htmlFor="feedback-total-score">
          {'Total score: '}
          <span data-testid="feedback-total-score">{ score }</span>
        </label>
        <br />
        <label htmlFor="feedback-total-question">
          {'Assertions: '}
          <span data-testid="feedback-total-question">{ assertions }</span>
        </label>
        <br />
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  ...globalState.player,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
