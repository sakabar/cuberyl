import {Part} from './Part';
export interface StickerInterface {
    getPart(): Part;
    getOrientation(): number;
    getPieceInd(): number;
}
