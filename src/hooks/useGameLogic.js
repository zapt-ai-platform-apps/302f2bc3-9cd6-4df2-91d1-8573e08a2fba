import { useState, useEffect } from 'react';
import { getRandomWord, checkWordValidity } from '../utils/api';
import { getTileStatuses } from '../utils/gameUtils';

function useGameLogic() {
  const [wordToGuess, setWordToGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [letterStatuses, setLetterStatuses] = useState({});

  const maxAttempts = 6;
  const wordLength = 5;

  const updateLetterStatuses = (guess, statuses) => {
    const newStatuses = { ...letterStatuses };

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
    if (gameOver) return;

    setMessage('');

    if (key === 'ENTER') {
      if (currentGuess.length !== wordLength) {
        setMessage('Not enough letters');
        return;
      }

      setLoading(true);

      const isValid = await checkWordValidity(currentGuess);
      if (!isValid) {
        setMessage('Not a valid word');
        setLoading(false);
        return;
      }

      const statuses = getTileStatuses(currentGuess, wordToGuess, wordLength);
      setGuesses([...guesses, currentGuess]);

      updateLetterStatuses(currentGuess, statuses);

      if (currentGuess === wordToGuess) {
        setMessage('Congratulations!');
        setGameOver(true);
      } else if (guesses.length === maxAttempts - 1) {
        setMessage(`Game over! The word was ${wordToGuess}`);
        setGameOver(true);
      }

      setCurrentGuess('');
      setLoading(false);

    } else if (key === 'BACKSPACE') {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (currentGuess.length < wordLength && /^[A-Z]$/.test(key)) {
      setCurrentGuess(currentGuess + key);
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

  useEffect(() => {
    loadRandomWord();
    window.addEventListener('keydown', handlePhysicalKeyPress);
    return () => {
      window.removeEventListener('keydown', handlePhysicalKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    wordToGuess,
    guesses,
    currentGuess,
    message,
    loading,
    gameOver,
    letterStatuses,
    maxAttempts,
    wordLength,
    handleKeyPress,
    handleReplay
  };
}

export default useGameLogic;