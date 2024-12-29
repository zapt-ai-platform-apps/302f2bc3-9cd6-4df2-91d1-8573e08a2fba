export const getTileStatuses = (guess, wordToGuess, wordLength) => {
  const statuses = Array(wordLength).fill('absent');
  const answerLetters = wordToGuess.split('');
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