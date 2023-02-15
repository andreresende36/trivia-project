import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { clearGlobalState } from '../redux/actions';
import logo from '../images/logo-trivia.svg';

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
      const allPlayers = [...retrievePlayers, player];
      localStorage.setItem('Ranking', JSON.stringify(allPlayers));
    }
  };

  handleMessage = () => {
    const { assertions } = this.props;
    const mediumScore = 3;
    if (assertions < mediumScore) {
      return <h2 data-testid="feedback-text">Could be better...</h2>;
    }
    return <h2 data-testid="feedback-text">Well Done!</h2>;
  };

  handleRankingButton = () => {
    const { dispatch } = this.props;
    dispatch(clearGlobalState());
  };

  render() {
    const { assertions, score } = this.props;
    return (
      <div className="feedback">
        <img src={ logo } alt="logo" className="logo logo-game" />
        <div className="feedback-card">
          <Header />
          {this.handleMessage()}
          <div className="feedback-score">
            <label htmlFor="feedback-total-score">
              {'Total score: '}
              <span data-testid="feedback-total-score">{score}</span>
            </label>
            <br />
            <label htmlFor="feedback-total-question">
              {'Assertions: '}
              <span data-testid="feedback-total-question">{assertions}</span>
            </label>
          </div>
          <br />
        </div>
        <div className="feedback_buttons">
          <Link to="/">
            <button
              type="button"
              data-testid="btn-play-again"
              onClick={ this.handleRankingButton }
              className="btn btn-primary"
            >
              Play Again
            </button>
          </Link>
          <Link to="/ranking">
            <button
              type="button"
              data-testid="btn-ranking"
              className="btn btn-secondary"
            >
              Ranking
            </button>
          </Link>
        </div>
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
