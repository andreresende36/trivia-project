import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Verifica campos da pagina inicial', () => {
  const validEmail = 'anfitrao@0413.com';
  const validName = '0041300';
  const TestIdName = 'input-player-name';
  const TestIdEmail = 'input-gravatar-email';
  const invalidName = '';
  const invalidEmail = '';

  test('renderiza dois campos e um botão desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId(TestIdName);
    const inputEmail = screen.getByTestId(TestIdEmail);
    const button = screen.getByRole('button', { name: /Play/i });

    expect(inputEmail).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button.disabled).toBe(true);
  });

  test('botão habilita em caso de ter ao mesmo tempo um email e um nome válidos', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(TestIdEmail);
    const inputName = screen.getByTestId(TestIdName);
    const button = screen.getByRole('button', { name: /Play/i });

    expect(button).toHaveProperty('disabled', true);

    userEvent.type(inputEmail, invalidEmail);
    expect(inputEmail).toHaveValue(invalidEmail);
    expect(button).toHaveProperty('disabled', true);

    userEvent.type(inputName, invalidName);
    expect(inputName).toHaveValue(invalidName);
    expect(button).toHaveProperty('disabled', true);

    userEvent.clear(inputEmail);
    userEvent.clear(inputName);

    expect(inputName).toHaveValue('');
    expect(inputEmail).toHaveValue('');

    userEvent.type(inputEmail, validEmail);
    expect(inputEmail).not.toHaveValue(invalidEmail);
    expect(inputEmail).toHaveValue(validEmail);
    expect(button).toHaveProperty('disabled', true);

    userEvent.type(inputName, validName);
    expect(inputName).not.toHaveValue(invalidName);
    expect(inputName).toHaveValue(validName);
    expect(button).toHaveProperty('disabled', false);

    userEvent.clear(inputEmail);
    expect(button).toHaveProperty('disabled', true);
  });
});
