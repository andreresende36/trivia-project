import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { clearGlobalState } from '../redux/actions';

class Feedback extends Component {
  handleMessage = () => {
    const { assertions } = this.props;
    const mediumScore = 3;
    if (assertions < mediumScore) {
      return (<p data-testid="feedback-text">Could be better...</p>);
    }
    return (<p data-testid="feedback-text">Well Done!</p>);
  };

  handleRankingButton = () => {
    const { history, dispatch } = this.props;
    dispatch(clearGlobalState());
    history.push('/');
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
          onClick={ this.handleRankingButton }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  ...globalState.player,
});

Feedback.propTypes = {
  dispatch: PropTypes.func.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
