import { screen } from "@testing-library/react";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import Game from "../pages/Game";
import { getProfileImage } from "../services/apiTrivia";
import md5 from 'crypto-js/md5';

const INITIAL_TEST = {
    player: { 
      name: 'Jogador 1',
      assertions: '',
      score: 10,
      gravatarEmail: 'teste@trybe.com.br',
    }}

describe('Teste do componente Game.js', () => {
  it('Testa se existe um campo com o nome do jogador que está salvo no estado global da aplicação', () => {
    const { store } = renderWithRouterAndRedux(<Game/>, INITIAL_TEST);
    const playerName = screen.getByTestId('header-player-name');
    const storedPlayerName = store.getState().player.name;
    expect(playerName).toBeInTheDocument();
    expect(playerName.textContent).toBe(storedPlayerName);
  });
  
  it('Teste se a pontuação mostrada na tela é a mesma que está armazenada no estado global.', () => {
    const { store } = renderWithRouterAndRedux(<Game/>, INITIAL_TEST);
    const score = screen.getByTestId('header-score');
    const storedScore = store.getState().player.score;
    expect(score).toBeInTheDocument();
    expect(Number(score.textContent)).toBe(storedScore);
  });

  it('Testa se a imagem que está sendo mostrada na tela é a correta, de acorco com o email informado', () => {
    const { store } = renderWithRouterAndRedux(<Game/>, INITIAL_TEST);
    const storedEmail = store.getState().player.gravatarEmail;
    const mockedHashCode = md5(storedEmail).toString();
    const mockedUrl = `https://www.gravatar.com/avatar/${mockedHashCode}`;
    const imageProfile = screen.getByRole('img');

    expect(imageProfile.src).toBe(mockedUrl);
  });
});
