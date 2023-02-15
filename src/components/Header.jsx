import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StarFill } from 'react-bootstrap-icons';
import { getProfileImage } from '../services/apiTrivia';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    return (
      <div className="container-fluid card p-4 header">
        <header className="game-header row justify-content-end">
          {getProfileImage(gravatarEmail)}
          <label
            htmlFor="header-player-name"
            className="col-6 col-sm-4 col-md-2 d-flex align-items-center gap-2"
          >
            <span data-testid="header-player-name">{name}</span>
          </label>
          <label
            htmlFor="header-score"
            className="col-6 col-sm-4 col-md-2 d-flex align-items-center gap-2"
          >
            <StarFill style={ { color: 'yellow', fontSize: '1.5rem' } } />
            {'Score: '}
            <span data-testid="header-score">{score}</span>
          </label>
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
