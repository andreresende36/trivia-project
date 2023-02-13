import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProfileImage } from '../services/apiTrivia';

export default class UserRanking extends Component {
  render() {
    const { score, name, gravatarEmail, index } = this.props;
    return (
      <div>
        {getProfileImage(gravatarEmail)}
        <span data-testid={ `player-name-${index}` }>
          { name }
        </span>
        <span data-testid={ `player-score-${index}` }>
          { score }
        </span>
      </div>
    );
  }
}

UserRanking.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};
