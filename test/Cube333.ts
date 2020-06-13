import chai from 'chai';
import { Cube333 } from '../src/Cube333';

describe('Cube333.ts', () => {
    it('R (I) = R', () => {
        const cube = new Cube333();

        cube.move('R');
        const actual = cube
        const expected = new Cube333('R');

        chai.assert.deepEqual(actual.eq(expected), true);
    })

    it('3-style 3 times', () => {
        const three_style = "U R D R' U' R D' R'";

        const initial_cube = new Cube333();
        const cube = new Cube333();
        cube.move(three_style);
        cube.move(three_style);
        cube.move(three_style);
        const actual = cube.eq(initial_cube);
        const expected = true;

        chai.assert.deepEqual(actual, expected);
    })
});

