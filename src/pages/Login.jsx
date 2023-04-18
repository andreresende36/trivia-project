import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  setNameAndEmail,
  requestError,
  requestSuccess,
} from '../redux/actions';
import { getToken } from '../services/apiTrivia';
import { getQuestions } from '../services/apiTriviaQuestions';
import logo from '../images/logo-trivia.svg';

class Login extends Component {
  state = {
    userName: '',
    userEmail: '',
    isDisabled: true,
  };

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      () => this.emailAndNameValidation(),
    );
  };

  emailAndNameValidation = () => {
    const { userEmail, userName } = this.state;
    const isDisabled = !(userEmail && userName);
    this.setState({
      isDisabled,
    });
  };

  hanldeQuestions = async () => {
    const { dispatch, history } = this.props;
    const { responseCode, results } = await getQuestions();
    if (responseCode === 0) dispatch(requestSuccess(results));
    else dispatch(requestError());
    history.push('/game');
  };

  handlePlayButton = async () => {
    const { dispatch } = this.props;
    const { userEmail, userName } = this.state;
    dispatch(setNameAndEmail({ email: userEmail, name: userName }));
    await getToken();
    this.hanldeQuestions();
  };

  render() {
    const { userEmail, userName, isDisabled } = this.state;
    const { questions } = this.props;
    return (
      <div
        className="login d-flex flex-column
          container align-items-center"
      >
        <img src={ logo } alt="logo" className="logo mt-4" />
        <form className="form-group login-form mt-4">
          <div className="row justify-content-center">
            <label htmlFor="userName" className="col-10">
              Name:
              <input
                type="text"
                id="userName"
                onChange={ this.handleInput }
                name="userName"
                data-testid="input-player-name"
                value={ userName }
                className="form-control"
              />
            </label>
          </div>

          <div className="row justify-content-center">
            <label htmlFor="userEmail" className="col-10">
              Email:
              <input
                type="text"
                id="userEmail"
                onChange={ this.handleInput }
                name="userEmail"
                data-testid="input-gravatar-email"
                value={ userEmail }
                className="form-control"
              />
            </label>
          </div>

          <div className="row justify-content-center mt-3 gap-4">
            <button
              type="button"
              disabled={ isDisabled }
              onClick={ this.handlePlayButton }
              data-testid="btn-play"
              className="btn btn-primary col-8 col-md-6 col-sm-8"
            >
              Play
            </button>
          </div>

          {questions.errorMessage}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions,
});

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  questions: PropTypes.shape({
    errorMessage: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(Login);
