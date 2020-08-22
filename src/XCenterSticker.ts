const _ = require('lodash');
import {Part} from './Part';
import {PartLabel} from './PartLabel';
import {StickerInterface} from './StickerInterface';
import {
    XCenterStickerLabel,
    xCenterStickerLabelToString,
} from './XCenterStickerLabel';

export class XCenterSticker implements StickerInterface {
    private part : Part = new Part(PartLabel.X_CENTER, 0);
    // expediently
    private orientation: number;

    constructor(private stickerLabel: XCenterStickerLabel) {
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
        return xCenterStickerLabelToString(this.stickerLabel);
    }
}
