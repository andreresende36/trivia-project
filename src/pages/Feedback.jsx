import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { clearGlobalState } from '../redux/actions';

class Feedback extends Component {
  componentDidMount() {
    this.handlePlayersToRank();
  }

  handlePlayersToRank = () => {
    const { assertions, score, name, gravatarEmail } = this.props;
    const player = { assertions, score, name, gravatarEmail };
    const firstPlayer = [player];

    const retrievePlayers = JSON.parse(localStorage.getItem('Ranking'));
    if (retrievePlayers === null) {
      localStorage.setItem('Ranking', JSON.stringify(firstPlayer));
    } else {
      const allPlayers = [
        ...retrievePlayers,
        player,
      ];
      localStorage.setItem('Ranking', JSON.stringify(allPlayers));
    }
  };

  handleMessage = () => {
    const { assertions } = this.props;
    const mediumScore = 3;
    if (assertions < mediumScore) {
      return (<p data-testid="feedback-text">Could be better...</p>);
    }
    return (<p data-testid="feedback-text">Well Done!</p>);
  };

  handleRankingButton = () => {
    const { dispatch } = this.props;
    dispatch(clearGlobalState());
  };

  render() {
    const { assertions, score } = this.props;
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
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.handleRankingButton }
          >
            Play Again
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </Link>
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
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
