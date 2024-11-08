import { createSignal, onMount, Show } from 'solid-js';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';

function App() {
  const [wordToGuess, setWordToGuess] = createSignal('');
  const [guesses, setGuesses] = createSignal([]);
  const [currentGuess, setCurrentGuess] = createSignal('');
  const [message, setMessage] = createSignal('');
  const [loading, setLoading] = createSignal(true);
  const [gameOver, setGameOver] = createSignal(false);
  const [letterStatuses, setLetterStatuses] = createSignal({});

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

  const updateLetterStatuses = (guess, statuses) => {
    let newStatuses = { ...letterStatuses() };

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
      } else if (guesses().length === maxAttempts) {
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
    getRandomWord();
  };

  const getTileStatuses = (guess) => {
    const statuses = Array(wordLength).fill('absent');
    const answerLetters = wordToGuess().split('');
    const guessLetters = guess.split('');

    // First pass: mark correct letters
    for (let i = 0; i < wordLength; i++) {
      if (guessLetters[i] === answerLetters[i]) {
        statuses[i] = 'correct';
        answerLetters[i] = null; // Remove matched letter
        guessLetters[i] = null;
      }
    }

    // Second pass: mark present letters
    for (let i = 0; i < wordLength; i++) {
      if (guessLetters[i]) {
        const index = answerLetters.indexOf(guessLetters[i]);
        if (index !== -1) {
          statuses[i] = 'present';
          answerLetters[index] = null; // Remove matched letter
        }
      }
    }

    return statuses;
  };

  onMount(() => {
    getRandomWord();
    window.addEventListener('keydown', handlePhysicalKeyPress);
    return () => {
      window.removeEventListener('keydown', handlePhysicalKeyPress);
    };
  });

  return (
    <div
      class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 flex flex-col items-center text-gray-800"
    >
      <div class="w-full max-w-md">
        <h1 class="text-4xl font-bold text-purple-600 mb-8 text-center">Wooordle</h1>
        <Show when={!loading()} fallback={<div class="text-2xl font-bold text-purple-600">Loading...</div>}>
          <GameBoard
            wordToGuess={wordToGuess}
            guesses={guesses}
            currentGuess={currentGuess}
            maxAttempts={maxAttempts}
            wordLength={wordLength}
            getTileStatuses={getTileStatuses}
          />
          <Show when={message()}>
            <div class="mt-4 text-red-600 text-xl text-center">{message()}</div>
          </Show>
          <Show when={gameOver()}>
            <button
              class="mt-4 bg-green-500 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              onClick={handleReplay}
            >
              Play Again
            </button>
          </Show>
          <Keyboard onKeyPress={handleKeyPress} letterStatuses={letterStatuses} />
        </Show>
      </div>
    </div>
  );
}

export default App;