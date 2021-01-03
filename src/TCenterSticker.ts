const _ = require('lodash');
import {Part} from './Part';
import {PartLabel} from './PartLabel';
import {StickerInterface} from './StickerInterface';
import {
    TCenterStickerLabel,
    tCenterStickerLabelToString,
} from './TCenterStickerLabel';

export class TCenterSticker implements StickerInterface {
    private part : Part = new Part(PartLabel.T_CENTER, 0);
    // expediently
    private orientation: number;

    constructor(private stickerLabel: TCenterStickerLabel) {
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
        return tCenterStickerLabelToString(this.stickerLabel);
    }
}
