import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setNameAndEmail } from '../redux/actions';
import getToken from '../services/apiTrivia';

// A pessoa que joga deve conseguir escrever seu nome no input de texto
// A pessoa que joga deve conseguir escrever seu email no input de email
// O botão "Play" deve ser desabilitado caso email e/ou nome não estejam preenchidos
// O campo de texto para o nome deve possuir o atributo data-testid com o valor input-player-name
// O campo de texto para o email deve possuir o atributo data-testid com o valor input-gravatar-email
// O botão "Play" que leva a pessoa ao jogo deve possuir o atributo data-testid com o valor btn-play

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
          Nome:
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
