import { For } from 'solid-js';

function GameBoard(props) {
  const Tile = (tileProps) => (
    <div
      class="w-12 h-12 m-0.5 flex items-center justify-center text-2xl font-bold uppercase border-2 box-border"
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
    <div class="mb-4">
      <For each={[...Array(props.maxAttempts).keys()]}>
        {(rowIndex) => {
          const guess = props.guesses()[rowIndex];
          const statuses = guess ? props.getTileStatuses(guess) : [];
          return (
            <div class="flex justify-center mb-1">
              <For each={[...Array(props.wordLength).keys()]}>
                {(colIndex) => {
                  return (
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
                  );
                }}
              </For>
            </div>
          );
        }}
      </For>
    </div>
  );
}

export default GameBoard;