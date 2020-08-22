const _ = require('lodash');
import {Part} from './Part';
import {PartLabel} from './PartLabel';
import {StickerInterface} from './StickerInterface';
import {
    WingEdgeStickerLabel,
    wingEdgeStickerLabelToString,
} from './WingEdgeStickerLabel';

export class WingEdgeSticker implements StickerInterface {
    private part : Part = new Part(PartLabel.WING_EDGE, 0);

    // expediently
    private orientation: number;

    constructor(private stickerLabel: WingEdgeStickerLabel) {
        this.orientation = 0;
    }

    public getPart(): Part {
        return _.cloneDeep(this.part);
    }

    public getOrientation() : number {
        return this.orientation;
    }

    public getPieceInd() : number {
        return this.stickerLabel;
    }

    public toString() : string {
        return wingEdgeStickerLabelToString(this.stickerLabel);
    }
}
