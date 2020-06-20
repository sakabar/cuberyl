const _ = require('lodash');
import {Move} from './Move';
import {Cube333} from './Cube333';
import {CornerSticker} from './CornerSticker';
import {readCornerStickerLabel} from './CornerStickerLabel';
import {EdgeSticker} from './EdgeSticker';
import {readEdgeStickerLabel} from './EdgeStickerLabel';
import {State333} from './State333';

export class Algorithm {
    private moves : Array<Move> = [];
    // FIXME ここ333でいいのか…?
    private state : State333;

    constructor(order: number, algorithmStr: string) {
        // FIXME 333以外のキューブの時は?
        if (order !== 3) {
            throw new Error('Not implemented');
        }

        const cube = new Cube333();

        algorithmStr.split(' ').map(notationStr => {
            const move = new Move(notationStr);
            this.moves.push(move);

            cube.move(move.getNotation());
        });

        this.state = cube.getState();
    };

    public isValidThreeStyleCorner(bufferStr: string, sticker1Str: string, sticker2Str: string): boolean {
        const buffer = new CornerSticker(readCornerStickerLabel(bufferStr));
        const sticker1 = new CornerSticker(readCornerStickerLabel(sticker1Str));
        const sticker2 = new CornerSticker(readCornerStickerLabel(sticker2Str));

        return this.isValidThreeStyleCornerTyped(buffer, sticker1, sticker2);
    }

    public isValidThreeStyleCornerTyped(buffer: CornerSticker, sticker1: CornerSticker, sticker2: CornerSticker): boolean {
        let algCube : Cube333;
        let initialState;

        algCube = new Cube333();
        initialState = State333.getInitialState();

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
        const cp = initialState.getCp();
        const co = initialState.getCo();

        const orig_buffer_cp = cp[buffer.getPieceInd()];
        cp[buffer.getPieceInd()] = cp[sticker2.getPieceInd()];
        cp[sticker2.getPieceInd()] = cp[sticker1.getPieceInd()];
        cp[sticker1.getPieceInd()] = orig_buffer_cp;

        co[buffer.getPieceInd()] = newBufferCO;
        co[sticker1.getPieceInd()] = newSticker1CO;
        co[sticker2.getPieceInd()] = newSticker2CO;

        const cycledState = new State333(cp, co, undefined, undefined, undefined);

        return algCube.getState().eq(cycledState);
    };

    public isValidThreeStyleEdge(bufferStr: string, sticker1Str: string, sticker2Str: string): boolean {
        const buffer = new EdgeSticker(readEdgeStickerLabel(bufferStr));
        const sticker1 = new EdgeSticker(readEdgeStickerLabel(sticker1Str));
        const sticker2 = new EdgeSticker(readEdgeStickerLabel(sticker2Str));

        return this.isValidThreeStyleEdgeTyped(buffer, sticker1, sticker2);
    }


    public isValidThreeStyleEdgeTyped(buffer: EdgeSticker, sticker1: EdgeSticker, sticker2: EdgeSticker): boolean {
        const initialState = State333.getInitialState();

        const bufferEO = buffer.getOrientation();
        const sticker1EO = sticker1.getOrientation();
        const sticker2EO = sticker2.getOrientation();

        // (負の数) % 3 にならないようにしている
        const newBufferEO = (bufferEO - sticker2EO + 2) % 2;
        const newSticker1EO = (sticker1EO - bufferEO + 2) % 2;
        const newSticker2EO = (sticker2EO - sticker1EO + 2) % 2;

        // initialStateからEP, EOしたStateを生成して、this.stateと同一かどうか判定する
        const ep = initialState.getEp();
        const eo = initialState.getEo();

        const orig_buffer_ep = ep[buffer.getPieceInd()];
        ep[buffer.getPieceInd()] = ep[sticker2.getPieceInd()];
        ep[sticker2.getPieceInd()] = ep[sticker1.getPieceInd()];
        ep[sticker1.getPieceInd()] = orig_buffer_ep;

        eo[buffer.getPieceInd()] = newBufferEO;
        eo[sticker1.getPieceInd()] = newSticker1EO;
        eo[sticker2.getPieceInd()] = newSticker2EO;

        const cycledState = new State333(undefined, undefined, ep, eo, undefined);

        return this.state.eq(cycledState);
    };

    public inverse() : Algorithm {
        // (A B C)' = C' B' A'
        const newNotations : Array<string> = [];
        this.moves.slice().reverse().map(move => {
            newNotations.push(move.makeInverse().getNotation())
        })

        const newAlg = new Algorithm(3, newNotations.join(' '));
        this.moves = newAlg.getMoves();
        this.state = newAlg.getState();

        return this;
    }

    // setup, move1, move2, move1' move2', setup'
    public static makeThreeStyle(order: number, setup: string, move1: string, move2: string): Algorithm {
        const newNotations = [ setup, move1, move2, ];

        // move1'
        newNotations.push(new Algorithm(order, move1).inverse().getNotation());

        // move2'
       newNotations.push(new Algorithm(order, move2).inverse().getNotation());

        // setup'
        newNotations.push(new Algorithm(order, setup).inverse().getNotation());

        return new Algorithm(order, newNotations.join(' '));
    }

    public getState() : State333 {
        return _.cloneDeep(this.state);
    }

    public getMoves() : Array<Move> {
        return _.cloneDeep(this.moves);
    }

    public getNotation() : string {
        return this.moves.map(m => m.getNotation()).join(' ');
    }

    public eq(alg: Algorithm): boolean {
        return this.state.eq(alg.getState());
    }
};
