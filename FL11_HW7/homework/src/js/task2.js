let game = confirm('Do you want to play a game?');
let rangeCount = 1;
let prize = 0;
let currentPrize = 100;
let prizeCounter = 1;
let maxPrize = 100;
let midPrize = 50;
let minPrize = 25;
let maxAttempts = 3;
let maxRange = 8;

if (game) {
    let startGame = true;
    for (; startGame;) {
        let range = maxRange * rangeCount;
        let randomNumber = Math.floor(Math.random() * range) + 1;
        let userNumber;
        let gameOver;

        for (let attempts = 3; attempts > 0; attempts--) {
            if (attempts === maxAttempts) {
                currentPrize = maxPrize * prizeCounter;
            } else if (attempts === maxAttempts - 1) {
                currentPrize = midPrize * prizeCounter;
            } else {
                currentPrize = minPrize * prizeCounter;
            }
            userNumber = Number(prompt('Enter a number from 0 to ' + range +
                '\nAttempts left: ' + attempts +
                '\nTotal prize: ' + prize +
                '\nPossible prize on current attempt: ' + currentPrize));
            if (userNumber === randomNumber) {
                gameOver = false;
                prize += currentPrize;
                break;
            }
        }
        if (gameOver) {
            alert('Thank you for a game. Your prize is: ' + prize + '$.');
            startGame = confirm('Do you want to play again?');
            prize = 0;
            rangeCount = 1;
            prizeCounter = 1;
        } else {
            startGame = confirm('Congratulation! Your prize is: ' + prize + '$.' + '\nDo you want to continue?');
            if (userNumber === randomNumber && startGame) {
                rangeCount *= maxRange - 1;
                prizeCounter *= maxRange;
            } else {
                alert('Thank you for a game. Your prize is: ' + prize + '$');
                startGame = confirm('Do you want to play again?');
                prize = 0;
                rangeCount = 1;
                prizeCounter = 1;
            }
        }
    }
} else {
    alert('You did not become a millionaire, but can.');
}