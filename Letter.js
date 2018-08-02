function Letter(charVal) {
    this.charVal = charVal;
    //this.beenGuessed = beenGuessed;
    this.beenGuessed = false;
}

Letter.prototype.returnChar = function() {
    if (this.beenGuessed) {
        return this.charVal;
    } else {
        return '_';
    }
}

Letter.prototype.checkChar = function(charToCheck) {
    if (charToCheck === this.charVal) {
        this.beenGuessed = true;
    } 
}
