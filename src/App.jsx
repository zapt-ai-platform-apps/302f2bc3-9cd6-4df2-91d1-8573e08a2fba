import React from 'react';
import Game from './components/Game';

function App() {
  return (
    <div className="h-full bg-gradient-to-br from-gray-900 to-gray-800 p-4 flex flex-col items-center text-white">
      <div className="w-full max-w-md min-h-screen">
        <h1 className="text-4xl font-bold text-purple-400 mb-8 text-center">Wooordle</h1>
        <Game />
        <div className="mt-8 text-center">
          <a
            href="https://www.zapt.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Made on ZAPT
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;