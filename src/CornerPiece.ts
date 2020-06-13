import {Part} from './Part';
import {PartLabel} from './PartLabel';
import {PieceInterface} from './PieceInterface';
import {CornerPieceLabel} from './CornerPieceLabel';

export class CornerPiece implements PieceInterface {
    private part : Part = new Part(PartLabel.CORNER, 0);

    constructor(private pieceLabel : CornerPieceLabel) {
    };

    get pieceInd(): number {
        return this.pieceLabel
    };
}
