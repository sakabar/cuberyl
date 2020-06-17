const _ = require('lodash');
import {Part} from './Part';
import {PartLabel} from './PartLabel';
import {StickerInterface} from './StickerInterface';
import {EdgeStickerLabel} from './EdgeStickerLabel';

export class EdgeSticker implements StickerInterface {
    private part : Part = new Part(PartLabel.EDGE, 0);
    private orientation: number;

    constructor(private stickerLabel: EdgeStickerLabel) {
        this.orientation = stickerLabel % 2;
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
}
