import { For } from 'solid-js';

function GameBoard(props) {
  const Tile = (tileProps) => (
    <div
      class="
        flex items-center justify-center m-0.5 font-bold uppercase border-2 box-border
        w-12 h-12 text-xl
        sm:w-14 sm:h-14 sm:text-2xl
        md:w-16 md:h-16 md:text-3xl
      "
      classList={{
        'border-gray-500 text-black': !tileProps.status(),
        'bg-green-500 text-white border-green-500': tileProps.status() === 'correct',
        'bg-yellow-500 text-white border-yellow-500': tileProps.status() === 'present',
        'bg-gray-400 text-white border-gray-400': tileProps.status() === 'absent',
      }}
    >
      {tileProps.letter()}
    </div>
  );

  return (
    <div class="mb-4 w-full max-w-md">
      <For each={[...Array(props.maxAttempts).keys()]}>
        {(rowIndex) => {
          const guess = props.guesses()[rowIndex];
          const statuses = guess ? props.getTileStatuses(guess) : [];
          return (
            <div class="flex justify-center mb-1">
              <For each={[...Array(props.wordLength).keys()]}>
                {(colIndex) => (
                  <Tile
                    letter={() => {
                      if (rowIndex < props.guesses().length) {
                        return props.guesses()[rowIndex][colIndex];
                      } else if (rowIndex === props.guesses().length) {
                        return props.currentGuess()[colIndex] || '';
                      } else {
                        return '';
                      }
                    }}
                    status={() => {
                      if (rowIndex < props.guesses().length) {
                        return statuses[colIndex];
                      } else {
                        return '';
                      }
                    }}
                  />
                )}
              </For>
            </div>
          );
        }}
      </For>
    </div>
  );
}

export default GameBoard;