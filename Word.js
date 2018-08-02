var letter = require('./Letter.js');

function Word(word) {
    var charArray = word.split('');
    this.letterArray = [];
    for (var i = 0; i < charArray.length; i++) {
        var myLetter = new letter.Letter(charArray[i]);
        this.letterArray.push(myLetter);
    }
}

Word.prototype.returnString = function() {
    var string = '';
    for (var i = 0; i < this.letterArray.length; i++) {
        string += this.letterArray[i].toString();
    }
    return string;
}

Word.prototype.searchWord = function(character) {
    for (var i = 0; i < this.letterArray.length; i++) {
        this.letterArray[i].checkChar(character);
    }
}

module.exports = {
    Word: Word
}