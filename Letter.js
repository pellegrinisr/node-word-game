function Letter(charVal) {
    this.charVal = charVal;
    //this.beenGuessed = beenGuessed;
    this.beenGuessed = false;
}

Letter.prototype.toString = function() {
    if (this.beenGuessed) {
        return this.charVal;
    } else {
        return '-';
    }
}

Letter.prototype.checkChar = function(charToCheck) {
    if (charToCheck === this.charVal) {
        this.beenGuessed = true;
    } 
}


module.exports = {
    Letter: Letter
}