const _ = require('lodash');
import {Algorithm333} from './Algorithm333';
import {Algorithm444} from './Algorithm444';
import {Move555} from './Move555';
import {Cube555} from './Cube555';
import {CornerSticker} from './CornerSticker';
import {readCornerStickerLabel} from './CornerStickerLabel';
import {EdgeSticker} from './EdgeSticker';
import {
    readEdgeStickerLabel,
} from './EdgeStickerLabel';
import {WingEdgeSticker} from './WingEdgeSticker';
import {
    readWingEdgeStickerLabel,
} from './WingEdgeStickerLabel';
import {XCenterSticker} from './XCenterSticker';
import {
    readXCenterStickerLabel,
} from './XCenterStickerLabel';
import {TCenterSticker} from './TCenterSticker';
import {
    readTCenterStickerLabel,
    numberToTCenterStickerLabel,
} from './TCenterStickerLabel';
import {State555} from './State555';

export class Algorithm555 {
    private moves : Array<Move555> = [];
    private state : State555;

    constructor(algorithmStr: string) {
        const cube = new Cube555();

        algorithmStr.split(' ').filter(s => s !== '').map(notationStr => {
            const move = new Move555(notationStr);
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
        let algCube : Cube555;
        let initialState;

        algCube = new Cube555();
        initialState = State555.getInitialState();

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

        const cycledState = new State555(cp, co, undefined, undefined, undefined, undefined, undefined, undefined);

        return algCube.getState().eq(cycledState);
    };

    public isValidThreeStyleEdge(bufferStr: string, sticker1Str: string, sticker2Str: string): boolean {
        const buffer = new EdgeSticker(readEdgeStickerLabel(bufferStr));
        const sticker1 = new EdgeSticker(readEdgeStickerLabel(sticker1Str));
        const sticker2 = new EdgeSticker(readEdgeStickerLabel(sticker2Str));

        return this.isValidThreeStyleEdgeTyped(buffer, sticker1, sticker2);
    }


    public isValidThreeStyleEdgeTyped(buffer: EdgeSticker, sticker1: EdgeSticker, sticker2: EdgeSticker): boolean {
        const initialState = State555.getInitialState();

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

        const cycledState = new State555(undefined, undefined, ep, eo, undefined, undefined, undefined,  undefined);

        return this.state.eq(cycledState);
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
            buffer = new WingEdgeSticker(readWingEdgeStickerLabel(Algorithm555.swapWingEdgeSystem(bufferStr)));
            isFUrSystem = false;
        }

        if (isFUrSystem) {
            sticker1 = new WingEdgeSticker(readWingEdgeStickerLabel(sticker1Str));
            sticker2 = new WingEdgeSticker(readWingEdgeStickerLabel(sticker2Str));
        } else {
            sticker1 = new WingEdgeSticker(readWingEdgeStickerLabel(Algorithm555.swapWingEdgeSystem(sticker1Str)));
            sticker2 = new WingEdgeSticker(readWingEdgeStickerLabel(Algorithm555.swapWingEdgeSystem(sticker2Str)));
        }

        return this.isValidThreeStyleWingEdgeTyped(buffer, sticker1, sticker2);
    }

    public isValidThreeStyleWingEdgeTyped(buffer: WingEdgeSticker, sticker1: WingEdgeSticker, sticker2: WingEdgeSticker): boolean {
        const initialState = State555.getInitialState();

        // initialStateからWPしたStateを生成して、this.stateと同一かどうか判定する
        const wp = initialState.getWp();

        const orig_buffer_wp = wp[buffer.getPieceInd()];
        wp[buffer.getPieceInd()] = wp[sticker2.getPieceInd()];
        wp[sticker2.getPieceInd()] = wp[sticker1.getPieceInd()];
        wp[sticker1.getPieceInd()] = orig_buffer_wp;

        const cycledState = new State555(undefined, undefined, undefined, undefined, undefined, undefined, wp, undefined, false);

        return this.state.eq(cycledState);
    };

    public isValidThreeStyleXCenter(bufferStr: string, sticker1Str: string, sticker2Str: string): boolean {
        const buffer = new XCenterSticker(readXCenterStickerLabel(bufferStr));
        const sticker1 = new XCenterSticker(readXCenterStickerLabel(sticker1Str));
        const sticker2 = new XCenterSticker(readXCenterStickerLabel(sticker2Str));

        return this.isValidThreeStyleXCenterTyped(buffer, sticker1, sticker2);
    }

    public isValidThreeStyleXCenterTyped(buffer: XCenterSticker, sticker1: XCenterSticker, sticker2: XCenterSticker): boolean {
        const initialState = State555.getInitialState();

        // initialStateからXPしたStateを生成して、this.stateと同一かどうか判定する
        const xp = initialState.getXp();

        const orig_buffer_xp = xp[buffer.getPieceInd()];
        xp[buffer.getPieceInd()] = xp[sticker2.getPieceInd()];
        xp[sticker2.getPieceInd()] = xp[sticker1.getPieceInd()];
        xp[sticker1.getPieceInd()] = orig_buffer_xp;

        const cycledState = new State555(undefined, undefined, undefined, undefined, undefined, xp, undefined, undefined, false);
        return this.state.eq(cycledState);
    };

    public isValidThreeStyleTCenter(bufferStr: string, sticker1Str: string, sticker2Str: string): boolean {
        const buffer = new TCenterSticker(readTCenterStickerLabel(bufferStr));
        const sticker1 = new TCenterSticker(readTCenterStickerLabel(sticker1Str));
        const sticker2 = new TCenterSticker(readTCenterStickerLabel(sticker2Str));

        return this.isValidThreeStyleTCenterTyped(buffer, sticker1, sticker2);
    }

    public isValidThreeStyleTCenterTyped(buffer: TCenterSticker, sticker1: TCenterSticker, sticker2: TCenterSticker): boolean {
        const initialState = State555.getInitialState();

        // initialStateからTPしたStateを生成して、this.stateと同一かどうか判定する
        const tp = initialState.getTp();

        const orig_buffer_tp = tp[buffer.getPieceInd()];
        tp[buffer.getPieceInd()] = tp[sticker2.getPieceInd()];
        tp[sticker2.getPieceInd()] = tp[sticker1.getPieceInd()];
        tp[sticker1.getPieceInd()] = orig_buffer_tp;

        const cycledState = new State555(undefined, undefined, undefined, undefined, undefined, undefined, undefined, tp, false);
        return this.state.eq(cycledState);
    };

    public inverse() : Algorithm555 {
        // (A B C)' = C' B' A'
        const newNotations : Array<string> = [];
        this.moves.slice().reverse().map(move => {
            newNotations.push(move.makeInverse().getNotation())
        })

        const newAlg = new Algorithm555(newNotations.join(' '));
        this.moves = newAlg.getMoves();
        this.state = newAlg.getState();

        return this;
    }

    public detectThreeStyleCornerStickers(bufferStickerStr: string) : Array<string> {
        const inversedAlg = new Algorithm555(this.getNotation()).inverse();
        const cube : Cube555 = new Cube555(inversedAlg.getNotation());

        const cp = cube.getState().getCp();
        const co = cube.getState().getCo();

       const ans = Algorithm333.detectThreeStyleCornerStickersCpCo(bufferStickerStr, cp, co);
        if (ans.length !== 3) {
            return [];
        }

        // check corner only cycle
        if (this.isValidThreeStyleCornerTyped(ans[0], ans[1], ans[2])) {
            return ans.map(sticker => sticker.toString());
        } else {
            return [];
        }
    }

    public detectThreeStyleEdgeStickers(bufferStickerStr: string) : Array<string> {
        const inversedAlg = new Algorithm555(this.getNotation()).inverse();
        const cube : Cube555 = new Cube555(inversedAlg.getNotation());

        const ep = cube.getState().getEp();
        const eo = cube.getState().getEo();

        const ans = Algorithm333.detectThreeStyleEdgeStickersEpEo(bufferStickerStr, ep, eo);
        if (ans.length !== 3) {
            return [];
        }

        // check edge only cycle
        if (this.isValidThreeStyleEdgeTyped(ans[0], ans[1], ans[2])) {
            return ans.map(sticker => sticker.toString());
        } else {
            return [];
        }
    }

    public detectThreeStyleWingEdgeStickers(bufferStickerStr: string) : Array<string> {
        const inversedAlg = new Algorithm555(this.getNotation()).inverse();
        const cube : Cube555 = new Cube555(inversedAlg.getNotation());

        const wp = cube.getState().getWp();

        const [ isFUrSystem, ans ] = Algorithm444.detectThreeStyleWingEdgeStickersWp(bufferStickerStr, wp);
        if (ans.length !== 3) {
            return [];
        }

        // check wing edge only cycle
        if (!this.isValidThreeStyleWingEdgeTyped(ans[0], ans[1], ans[2])) {
            return [];
        }

        if (isFUrSystem) {
            return ans.map(sticker => sticker.toString());
        } else {
            return ans.map(sticker => Algorithm555.swapWingEdgeSystem(sticker.toString()));
        }
    }

    public detectThreeStyleXCenterStickers(bufferStickerStr: string) : Array<string> {
        const inversedAlg = new Algorithm555(this.getNotation()).inverse();
        const cube : Cube555 = new Cube555(inversedAlg.getNotation());

        const xp = cube.getState().getXp();

        const ans = Algorithm444.detectThreeStyleXCenterStickersXp(bufferStickerStr, xp);
        if (ans.length !== 3) {
            return [];
        }

        // check x-center only cycle
        if (this.isValidThreeStyleXCenterTyped(ans[0], ans[1], ans[2])) {
            return ans.map(sticker => sticker.toString());
        } else {
            return [];
        }
    }

    public detectThreeStyleTCenterStickers(bufferStickerStr: string) : Array<string> {
        const inversedAlg = new Algorithm555(this.getNotation()).inverse();
        const cube : Cube555 = new Cube555(inversedAlg.getNotation());

        const tp = cube.getState().getTp();

        const ans = Algorithm555.detectThreeStyleTCenterStickersTp(bufferStickerStr, tp);
        if (ans.length !== 3) {
            return [];
        }

        // check t-center only cycle
        if (this.isValidThreeStyleTCenterTyped(ans[0], ans[1], ans[2])) {
            return ans.map(sticker => sticker.toString());
        } else {
            return [];
        }
    }

    public static detectThreeStyleTCenterStickersTp(bufferStickerStr: string, tp: Array<number>) : Array<TCenterSticker> {
        const bufferSticker : TCenterSticker = new TCenterSticker(readTCenterStickerLabel(bufferStickerStr));
        const bufferPieceInd = bufferSticker.getPieceInd();

        const sticker1PieceInd = tp[bufferPieceInd];
        const sticker2PieceInd = tp[sticker1PieceInd];

        if (tp[sticker2PieceInd] !== bufferPieceInd) {
            return [];
        }

        return [
            bufferSticker,
            new TCenterSticker(numberToTCenterStickerLabel(sticker1PieceInd)),
            new TCenterSticker(numberToTCenterStickerLabel(sticker2PieceInd)),
       ];
    }

    // setup, move1, move2, move1' move2', setup'
    public static makeThreeStyle(setup: string, move1: string, move2: string): Algorithm555 {
        const newNotations = [ setup, move1, move2, ];

        // move1'
        newNotations.push(new Algorithm555(move1).inverse().getNotation());

        // move2'
        newNotations.push(new Algorithm555(move2).inverse().getNotation());

        // setup'
        newNotations.push(new Algorithm555(setup).inverse().getNotation());

        return new Algorithm555(newNotations.join(' '));
    }

    public getState() : State555 {
        return _.cloneDeep(this.state);
    }

    public getMoves() : Array<Move555> {
        return _.cloneDeep(this.moves);
    }

    public getNotation() : string {
        return this.moves.map(m => m.getNotation()).join(' ');
    }

    public eq(alg: Algorithm555): boolean {
        return this.state.eq(alg.getState());
    }
};
