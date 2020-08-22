const _ = require('lodash');
import {Algorithm333} from './Algorithm333';
import {Move444} from './Move444';
import {Cube444} from './Cube444';
import {CornerSticker} from './CornerSticker';
import {readCornerStickerLabel} from './CornerStickerLabel';
import {WingEdgeSticker} from './WingEdgeSticker';
import {
    readWingEdgeStickerLabel,
    numberToWingEdgeStickerLabel,
} from './WingEdgeStickerLabel';
import {XCenterSticker} from './XCenterSticker';
import {readXCenterStickerLabel} from './XCenterStickerLabel';
import {State444} from './State444';

export class Algorithm444 {
    private moves : Array<Move444> = [];
    private state : State444;

    constructor(algorithmStr: string) {
        const cube = new Cube444();

        algorithmStr.split(' ').filter(s => s !== '').map(notationStr => {
            const move = new Move444(notationStr);
            this.moves.push(move);

            cube.move(move.getNotation());
        });

        this.state = cube.getState();
    };

    // FIXME 型が違うだけで、実装が333とほぼ一致しているので抽象化したい
    // Stateをパートごとに持てばいいのかな?
    public isValidThreeStyleCorner(bufferStr: string, sticker1Str: string, sticker2Str: string): boolean {
        const buffer = new CornerSticker(readCornerStickerLabel(bufferStr));
        const sticker1 = new CornerSticker(readCornerStickerLabel(sticker1Str));
        const sticker2 = new CornerSticker(readCornerStickerLabel(sticker2Str));

        return this.isValidThreeStyleCornerTyped(buffer, sticker1, sticker2);
    }

    public isValidThreeStyleCornerTyped(buffer: CornerSticker, sticker1: CornerSticker, sticker2: CornerSticker): boolean {
        let algCube : Cube444;
        let initialState;

        algCube = new Cube444();
        initialState = State444.getInitialState();

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

        const cycledState = new State444(cp, co, undefined, undefined, undefined);

        return algCube.getState().eq(cycledState);
    };

    private static swapWingEdgeSystem(wingEdgeStickerStr: string) {
        return `${wingEdgeStickerStr[1]}${wingEdgeStickerStr[0]}${wingEdgeStickerStr[2]}`;
    }

    public isValidThreeStyleWingEdge(bufferStr: string, sticker1Str: string, sticker2Str: string): boolean {
        // bufferStr, sticker1Str, sticker2Strが同じ「系」に属することを確認する
        let isFUrSystem;
        let buffer;
        let sticker1;
        let sticker2;

        try {
            buffer = new WingEdgeSticker(readWingEdgeStickerLabel(bufferStr));
            isFUrSystem = true;
        } catch (e) {
            buffer = new WingEdgeSticker(readWingEdgeStickerLabel(Algorithm444.swapWingEdgeSystem(bufferStr)));
            isFUrSystem = false;
        }

        if (isFUrSystem) {
            sticker1 = new WingEdgeSticker(readWingEdgeStickerLabel(sticker1Str));
            sticker2 = new WingEdgeSticker(readWingEdgeStickerLabel(sticker2Str));
        } else {
            sticker1 = new WingEdgeSticker(readWingEdgeStickerLabel(Algorithm444.swapWingEdgeSystem(sticker1Str)));
            sticker2 = new WingEdgeSticker(readWingEdgeStickerLabel(Algorithm444.swapWingEdgeSystem(sticker2Str)));
        }

        return this.isValidThreeStyleWingEdgeTyped(buffer, sticker1, sticker2);
    }

    public isValidThreeStyleWingEdgeTyped(buffer: WingEdgeSticker, sticker1: WingEdgeSticker, sticker2: WingEdgeSticker): boolean {
        const initialState = State444.getInitialState();

        // initialStateからWPしたStateを生成して、this.stateと同一かどうか判定する
        const wp = initialState.getWp();

        const orig_buffer_wp = wp[buffer.getPieceInd()];
        wp[buffer.getPieceInd()] = wp[sticker2.getPieceInd()];
        wp[sticker2.getPieceInd()] = wp[sticker1.getPieceInd()];
        wp[sticker1.getPieceInd()] = orig_buffer_wp;

        const cycledState = new State444(undefined, undefined, undefined, wp, false);

        return this.state.eq(cycledState);
    };

    public isValidThreeStyleXCenter(bufferStr: string, sticker1Str: string, sticker2Str: string): boolean {
        const buffer = new XCenterSticker(readXCenterStickerLabel(bufferStr));
        const sticker1 = new XCenterSticker(readXCenterStickerLabel(sticker1Str));
        const sticker2 = new XCenterSticker(readXCenterStickerLabel(sticker2Str));

        return this.isValidThreeStyleXCenterTyped(buffer, sticker1, sticker2);
    }

    public isValidThreeStyleXCenterTyped(buffer: XCenterSticker, sticker1: XCenterSticker, sticker2: XCenterSticker): boolean {
        const initialState = State444.getInitialState();

        // initialStateからXPしたStateを生成して、this.stateと同一かどうか判定する
        const xp = initialState.getXp();

        const orig_buffer_xp = xp[buffer.getPieceInd()];
        xp[buffer.getPieceInd()] = xp[sticker2.getPieceInd()];
        xp[sticker2.getPieceInd()] = xp[sticker1.getPieceInd()];
        xp[sticker1.getPieceInd()] = orig_buffer_xp;

        const cycledState = new State444(undefined, undefined, xp, undefined, false);
        return this.state.eq(cycledState);
    };

    public inverse() : Algorithm444 {
        // (A B C)' = C' B' A'
        const newNotations : Array<string> = [];
        this.moves.slice().reverse().map(move => {
            newNotations.push(move.makeInverse().getNotation())
        })

        const newAlg = new Algorithm444(newNotations.join(' '));
        this.moves = newAlg.getMoves();
        this.state = newAlg.getState();

        return this;
    }

    public detectThreeStyleCornerStickers(bufferStickerStr: string) : Array<string> {
        const inversedAlg = new Algorithm444(this.getNotation()).inverse();
        const cube : Cube444 = new Cube444(inversedAlg.getNotation());

        const cp = cube.getState().getCp();
        const co = cube.getState().getCo();

        return Algorithm333.detectThreeStyleCornerStickersCpCo(bufferStickerStr, cp, co);
    }

    public detectThreeStyleWingEdgeStickers(bufferStickerStr: string) : Array<string> {
        const inversedAlg = new Algorithm444(this.getNotation()).inverse();
        const cube : Cube444 = new Cube444(inversedAlg.getNotation());

        const wp = cube.getState().getWp();

        return Algorithm444.detectThreeStyleWingEdgeStickersWp(bufferStickerStr, wp);
    }

    public static detectThreeStyleWingEdgeStickersWp(bufferStickerStr: string, wp: Array<number>) : Array<string> {
        let bufferSticker : WingEdgeSticker;
        let isFUrSystem : boolean;
        try {
            bufferSticker = new WingEdgeSticker(readWingEdgeStickerLabel(bufferStickerStr));
            isFUrSystem = true;
        } catch (e) {
            const swapped = Algorithm444.swapWingEdgeSystem(bufferStickerStr);
            bufferSticker = new WingEdgeSticker(readWingEdgeStickerLabel(swapped));
            isFUrSystem = false;
        }

        const bufferPieceInd = bufferSticker.getPieceInd();

        const sticker1PieceInd = wp[bufferPieceInd];
        const sticker2PieceInd = wp[sticker1PieceInd];

        if (wp[sticker2PieceInd] !== bufferPieceInd) {
            return [];
        }

       const ans = [
           bufferSticker.toString(),
           new WingEdgeSticker(numberToWingEdgeStickerLabel(sticker1PieceInd)).toString(),
           new WingEdgeSticker(numberToWingEdgeStickerLabel(sticker2PieceInd)).toString(),
       ];

        if (isFUrSystem) {
            return ans;
        } else {
            return ans.map(stickerStr => Algorithm444.swapWingEdgeSystem(stickerStr));
        }
    }

    // setup, move1, move2, move1' move2', setup'
    public static makeThreeStyle(setup: string, move1: string, move2: string): Algorithm444 {
        const newNotations = [ setup, move1, move2, ];

        // move1'
        newNotations.push(new Algorithm444(move1).inverse().getNotation());

        // move2'
        newNotations.push(new Algorithm444(move2).inverse().getNotation());

        // setup'
        newNotations.push(new Algorithm444(setup).inverse().getNotation());

        return new Algorithm444(newNotations.join(' '));
    }

    public getState() : State444 {
        return _.cloneDeep(this.state);
    }

    public getMoves() : Array<Move444> {
        return _.cloneDeep(this.moves);
    }

    public getNotation() : string {
        return this.moves.map(m => m.getNotation()).join(' ');
    }

    public eq(alg: Algorithm444): boolean {
        return this.state.eq(alg.getState());
    }
};
