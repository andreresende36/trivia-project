import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Ranking from '../pages/Ranking';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Verifica pagina de ranking', () => {
  const player = () => {
    localStorage.setItem('Ranking', JSON.stringify([{ assertations: 5,
      gravatarEmail: '0413',
      name: 'anfitras',
      score: 413 }]));
  };
  test('Botão de Login leva a tela de home', () => {
    player();
    const { history } = renderWithRouterAndRedux(<Ranking />, {}, '/ranking');
    const button = screen.getByRole('button', { name: /Login/i });
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toEqual('/');
  });

  test('Teste se está sendo renderizado "Ranking" ', () => {
    player();
    renderWithRouterAndRedux(<Ranking />);
    const rankText = screen.getByTestId('ranking-title');
    expect(rankText).toBeInTheDocument();
    expect(rankText).toHaveTextContent(/Ranking/i);
  });

  test('Verifica a imagem do jogador', async () => {
    player();
    renderWithRouterAndRedux(<Ranking />, {}, '/ranking');
    const src = 'https://www.gravatar.com/avatar/ba59d245355366b3137077550482c1c2';
    const imgElement = screen.getAllByRole('img');
    expect(imgElement[0]).toBeInTheDocument();
    expect(imgElement[0].src).toContain(src);
  });

  test('Verifica se aparece o nome do jogador', () => {
    player();
    renderWithRouterAndRedux(<Ranking />, {}, '/ranking');
    const name = screen.getAllByText('anfitras');
    expect(name[0]).toBeInTheDocument();
    expect(name[0]).toHaveTextContent(/anfitras/i);
  });

  test('Verifica se aparece o score', () => {
    player();
    renderWithRouterAndRedux(<Ranking />, {}, '/ranking');
    const playerScore = screen.getAllByText('413');
    expect(playerScore[0]).toBeInTheDocument();
    expect(playerScore[0]).toHaveTextContent('413');
  });
});
