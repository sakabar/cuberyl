import chai from 'chai';
import {Algorithm} from '../src/Algorithm';
import {CornerSticker} from '../src/CornerSticker';
import {CornerStickerLabel} from '../src/CornerStickerLabel';
import {EdgeSticker} from '../src/EdgeSticker';
import {EdgeStickerLabel} from '../src/EdgeStickerLabel';


describe('Algorithm.ts', () => {
    it("isValid_three_style_corner: UBL UBR RBD = [U, R D R']", () => {
        const buffer   = new CornerSticker(CornerStickerLabel.UBL);
        const sticker1 = new CornerSticker(CornerStickerLabel.UBR);
        const sticker2 = new CornerSticker(CornerStickerLabel.RBD);

        const alg = new Algorithm("U R D R' U' R D' R'");
        const actual = alg.isValidThreeStyleCornerTyped(3, buffer, sticker1, sticker2);
        const expected = true;

        chai.assert.deepEqual(actual, expected);
    });

    it("isValidThreeStyleCorner: UBL RBU FLU = [L', U R U']", () => {
        const buffer   = new CornerSticker(CornerStickerLabel.UBL);
        const sticker1 = new CornerSticker(CornerStickerLabel.RBU);
        const sticker2 = new CornerSticker(CornerStickerLabel.FLU);

        const alg = new Algorithm("L' U R U' L U R' U'");
        const actual = alg.isValidThreeStyleCornerTyped(3, buffer, sticker1, sticker2);
        const expected = true;

        chai.assert.deepEqual(actual, expected);
    });

    it("isValidThreeStyleStr: UBL RBU FLU = [L', U R U']", () => {
        const alg = new Algorithm("L' U R U' L U R' U'");
        const actual = alg.isValidThreeStyleCorner(3, 'UBL', 'RBU', 'FLU');
        const expected = true;

        chai.assert.deepEqual(actual, expected);
    });

    it("isValidThreeStyleEdge: DF RD DL = [R F' R', S']", () => {
        const buffer   = new EdgeSticker(EdgeStickerLabel.DF);
        const sticker1 = new EdgeSticker(EdgeStickerLabel.RD);
        const sticker2 = new EdgeSticker(EdgeStickerLabel.DL);

        const alg = new Algorithm("R F' R' S' R F R' S");
        const actual = alg.isValidThreeStyleEdgeTyped(3, buffer, sticker1, sticker2);
        const expected = true;

        chai.assert.deepEqual(actual, expected);
    });

    it("isValidThreeStyleEdge: DF UR DB = D [R2, S']", () => {
        const buffer   = new EdgeSticker(EdgeStickerLabel.DF);
        const sticker1 = new EdgeSticker(EdgeStickerLabel.UR);
        const sticker2 = new EdgeSticker(EdgeStickerLabel.DB);

        const alg = new Algorithm("D R2 S' R2 S D'");
        const actual = alg.isValidThreeStyleEdgeTyped(3, buffer, sticker1, sticker2);
        const expected = true;

        chai.assert.deepEqual(actual, expected);
    });

    it("isValidThreeStyleEdgeStr: DF UR DB = D [R2, S']", () => {
        const alg = new Algorithm("D R2 S' R2 S D'");
        const actual = alg.isValidThreeStyleEdge(3, 'DF', 'UR', 'DB');
        const expected = true;

        chai.assert.deepEqual(actual, expected);
    });
});
