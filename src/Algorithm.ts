import {Move} from './Move';
import {Cube333} from './Cube333';
import {CornerSticker} from './CornerSticker';
import {State333} from './State333';

export class Algorithm {
    private moves : Array<Move> = [];

    constructor(algorithmStr: string) {
        algorithmStr.split(' ').map(notationStr => {
            const move = new Move(notationStr);
            this.moves.push(move);
        });
    };

    public is_valid_three_style_corner(buffer: CornerSticker, sticker1: CornerSticker, sticker2: CornerSticker): boolean {
        const algCube = new Cube333();
        this.moves.map(move => {
            algCube.move(move.getNotation());
        });

        const bufferCO = buffer.getOrientation();
        const sticker1CO = sticker1.getOrientation();
        const sticker2CO = sticker2.getOrientation();

        // (負の数) % 3 にならないようにしている
        const newBufferCO = (bufferCO - sticker2CO + 3) % 3;
        const newSticker1CO = (sticker1CO - bufferCO + 3) % 3;
        const newSticker2CO = (sticker2CO - sticker1CO + 3) % 3;

        // initialStateからCP, COしたStateを生成して、this.stateと同一かどうか判定する
        const initialState = State333.getInitialState();
        const cp = initialState.getCp();
        const co = initialState.getCo();

        const orig_buffer_cp = cp[buffer.getPieceInd()];
        cp[buffer.getPieceInd()] = cp[sticker2.getPieceInd()];
        cp[sticker2.getPieceInd()] = cp[sticker1.getPieceInd()];
        cp[sticker1.getPieceInd()] = orig_buffer_cp;

        co[buffer.getPieceInd()] = newBufferCO;
        co[sticker1.getPieceInd()] = newSticker1CO;
        co[sticker2.getPieceInd()] = newSticker2CO;

        const cycledState = new State333(cp, co, initialState.getEp(), initialState.getEo(), initialState.getCenter());

        return algCube.getState().eq(cycledState);
    };
};
