const fs = require('fs');
const readline = require('readline');

// A simple library to clean up some of the rote file handling that's in each of these challenges.
module.exports = (function() {
    this.processFile = function(fileName, lineFunc, closeFunc) {

        const garbIn = readline.createInterface({
            input: fs.createReadStream(fileName)
        });

        if (lineFunc) {
            garbIn.on('line', lineFunc);
        }

        if (closeFunc) {
            garbIn.on('close', closeFunc);
        }

        return garbIn;
    };

    return this;
})();
