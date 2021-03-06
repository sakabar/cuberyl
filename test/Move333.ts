import chai from 'chai';
import {Notation333} from '../src/Notation333';
import {Move333} from '../src/Move333';

describe('Move333.ts', () => {
    it('constructor', () => {
        const move = new Move333('R');
        const actual = move.getNotation();
        const expected = Notation333.R;

        chai.assert.deepEqual(actual, expected);
    });

    it('allow R\'2. read as R2', () => {
        const move = new Move333("R'2");
        const actual = move.getNotation();
        const expected = Notation333.R2;

        chai.assert.deepEqual(actual, expected);
    });

    it('invalid notation', () => {
        chai.assert.throws(() => new Move333('DUMMY'), Error);
    });
});

