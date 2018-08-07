var word = require('./Word.js');
var inquirer = require('inquirer');
const MAX_GUESSES = 12;
var chosenWords = [];
var guessedLetters = [];
var wordArray = ['character', 'logic', 'iteration', 'version', 'data', 'loop'];

//function that uses a random number to select a word 
//from the word array
function generateWord() {
    var randomNum;
    do {
        var found = false;
        //console.log('entered do while loop');
        if (chosenWords.length === wordArray.length) {
            chosenWords = [];
        }
        randomNum = Math.floor(Math.random() * wordArray.length);
        //console.log(randomNum);
        var i = 0;
        while (i < chosenWords.length && !found) {
            //console.log('entered nested while loop');
            if (chosenWords[i] === randomNum) {
               // console.log('entered if statement');
                found = true;
            } else {
                i++;
            }
        }
    } while (found);
   // console.log('exit do while loop');
    chosenWords.push(randomNum);
    return new word.Word(wordArray[randomNum]);
}

//recursive function that handles a round of the game
//accepts a Word object and the current number of guesses
//displays the current word string,
//prompts user to enter a character
//displays the updated word string
//checks to see if player won/lost
function iteration(myWord, numGuesses) {
    console.log(myWord.returnString());
    console.log('Guesses Remaining: ' + numGuesses);
    var isFound = true;
    inquirer.prompt({
        name: 'guessLetter',
        message: 'Enter your guess: ',
        validate: function(name) {
            if (name.length > 1 || (name.charCodeAt(0) < 97 || name.charCodeAt(0) > 122)) {
                return false;
            } else {
                return true;
            }
        }
    }).then(function(reply) {
        var i = 0;
        var previouslyGuessed = false;
        while (i < guessedLetters.length && !previouslyGuessed) {
            if (guessedLetters[i] === reply.guessLetter) {
                previouslyGuessed = true;
            } else {
                i++;
            }
        }
        if (previouslyGuessed) {
            console.log(reply.guessLetter + ' has already been guessed.\nPlease guess another letter: ');
            iteration(myWord, numGuesses);
        } else {
            guessedLetters.push(reply.guessLetter);
            numGuesses--;
            myWord.searchWord(reply.guessLetter);
            console.log(myWord.returnString());
            i = 0;
            while (i < myWord.letterArray.length && isFound) {
                if (!myWord.letterArray[i].beenGuessed) {
                    isFound = false;
                } else {
                    i++;
                }
            }
            if (numGuesses > 0 && !isFound) {
                iteration(myWord, numGuesses);
            } else if (isFound && numGuesses > 0) {
                console.log('You win');
                guessedLetters = [];
                playAgain();
            } else if (numGuesses === 0) {
                console.log('You lose');
                guessedLetters = [];
                playAgain();
            }
        }
    });
}

//function that asks the user if he/she wants to play again
function playAgain() {
    inquirer.prompt({
        name: 'again',
        message: 'Do you want to play again? ',
        type: 'confirm'
    }).then(function(response) {
        if (response.again) {
            iteration(generateWord(), MAX_GUESSES);
        }
    });
}

 
iteration(generateWord(), MAX_GUESSES);