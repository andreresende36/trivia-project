import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

const token =
  '9ec95505e16ba20ff6365430bebb4e4544b4f3695ddeb75a30e13cc2ba4e7115';
const questions = {
  response_code: 0,
  results: [
    {
      category: 'Science & Nature',
      type: 'boolean',
      difficulty: 'easy',
      question: 'Igneous rocks are formed by excessive heat and pressure.',
      correct_answer: 'False',
      incorrect_answers: ['True'],
    },
    {
      category: 'Entertainment: Video Games',
      type: 'multiple',
      difficulty: 'medium',
      question:
        'Which of the following created and directed the Katamari Damacy series?',
      correct_answer: 'Keita Takahashi',
      incorrect_answers: ['Hideki Kamiya', 'Shu Takumi', 'Shinji Mikami'],
    },
    {
      category: 'Entertainment: Japanese Anime & Manga',
      type: 'multiple',
      difficulty: 'hard',
      question:
        'What year was &quot;JoJo&#039;s Bizarre Adventure: Phantom Blood&quot; first released?',
      correct_answer: '1987',
      incorrect_answers: ['2013', '1983', '1995'],
    },
    {
      category: 'Entertainment: Comics',
      type: 'multiple',
      difficulty: 'medium',
      question: 'Who authored The Adventures of Tintin?',
      correct_answer: 'Herg&eacute;',
      incorrect_answers: ['E.P. Jacobs', 'Rin Tin Tin', 'Chic Young'],
    },
    {
      category: 'Entertainment: Cartoon & Animations',
      type: 'multiple',
      difficulty: 'medium',
      question:
        'What is Dipper&#039;s real name from &quot;Gravity Falls&quot;?',
      correct_answer: 'Mason Pines',
      incorrect_answers: ['Mable Pines', 'Jason Pines', 'Mark Pines'],
    },
  ],
};

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
    expect(button).toBeDisabled();
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

  test('Testa rota correta do usuario', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(token).mockResolvedValue(questions),
    });
  
    const { history, store } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId(TestIdName);
    const inputEmail = screen.getByTestId(TestIdEmail);
    const button = screen.getByRole('button', { name: /Play/i });

    expect(inputEmail).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    userEvent.type(inputName, validName);
    userEvent.type(inputEmail, validEmail);
    expect(inputEmail).toHaveValue(validEmail);
    expect(inputName).toHaveValue(validName);
    expect(button).not.toBeDisabled();

    userEvent.click(button);
    const { pathname } = history.location;
    
    const myStore = {
      player: {
        name: validName,
        assertions: 0,
        score: 0,
        gravatarEmail: validEmail,
      },
      questions: {
        reload: false,
        apiQuestions: questions.results,
        errorMessage: '',
        indexOfCurrentQuestion: 0
      }
    }

    expect(store.getState().player.name).toEqual(myStore.player.name);
    expect(store.getState().player.gravatarEmail).toEqual(myStore.player.gravatarEmail);
    await waitFor(() => {
      expect(store.getState().questions).toEqual(myStore.questions);
      expect(screen.getByTestId('question-category')).toBeInTheDocument();
    });

  });

  it('Testa rota para Settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const buttonSetting = screen.getByTestId('btn-settings');
    fireEvent.click(buttonSetting);

    const { pathname } = history.location;
    expect(pathname).toEqual('/settings');

    expect(screen.getByTestId('settings-title')).toBeInTheDocument();
  });

  it('Testa quando a api Questions retorna um erro', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(token).mockRejectedValueOnce({
        responseCode: 3,
        results: [],
      }),
    });
  
    const { history, store } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId(TestIdName);
    const inputEmail = screen.getByTestId(TestIdEmail);
    const button = screen.getByRole('button', { name: /Play/i });

    userEvent.type(inputName, validName);
    userEvent.type(inputEmail, validEmail);
    userEvent.click(button);

    // const { pathname } = history.location;
    
    const myStore = {
      player: {
        name: validName,
        assertions: 0,
        score: 0,
        gravatarEmail: validEmail,
      },
      questions: {
        reload: true,
        apiQuestions: [],
        errorMessage: 'Token Inválido'
      }
    }

    expect(store.getState().player.name).toEqual(myStore.player.name);
    expect(store.getState().player.gravatarEmail).toEqual(myStore.player.gravatarEmail);
    await waitFor(() => {
      expect(store.getState().questions).toEqual(myStore.questions);
      expect(screen.queryByTestId('question-category')).not.toBeInTheDocument();
    });
  })
});
