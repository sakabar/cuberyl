import chai from 'chai';
import {Notation} from '../src/Notation';
import {Move} from '../src/Move';

describe('Move.ts', () => {
    it('constructor', () => {
        const move = new Move('R');
        const actual = move.getNotation();
        const expected = Notation.R;

        chai.assert.deepEqual(actual, expected);
    });

    it('回転記号が正しくない場合はエラー', () => {
        chai.assert.throws(() => new Move('DUMMY'), Error);
    });
});

