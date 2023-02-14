import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import userEvent from '@testing-library/user-event';
import * as local from '../services/localStorageGetToken';

jest.setTimeout(40000);

const token =
  '9ec95505e16ba20ff6365430bebb4e4544b4f3695ddeb75a30e13cc2ba4e7115';

jest.mock('../services/localStorageGetToken', () => {
  return {
    getLocalToken: () => token,
  };
});

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

const validEmail = 'anfitrao@0413.com';
const validName = '0041300';
const TestIdName = 'input-player-name';
const TestIdEmail = 'input-gravatar-email';

describe('Testa componente Question', () => {
  it('Testa se está renderizando perguntas diferentes', async () => {
    const { history, store } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId(TestIdName);
    const inputEmail = screen.getByTestId(TestIdEmail);
    const button = screen.getByRole('button', { name: /Play/i });

    userEvent.type(inputName, validName);
    userEvent.type(inputEmail, validEmail);
    userEvent.click(button);

    await waitFor(() => {
			const { pathname } = history.location;
      expect(pathname).toEqual('/game');
    });

		expect(store.getState().player.score).toBe(0);
		expect(store.getState().player.assertions).toBe(0);
		expect(store.getState().questions.indexOfCurrentQuestion).toBe(0);

		const previusQuestion = screen.getByTestId('question-category');
		expect(previusQuestion).toBeInTheDocument();
		expect(previusQuestion.innerHTML).toEqual("Science &amp\; Nature");
		// expect(previusQuestion.innerHTML).toEqual(questions.results[0].category);

		const buttonCorrect = screen.getByTestId('correct-answer');
		userEvent.click(buttonCorrect);

		const buttonNext = screen.getByTestId("btn-next");
		userEvent.click(buttonNext);

		const nextQuestion = screen.getByTestId('question-category');
		expect(nextQuestion).toBeInTheDocument();
		expect(nextQuestion.innerHTML).toEqual("Entertainment: Video Games");

		expect(store.getState().player.score).toBe(40);
		expect(store.getState().player.assertions).toBe(1);
		expect(store.getState().questions.indexOfCurrentQuestion).toBe(1);
  });

  it('Testa se é possível responder a alternativa correta após 5 segundos', async () => {
    const { history, store } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId(TestIdName);
    const inputEmail = screen.getByTestId(TestIdEmail);
    const button = screen.getByRole('button', { name: /Play/i });

    userEvent.type(inputName, validName);
    userEvent.type(inputEmail, validEmail);
    userEvent.click(button);

    await waitFor(() => {
			const { pathname } = history.location;
      expect(pathname).toEqual('/game');
    });

    expect(store.getState().player.score).toBe(0);
    const correctAnswer = screen.getByTestId('correct-answer')
    await waitFor(() => {}, { timeout: 5000 });
    expect(correctAnswer).not.toBeDisabled();
    userEvent.click(correctAnswer);
    expect(correctAnswer).toHaveAttribute('name', 'False');
    expect(store.getState().player.score).toBe(40);
    
  });

  it("Testa se não é alterado caso clique na resposta errada", async () => {
    const { history, store } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId(TestIdName);
    const inputEmail = screen.getByTestId(TestIdEmail);
    const button = screen.getByRole('button', { name: /Play/i });

    userEvent.type(inputName, validName);
    userEvent.type(inputEmail, validEmail);
    userEvent.click(button);

    await waitFor(() => {
			const { pathname } = history.location;
      expect(pathname).toEqual('/game');
    });

    expect(store.getState().player.score).toBe(0);
    const wrongAnswer = screen.getByText(/True/i)
    expect(wrongAnswer).not.toBeDisabled();
    userEvent.click(wrongAnswer);
    expect(store.getState().player.score).toBe(0);
  })

  it('Testa se demorar mais de 30 segundos todos os botões são desabilitados', async () => {
    
    const { history, store } = renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId(TestIdName);
    const inputEmail = screen.getByTestId(TestIdEmail);
    const button = screen.getByRole('button', { name: /Play/i });

    userEvent.type(inputName, validName);
    userEvent.type(inputEmail, validEmail);
    userEvent.click(button);

    await waitFor(() => {
			const { pathname } = history.location;
      expect(pathname).toEqual('/game');
    });

    await waitFor(() => {
      expect(screen.getByTestId('correct-answer')).toBeDisabled();
    }, { timeout: 32000 });
  })
});

beforeEach(() => {
  jest.clearAllMocks()

  jest.spyOn(global, 'fetch');
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValueOnce(token).mockResolvedValue(questions),
  });
})

