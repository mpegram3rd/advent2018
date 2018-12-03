// Day 1, Puzzle 2
const fs = require('fs');
const readline = require('readline');

// Setup for handling events so we can properly handle the looping/async processing of the file.
const eventsEmitter = require('events').EventEmitter;
const eventHandler = new eventsEmitter.EventEmitter();

// Initialize the tracking variables.
var frequency = 0;
const frequenciesSeen = new Set([frequency]);

// If we find a match, output the frequency that repeated and exit
eventHandler.on('foundMatch', (matchedFrequency) => {
    console.log(`Repeated frequency: ${matchedFrequency}`);
    process.exit();
});

// This handles the looping of reading data in over and over
eventHandler.on('startRead', () => {

    // We define a readline handler and associated events.
    const garbIn = readline.createInterface({
        input: fs.createReadStream('frequency-data.txt')
    });

    // Process each line
    garbIn.on('line', (line) => {
        frequency += parseInt(line);

        // If we find a matching frequency, emit an event to tell our program to stop.
        if (frequenciesSeen.has(frequency)) {
            eventHandler.emit('foundMatch', frequency);
        }
        else {
            // Add unique frequency into the set and keep churning.
            frequenciesSeen.add(frequency);
        }
    });

    // Tell the process to start all over again if we hit the end of the file.
    garbIn.on('close', () => {
        eventHandler.emit('startRead');
    });
});

// Initiate the file read.
eventHandler.emit('startRead');

/* Day 1 - Puzzle 2
--- Part Two ---
You notice that the device repeats the same frequency change list over and over. To calibrate the device, you need to find the first frequency it reaches twice.

For example, using the same list of changes above, the device would loop as follows:

Current frequency  0, change of +1; resulting frequency  1.
Current frequency  1, change of -2; resulting frequency -1.
Current frequency -1, change of +3; resulting frequency  2.
Current frequency  2, change of +1; resulting frequency  3.
(At this point, the device continues from the start of the list.)
Current frequency  3, change of +1; resulting frequency  4.
Current frequency  4, change of -2; resulting frequency  2, which has already been seen.
In this example, the first frequency reached twice is 2. Note that your device might need to repeat its list of frequency changes many times before a duplicate frequency is found, and that duplicates might be found while in the middle of processing the list.

Here are other examples:

+1, -1 first reaches 0 twice.
+3, +3, +4, -2, -4 first reaches 10 twice.
-6, +3, +8, +5, -6 first reaches 5 twice.
+7, +7, -2, -7, -4 first reaches 14 twice.
What is the first frequency your device reaches twice?
*/

