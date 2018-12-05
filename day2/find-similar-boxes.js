// Day 2, Puzzle 2
const fs = require('fs');
const readline = require('readline');

const boxes = new Set([]);

const garbIn = readline.createInterface({
    input: fs.createReadStream('box-ids.txt')
});

garbIn.on('line', (line) => {
    if (findCloseMatch(line, boxes)) {
        process.exit(0);
    }
    // If not found then add it to the boxes we've already seen so we can keep searching.
    boxes.add(line);
});

/**
 * Tries to see if the boxId is close (1 character different in the ID)
 * to any of the boxes we've already found.
 * If it is, the prior box's id will be returned.
 */
function findCloseMatch(boxId, boxes) {
    for (let entry of boxes.values()) {
        if (similarEnough(boxId, entry, 1)) {
            return entry;
        }
    }
}

/**
 * Will compare the differences between the two strings and if they are close enough, it will
 * return true.
 *
 * @param id1
 * @param id2
 * @param maxDifferences
 */
function similarEnough(id1, id2, maxDifferences) {
    var differenceCount = 0;
    var index = 0;
    var lastDifference = -1;
    do {
        // See if they're different
        if (id1.charAt(index) !== id2.charAt(index)) {
            lastDifference = index;
            differenceCount++;
        }
        index++;
    } while (differenceCount <= maxDifferences && index < id1.length);

    var found = differenceCount <= maxDifferences;
    if  (found) {
        console.log(`Box ${id1} and ${id2} are similar`);
        console.log('Matching chars: ' + id1.slice(0, lastDifference) + id1.slice(lastDifference + 1));
    }
    return found;
}

/* Day 2 - Puzzle 2
--- Part Two ---
Confident that your list of box IDs is complete, you're ready to find the boxes full of prototype fabric.

The boxes will have IDs which differ by exactly one character at the same position in both strings. For example, given the following box IDs:

abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz
The IDs abcde and axcye are close, but they differ by two characters (the second and fourth). However, the IDs fghij and fguij differ by exactly one character, the third (h and u). Those must be the correct boxes.

What letters are common between the two correct box IDs? (In the example above, this is found by removing the differing character from either ID, producing fgij.)
 */
