// Day 3, Puzzle 2
const lineReader = require('../lib/linereader');

const claims = [];

// Create a 2d fabric array.
const fabric = new Array(1000);
for (var x = 0; x < fabric.length; x++) {
    fabric[x] = new Array(1000);
    fabric[x].fill(0);
}

lineReader.processFile('fabric-claims.txt', lineHandler, closeHandler);

function lineHandler(line) {
    var claim = parseClaim(line);
    claims.push(claim);
    applyClaim(claim, fabric);
}

// When we're done reading and marking up the fabric, check to find the non-overlapping claim
function closeHandler() {
    for (var x = 0; x < claims.length; x++) {
        var claim = claims[x];
        if (!isOverlapped(claim, fabric)) {
            console.log('I found the non-overlapping claim!');
            console.log(JSON.stringify(claim));
            return;
        }
    }
}

// Returns "true" if there is an overlap, false, if not.
function isOverlapped(claim, fabric) {
    for (var x = claim.x; x < (claim.x + claim.width); x++) {
        for (var y = claim.y; y < (claim.y + claim.height); y++) {
            if (fabric[x][y] !== 1) {
                return true;
            }
        }
    }
    return false;
}

// Data format: #id @ x,y: LxW
function parseClaim(data) {
    var claim = {};
    var pieces = data.split(' ');
    claim.id = pieces[0];
    var startPos = pieces[2].split(',');
    claim.x = parseInt(startPos[0]);
    claim.y = parseInt(startPos[1].substring(0, startPos[1].length-1));
    var sizeVals = pieces[3].split('x');
    claim.width = parseInt(sizeVals[0]);
    claim.height = parseInt(sizeVals[1]);

    return claim;
}

function applyClaim(claim, fabric) {

    for (var x = claim.x; x < (claim.x + claim.width); x++) {
        for (var y = claim.y; y < (claim.y + claim.height); y++) {
            fabric[x][y]++;
        }
    }
}

/* Day 3 - Puzzle 2
--- Part Two ---
Amidst the chaos, you notice that exactly one claim doesn't overlap by even a single square inch of fabric with any other
claim. If you can somehow draw attention to it, maybe the Elves will be able to make Santa's suit after all!

For example, in the claims above, only claim 3 is intact after all claims are made.

What is the ID of the only claim that doesn't overlap?
 */
