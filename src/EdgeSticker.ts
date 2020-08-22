const _ = require('lodash');
import {Part} from './Part';
import {PartLabel} from './PartLabel';
import {StickerInterface} from './StickerInterface';
import {
    EdgeStickerLabel,
    edgeStickerLabelToString,
    numberToEdgeStickerLabel,
} from './EdgeStickerLabel';

export class EdgeSticker implements StickerInterface {
    private part : Part = new Part(PartLabel.EDGE, 0);
    private orientation: number;

    constructor(private stickerLabel: EdgeStickerLabel) {
        this.orientation = stickerLabel % 2;
    }

    public static fromPieceInfo(pieceInd: number, orientation: number) : EdgeSticker {
        const stickerLabel = numberToEdgeStickerLabel(2 * pieceInd + (orientation % 2));
        return new EdgeSticker(stickerLabel);
    }

    public getPart(): Part {
        return _.cloneDeep(this.part);
    }

    public getOrientation() : number {
        return this.orientation;
    }

    public getPieceInd() : number {
        return Math.floor(this.stickerLabel / 2);
    }

    public toString() : string {
        return edgeStickerLabelToString(this.stickerLabel);
    }
}
