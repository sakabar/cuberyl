import chai from 'chai';
import {Algorithm444} from '../src/Algorithm444';
import {CornerSticker} from '../src/CornerSticker';
import {CornerStickerLabel} from '../src/CornerStickerLabel';
import {WingEdgeSticker} from '../src/WingEdgeSticker';
import {WingEdgeStickerLabel} from '../src/WingEdgeStickerLabel';


describe('Algorithm444.ts', () => {
    it("isValid_three_style_corner: UBL UBR RBD = [U, R D R']", () => {
        const buffer   = new CornerSticker(CornerStickerLabel.UBL);
        const sticker1 = new CornerSticker(CornerStickerLabel.UBR);
        const sticker2 = new CornerSticker(CornerStickerLabel.RBD);

        const alg = new Algorithm444("U R D R' U' R D' R'");
        const actual = alg.isValidThreeStyleCornerTyped(buffer, sticker1, sticker2);
        const expected = true;

        chai.assert.deepEqual(actual, expected);
    });

    it("isValidThreeStyleCorner: UBL RBU FLU = [L', U R U']", () => {
        const buffer   = new CornerSticker(CornerStickerLabel.UBL);
        const sticker1 = new CornerSticker(CornerStickerLabel.RBU);
        const sticker2 = new CornerSticker(CornerStickerLabel.FLU);

        const alg = new Algorithm444("L' U R U' L U R' U'");
        const actual = alg.isValidThreeStyleCornerTyped(buffer, sticker1, sticker2);
        const expected = true;

        chai.assert.deepEqual(actual, expected);
    });

    it("isValidThreeStyleStr: UBL RBU FLU = [L', U R U']", () => {
        const alg = new Algorithm444("L' U R U' L U R' U'");
        const actual = alg.isValidThreeStyleCorner('UBL', 'RBU', 'FLU');
        const expected = true;

        chai.assert.deepEqual(actual, expected);
    });

    it("isValidThreeStyleStr: FUr UBr RFu = [U' R U, r']", () => {
        const alg = new Algorithm444("U' R U r' U' R' U r");
        // UFr buffer
        // treat as FUr in cuberyl
        const actual = alg.isValidThreeStyleWingEdge('UFr', 'BUr', 'FRu');
        const expected = true;

        chai.assert.deepEqual(actual, expected);
    });

    it("error case: FUr BUr RFu = [U' R U, r']", () => {
        const alg = new Algorithm444("U' R U r' U' R' U r");
        // inconsistent wing-edge system
        chai.assert.throws(() => alg.isValidThreeStyleWingEdge('FUr', 'BUr', 'RFu'), Error);
    });

    it("isValidThreeStyleWingEdge: FUr UBr RFu = [U' R U, r']", () => {
        const buffer   = new WingEdgeSticker(WingEdgeStickerLabel.FUr);
        const sticker1 = new WingEdgeSticker(WingEdgeStickerLabel.UBr);
        const sticker2 = new WingEdgeSticker(WingEdgeStickerLabel.RFu);

        const alg = new Algorithm444("U' R U r' U' R' U r");
        const actual = alg.isValidThreeStyleWingEdgeTyped(buffer, sticker1, sticker2);
        const expected = true;

        chai.assert.deepEqual(actual, expected);
    });

    it("inverse", () => {
        const alg = new Algorithm444('R U D');
        alg.inverse();

        const expectedAlg = new Algorithm444("D' U' R'");

        const actual = alg.eq(expectedAlg);
        const expected = true;

        chai.assert.deepEqual(actual, expected);
    });
});
