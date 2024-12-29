import React from 'react';

function GameBoard({ wordToGuess, guesses, currentGuess, maxAttempts, wordLength, getTileStatuses }) {
  const renderTile = (letter, status) => {
    let classNames = "flex items-center justify-center m-0.5 font-bold uppercase border-2 box-border " +
      "w-12 h-12 text-xl " +
      "sm:w-14 sm:h-14 sm:text-2xl " +
      "md:w-16 md:h-16 md:text-3xl";

    if (status === 'correct') {
      classNames += " bg-green-600 text-white border-green-600";
    } else if (status === 'present') {
      classNames += " bg-yellow-500 text-white border-yellow-500";
    } else if (status === 'absent') {
      classNames += " bg-gray-700 text-white border-gray-700";
    } else {
      classNames += " border-gray-500 text-white";
    }

    return (
      <div className={classNames}>
        {letter}
      </div>
    );
  };

  const rows = [];
  for (let rowIndex = 0; rowIndex < maxAttempts; rowIndex++) {
    const guess = guesses[rowIndex];
    const statuses = guess ? getTileStatuses(guess) : [];
    const tiles = [];

    for (let colIndex = 0; colIndex < wordLength; colIndex++) {
      let letter = '';
      let status = '';

      if (rowIndex < guesses.length) {
        letter = guesses[rowIndex][colIndex];
        status = statuses[colIndex];
      } else if (rowIndex === guesses.length) {
        letter = currentGuess[colIndex] || '';
      }

      tiles.push(renderTile(letter, status));
    }

    rows.push(
      <div key={rowIndex} className="flex justify-center mb-1">
        {tiles}
      </div>
    );
  }

  return (
    <div className="mb-4 w-full max-w-md">
      {rows}
    </div>
  );
}

export default GameBoard;