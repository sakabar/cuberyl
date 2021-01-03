import chai from 'chai';
import {Notation555} from '../src/Notation555';
import {Move555} from '../src/Move555';

describe('Move555.ts', () => {
    it('constructor', () => {
        const move = new Move555('R');
        const actual = move.getNotation();
        const expected = Notation555.R;

        chai.assert.deepEqual(actual, expected);
    });

    it('allow R\'2. read as R2', () => {
        const move = new Move555("R'2");
        const actual = move.getNotation();
        const expected = Notation555.R2;

        chai.assert.deepEqual(actual, expected);
    });

    it('invalid notation', () => {
        chai.assert.throws(() => new Move555('DUMMY'), Error);
    });
});

