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
    <div class="mt-4 w-full">
      <For each={keys}>
        {(row) => (
          <div class="flex justify-center mb-1">
            <For each={row}>
              {(key) => (
                <button
                  class={`m-1 rounded font-semibold flex items-center justify-center cursor-pointer
                    ${
                      key === 'ENTER' || key === 'BACKSPACE'
                        ? 'h-12 text-sm sm:h-16 sm:text-xl md:h-20 md:text-2xl md:w-24 lg:h-24 lg:text-3xl lg:w-28'
                        : 'h-12 text-lg sm:h-16 sm:text-xl md:h-20 md:text-2xl md:w-16 lg:h-24 lg:text-3xl lg:w-20'
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