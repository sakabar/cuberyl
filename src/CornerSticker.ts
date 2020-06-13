import {Part} from './Part';
import {PartLabel} from './PartLabel';
import {StickerInterface} from './StickerInterface';
import {CornerStickerLabel} from './CornerStickerLabel';

export class CornerSticker implements StickerInterface {
    private part : Part = new Part(PartLabel.CORNER, 0);
    private orientation: number;

    constructor(private stickerLabel: CornerStickerLabel) {
        this.orientation = stickerLabel % 3;
    }

    public getOrientation() : number {
        return this.orientation;
    }

    public getPieceInd() : number {
        return Math.floor(this.stickerLabel / 3);
    }
}
