# cuberyl

Cuberyl (kjúːberəl) is a Javascript library to simulate NxNxN cube puzzle.

Until now N = 3, and I'm going to implement N = 2, 4, 5.

## Features
1. Judge whether a cube is solved or not
2. Judge a given algorithm is a valid 3-style of Edge/Corner part

## Examples
Example 1 (code: `./examples/ex1.js`)

```
// const {Cube} = require('cuberyl');
const {Cube} = require('../dist/src/index');

// 3x3x3 cube
const cube = new Cube(3);
console.dir(cube.isSolved()); // true

cube.move("U R'");
let cnt = 1;
const isSolved = cube.isSolved(); // false but last time.
console.dir(`${cnt} ${isSolved}`);

while(!cube.isSolved()) {
    cube.move("U R'");
    cnt += 1;
    const isSolved = cube.isSolved(); // false but last time.
    console.dir(`${cnt} ${isSolved}`);
}

// => 1 false
// => 2 false
// ...
// => 63 true
```


Example 2 (code: `./examples/ex2.js`)

```
// const {Algorithm} = require('cuberyl');                                                          
const {Algorithm} = require('../dist/src/index');

const alg = new Algorithm("U R D R' U' R D' R'");
const isValidThreeStyle = alg.isValidThreeStyleCorner(3, 'UBL', 'UBR', 'RBD');

if (isValidThreeStyle) {
    console.log('OK'); // => OK
}
```

