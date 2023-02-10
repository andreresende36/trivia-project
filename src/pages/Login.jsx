import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setNameAndEmail } from '../redux/actions';
import getToken from '../services/apiTrivia';

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

  clearInputs = () => {
    this.setState({
      userName: '',
      userEmail: '',
    });
  };

  handleSettingsOnClick = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  handlePlayButton = () => {
    const { dispatch, history } = this.props;
    const { userEmail, userName } = this.state;
    dispatch(setNameAndEmail({ email: userEmail, name: userName }));
    this.clearInputs();
    getToken().then(history.push('/game'));
  };

  render() {
    const { userEmail, userName, isDisabled } = this.state;
    return (
      <form>
        <label htmlFor="userName">
          Nome
          <input
            type="text"
            id="userName"
            onChange={ this.handleInput }
            name="userName"
            data-testid="input-player-name"
            value={ userName }
          />
        </label>

        <label htmlFor="userEmail">
          Email:
          <input
            type="text"
            id="userEmail"
            onChange={ this.handleInput }
            name="userEmail"
            data-testid="input-gravatar-email"
            value={ userEmail }
          />
        </label>
        <button
          type="button"
          disabled={ isDisabled }
          onClick={ this.handlePlayButton }
          data-testid="btn-play"
        >
          Play
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleSettingsOnClick }
        >
          Configurações
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
