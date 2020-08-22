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

    it('回転記号が正しくない場合はエラー', () => {
        chai.assert.throws(() => new Move333('DUMMY'), Error);
    });
});

