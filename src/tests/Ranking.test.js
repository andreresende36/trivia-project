import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Verifica pagina de ranking', () => {
  test('Botão de Login leva a tela de login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /Login/i });

    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toEqual('/');
  });
});
