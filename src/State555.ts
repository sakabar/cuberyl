const _ = require('lodash');
import {State333} from './State333';
// import {CenterPieceLabel} from './CenterPieceLabel';

export class State555 {
    private cp: Array<number>;
    private co: Array<number>;
    private ep: Array<number>;
    private eo: Array<number>;
    private center: Array<number>;
    private xp: Array<number>;
    private wp: Array<number>;
    private tp: Array<number>;

    constructor(cp: Array<number> | undefined,
                co: Array<number> | undefined,
                ep: Array<number> | undefined,
                eo: Array<number> | undefined,
                center: Array<number> | undefined,
                xp: Array<number> | undefined,
                wp: Array<number> | undefined,
                tp: Array<number> | undefined,
                skipValidation=false
               ){

        this.cp = cp || State555.getInitialState().getCp();
        this.co = co || State555.getInitialState().getCo();
        this.ep = ep || State555.getInitialState().getEp();
        this.eo = eo || State555.getInitialState().getEo();
        this.center = center || State555.getInitialState().getCenter();
        this.xp = xp || State555.getInitialState().getXp();
        this.wp = wp || State555.getInitialState().getWp();
        this.tp = tp || State555.getInitialState().getTp();

        if (skipValidation) {
            return;
        }

        if (!this.isValidCp()) {
            throw new Error(`CP of this state is invalid: ${cp}`);
        }

        if (!this.isValidCo()) {
            throw new Error(`CO of this state is invalid: ${co}`);
        }

        if (!this.isValidEp()) {
            throw new Error(`EP of this state is invalid: ${ep}`);
        }

        if (!this.isValidEo()) {
            throw new Error(`EO of this state is invalid: ${eo}`);
        }

        if (!this.isValidCenter()) {
            throw new Error(`Center of this state is invalid: ${center}`);
        }

        if (!this.isValidXp()) {
            throw new Error(`XP of this state is invalid: ${xp}`);
        }

        if (!this.isValidWp()) {
            throw new Error(`WP of this state is invalid: ${wp}`);
        }

        if (!this.isValidTp()) {
            throw new Error(`TP of this state is invalid: ${tp}`);
        }

        if (!this.isSameParity()) {
            throw new Error(`This state makes 2-cycle, CP: ${cp}, EP: ${ep}, center: ${center}`);
        }
    };

    public getCp() : Array<number> {
        return [ ...this.cp, ];
    };

    public getCo() : Array<number> {
        return [ ...this.co, ];
    };

    public getEp() : Array<number> {
      return [ ...this.ep, ];
    };

    public getEo() : Array<number> {
        return [ ...this.eo, ];
    };

    public getCenter() : Array<number> {
        return [ ...this.center, ];
    };

    public getXp() : Array<number> {
        return [ ...this.xp, ];
    };

    public getWp() : Array<number> {
        return [ ...this.wp, ];
    };

    public getTp() : Array<number> {
        return [ ...this.tp, ];
    };

    private isValidCp(): boolean {
        // slice()はコピーのため
        return _.isEqual(this.cp.slice().sort((a, b) => a - b), [ ...Array(this.cp.length).keys(), ]);
    }

    private isValidCo(): boolean {
        const valIsValid = this.co.filter(n => !(0 <= n && n < 3)).length === 0;
        const twistIsValid = _.sum(this.co) % 3 === 0;
        return valIsValid && twistIsValid;
    }

    private isValidEp(): boolean {
        return _.isEqual(this.ep.slice().sort((a, b) => a - b), [ ...Array(this.ep.length).keys(), ]);
    }

    private isValidEo(): boolean {
        const valIsValid = this.eo.filter(n => !(0 <= n && n < 2)).length === 0;
        const twistIsValid = _.sum(this.eo) % 2 === 0;
        return valIsValid && twistIsValid;
    }

    private isValidCenter(): boolean {
        return _.isEqual(this.center.slice().sort((a, b) => a - b), [ ...Array(this.center.length).keys(), ]);
    }

    private isValidXp(): boolean {
        return _.isEqual(this.xp.slice().sort((a, b) => a - b), [ ...Array(this.xp.length).keys(), ]);
    }

    private isValidWp(): boolean {
        return _.isEqual(this.wp.slice().sort((a, b) => a - b), [ ...Array(this.wp.length).keys(), ]);
    }

    private isValidTp(): boolean {
        return _.isEqual(this.tp.slice().sort((a, b) => a - b), [ ...Array(this.tp.length).keys(), ]);
    }

    public isSameParity(): boolean {
        const state333 = new State333(this.cp.slice(), this.co.slice(), this.ep.slice(), this.eo.slice(), this.center.slice());

        return state333.isSameParity();
    }

    public applyMove(move: State555, skipValidation=false): State555 {
        const newCp: Array<number> = this.cp.map((_,i) => this.cp[move.getCp()[i]]);
        const newCo: Array<number> = this.co.map((_,i) => (this.co[move.getCp()[i]] + move.getCo()[i]) % 3);
        const newEp: Array<number> = this.ep.map((_,i) => this.ep[move.getEp()[i]]);
        const newEo: Array<number> = this.eo.map((_,i) => (this.eo[move.getEp()[i]] + move.getEo()[i]) % 2);
        const newCenter: Array<number> = this.center.map((_,i) => this.center[move.getCenter()[i]]);
        const newXp: Array<number> = this.xp.map((_,i) => this.xp[move.getXp()[i]]);
        const newWp: Array<number> = this.wp.map((_,i) => this.wp[move.getWp()[i]]);
        const newTp: Array<number> = this.tp.map((_,i) => this.tp[move.getTp()[i]]);

        return new State555(newCp, newCo, newEp, newEo, newCenter, newXp, newWp, newTp, skipValidation);
    }

    public eq(state: State555) : boolean {
        return [
            _.isEqual(this.cp, state.getCp()),
            _.isEqual(this.co, state.getCo()),
            _.isEqual(this.xp, state.getXp()),
            _.isEqual(this.wp, state.getWp()),
            _.isEqual(this.tp, state.getTp()),
        ].every(b => b);
    }

    public isSolved() : boolean {
        // X-center and T-center label (0, 1, 2, 3) is same face (i.e. U);
        // so, compare (labelId / 4) for judging isSolved()

        const getXFaceId = (xCenterStickerLabel: number) => {
            return Math.floor(xCenterStickerLabel / 4);
        }

        const getTFaceId = (tCenterStickerLabel: number) => {
            return Math.floor(tCenterStickerLabel / 4);
        }

        return [
            _.isEqual(this.cp, State555.getInitialState().getCp()),
            _.isEqual(this.co, State555.getInitialState().getCo()),
            _.isEqual(this.xp.map((label :number) => getXFaceId(label)),
                      State555.getInitialState().getXp().map((label: number) => getXFaceId(label))),
            _.isEqual(this.wp, State555.getInitialState().getWp()),
            _.isEqual(this.tp.map((label :number) => getTFaceId(label)),
                      State555.getInitialState().getXp().map((label: number) => getTFaceId(label))),
        ].every(b => b);
    }

    public static getInitialState(): State555 {
        return new State555(
            [ 0, 1, 2, 3, 4, 5, 6, 7, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, ],
            [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
            [ 0, 1, 2, 3, 4, 5, ],
            [
                 0,  1,  2,  3,
                 4,  5,  6,  7,
                 8,  9, 10, 11,
                12, 13, 14, 15,
                16, 17, 18, 19,
                20, 21, 22, 23,
            ],
            [
                 0,  1,  2,  3,
                 4,  5,  6,  7,
                 8,  9, 10, 11,
                12, 13, 14, 15,
                16, 17, 18, 19,
                20, 21, 22, 23,
            ],
            [
                 0,  1,  2,  3,
                 4,  5,  6,  7,
                 8,  9, 10, 11,
                12, 13, 14, 15,
                16, 17, 18, 19,
                20, 21, 22, 23,
            ],
            false
        );
    };

    public static getRMoveState(): State555 {
        return new State555(
            [ 0, 2, 6, 3, 4, 1, 5, 7],
            [ 0, 1, 2, 0, 0, 2, 1, 0],
            [ 0, 5, 9, 3, 4, 2, 6, 7, 8, 1, 10, 11],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 1, 2, 3, 4, 5, ],
            [
                 0,  1,  2,  3,
                 4,  5,  6,  7,
                 8,  9, 10, 11,
                15, 12, 13, 14,
                16, 17, 18, 19,
                20, 21, 22, 23,
            ],
            [
                 0,  1, 10,  3,
                 4,  5,  6,  7,
                 8,  9, 22, 11,
                15, 12, 13, 14,
                 2, 17, 18, 19,
                20, 21, 16, 23,
            ],
            [
                 0,  1,  2,  3,
                 4,  5,  6,  7,
                 8,  9, 10, 11,
                15, 12, 13, 14,
                16, 17, 18, 19,
                20, 21, 22, 23,
            ],
            true
        );
    };

    public static getUMoveState(): State555 {
        return new State555(
            [ 3, 0, 1, 2, 4, 5, 6, 7, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, ],
            [ 0, 1, 2, 3, 7, 4, 5, 6, 8, 9, 10, 11, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
            [ 0, 1, 2, 3, 4, 5, ],
            [
                 3,  0,  1,  2,
                 4,  5,  6,  7,
                 8,  9, 10, 11,
                12, 13, 14, 15,
                16, 17, 18, 19,
                20, 21, 22, 23,
            ],
            [
                 3,  0,  1,  2,
                 4,  9,  6,  7,
                 8, 13, 10, 11,
                12, 17, 14, 15,
                16,  5, 18, 19,
                20, 21, 22, 23,
            ],
            [
                 3,  0,  1,  2,
                 4,  5,  6,  7,
                 8,  9, 10, 11,
                12, 13, 14, 15,
                16, 17, 18, 19,
                20, 21, 22, 23,
            ],
            true
        );
    };

    public static getLMoveState(): State555 {
        return new State555(
            [ 4, 1, 2, 0, 7, 5, 6, 3],
            [ 2, 0, 0, 1, 1, 0, 0, 2],
            [ 11, 1, 2, 7, 4, 5, 6, 0, 8, 9, 10, 3],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 1, 2, 3, 4, 5, ],
            [
                 0,  1,  2,  3,
                 7,  4,  5,  6,
                 8,  9, 10, 11,
                12, 13, 14, 15,
                16, 17, 18, 19,
                20, 21, 22, 23,
            ],
            [
                18,  1,  2,  3,
                 7,  4,  5,  6,
                 0,  9, 10, 11,
                12, 13, 14, 15,
                16, 17, 20, 19,
                 8, 21, 22, 23,
            ],
            [
                 0,  1,  2,  3,
                 7,  4,  5,  6,
                 8,  9, 10, 11,
                12, 13, 14, 15,
                16, 17, 18, 19,
                20, 21, 22, 23,
            ],
            true
        );
    };

    public static getDMoveState(): State555 {
        return new State555(
            [ 0, 1, 2, 3,
              5, 6, 7, 4, ],
            [ 0, 0, 0, 0,
              0, 0, 0, 0, ],
            [ 0, 1, 2, 3,
              4, 5, 6, 7,
              9, 10, 11, 8, ],
            [ 0, 0, 0, 0,
              0, 0, 0, 0,
              0, 0, 0, 0, ],
            [ 0, 1, 2, 3, 4, 5, ],
            [
                 0,  1,  2,  3,
                 4,  5,  6,  7,
                 8,  9, 10, 11,
                12, 13, 14, 15,
                16, 17, 18, 19,
                23, 20, 21, 22,
            ],
            [
                 0,  1,  2,  3,
                 4,  5,  6, 19,
                 8,  9, 10,  7,
                12, 13, 14, 11,
                16, 17, 18, 15,
                23, 20, 21, 22,
            ],
            [
                 0,  1,  2,  3,
                 4,  5,  6,  7,
                 8,  9, 10, 11,
                12, 13, 14, 15,
                16, 17, 18, 19,
                23, 20, 21, 22,
            ],
            true
        );
    }

    public static getFMoveState(): State555 {
        return new State555(
            [ 0, 1, 3, 7, 4, 5, 2, 6, ],
            [ 0, 0, 1, 2, 0, 0, 2, 1, ],
            [ 0, 1, 6, 10, 4, 5, 3, 7, 8, 9, 2, 11, ],
            [ 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, ],
            [ 0, 1, 2, 3, 4, 5, ],
            [
                 0,  1,  2,  3,
                 4,  5,  6,  7,
                11,  8,  9, 10,
                12, 13, 14, 15,
                16, 17, 18, 19,
                20, 21, 22, 23,
            ],
            [
                 0,  1,  2,  6,
                 4,  5, 21,  7,
                11,  8,  9, 10,
                 3, 13, 14, 15,
                16, 17, 18, 19,
                20, 12, 22, 23,
            ],
            [
                 0,  1,  2,  3,
                 4,  5,  6,  7,
                11,  8,  9, 10,
                12, 13, 14, 15,
                16, 17, 18, 19,
                20, 21, 22, 23,
            ],
            true
        );
    }

    public static getBMoveState(): State555 {
        return new State555(
            [ 1, 5, 2, 3, 0, 4, 6, 7, ],
            [ 1, 2, 0, 0, 2, 1, 0, 0, ],
            [ 4, 8, 2, 3, 1, 5, 6, 7, 0, 9, 10, 11, ],
            [ 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, ],
            [ 0, 1, 2, 3, 4, 5, ],
            [
                 0,  1,  2,  3,
                 4,  5,  6,  7,
                 8,  9, 10, 11,
                12, 13, 14, 15,
                19, 16, 17, 18,
                20, 21, 22, 23,
            ],
            [
                 0, 14,  2,  3,
                 1,  5,  6,  7,
                 8,  9, 10, 11,
                12, 13, 23, 15,
                19, 16, 17, 18,
                20, 21, 22,  4,
            ],
            [
                 0,  1,  2,  3,
                 4,  5,  6,  7,
                 8,  9, 10, 11,
                12, 13, 14, 15,
                19, 16, 17, 18,
                20, 21, 22, 23,
            ],
            true
        );
    }

    public static getEMoveState(): State555 {
        return new State555(
            [ 0, 1, 2, 3, 4, 5, 6, 7, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, ],
            [
                1, 2, 3, 0,
                4, 5, 6, 7,
                8, 9, 10, 11,
            ],
            [ 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, ],
            [ 0, 2, 4, 3, 5, 1, ],
            [
                 0,  1,  2,  3,
                 4,  5,  6,  7,
                 8,  9, 10, 11,
                12, 13, 14, 15,
                16, 17, 18, 19,
                20, 21, 22, 23,
            ],
            [
                 0,  1,  2,  3,
                 4,  5,  6,  7,
                 8,  9, 10, 11,
                12, 13, 14, 15,
                16, 17, 18, 19,
                20, 21, 22, 23,
            ],
            [
                 0,  1,  2,  3,
                 4, 17,  6, 19,
                 8,  5, 10,  7,
                12,  9, 14, 11,
                16, 13, 18, 15,
                20, 21, 22, 23,
            ],
            true
        );
    };

    public static getMMoveState(): State555 {
        return new State555(
            [ 0, 1, 2, 3, 4, 5, 6, 7, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, ],
            [ 0, 1, 2, 3, 8, 5, 4, 7, 10, 9, 6, 11, ],
            [ 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, ],
            [ 5, 1, 0, 2, 4, 3, ],
            [
                 0,  1,  2,  3,
                 4,  5,  6,  7,
                 8,  9, 10, 11,
                12, 13, 14, 15,
                16, 17, 18, 19,
                20, 21, 22, 23,
            ],
            [
                 0,  1,  2,  3,
                 4,  5,  6,  7,
                 8,  9, 10, 11,
                12, 13, 14, 15,
                16, 17, 18, 19,
                20, 21, 22, 23,
            ],
            [
                18,  1, 16,  3,
                 4,  5,  6,  7,
                 0,  9,  2, 11,
                12, 13, 14, 15,
                22, 17, 20, 19,
                 8, 21, 10, 23,
            ],
            true
        );
    };

    public static getSMoveState(): State555 {
        return new State555(
            [ 0, 1, 2, 3, 4, 5, 6, 7, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, ],
            [ 0, 1, 2, 3, 4, 7, 6, 11, 8, 5, 10, 9, ],
            [ 0, 0, 0, 0, 0, 1, 0, 1,  0, 1, 0, 1, ],
            [ 4, 0, 2, 1, 3, 5, ],
            [
                 0,  1,  2,  3,
                 4,  5,  6,  7,
                 8,  9, 10, 11,
                12, 13, 14, 15,
                16, 17, 18, 19,
                20, 21, 22, 23,
            ],
            [
                 0,  1,  2,  3,
                 4,  5,  6,  7,
                 8,  9, 10, 11,
                12, 13, 14, 15,
                16, 17, 18, 19,
                20, 21, 22, 23,
            ],
            [
                 0,  4,  2,  6,
                23,  5, 21,  7,
                 8,  9, 10, 11,
                 3, 13,  1, 15,
                16, 17, 18, 19,
                20, 12, 22, 14,
            ],
            true
        );
    };

    // XYZ回転
    public static getXMoveState(): State555 {
        return new State555(
            [ 3, 2, 6, 7, 0, 1, 5, 4, ],
            [ 2, 1, 2, 1, 1, 2, 1, 2],
            [ 7,  5, 9, 11, 6, 2, 10, 3,  4, 1, 8, 0],
            [ 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
            [ 2, 1, 3, 5, 4, 0 ],
            [
                 8,  9, 10, 11,
                 5,  6,  7,  4,
                20, 21, 22, 23,
                15, 12, 13, 14,
                 2,  3,  0,  1,
                18, 19, 16, 17
            ],
            [
                 8,  9, 10, 11,
                 5,  6,  7,  4,
                20, 21, 22, 23,
                15, 12, 13, 14,
                 2,  3,  0,  1,
                18, 19, 16, 17,
            ],
            [
                 8,  9, 10, 11,
                 5,  6,  7,  4,
                20, 21, 22, 23,
                15, 12, 13, 14,
                 2,  3,  0,  1,
                18, 19, 16, 17
            ],
            true
        );
    };

    public static getYMoveState(): State555 {
        return new State555(
            [
                3, 0, 1, 2,
                7, 4, 5, 6
            ],
            [
                0, 0, 0, 0,
                0, 0, 0, 0
            ],
            [
                3, 0, 1, 2,
                7, 4, 5, 6,
                11, 8, 9, 10,
            ],
            [
                1, 1, 1, 1,
                0, 0, 0, 0,
                0, 0, 0, 0
            ],
            [ 0, 5, 1, 3, 2, 4, ],
            [
                 3,  0,  1,  2,
                 8,  9, 10, 11,
                12, 13, 14, 15,
                16, 17, 18, 19,
                 4,  5,  6,  7,
                21, 22, 23, 20,
            ],
            [
                 3,  0,  1,  2,
                 8,  9, 10, 11,
                12, 13, 14, 15,
                16, 17, 18, 19,
                 4,  5,  6,  7,
                21, 22, 23, 20,
            ],
            [
                 3,  0,  1,  2,
                 8,  9, 10, 11,
                12, 13, 14, 15,
                16, 17, 18, 19,
                 4,  5,  6,  7,
                21, 22, 23, 20,
            ],
            true
        );
    };

    public static getZMoveState(): State555 {
        return new State555(
            [
                4, 0, 3, 7,
                5, 1, 2, 6
            ],
            [
                1, 2, 1, 2,
                2, 1, 2, 1
            ],
            [
                8, 4,  6, 10, 0,
                7, 3, 11,  1, 5,
                2, 9
            ],
            [
                1, 1, 1, 1, 1,
                1, 1, 1, 1, 1,
                1, 1
            ],
            [ 4, 0, 2, 1, 3, 5 ],
            [
                 7,  4,  5,  6,
                23, 20, 21, 22,
                11,  8,  9, 10,
                 3,  0,  1,  2,
                17, 18, 19, 16,
                15, 12, 13, 14,
            ],
            [
                 7,  4,  5,  6,
                23, 20, 21, 22,
                11,  8,  9, 10,
                 3,  0,  1,  2,
                17, 18, 19, 16,
                15, 12, 13, 14,
            ],
            [
                 7,  4,  5,  6,
                23, 20, 21, 22,
                11,  8,  9, 10,
                 3,  0,  1,  2,
                17, 18, 19, 16,
                15, 12, 13, 14,
            ],
            true
        );
    };

    public static getSliceUMoveState(): State555 {
        return new State555(
            [ 0, 1, 2, 3, 4, 5, 6, 7, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, ],
            [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
            [ 0, 1, 2, 3, 4, 5, ],
            [
                 0,  1,  2,  3,
                 8,  9,  6,  7,
                12, 13, 10, 11,
                16, 17, 14, 15,
                 4,  5, 18, 19,
                20, 21, 22, 23,
            ],
            [
                 0,  1,  2,  3,
                 8,  5,  6,  7,
                12,  9, 10, 11,
                16, 13, 14, 15,
                 4, 17, 18, 19,
                20, 21, 22, 23,
            ],
            [
                 0,  1,  2,  3,
                 8,  5,  6,  7,
                12,  9, 10, 11,
                16, 13, 14, 15,
                 4, 17, 18, 19,
                20, 21, 22, 23,
            ],
            true
        );
    };

    public static getSliceRMoveState(): State555 {
        return new State555(
            [ 0, 1, 2, 3, 4, 5, 6, 7, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, ],
            [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
            [ 0, 1, 2, 3, 4, 5, ],
            [
                 0,  9, 10,  3,
                 4,  5,  6,  7,
                 8, 21, 22, 11,
                12, 13, 14, 15,
                 2, 17, 18,  1,
                20, 19, 16, 23,
            ],
            [
                 0,  9,  2,  3,
                 4,  5,  6,  7,
                 8, 21, 10, 11,
                12, 13, 14, 15,
                16, 17, 18,  1,
                20, 19, 22, 23,
            ],
            [
                 0,  9,  2,  3,
                 4,  5,  6,  7,
                 8, 21, 10, 11,
                12, 13, 14, 15,
                16, 17, 18,  1,
                20, 19, 22, 23,
            ],
            true
        );
    };

    public static getSliceLMoveState(): State555 {
        return new State555(
            [ 0, 1, 2, 3, 4, 5, 6, 7, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, ],
            [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
            [ 0, 1, 2, 3, 4, 5, ],
            [
                18,  1,  2,  17,
                 4,  5,  6,  7,
                 0,  9, 10,  3,
                12, 13, 14, 15,
                16, 23, 20, 19,
                 8, 21, 22, 11,
            ],
            [
                 0,  1,  2, 17,
                 4,  5,  6,  7,
                 8,  9, 10,  3,
                12, 13, 14, 15,
                16, 23, 18, 19,
                20, 21, 22, 11,
            ],
            [
                 0,  1,  2, 17,
                 4,  5,  6,  7,
                 8,  9, 10,  3,
                12, 13, 14, 15,
                16, 23, 18, 19,
                20, 21, 22, 11,
            ],
            true
        );
    };

    public static getSliceDMoveState(): State555 {
        return new State555(
            [ 0, 1, 2, 3, 4, 5, 6, 7, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, ],
            [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
            [ 0, 1, 2, 3, 4, 5, ],
            [
                 0,  1,  2,  3,
                 4,  5, 18, 19,
                 8,  9,  6,  7,
                12, 13, 10, 11,
                16, 17, 14, 15,
                20, 21, 22, 23,
            ],
            [
                 0,  1,  2,  3,
                 4,  5, 18,  7,
                 8,  9,  6, 11,
                12, 13, 10, 15,
                16, 17, 14, 19,
                20, 21, 22, 23,
            ],
            [
                 0,  1,  2,  3,
                 4,  5, 18,  7,
                 8,  9,  6, 11,
                12, 13, 10, 15,
                16, 17, 14, 19,
                20, 21, 22, 23,
            ],
            true
        );
    };

    public static getSliceFMoveState(): State555 {
        return new State555(
            [ 0, 1, 2, 3, 4, 5, 6, 7, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, ],
            [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
            [ 0, 1, 2, 3, 4, 5, ],
            [
                 0,  1,  5,  6,
                 4, 20, 21,  7,
                 8,  9, 10, 11,
                 3, 13, 14,  2,
                16, 17, 18, 19,
                15, 12, 22, 23,
            ],
            [
                 0,  1,  5,  3,
                 4, 20,  6,  7,
                 8,  9, 10, 11,
                12, 13, 14,  2,
                16, 17, 18, 19,
                15, 21, 22, 23,
            ],
            [
                 0,  1,  5,  3,
                 4, 20,  6,  7,
                 8,  9, 10, 11,
                12, 13, 14,  2,
                16, 17, 18, 19,
                15, 21, 22, 23,
            ],
            true
        );
    };

    public static getSliceBMoveState(): State555 {
        return new State555(
            [ 0, 1, 2, 3, 4, 5, 6, 7, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, ],
            [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
            [ 0, 1, 2, 3, 4, 5, ],
            [
                13, 14,  2,  3,
                 1,  5,  6,  0,
                 8,  9, 10, 11,
                12, 22, 23, 15,
                16, 17, 18, 19,
                20, 21,  7,  4,
            ],
            [
                13,  1,  2,  3,
                 4,  5,  6,  0,
                 8,  9, 10, 11,
                12, 22, 14, 15,
                16, 17, 18, 19,
                20, 21,  7, 23,
            ],
            [
                13,  1,  2,  3,
                 4,  5,  6,  0,
                 8,  9, 10, 11,
                12, 22, 14, 15,
                16, 17, 18, 19,
                20, 21,  7, 23,
            ],
            true
        );
    };
}

