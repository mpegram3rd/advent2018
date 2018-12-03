const fs = require('fs');
const readline = require('readline');

const garbIn = readline.createInterface({
    input: fs.createReadStream('frequency-data.txt')
});

var frequency = 0;

garbIn.on('line', (line) => {
    var oldFrequency = frequency
    frequency += parseInt(line);
    console.log(`Current frequency ${oldFrequency}, change of ${line}; resulting frequency ${frequency}`);
    console.log(`Received line: ${line}`);
});

garbIn.on('close', () => {
   console.log(`Final frequency is: ${frequency}`)
});
