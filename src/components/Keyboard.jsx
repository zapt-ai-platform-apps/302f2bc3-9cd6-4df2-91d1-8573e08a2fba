import React from 'react';

function Keyboard({ onKeyPress, letterStatuses }) {
  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
  ];

  const getKeyStatus = (key) => {
    return letterStatuses[key] || '';
  };

  const handleClick = (key) => {
    onKeyPress(key);
    console.log('Key pressed:', key);
  };

  return (
    <div className="mt-4 w-full">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-1">
          {row.map((key) => {
            let classNames = `m-1 rounded font-semibold flex items-center justify-center cursor-pointer `;
            if (key === 'ENTER' || key === 'BACKSPACE') {
              classNames += `h-12 text-sm sm:h-16 sm:text-xl md:h-20 md:text-2xl md:w-24 lg:h-24 lg:text-3xl lg:w-28`;
            } else {
              classNames += `h-12 text-lg sm:h-16 sm:text-xl md:h-20 md:text-2xl md:w-16 lg:h-24 lg:text-3xl lg:w-20`;
            }

            if (getKeyStatus(key) === 'correct') {
              classNames += " bg-green-600 text-white";
            } else if (getKeyStatus(key) === 'present') {
              classNames += " bg-yellow-500 text-white";
            } else if (getKeyStatus(key) === 'absent') {
              classNames += " bg-gray-700 text-white";
            } else {
              classNames += " bg-gray-600 text-white";
            }

            return (
              <button
                key={key}
                className={classNames}
                onClick={() => handleClick(key)}
                disabled={false}
              >
                {key === 'BACKSPACE' ? '←' : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;