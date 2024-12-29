import { useState, useEffect } from 'react';
import { getRandomWord } from '../utils/api';

function useRandomWord(setMessage) {
  const [wordToGuess, setWordToGuess] = useState('');
  const [loading, setLoading] = useState(true);

  const loadRandomWord = async () => {
    setLoading(true);
    try {
      const word = await getRandomWord();
      if (word) {
        setWordToGuess(word.toUpperCase());
      } else {
        setMessage('Failed to load word. Please try again.');
        console.error('No word received from API');
      }
    } catch (error) {
      console.error('Error fetching word:', error);
      setMessage('Error fetching word. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRandomWord();
  }, []);

  return { wordToGuess, loading, loadRandomWord };
}

export default useRandomWord;