const _ = require('lodash');
import {Move333} from './Move333';
import {Cube333} from './Cube333';
import {CornerSticker} from './CornerSticker';
import {readCornerStickerLabel} from './CornerStickerLabel';
import {EdgeSticker} from './EdgeSticker';
import {
    readEdgeStickerLabel,
} from './EdgeStickerLabel';
import {State333} from './State333';

export class Algorithm333 {
    private moves : Array<Move333> = [];
    private state : State333;

    constructor(algorithmStr: string) {
        const cube = new Cube333();

        algorithmStr.split(' ').filter(s => s !== '').map(notationStr => {
            const move = new Move333(notationStr);
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

    public inverse() : Algorithm333 {
        // (A B C)' = C' B' A'
        const newNotations : Array<string> = [];
        this.moves.slice().reverse().map(move => {
            newNotations.push(move.makeInverse().getNotation())
        })

        const newAlg = new Algorithm333(newNotations.join(' '));
        this.moves = newAlg.getMoves();
        this.state = newAlg.getState();

        return this;
    }

    public detectThreeStyleEdgeStickers(bufferStickerStr: string) : Array<string> {
        const inversedAlg = new Algorithm333(this.getNotation()).inverse();
        const cube : Cube333 = new Cube333(inversedAlg.getNotation());

        const ep = cube.getState().getEp();
        const eo = cube.getState().getEo();

        return Algorithm333.detectThreeStyleEdgeStickersEpEo(bufferStickerStr, ep, eo);
    }

    // this function is used by both 333 and 555 cube
    public static detectThreeStyleEdgeStickersEpEo(bufferStickerStr: string, ep: Array<number>, eo: Array<number>) : Array<string> {
        const bufferStickerLabel = readEdgeStickerLabel(bufferStickerStr);
        const bufferSticker : EdgeSticker = new EdgeSticker(bufferStickerLabel);
        const bufferPieceInd = bufferSticker.getPieceInd();

        const sticker1PieceInd = ep[bufferPieceInd];
        const sticker2PieceInd = ep[sticker1PieceInd];

        if (ep[sticker2PieceInd] !== bufferPieceInd) {
            return [];
        }

        const sticker1Eo = (bufferSticker.getOrientation() + eo[bufferPieceInd]) % 2;
        const sticker2Eo = (bufferSticker.getOrientation() + eo[sticker2PieceInd]) % 2;

        return [
            bufferSticker.toString(),
            EdgeSticker.fromPieceInfo(sticker1PieceInd, sticker1Eo).toString(),
            EdgeSticker.fromPieceInfo(sticker2PieceInd, sticker2Eo).toString(),
        ];
    }

    // setup, move1, move2, move1' move2', setup'
    public static makeThreeStyle(setup: string, move1: string, move2: string): Algorithm333 {
        const newNotations = [ setup, move1, move2, ];

        // move1'
        newNotations.push(new Algorithm333(move1).inverse().getNotation());

        // move2'
        newNotations.push(new Algorithm333(move2).inverse().getNotation());

        // setup'
        newNotations.push(new Algorithm333(setup).inverse().getNotation());

        return new Algorithm333(newNotations.join(' '));
    }

    public getState() : State333 {
        return _.cloneDeep(this.state);
    }

    public getMoves() : Array<Move333> {
        return _.cloneDeep(this.moves);
    }

    public getNotation() : string {
        return this.moves.map(m => m.getNotation()).join(' ');
    }

    public eq(alg: Algorithm333): boolean {
        return this.state.eq(alg.getState());
    }
};
