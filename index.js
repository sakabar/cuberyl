const {Cube} = require('./dist/src/');
const {State} = require('./dist/src/State');

const cube = new Cube(3);
console.dir(cube);
console.dir(cube.getOrder())

const initial_state = new State(
    [ 0, 1, 2, 3, 4, 5, 6, 7, ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, ],
    [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
    [ 0, 1, 2, 3, 4, 5, ]);

const r_state = new State(
    [ 0, 2, 6, 3, 4, 1, 5, 7],
    [ 0, 1, 2, 0, 0, 2, 1, 0],
    [ 0, 5, 9, 3, 4, 2, 6, 7, 8, 1, 10, 11],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 1, 2, 3, 4, 5, ]
);


const r4 = initial_state.apply_move(r_state).apply_move(r_state).apply_move(r_state).apply_move(r_state);

console.dir(r4.eq(initial_state));
