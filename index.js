var word = require('./Word.js');
var inquirer = require('inquirer');
var numGuesses = 0;
var MAX_GUESSES = 10;

var wordArray = ['character', 'logic', 'iteration', 'version', 'data', 'loop'];

var randomNum = Math.floor(Math.random() * wordArray.length);

var myWord = new word.Word(wordArray[randomNum]);


function iteration() {
    console.log(myWord.returnString());
    var isFound = true;
    inquirer.prompt({
        name: 'guessLetter',
        message: 'Enter your guess: '
    }).then(function(reply) {
        myWord.searchWord(reply.guessLetter);
        console.log(myWord.returnString());
    })
}

iteration();