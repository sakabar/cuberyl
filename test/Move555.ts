import chai from 'chai';
import {Notation444} from '../src/Notation444';
import {Move444} from '../src/Move444';

describe('Move444.ts', () => {
    it('constructor', () => {
        const move = new Move444('R');
        const actual = move.getNotation();
        const expected = Notation444.R;

        chai.assert.deepEqual(actual, expected);
    });

    it('allow R\'2. read as R2', () => {
        const move = new Move444("R'2");
        const actual = move.getNotation();
        const expected = Notation444.R2;

        chai.assert.deepEqual(actual, expected);
    });

    it('invalid notation', () => {
        chai.assert.throws(() => new Move444('DUMMY'), Error);
    });
});

