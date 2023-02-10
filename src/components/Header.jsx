import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileImage } from '../services/apiTrivia';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    return (
      <div>
        <header className="game-header">
          <label htmlFor="header-player-name">
            {'Jogador: '}
            <span data-testid="header-player-name">{name}</span>
          </label>
          <label htmlFor="header-score">
            {'Pontuação: '}
            <span data-testid="header-score">{score}</span>
          </label>
          { getProfileImage(gravatarEmail) }
        </header>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  ...globalState.player,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);