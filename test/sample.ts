import chai from 'chai';
import { Sample } from '../src/sample';

describe('Sample.ts', () => {
    it('normal', () => {
        const sample = new Sample(1, 2);
        const actual = sample.get_y(3);
        const expected = 5;

        chai.assert.deepEqual(actual, expected);
    })
});
