import { For } from 'solid-js';

function Keyboard(props) {
  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
  ];

  const getKeyStatus = (key) => {
    return props.letterStatuses()[key] || '';
  };

  const handleClick = (key) => {
    props.onKeyPress(key);
    console.log('Key pressed:', key);
  };

  return (
    <div class="mt-4 w-full max-w-md">
      <For each={keys}>
        {(row) => (
          <div class="flex justify-center mb-1">
            <For each={row}>
              {(key) => (
                <button
                  class={`m-1 rounded font-semibold flex items-center justify-center cursor-pointer
                    ${
                      key === 'ENTER' || key === 'BACKSPACE'
                        ? 'w-16 h-12 text-sm sm:w-20 sm:h-16 sm:text-xl'
                        : 'w-10 h-12 text-lg sm:w-12 sm:h-16 sm:text-xl'
                    }
                  `}
                  classList={{
                    'bg-gray-600 text-white': !getKeyStatus(key),
                    'bg-green-600 text-white': getKeyStatus(key) === 'correct',
                    'bg-yellow-500 text-white': getKeyStatus(key) === 'present',
                    'bg-gray-700 text-white': getKeyStatus(key) === 'absent',
                  }}
                  onClick={() => handleClick(key)}
                >
                  {key === 'BACKSPACE' ? '←' : key}
                </button>
              )}
            </For>
          </div>
        )}
      </For>
    </div>
  );
}

export default Keyboard;