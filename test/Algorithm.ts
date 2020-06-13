import chai from 'chai';
import {Algorithm} from '../src/Algorithm';
import {Cube333} from '../src/Cube333';
import {CornerSticker} from '../src/CornerSticker';
import {CornerStickerLabel} from '../src/CornerStickerLabel';
import {Part} from '../src/Part';
import {PartLabel} from '../src/PartLabel';

describe('Algorithm.ts', () => {
    it("is_valid_three_style_corner: UBL UBR RBD = [U, R D R']", () => {
        const buffer   = new CornerSticker(CornerStickerLabel.UBL);
        const sticker1 = new CornerSticker(CornerStickerLabel.UBR);
        const sticker2 = new CornerSticker(CornerStickerLabel.RBD);

        const alg = new Algorithm("U R D R' U' R D' R'");
        const actual = alg.is_valid_three_style_corner(buffer, sticker1, sticker2);
        const expected = true;

        chai.assert.deepEqual(actual, expected);
    });
});
