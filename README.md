# Wooordle

Wooordle is a web-based word guessing game inspired by Wordle. Players have six attempts to guess a five-letter word. After each guess, the tiles will change color to show how close your guess was to the actual word. The on-screen keyboard also updates to show which letters have been used and their status.

## How to Play

1. **Start the Game**

   - Open the app to begin playing Wooordle.

2. **Enter Your Guess**

   - Use your **physical keyboard** or the **on-screen keyboard** to input letters and form a five-letter word.
   - Your current guess will appear on the game board **immediately as you type**.

3. **Submit Your Guess**

   - Press the **"Enter"** key on your keyboard or on the on-screen keyboard to submit your guess.

4. **Feedback on Your Guess**

   - After submitting, each letter in your guess will change color:
     - **Green**: The letter is in the correct position.
     - **Yellow**: The letter is in the word but in the wrong position.
     - **Gray**: The letter is not in the word at all.
   - The **on-screen keyboard** will also update:
     - **Green Key**: The letter is in the correct position in one of your guesses.
     - **Yellow Key**: The letter is in the word but not yet in the correct position.
     - **Gray Key**: The letter is not in the word at all.

5. **Duplicate Letters Handling**

   - If your guess contains duplicate letters and the target word has fewer instances of that letter, the game correctly marks the extra letters as gray (absent). This means the feedback accurately reflects the number of times a letter appears in the actual word.

6. **Continue Guessing**

   - You have up to six attempts to guess the correct word.
   - Use the feedback from previous guesses and the keyboard colors to inform your next guess.

7. **Win or Lose**

   - **Win**: If you guess the correct word within six tries, a success message will appear.
   - **Lose**: If you fail to guess the word after six attempts, the correct word will be revealed.

8. **Play Again**

   - After completing a game, you can start a new game by clicking the **"Play Again"** button.

## Features

- **Improved Mobile Design**: Optimized for mobile devices with responsive layouts, larger buttons, and adjustable tile sizes for a seamless experience.
- **Responsive Design**: Enjoy a seamless experience on both desktop and mobile devices.
- **On-Screen Keyboard**: Large, touch-friendly buttons that show letter usage and feedback.
- **Immediate Letter Updates**: Letters display on the game board as you type.
- **Keyboard Input**: Use your physical keyboard or the on-screen keyboard.
- **Visual Feedback**: Provides immediate visual feedback on both the game board and keyboard after each guess.
- **Duplicate Letters Handling**: Correctly handles words with duplicate letters.
- **User-Friendly Interface**: Clean and intuitive design for an enjoyable user experience.
- **Error Handling**: Informative messages guide you if you enter invalid words or incomplete guesses.
- **Letter Tracking**: The on-screen keyboard highlights which letters have been used and their status in the game.

## External APIs

- **Random Word API**: Used to fetch a random five-letter word for the game.
- **Dictionary API**: Used to verify valid English words for guesses.

## How to Install as a PWA

1. **On Mobile Devices**:
   - Open the app in your browser.
   - Tap the **"Add to Home Screen"** option from your browser menu.
   - The app icon will appear on your home screen for quick access.

2. **On Desktop Browsers**:
   - Open the app in your browser.
   - Click on the **install icon** in the address bar or select **"Install"** from the browser menu.
   - The app will be installed on your system like a native application.

Enjoy playing Wooordle and challenge yourself to guess the word!