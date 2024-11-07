import { For } from 'solid-js';

function Keyboard(props) {
  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
  ];

  const handleClick = (key) => {
    props.onKeyPress(key);
  };

  return (
    <div class="mt-4">
      <For each={keys}>
        {(row) => (
          <div class="flex justify-center mb-1">
            <For each={row}>
              {(key) => (
                <button
                  class={`m-1 rounded bg-gray-300 font-semibold text-xl flex items-center justify-center cursor-pointer ${
                    key === 'ENTER' || key === 'BACKSPACE' ? 'w-20 h-16' : 'w-12 h-16'
                  }`}
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