import { For } from 'solid-js';

function GameBoard(props) {
  const getTileStatus = (guessLetter, index) => {
    const correctLetter = props.wordToGuess()[index];
    if (guessLetter === correctLetter) {
      return 'correct';
    } else if (props.wordToGuess().includes(guessLetter)) {
      return 'present';
    } else {
      return 'absent';
    }
  };

  return (
    <div class="mb-4">
      <For each={[...Array(props.maxAttempts).keys()]}>
        {(rowIndex) => (
          <div class="flex justify-center mb-1">
            <For each={[...Array(props.wordLength).keys()]}>
              {(colIndex) => {
                let letter = '';
                let status = '';
                if (rowIndex < props.guesses().length) {
                  letter = props.guesses()[rowIndex][colIndex];
                  status = getTileStatus(letter, colIndex);
                } else if (rowIndex === props.guesses().length) {
                  letter = props.currentGuess()[colIndex] || '';
                }

                return (
                  <div
                    class="w-12 h-12 m-0.5 flex items-center justify-center text-2xl font-bold uppercase border-2 box-border"
                    classList={{
                      'border-gray-500 text-black': !status,
                      'bg-green-500 text-white border-green-500': status === 'correct',
                      'bg-yellow-500 text-white border-yellow-500': status === 'present',
                      'bg-gray-400 text-white border-gray-400': status === 'absent',
                    }}
                  >
                    {letter}
                  </div>
                );
              }}
            </For>
          </div>
        )}
      </For>
    </div>
  );
}

export default GameBoard;