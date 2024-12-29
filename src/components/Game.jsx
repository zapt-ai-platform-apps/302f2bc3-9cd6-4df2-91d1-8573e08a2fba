import React from 'react';
import GameBoard from './GameBoard';
import Keyboard from './Keyboard';
import useGameLogic from '../hooks/useGameLogic';
import { getTileStatuses } from '../utils/gameUtils';

function Game() {
  const {
    wordToGuess,
    guesses,
    currentGuess,
    message,
    loading,
    gameOver,
    letterStatuses,
    maxAttempts,
    wordLength,
    handleKeyPress,
    handleReplay
  } = useGameLogic();

  return (
    <>
      {!loading ? (
        <>
          <GameBoard
            wordToGuess={wordToGuess}
            guesses={guesses}
            currentGuess={currentGuess}
            maxAttempts={maxAttempts}
            wordLength={wordLength}
            getTileStatuses={getTileStatuses}
          />
          {message && (
            <div className="mt-4 text-red-500 text-xl text-center">{message}</div>
          )}
          {gameOver && (
            <button
              className="mt-4 bg-green-600 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              onClick={handleReplay}
              disabled={loading}
            >
              Play Again
            </button>
          )}
          <Keyboard onKeyPress={handleKeyPress} letterStatuses={letterStatuses} />
        </>
      ) : (
        <div className="text-2xl font-bold text-purple-400">Loading...</div>
      )}
    </>
  );
}

export default Game;