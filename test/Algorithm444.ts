import chai from 'chai';
import {Algorithm444} from '../src/Algorithm444';
import {CornerSticker} from '../src/CornerSticker';
import {CornerStickerLabel} from '../src/CornerStickerLabel';
import {WingEdgeSticker} from '../src/WingEdgeSticker';
import {WingEdgeStickerLabel} from '../src/WingEdgeStickerLabel';
import {XCenterSticker} from '../src/XCenterSticker';
import {XCenterStickerLabel} from '../src/XCenterStickerLabel';


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

    it("isValidThreeStyleStr: Ubl Rdf Fdr = [Rw: [r u' r', U2]]", () => {
        const alg = new Algorithm444("Rw r u' r' U2 r u r' U2 Rw'");
        const actual = alg.isValidThreeStyleXCenter('Ubl', 'Rdf', 'Fdr');
        const expected = true;

        chai.assert.deepEqual(actual, expected);
    });

    it("isValidThreeStyleXCenter: Ubl Rdf Fdr = [Rw: [r u' r', U2]]", () => {
        const buffer   = new XCenterSticker(XCenterStickerLabel.Ubl);
        const sticker1 = new XCenterSticker(XCenterStickerLabel.Rdf);
        const sticker2 = new XCenterSticker(XCenterStickerLabel.Fdr);

        const alg = new Algorithm444("Rw r u' r' U2 r u r' U2 Rw'");
        const actual = alg.isValidThreeStyleXCenterTyped(buffer, sticker1, sticker2);
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

    it("detect corner threeStyle: [U, R D R']", () => {
        const alg = Algorithm444.makeThreeStyle('', "U", "R D R'");
        const actual = alg.detectThreeStyleCornerStickers('UBL');

        const expected = [ 'UBL', 'UBR', 'RBD', ];

        chai.assert.deepEqual(actual, expected);
    });

    it("detect corner threeStyle: [U, R D R']", () => {
        const alg = Algorithm444.makeThreeStyle('', "U", "R D R'");
        const actual = alg.detectThreeStyleCornerStickers('BLU');

        const expected = [ 'BLU', 'RBU', 'DBR', ];

        chai.assert.deepEqual(actual, expected);
    });

    it("detect wing edge threeStyle: [r', U' R U]", () => {
        const alg = Algorithm444.makeThreeStyle('', "r'", "U' R U");
        const actual = alg.detectThreeStyleWingEdgeStickers('FUr');

        const expected = [ 'FUr', 'RFu', 'UBr', ];

        chai.assert.deepEqual(actual, expected);
    });

    it("detect wing edge threeStyle: [r', U' R U]", () => {
        const alg = Algorithm444.makeThreeStyle('', "r'", "U' R U");
        const actual = alg.detectThreeStyleWingEdgeStickers('UFr');

        const expected = [ 'UFr', 'FRu', 'BUr', ];

        chai.assert.deepEqual(actual, expected);
    });
});
