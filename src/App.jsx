import { createSignal, onMount, For, Show } from 'solid-js';

import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';

function App() {
  const [wordToGuess, setWordToGuess] = createSignal('');
  const [guesses, setGuesses] = createSignal([]);
  const [currentGuess, setCurrentGuess] = createSignal('');
  const [message, setMessage] = createSignal('');
  const [loading, setLoading] = createSignal(true);
  const maxAttempts = 6;
  
  const wordLength = 5;

  const getRandomWord = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://random-word-api.herokuapp.com/word?length=5');
      const data = await response.json();
      setWordToGuess(data[0].toUpperCase());
    } catch (error) {
      console.error('Error fetching word:', error);
      setMessage('Error fetching word. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const checkWordValidity = async (word) => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
      return response.ok;
    } catch (error) {
      console.error('Error checking word:', error);
      return false;
    }
  };

  onMount(() => {
    getRandomWord();
  });

  const handleKeyPress = async (key) => {
    if (message()) return;
    if (key === 'ENTER') {
      if (currentGuess().length !== wordLength) {
        setMessage('Not enough letters');
        return;
      }

      const isValid = await checkWordValidity(currentGuess());
      if (!isValid) {
        setMessage('Not a valid word');
        return;
      }

      setGuesses([...guesses(), currentGuess()]);
      setCurrentGuess('');

      if (currentGuess() === wordToGuess()) {
        setMessage('Congratulations!');
      } else if (guesses().length + 1 === maxAttempts) {
        setMessage(`Game over! The word was ${wordToGuess()}`);
      }
    } else if (key === 'BACKSPACE') {
      setCurrentGuess(currentGuess().slice(0, -1));
    } else if (currentGuess().length < wordLength && /^[A-Z]$/.test(key)) {
      setCurrentGuess(currentGuess() + key);
    }
  };

  const handleReplay = () => {
    setGuesses([]);
    setCurrentGuess('');
    setMessage('');
    getRandomWord();
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 flex flex-col items-center">
      <h1 class="text-4xl font-bold text-purple-600 mb-8">Wooordle</h1>
      <Show when={!loading()} fallback={<div class="text-2xl font-bold text-purple-600">Loading...</div>}>
        <GameBoard wordToGuess={wordToGuess()} guesses={guesses()} currentGuess={currentGuess()} maxAttempts={maxAttempts} wordLength={wordLength} />
        <Show when={message()}>
          <div class="mt-4 text-red-600 text-xl">{message()}</div>
        </Show>
        <Show when={message() && (message() === 'Congratulations!' || message().startsWith('Game over'))}>
          <button
            class="mt-4 bg-green-500 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
            onClick={handleReplay}
          >
            Play Again
          </button>
        </Show>
        <Keyboard onKeyPress={handleKeyPress} />
      </Show>
    </div>
  );
}

export default App;