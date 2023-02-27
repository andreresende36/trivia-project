import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UserRanking from '../components/UserRanking';
import { clearGlobalState } from '../redux/actions';
import logo from '../images/logo-trivia.svg';

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
      <div className="container ranking">
        <div className="row">
          <div className="col-6 offset-3 ranking-card">
            <img src={ logo } alt="logo" className="logo mt-4" />
            <h2 data-testid="ranking-title" className="ranking-title">Ranking</h2>
            <div className="players">
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
            <Link to="/">
              <button
                type="button"
                data-testid="btn-go-home"
                className="btn btn-primary btn m-3"
                onClick={ () => dispatch(clearGlobalState()) }
              >
                Login
              </button>
            </Link>
          </div>
        </div>

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
