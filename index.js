var word = require('./Word.js');
var inquirer = require('inquirer');
var numGuesses = 0;
const MAX_GUESSES = 10;
var chosenWords = [];
var wordArray = ['character', 'logic', 'iteration', 'version', 'data', 'loop'];


function generateWord() {
    var found = false;
    var randomNum = 0;
    do {
        if (chosenWords.length === wordArray.length) {
            chosenWords = [];
        }
        randomNum = Math.floor(Math.random() * wordArray.length);
        var i = 0;
        while (i < chosenWords.length && !found) {
            if (chosenWords[i] = randomNum) {
                found = true;
            } else {
                i++;
            }
        }
    } while (found);
   
    return new word.Word(wordArray[randomNum]);
}

function iteration(myWord) {
    console.log(myWord.returnString());
    var isFound = true;
    inquirer.prompt({
        name: 'guessLetter',
        message: 'Enter your guess: '
    }).then(function(reply) {
        myWord.searchWord(reply.guessLetter);
        console.log(myWord.returnString());
        var i = 0;
        while (i < myWord.letterArray.length && isFound) {
            if (!myWord.letterArray[i].beenGuessed) {
                isFound = false;
            } else {
                i++;
            }
        }
        if (numGuesses < MAX_GUESSES && !isFound) {
            numGuesses++;
            iteration(myWord);
        } else if (isFound && numGuesses < MAX_GUESSES) {
            console.log('You win');
            numGuesses = 0;
            playAgain();
        } else if (numGuesses === MAX_GUESSES) {
            console.log('You lose');
            numGuesses = 0;
            playAgain();
        }
    });
}

function playAgain() {
    inquirer.prompt({
        name: 'again',
        message: 'Do you want to play again? ',
        type: 'confirm'
    }).then(function(response) {
        if (response.again) {
            iteration(generateWord());
        }
    });
}

 
iteration(generateWord());