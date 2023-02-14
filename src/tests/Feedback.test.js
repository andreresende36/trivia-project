import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import userEvent from '@testing-library/user-event';
import Feedback from '../pages/Feedback';

const INITIAL_STATE = {
  player: {
    name: 'asd',
    assertions: 3,
    score: 210,
    gravatarEmail: 'asd'
  },
  questions: {
    reload: false,
    apiQuestions: [
      {
        category: 'History',
        type: 'multiple',
        difficulty: 'hard',
        question: 'What did the first vending machines in the early 1880&#039;s dispense?',
        correct_answer: 'Post cards',
        incorrect_answers: [
          'Alcohol',
          'Cigarettes',
          'Sodas '
        ]
      },
      {
        category: 'General Knowledge',
        type: 'boolean',
        difficulty: 'medium',
        question: 'The French word to travel is &quot;Travail&quot;',
        correct_answer: 'False',
        incorrect_answers: [
          'True'
        ]
      },
      {
        category: 'Entertainment: Music',
        type: 'multiple',
        difficulty: 'hard',
        question: 'What is the name of the song by Beyonc&eacute; and Alejandro Fern&aacute;ndez released in 2007?',
        correct_answer: 'Amor Gitano',
        incorrect_answers: [
          'La ultima vez',
          'Rocket',
          'Hasta Dondes Estes'
        ]
      },
      {
        category: 'History',
        type: 'multiple',
        difficulty: 'easy',
        question: 'How long did World War II last?',
        correct_answer: '6 years',
        incorrect_answers: [
          '4 years',
          '5 years',
          '7 years'
        ]
      },
      {
        category: 'Entertainment: Music',
        type: 'multiple',
        difficulty: 'medium',
        question: 'How many members are in the Japanese rock band SCANDAL?',
        correct_answer: '4',
        incorrect_answers: [
          '5',
          '2',
          '18'
        ]
      }
    ],
    errorMessage: '',
    indexOfCurrentQuestion: 5
  }
  }

describe("Testa a página de feedback", () => {
    it("Testa se a está renderizando o score correrto", () => {
      renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');
      expect(screen.getByText(/well done!/i)).toBeInTheDocument();
      expect(screen.getByTestId('feedback-total-score').innerHTML).toBe("210");
      expect(screen.getByTestId('feedback-total-question').innerHTML).toBe("3");   
    });

    it('Testa se ao clicar no botão jogar novamente retorna para a página de login', () => {
      const { store, history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');
      const btnPlayAgain = screen.getByTestId('btn-play-again');
      expect(btnPlayAgain).toBeInTheDocument();

      userEvent.click(btnPlayAgain);

      const { pathname } = history.location;
      expect(pathname).toEqual('/');

      const clearState = {
        player: {
          name: '',
          assertions: 0,
          score: 0,
          gravatarEmail: ''
        },
        questions: {
          reload: true,
          apiQuestions: [],
          errorMessage: '',
          indexOfCurrentQuestion: 0
        }
      }

      expect(store.getState()).toEqual(clearState);
    });

    it('Testa se ao clicar no botão ranking direciona para a pagina ranking', () => {
      const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');
      const btnRanking = screen.getByTestId('btn-ranking');
      expect(btnRanking).toBeInTheDocument();
      userEvent.click(btnRanking);

      const { pathname } = history.location;
      expect(pathname).toEqual('/ranking');
    })

    it('Testa se renderiza "Could be better..." caso a o número de assertions seja menor que 3', () => {
      const WRONG_INITIAL_STATE = {
        player: {
          name: 'asd',
          assertions: 2,
          score: 210,
          gravatarEmail: 'asd'
        },
        questions: {
          reload: false,
          apiQuestions: [
            {
              category: 'History',
              type: 'multiple',
              difficulty: 'hard',
              question: 'What did the first vending machines in the early 1880&#039;s dispense?',
              correct_answer: 'Post cards',
              incorrect_answers: [
                'Alcohol',
                'Cigarettes',
                'Sodas '
              ]
            },
            {
              category: 'General Knowledge',
              type: 'boolean',
              difficulty: 'medium',
              question: 'The French word to travel is &quot;Travail&quot;',
              correct_answer: 'False',
              incorrect_answers: [
                'True'
              ]
            },
            {
              category: 'Entertainment: Music',
              type: 'multiple',
              difficulty: 'hard',
              question: 'What is the name of the song by Beyonc&eacute; and Alejandro Fern&aacute;ndez released in 2007?',
              correct_answer: 'Amor Gitano',
              incorrect_answers: [
                'La ultima vez',
                'Rocket',
                'Hasta Dondes Estes'
              ]
            },
            {
              category: 'History',
              type: 'multiple',
              difficulty: 'easy',
              question: 'How long did World War II last?',
              correct_answer: '6 years',
              incorrect_answers: [
                '4 years',
                '5 years',
                '7 years'
              ]
            },
            {
              category: 'Entertainment: Music',
              type: 'multiple',
              difficulty: 'medium',
              question: 'How many members are in the Japanese rock band SCANDAL?',
              correct_answer: '4',
              incorrect_answers: [
                '5',
                '2',
                '18'
              ]
            }
          ],
          errorMessage: '',
          indexOfCurrentQuestion: 5
        }
      }
      const { store } = renderWithRouterAndRedux(<App />, WRONG_INITIAL_STATE, '/feedback');
      expect(screen.getByText(/could be better\.\.\./i)).toBeInTheDocument();
      expect(screen.getByTestId('feedback-total-score').innerHTML).toBe("210");
      expect(screen.getByTestId('feedback-total-question').innerHTML).toBe("2");
    })
})