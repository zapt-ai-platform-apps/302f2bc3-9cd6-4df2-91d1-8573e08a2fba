# Wooordle

Wooordle is a web-based word guessing game inspired by Wordle. Players have six attempts to guess a five-letter word. After each guess, the tiles change color to show how close your guess was to the actual word.

## How to Play

1. **Start the Game**
   - Open the app to begin playing Wooordle.

2. **Enter Your Guess**
   - Use your **physical keyboard** or the **on-screen keyboard** to input letters and form a five-letter word.
   - Your current guess will appear on the game board.

3. **Submit Your Guess**
   - Press the "Enter" key on your keyboard or click the "Enter" button on the on-screen keyboard to submit your guess.

4. **Receive Feedback**
   - After submitting, each letter in your guess will change color:
     - **Green**: The letter is in the correct position.
     - **Yellow**: The letter is in the word but in the wrong position.
     - **Gray**: The letter is not in the word at all.

5. **Continue Guessing**
   - You have up to six attempts to guess the correct word.
   - Use the feedback from previous guesses to inform your next guess.

6. **Win or Lose**
   - **Win**: If you guess the correct word within six tries, a success message will appear.
   - **Lose**: If you fail to guess the word after six attempts, the correct word will be revealed.

7. **Play Again**
   - After completing a game, you can start a new game by clicking the "Play Again" button.

## Features

- **Physical Keyboard Support**: Use your computer's keyboard for a seamless gaming experience.
- **On-Screen Keyboard**: Compatible with touch devices and mobile phones.
- **Responsive Design**: The game adapts to various screen sizes for optimal playability.
- **Visual Feedback**: Immediate visual cues help you strategize your next guess.
- **User-Friendly Interface**: Clean design ensures an enjoyable experience.

## External APIs

- **Random Word API**: Retrieves a random five-letter word for each game.
- **Dictionary API**: Verifies that each guess is a valid English word.

### API Descriptions

- **Random Word API**: Provides random words to ensure each game is unique and unpredictable.
- **Dictionary API**: Checks if your guess is a valid word to maintain game integrity.

## Requirements

- A modern web browser with JavaScript enabled.

Enjoy playing Wooordle and challenge yourself to guess the word!
