export const getRandomWord = async () => {
  try {
    const response = await fetch('https://random-word-api.herokuapp.com/word?length=5');
    const data = await response.json();
    return data[0];
  } catch (error) {
    throw error;
  }
};

export const checkWordValidity = async (word) => {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
    return response.ok;
  } catch (error) {
    console.error('Error checking word:', error);
    return false;
  }
};