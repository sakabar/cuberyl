const _ = require('lodash');
import {Part} from './Part';
import {PartLabel} from './PartLabel';
import {StickerInterface} from './StickerInterface';
import {
    CornerStickerLabel,
    cornerStickerLabelToString,
    numberToCornerStickerLabel,
} from './CornerStickerLabel';

export class CornerSticker implements StickerInterface {
    private part : Part = new Part(PartLabel.CORNER, 0);
    private orientation: number;

    constructor(private stickerLabel: CornerStickerLabel) {
        this.orientation = stickerLabel % 3;
    }

    public static fromPieceInfo(pieceInd: number, orientation: number) : CornerSticker {
        const stickerLabel = numberToCornerStickerLabel(3 * pieceInd + (orientation % 3));
        return new CornerSticker(stickerLabel);
    }

    public getPart(): Part {
        return _.cloneDeep(this.part);
    }

    public getOrientation() : number {
        return this.orientation;
    }

    public getPieceInd() : number {
        return Math.floor(this.stickerLabel / 3);
    }

    public toString() : string {
        return cornerStickerLabelToString(this.stickerLabel);
    }
}
