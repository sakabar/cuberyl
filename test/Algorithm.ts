import chai from 'chai';
import {Algorithm} from '../src/Algorithm';
import {CornerSticker} from '../src/CornerSticker';
import {CornerStickerLabel} from '../src/CornerStickerLabel';


describe('Algorithm.ts', () => {
    it("isValid_three_style_corner: UBL UBR RBD = [U, R D R']", () => {
        const buffer   = new CornerSticker(CornerStickerLabel.UBL);
        const sticker1 = new CornerSticker(CornerStickerLabel.UBR);
        const sticker2 = new CornerSticker(CornerStickerLabel.RBD);

        const alg = new Algorithm("U R D R' U' R D' R'");
        const actual = alg.isValidThreeStyleCorner(buffer, sticker1, sticker2);
        const expected = true;

        chai.assert.deepEqual(actual, expected);
    });

    it("isValidThreeStyleCorner: UBL RBU FLU = [L', U R U']", () => {
        const buffer   = new CornerSticker(CornerStickerLabel.UBL);
        const sticker1 = new CornerSticker(CornerStickerLabel.RBU);
        const sticker2 = new CornerSticker(CornerStickerLabel.FLU);

        const alg = new Algorithm("L' U R U' L U R' U'");
        const actual = alg.isValidThreeStyleCorner(buffer, sticker1, sticker2);
        const expected = true;

        chai.assert.deepEqual(actual, expected);
    });
});
