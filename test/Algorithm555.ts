import chai from 'chai';
import {Algorithm555} from '../src/Algorithm555';
import {CornerSticker} from '../src/CornerSticker';
import {CornerStickerLabel} from '../src/CornerStickerLabel';
import {WingEdgeSticker} from '../src/WingEdgeSticker';
import {WingEdgeStickerLabel} from '../src/WingEdgeStickerLabel';
import {XCenterSticker} from '../src/XCenterSticker';
import {XCenterStickerLabel} from '../src/XCenterStickerLabel';
import {TCenterSticker} from '../src/TCenterSticker';
import {TCenterStickerLabel} from '../src/TCenterStickerLabel';


describe('Algorithm555.ts', () => {
    it("isValid_three_style_corner: UBL UBR RBD = [U, R D R']", () => {
        const buffer   = new CornerSticker(CornerStickerLabel.UBL);
        const sticker1 = new CornerSticker(CornerStickerLabel.UBR);
        const sticker2 = new CornerSticker(CornerStickerLabel.RBD);

        const alg = new Algorithm555("U R D R' U' R D' R'");
        const actual = alg.isValidThreeStyleCornerTyped(buffer, sticker1, sticker2);
        const expected = true;

        chai.assert.deepEqual(actual, expected);
    });

    it("isValidThreeStyleCorner: UBL RBU FLU = [L', U R U']", () => {
        const buffer   = new CornerSticker(CornerStickerLabel.UBL);
        const sticker1 = new CornerSticker(CornerStickerLabel.RBU);
        const sticker2 = new CornerSticker(CornerStickerLabel.FLU);

        const alg = new Algorithm555("L' U R U' L U R' U'");
        const actual = alg.isValidThreeStyleCornerTyped(buffer, sticker1, sticker2);
        const expected = true;

        chai.assert.deepEqual(actual, expected);
    });

    it("isValidThreeStyleStr: UBL RBU FLU = [L', U R U']", () => {
        const alg = new Algorithm555("L' U R U' L U R' U'");
        const actual = alg.isValidThreeStyleCorner('UBL', 'RBU', 'FLU');
        const expected = true;

        chai.assert.deepEqual(actual, expected);
    });

    it("isValidThreeStyleStr: FUr UBr RFu = [U' R U, r']", () => {
        const alg = new Algorithm555("U' R U r' U' R' U r");
        // UFr buffer
        // treat as FUr in cuberyl
        const actual = alg.isValidThreeStyleWingEdge('UFr', 'BUr', 'FRu');
        const expected = true;

        chai.assert.deepEqual(actual, expected);
    });

    it("error case: FUr BUr RFu = [U' R U, r']", () => {
        const alg = new Algorithm555("U' R U r' U' R' U r");
        // inconsistent wing-edge system
        chai.assert.throws(() => alg.isValidThreeStyleWingEdge('FUr', 'BUr', 'RFu'), Error);
    });

    it("isValidThreeStyleWingEdge: FUr UBr RFu = [U' R U, r']", () => {
        const buffer   = new WingEdgeSticker(WingEdgeStickerLabel.FUr);
        const sticker1 = new WingEdgeSticker(WingEdgeStickerLabel.UBr);
        const sticker2 = new WingEdgeSticker(WingEdgeStickerLabel.RFu);

        const alg = new Algorithm555("U' R U r' U' R' U r");
        const actual = alg.isValidThreeStyleWingEdgeTyped(buffer, sticker1, sticker2);
        const expected = true;

        chai.assert.deepEqual(actual, expected);
    });

    it("isValidThreeStyleStr: Ubl Rdf Fdr = [Rw: [r u' r', U2]]", () => {
        const alg = new Algorithm555("Rw r u' r' U2 r u r' U2 Rw'");
        const actual = alg.isValidThreeStyleXCenter('Ubl', 'Rdf', 'Fdr');
        const expected = true;

        chai.assert.deepEqual(actual, expected);
    });

    it("isValidThreeStyleXCenter: Ubl Rdf Fdr = [Rw: [r u' r', U2]]", () => {
        const buffer   = new XCenterSticker(XCenterStickerLabel.Ubl);
        const sticker1 = new XCenterSticker(XCenterStickerLabel.Rdf);
        const sticker2 = new XCenterSticker(XCenterStickerLabel.Fdr);

        const alg = new Algorithm555("Rw r u' r' U2 r u r' U2 Rw'");
        const actual = alg.isValidThreeStyleXCenterTyped(buffer, sticker1, sticker2);
        const expected = true;

        chai.assert.deepEqual(actual, expected);
    });

    it("isValidThreeStyleStr: Ul Uf Fr = [U' 3Lw': [U M U', r]]", () => {
        const alg = new Algorithm555("U' 3Lw' U M U' r U M' U' r' 3Lw U");
        const actual = alg.isValidThreeStyleTCenter('Ul', 'Uf', 'Fr');
        const expected = true;

        chai.assert.deepEqual(actual, expected);
    });

    it("isValidThreeStyleTCenter: Ul Uf Fr = [U' 3Lw': [U M U', r]]", () => {
        const buffer   = new TCenterSticker(TCenterStickerLabel.Ul);
        const sticker1 = new TCenterSticker(TCenterStickerLabel.Uf);
        const sticker2 = new TCenterSticker(TCenterStickerLabel.Fr);

        const alg = new Algorithm555("U' 3Lw' U M U' r U M' U' r' 3Lw U");
        const actual = alg.isValidThreeStyleTCenterTyped(buffer, sticker1, sticker2);
        const expected = true;

        chai.assert.deepEqual(actual, expected);
    });

    it("inverse", () => {
        const alg = new Algorithm555('R U D');
        alg.inverse();

        const expectedAlg = new Algorithm555("D' U' R'");

        const actual = alg.eq(expectedAlg);
        const expected = true;

        chai.assert.deepEqual(actual, expected);
    });

    it("detect corner threeStyle: [U, R D R']", () => {
        const alg = Algorithm555.makeThreeStyle('', "U", "R D R'");
        const actual = alg.detectThreeStyleCornerStickers('UBL');

        const expected = [ 'UBL', 'UBR', 'RBD', ];

        chai.assert.deepEqual(actual, expected);
    });

    it("detect corner threeStyle: [U, R D R']", () => {
        const alg = Algorithm555.makeThreeStyle('', "U", "R D R'");
        const actual = alg.detectThreeStyleCornerStickers('BLU');

        const expected = [ 'BLU', 'RBU', 'DBR', ];

        chai.assert.deepEqual(actual, expected);
    });

    it("detect edge threeStyle: [F', R S' R']", () => {
        const alg = Algorithm555.makeThreeStyle('', "F'", "R S' R'");
        const actual = alg.detectThreeStyleEdgeStickers('DF');

        const expected = [ 'DF', 'RF', 'BR', ];

        chai.assert.deepEqual(actual, expected);
    });

    it("detect edge threeStyle: [F', R S' R']", () => {
        const alg = Algorithm555.makeThreeStyle('', "F'", "R S' R'");
        const actual = alg.detectThreeStyleEdgeStickers('FD');

        const expected = [ 'FD', 'FR', 'RB', ];

        chai.assert.deepEqual(actual, expected);
    });

    it("detect wing edge threeStyle: [r', U' R U]", () => {
        const alg = Algorithm555.makeThreeStyle('', "r'", "U' R U");
        const actual = alg.detectThreeStyleWingEdgeStickers('FUr');

        const expected = [ 'FUr', 'RFu', 'UBr', ];

        chai.assert.deepEqual(actual, expected);
    });

    it("detect wing edge threeStyle: [r', U' R U]", () => {
        const alg = Algorithm555.makeThreeStyle('', "r'", "U' R U");
        const actual = alg.detectThreeStyleWingEdgeStickers('UFr');

        const expected = [ 'UFr', 'FRu', 'BUr', ];

        chai.assert.deepEqual(actual, expected);
    });

    it("detect x-center threeStyle: [d', r U2 r']", () => {
        const alg = Algorithm555.makeThreeStyle('', "d'", "r U2 r'");
        const actual = alg.detectThreeStyleXCenterStickers('Ubl');

        const expected = [ 'Ubl', 'Rbd', 'Fdr', ];

        chai.assert.deepEqual(actual, expected);
    });

    it("detect x-center threeStyle: [d', r U2 r']", () => {
        const alg = Algorithm555.makeThreeStyle('', "d'", "r U2 r'");
        const actual = alg.detectThreeStyleXCenterStickers('Rbd');

        const expected = [ 'Rbd', 'Fdr', 'Ubl', ];

        chai.assert.deepEqual(actual, expected);
    });

    it("detect t-center threeStyle: Ul Uf Fr = [U' 3Lw': [U M U', r]]", () => {
        const alg = Algorithm555.makeThreeStyle("U' 3Lw'", "U M U'", 'r');
        const actual = alg.detectThreeStyleTCenterStickers('Ul');

        const expected = [ 'Ul', 'Uf', 'Fr', ];

        chai.assert.deepEqual(actual, expected);
    });

    it("detect t-center threeStyle: Ul Uf Fr = [U' 3Lw': [U M U', r]]", () => {
        const alg = Algorithm555.makeThreeStyle("U' 3Lw'", "U M U'", 'r');
        const actual = alg.detectThreeStyleTCenterStickers('Uf');

        const expected = [ 'Uf', 'Fr', 'Ul', ];

        chai.assert.deepEqual(actual, expected);
    });

    it("CANNOT detect mixed threeStyle: [U, R D R'] + [r', U' R U] + [d', r U2 r']", () => {
        const algCorner = Algorithm555.makeThreeStyle('', "U", "R D R'");
        const algWingEdge = Algorithm555.makeThreeStyle('', "r'", "U' R U");
        const algXCenter = Algorithm555.makeThreeStyle('', "d'", "r U2 r");

        const alg = new Algorithm555(`${algCorner.getNotation()} ${algWingEdge.getNotation()} ${algXCenter.getNotation()}`);

        const actualCorner = alg.detectThreeStyleCornerStickers('UBL');
        const actualWingEdge = alg.detectThreeStyleWingEdgeStickers('UFr');
        const actualXCenter = alg.detectThreeStyleXCenterStickers('Ubl');

        // this is not only corner cycle
        chai.assert.deepEqual(actualCorner, []);

        // // this is not only wing edge cycle
        chai.assert.deepEqual(actualWingEdge, []);

        // this is not only x-center edge cycle
        chai.assert.deepEqual(actualXCenter, []);
    });
});
