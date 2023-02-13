import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UserRanking from '../components/UserRanking';
import { clearGlobalState } from '../redux/actions';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('Ranking'));
    const orderedRanking = ranking.sort((a, b) => b.score - a.score);
    this.setState({
      ranking: orderedRanking,
    });
  }

  render() {
    const { ranking } = this.state;
    const { dispatch } = this.props;
    return (
      <div>
        <span data-testid="ranking-title">Ranking</span>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ () => dispatch(clearGlobalState()) }
          >
            Login
          </button>
        </Link>
        {ranking.map((item, index) => (
          <UserRanking
            index={ index }
            key={ item.name }
            name={ item.name }
            score={ item.score }
            gravatarEmail={ item.gravatarEmail }
          />
        ))}
      </div>
    );
  }
}
const mapStateToProps = (globalState) => ({
  ...globalState.player,
});

Ranking.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Ranking);
