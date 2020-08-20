const {Cube} = require('cuberyl');

// 3x3x3 cube
const cube = new Cube(3);
console.log(cube.isSolved()); // true

cube.move("U R'");
let cnt = 1;
const isSolved = cube.isSolved(); // false
console.log(`${cnt} ${isSolved}`);

while(!cube.isSolved()) {
    cube.move("U R'");
    cnt += 1;
    const isSolved = cube.isSolved(); // false but last time.
    console.log(`${cnt} ${isSolved}`);
}

// => 1 false
// => 2 false
// ...
// => 63 true
