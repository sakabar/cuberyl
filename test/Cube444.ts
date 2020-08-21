import chai from 'chai';
import { Cube444 } from '../src/Cube444';
import { State444 } from '../src/State444';

describe('Cube444.ts', () => {
    it('R (I) = R', () => {
        const cube = new Cube444();

        cube.move('R');
        const actual = cube
        const expected = new Cube444('R');

        chai.assert.deepEqual(actual.eq(expected), true);
    })

    it('3-style 3 times', () => {
        const three_style = "U R D R' U' R D' R'";

        const initial_cube = new Cube444();
        const cube = new Cube444();
        cube.move(three_style);
        cube.move(three_style);
        cube.move(three_style);
        const actual = cube.eq(initial_cube);
        const expected = true;

        chai.assert.deepEqual(actual, expected);
    })

    it("R U", () => {
        const cube = new Cube444();
        cube.move("R U");

        const actual = cube.getState();
        const expected = new State444(
            [ 3, 0, 2, 6, 4, 1, 5, 7, ],
            [ 0, 0, 1, 2, 0, 2, 1, 0, ],
            [
                 3,  0,  1,  2,
                 4,  5,  6,  7,
                 8,  9, 10, 11,
                15, 12, 13, 14,
                16, 17, 18, 19,
                20, 21, 22, 23,
            ],
            [
                 3,  0,  1, 10,
                 4,  9,  6,  7,
                 8, 12, 22, 11,
                15, 17, 13, 14,
                 2,  5, 18, 19,
                20, 21, 16, 23,
            ]
        );

        chai.assert.deepEqual(actual, expected);
    });


    it("x = L' l' r R", () => {
        const cube = new Cube444();
        cube.move("L' l' r R");

        const actual = cube.getState();
        const expected = State444.getXMoveState();

        chai.assert.deepEqual(actual, expected);
    });

    it("u = z r z'", () => {
        const cube = new Cube444();
        cube.move("z r z'");

        const actual = cube.getState();
        const expected = State444.getSliceUMoveState();

        chai.assert.deepEqual(actual, expected);
    });

    it("d = z l z'", () => {
        const cube = new Cube444();
        cube.move("z l z'");

        const actual = cube.getState();
        const expected = State444.getSliceDMoveState();

        chai.assert.deepEqual(actual, expected);
    });

    it("D = z L z'", () => {
        const cube = new Cube444();
        cube.move("z L z'");

        const actual = cube.getState();
        const expected = State444.getDMoveState();

        chai.assert.deepEqual(actual, expected);
    });

    it("f = y' r y", () => {
        const cube = new Cube444();
        cube.move("y' r y");

        const actual = cube.getState();
        const expected = State444.getSliceFMoveState();

        chai.assert.deepEqual(actual, expected);
    });

    it("F = y' R y", () => {
        const cube = new Cube444();
        cube.move("y' R y");

        const actual = cube.getState();
        const expected = State444.getFMoveState();

        chai.assert.deepEqual(actual, expected);
    });

    it("u = x' f x", () => {
        const cube = new Cube444();
        cube.move("x' f x");

        const actual = cube.getState();
        const expected = State444.getSliceUMoveState();

        chai.assert.deepEqual(actual, expected);
    });

    it("U = x' F x", () => {
        const cube = new Cube444();
        cube.move("x' F x");

        const actual = cube.getState();
        const expected = State444.getUMoveState();

        chai.assert.deepEqual(actual, expected);
    });

    it("b = y' l y", () => {
        const cube = new Cube444();
        cube.move("y' l y");

        const actual = cube.getState();
        const expected = State444.getSliceBMoveState();

        chai.assert.deepEqual(actual, expected);
    });

    it("B = y' L y", () => {
        const cube = new Cube444();
        cube.move("y' L y");

        const actual = cube.getState();
        const expected = State444.getBMoveState();

        chai.assert.deepEqual(actual, expected);
    });

    it("y = U u d' D'", () => {
        const cube = new Cube444("U u d' D'");
        const actual = cube.getState();
        const expected = State444.getYMoveState();

        chai.assert.deepEqual(actual, expected);
    });

    it("z = F f b' B'", () => {
        const cube = new Cube444();
        cube.move("F f b' B'");

        const actual = cube.getState();
        const expected = State444.getZMoveState();

        chai.assert.deepEqual(actual, expected);
    });

    it("R R' is solved", () => {
        const cube = new Cube444("R R'");
        const actual = cube.isSolved();
        const expected = true

        chai.assert.deepEqual(actual, expected);
    });

});

