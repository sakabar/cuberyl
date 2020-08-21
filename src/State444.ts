const _ = require('lodash');
// import {CenterPieceLabel} from './CenterPieceLabel';

export class State444 {
    private cp: Array<number>;
    private co: Array<number>;
    private xp: Array<number>;
    private wp: Array<number>;

    constructor(cp: Array<number> | undefined,
                co: Array<number> | undefined,
                xp: Array<number> | undefined,
                wp: Array<number> | undefined,
                skipValidation=false
               ){

        this.cp = cp || State444.getInitialState().getCp();
        this.co = co || State444.getInitialState().getCo();
        this.xp = xp || State444.getInitialState().getXp();
        this.wp = wp || State444.getInitialState().getWp();

        if (skipValidation) {
            return;
        }

        if (!this.isValidCp()) {
            throw new Error(`CP of this state is invalid: ${cp}`);
        }

        if (!this.isValidCo()) {
            throw new Error(`CO of this state is invalid: ${co}`);
        }

        if (!this.isValidXp()) {
            throw new Error(`XP of this state is invalid: ${xp}`);
        }

        if (!this.isValidWp()) {
            throw new Error(`WP of this state is invalid: ${wp}`);
        }
    };

    public getCp() : Array<number> {
        return [ ...this.cp, ];
    };

    public getCo() : Array<number> {
        return [ ...this.co, ];
    };

    public getXp() : Array<number> {
        return [ ...this.xp, ];
    };

    public getWp() : Array<number> {
        return [ ...this.wp, ];
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

    private isValidXp(): boolean {
        return _.isEqual(this.xp.slice().sort((a, b) => a - b), [ ...Array(this.xp.length).keys(), ]);
    }

    private isValidWp(): boolean {
        return _.isEqual(this.wp.slice().sort((a, b) => a - b), [ ...Array(this.wp.length).keys(), ]);
    }

    public applyMove(move: State444, skipValidation=false): State444 {
        const newCp: Array<number> = this.cp.map((_,i) => this.cp[move.getCp()[i]]);
        const newCo: Array<number> = this.co.map((_,i) => (this.co[move.getCp()[i]] + move.getCo()[i]) % 3);
        const newXp: Array<number> = this.xp.map((_,i) => this.xp[move.getXp()[i]]);
        const newWp: Array<number> = this.wp.map((_,i) => this.wp[move.getWp()[i]]);

        return new State444(newCp, newCo, newXp, newWp, skipValidation);
    }

    public eq(state: State444) : boolean {
        return [
            _.isEqual(this.cp, state.getCp()),
            _.isEqual(this.co, state.getCo()),
            _.isEqual(this.xp, state.getXp()),
            _.isEqual(this.wp, state.getWp()),
        ].every(b => b);
    }

    public static getInitialState(): State444 {
        return new State444(
            [ 0, 1, 2, 3, 4, 5, 6, 7, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, ],
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

    public static getRMoveState(): State444 {
        return new State444(
            [ 0, 2, 6, 3, 4, 1, 5, 7],
            [ 0, 1, 2, 0, 0, 2, 1, 0],
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
            true
        );
    };

    public static getUMoveState(): State444 {
        return new State444(
            [ 3, 0, 1, 2, 4, 5, 6, 7, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, ],
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
            true
        );
    };

    public static getLMoveState(): State444 {
        return new State444(
            [ 4, 1, 2, 0, 7, 5, 6, 3],
            [ 2, 0, 0, 1, 1, 0, 0, 2],
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
            true
        );
    };

    public static getDMoveState(): State444 {
        return new State444(
            [ 0, 1, 2, 3,
              5, 6, 7, 4, ],
            [ 0, 0, 0, 0,
              0, 0, 0, 0, ],
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
            true
        );
    }

    public static getFMoveState(): State444 {
        return new State444(
            [ 0, 1, 3, 7, 4, 5, 2, 6, ],
            [ 0, 0, 1, 2, 0, 0, 2, 1, ],
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
            true
        );
    }

    public static getBMoveState(): State444 {
        return new State444(
            [ 1, 5, 2, 3, 0, 4, 6, 7, ],
            [ 1, 2, 0, 0, 2, 1, 0, 0, ],
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
            true
        );
    }

    // XYZ回転
    public static getXMoveState(): State444 {
        return new State444(
            [ 3, 2, 6, 7, 0, 1, 5, 4, ],
            [ 2, 1, 2, 1, 1, 2, 1, 2],
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
            true
        );
    };

    public static getYMoveState(): State444 {
        return new State444(
            [
                3, 0, 1, 2,
                7, 4, 5, 6
            ],
            [
                0, 0, 0, 0,
                0, 0, 0, 0
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

    public static getZMoveState(): State444 {
        return new State444(
            [
                4, 0, 3, 7,
                5, 1, 2, 6
            ],
            [
                1, 2, 1, 2,
                2, 1, 2, 1
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

    public static getSliceUMoveState(): State444 {
        return new State444(
            [ 0, 1, 2, 3, 4, 5, 6, 7, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, ],
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
            true
        );
    };

    public static getSliceRMoveState(): State444 {
        return new State444(
            [ 0, 1, 2, 3, 4, 5, 6, 7, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, ],
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
            true
        );
    };

    public static getSliceLMoveState(): State444 {
        return new State444(
            [ 0, 1, 2, 3, 4, 5, 6, 7, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, ],
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
            true
        );
    };

    public static getSliceDMoveState(): State444 {
        return new State444(
            [ 0, 1, 2, 3, 4, 5, 6, 7, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, ],
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
            true
        );
    };

    public static getSliceFMoveState(): State444 {
        return new State444(
            [ 0, 1, 2, 3, 4, 5, 6, 7, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, ],
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
            true
        );
    };

    public static getSliceBMoveState(): State444 {
        return new State444(
            [ 0, 1, 2, 3, 4, 5, 6, 7, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, ],
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
            true
        );
    };
}

