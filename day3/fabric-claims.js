// Day 3, Puzzle 1
const lineReader = require('../lib/linereader');

// Create a 2d fabric array.
const fabric = new Array(1000);
for (var x = 0; x < fabric.length; x++) {
    fabric[x] = new Array(1000);
    fabric[x].fill(0);
}

lineReader.processFile('fabric-claims.txt', lineHandler, closeHandler);

function lineHandler(line) {
    var claim = parseClaim(line);
    applyClaim(claim, fabric);
}

function closeHandler() {
    console.log('Overlapping fabric: ' + calculateOverlap(fabric));
}

// Tally up the overlapping sections.
function calculateOverlap(fabric) {
    var overlaps = 0;
    for (var y = 0; y < fabric.length; y++) {
        for (var x = 0; x < fabric[y].length; x++) {
            overlaps += fabric[y][x] > 1 ? 1 : 0;
        }
    }
    return overlaps;
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

/* Day 3 - Puzzle 1
--- Day 3: No Matter How You Slice It ---
The Elves managed to locate the chimney-squeeze prototype fabric for Santa's suit (thanks to someone who helpfully wrote its box IDs on the wall of the warehouse in the middle of the night). Unfortunately, anomalies are still affecting them - nobody can even agree on how to cut the fabric.

The whole piece of fabric they're working on is a very large square - at least 1000 inches on each side.

Each Elf has made a claim about which area of fabric would be ideal for Santa's suit. All claims have an ID and consist of a single rectangle with edges parallel to the edges of the fabric. Each claim's rectangle is defined as follows:

The number of inches between the left edge of the fabric and the left edge of the rectangle.
The number of inches between the top edge of the fabric and the top edge of the rectangle.
The width of the rectangle in inches.
The height of the rectangle in inches.
A claim like #123 @ 3,2: 5x4 means that claim ID 123 specifies a rectangle 3 inches from the left edge, 2 inches from the top edge, 5 inches wide, and 4 inches tall. Visually, it claims the square inches of fabric represented by # (and ignores the square inches of fabric represented by .) in the diagram below:

...........
...........
...#####...
...#####...
...#####...
...#####...
...........
...........
...........
The problem is that many of the claims overlap, causing two or more claims to cover part of the same areas. For example, consider the following claims:

#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2
Visually, these claim the following areas:

........
...2222.
...2222.
.11XX22.
.11XX22.
.111133.
.111133.
........
The four square inches marked with X are claimed by both 1 and 2. (Claim 3, while adjacent to the others, does not overlap either of them.)

If the Elves all proceed with their own plans, none of them will have enough fabric. How many square inches of fabric are within two or more claims?
 */
