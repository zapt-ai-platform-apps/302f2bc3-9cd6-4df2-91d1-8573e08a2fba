import { For } from 'solid-js';

function GameBoard(props) {
  const getTileClass = (guessLetter, index) => {
    const correctLetter = props.wordToGuess()[index];
    if (guessLetter === correctLetter) {
      return 'bg-green-500 text-white';
    } else if (props.wordToGuess().includes(guessLetter)) {
      return 'bg-yellow-500 text-white';
    } else {
      return 'bg-gray-400 text-white';
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
                let tileClass = 'border-2 border-gray-500';

                if (rowIndex < props.guesses().length) {
                  letter = props.guesses()[rowIndex][colIndex];
                  tileClass += ' ' + getTileClass(letter, colIndex);
                } else if (rowIndex === props.guesses().length) {
                  letter = props.currentGuess()[colIndex] || '';
                }

                return (
                  <div
                    class={`w-12 h-12 m-0.5 flex items-center justify-center text-2xl font-bold uppercase ${tileClass}`}
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