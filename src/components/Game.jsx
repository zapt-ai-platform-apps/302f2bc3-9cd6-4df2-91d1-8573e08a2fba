import { createSignal, onMount, Show } from 'solid-js';
import GameBoard from './GameBoard';
import Keyboard from './Keyboard';
import { getRandomWord, checkWordValidity } from '../utils/api';

function Game() {
  const [wordToGuess, setWordToGuess] = createSignal('');
  const [guesses, setGuesses] = createSignal([]);
  const [currentGuess, setCurrentGuess] = createSignal('');
  const [message, setMessage] = createSignal('');
  const [loading, setLoading] = createSignal(true);
  const [gameOver, setGameOver] = createSignal(false);
  const [letterStatuses, setLetterStatuses] = createSignal({});

  const maxAttempts = 6;
  const wordLength = 5;

  const updateLetterStatuses = (guess, statuses) => {
    const newStatuses = { ...letterStatuses() };

    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      const status = statuses[i];

      if (status === 'correct') {
        newStatuses[letter] = 'correct';
      } else if (status === 'present') {
        if (newStatuses[letter] !== 'correct') {
          newStatuses[letter] = 'present';
        }
      } else {
        if (!newStatuses[letter]) {
          newStatuses[letter] = 'absent';
        }
      }
    }

    setLetterStatuses(newStatuses);
  };

  const handleKeyPress = async (key) => {
    if (gameOver()) return;

    setMessage('');

    if (key === 'ENTER') {
      if (currentGuess().length !== wordLength) {
        setMessage('Not enough letters');
        return;
      }

      setLoading(true);

      const isValid = await checkWordValidity(currentGuess());
      if (!isValid) {
        setMessage('Not a valid word');
        setLoading(false);
        return;
      }

      const statuses = getTileStatuses(currentGuess());
      setGuesses([...guesses(), currentGuess()]);

      updateLetterStatuses(currentGuess(), statuses);

      if (currentGuess() === wordToGuess()) {
        setMessage('Congratulations!');
        setGameOver(true);
      } else if (guesses().length === maxAttempts - 1) {
        setMessage(`Game over! The word was ${wordToGuess()}`);
        setGameOver(true);
      }

      setCurrentGuess('');
      setLoading(false);

    } else if (key === 'BACKSPACE') {
      setCurrentGuess(currentGuess().slice(0, -1));
    } else if (currentGuess().length < wordLength && /^[A-Z]$/.test(key)) {
      setCurrentGuess(currentGuess() + key);
    }
  };

  const handlePhysicalKeyPress = (e) => {
    const key = e.key.toUpperCase();
    if (key === 'ENTER' || key === 'BACKSPACE' || /^[A-Z]$/.test(key)) {
      e.preventDefault();
      handleKeyPress(key);
    }
  };

  const handleReplay = () => {
    setGuesses([]);
    setCurrentGuess('');
    setMessage('');
    setGameOver(false);
    setLetterStatuses({});
    loadRandomWord();
  };

  const getTileStatuses = (guess) => {
    const statuses = Array(wordLength).fill('absent');
    const answerLetters = wordToGuess().split('');
    const guessLetters = guess.split('');

    for (let i = 0; i < wordLength; i++) {
      if (guessLetters[i] === answerLetters[i]) {
        statuses[i] = 'correct';
        answerLetters[i] = null;
        guessLetters[i] = null;
      }
    }

    for (let i = 0; i < wordLength; i++) {
      if (guessLetters[i]) {
        const index = answerLetters.indexOf(guessLetters[i]);
        if (index !== -1) {
          statuses[i] = 'present';
          answerLetters[index] = null;
        }
      }
    }

    return statuses;
  };

  const loadRandomWord = async () => {
    setLoading(true);
    try {
      const word = await getRandomWord();
      setWordToGuess(word.toUpperCase());
    } catch (error) {
      console.error('Error fetching word:', error);
      setMessage('Error fetching word. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  onMount(() => {
    loadRandomWord();
    window.addEventListener('keydown', handlePhysicalKeyPress);
    return () => {
      window.removeEventListener('keydown', handlePhysicalKeyPress);
    };
  });

  return (
    <>
      <Show when={!loading()} fallback={<div class="text-2xl font-bold text-purple-400">Loading...</div>}>
        <GameBoard
          wordToGuess={wordToGuess}
          guesses={guesses}
          currentGuess={currentGuess}
          maxAttempts={maxAttempts}
          wordLength={wordLength}
          getTileStatuses={getTileStatuses}
        />
        <Show when={message()}>
          <div class="mt-4 text-red-500 text-xl text-center">{message()}</div>
        </Show>
        <Show when={gameOver()}>
          <button
            class="mt-4 bg-green-600 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            onClick={handleReplay}
          >
            Play Again
          </button>
        </Show>
        <Keyboard onKeyPress={handleKeyPress} letterStatuses={letterStatuses} />
      </Show>
    </>
  );
}

export default Game;