import React, { Component } from 'react';
import { StarFill } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import { getProfileImage } from '../services/apiTrivia';

export default class UserRanking extends Component {
  render() {
    const { score, name, gravatarEmail, index } = this.props;
    return (
      <div className="player-card">
        {getProfileImage(gravatarEmail)}
        <span data-testid={ `player-name-${index}` }>
          { name }
        </span>
        <div className="player-score">
          <StarFill style={ { color: '#F9BA18', fontSize: '1.5rem' } } />
          <span data-testid={ `player-score-${index}` }>
            { `${score} pontos`}
          </span>
        </div>
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
