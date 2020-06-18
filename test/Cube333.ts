import chai from 'chai';
import { Cube333 } from '../src/Cube333';
import { State333 } from '../src/State333';

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

    it("E = E2 E'", () => {
        const cube = new Cube333();
        cube.move("E2");
        cube.move("E'");

        const actual = cube.getState();
        const expected = State333.getEMoveState();

        chai.assert.deepEqual(actual, expected);
    });

    it("x = L' M' R", () => {
        const cube = new Cube333();
        cube.move("L' M' R");

        const actual = cube.getState();
        const expected = State333.getXMoveState();

        chai.assert.deepEqual(actual, expected);
    });

    it("y = U E' D'", () => {
        const cube = new Cube333("U E' D'");
        const actual = cube.getState();
        const expected = State333.getYMoveState();

        chai.assert.deepEqual(actual, expected);
    });

    it("z = F S B'", () => {
        const cube = new Cube333();
        cube.move("F S B'");

        const actual = cube.getState();
        const expected = State333.getZMoveState();

        chai.assert.deepEqual(actual, expected);
    });

    it("R R' is solved", () => {
        const cube = new Cube333("R R'");
        const actual = cube.isSolved();
        const expected = true

        chai.assert.deepEqual(actual, expected);
    });

});

