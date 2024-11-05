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
                  class={`flex-1 m-0.5 py-2 rounded bg-gray-300 font-semibold cursor-pointer`}
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