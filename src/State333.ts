const _ = require('lodash');
import {CenterPieceLabel} from './CenterPieceLabel';

export class State333 {
    private cp: Array<number>;
    private co: Array<number>;
    private ep: Array<number>;
    private eo: Array<number>;
    private center: Array<number>;

    constructor(cp: Array<number> | undefined,
                co: Array<number> | undefined,
                ep: Array<number> | undefined,
                eo: Array<number> | undefined,
                center: Array<number> | undefined,
                skipValidation=false
               ) {

        this.cp = cp || State333.getInitialState().getCp();
        this.co = co || State333.getInitialState().getCo();
        this.ep = ep || State333.getInitialState().getEp();
        this.eo = eo || State333.getInitialState().getEo();
        this.center = center || State333.getInitialState().getCenter();

        // ParityのチェックでState()の生成を行うので、skipしないと無限ループが発生する
        // また、あえて完成できないキューブをシミュレートするという余地を残す
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

        if (!this.isSameParity()) {
            throw new Error(`This state makes 2-cycle, CP: ${cp}, EP: ${ep}, center: ${center}`);
        }

    }

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

    // CPやEPを渡して、奇置換なら1、偶置換なら0を返す
    // 渡す配列は0~(len-1)がシャッフルされたものであるという前提
    private calcParity(cp: Array<number>) : number {
        const arr = [...cp,];
        let permCnt = 0;

        let ind = 0;
        while(ind < arr.length){
            if (arr[ind] === ind) {
                ind += 1;
                continue;
            }

            // 今indにある値を本来入るべき場所に入れて、入れ換える
            const current = arr[ind];
            arr[ind] = arr[current];
            arr[current] = current;
            permCnt += 1;
        }

        return permCnt % 2;
    }

    private isSameParity(): boolean {
        // まず持ち替えてセンターの向きを正す

        // まず白面を上面に持ってくる
        const tmpUInd = this.center.indexOf(CenterPieceLabel.U);

        let centerUInd : CenterPieceLabel | undefined;
        for (let val of Object.values(CenterPieceLabel)) {
            if (val === tmpUInd) {
                centerUInd = val;
            }
        }

        if (typeof centerUInd === 'undefined') {
            throw new Error(`Unexpected ind: ${tmpUInd}`);
        }

        let rotatedState = _.cloneDeep(this);

        switch (centerUInd) {
            case  CenterPieceLabel.U:
                // Do nothing
                break;

            case CenterPieceLabel.R:
                // z'
                rotatedState = rotatedState
                        .applyMove(State333.getZMoveState(), true)
                        .applyMove(State333.getZMoveState(), true)
                        .applyMove(State333.getZMoveState(), true);
                break;

            case CenterPieceLabel.F:
                // x
                rotatedState = rotatedState.applyMove(State333.getXMoveState(), true);
                break;

            case CenterPieceLabel.D:
                // x2
                rotatedState = rotatedState
                        .applyMove(State333.getXMoveState(), true)
                        .applyMove(State333.getXMoveState(), true);
                break;

            case CenterPieceLabel.L:
                // z
                rotatedState = rotatedState.applyMove(State333.getZMoveState(), true);
                break;

            case CenterPieceLabel.B:
                // x'
                rotatedState = rotatedState
                        .applyMove(State333.getXMoveState(), true)
                        .applyMove(State333.getXMoveState(), true)
                        .applyMove(State333.getXMoveState(), true);
                break;

            default:
                // @ts-ignore TS6133: '_exhaustiveCheck' is declared but its value is never read.
                const _exhaustiveCheck: never = centerUInd;
        }

        // 次に緑面を手前に持ってくる
        const tmpFInd = rotatedState.getCenter().indexOf(CenterPieceLabel.F);

        let centerFInd : CenterPieceLabel | undefined;
        for (let val of Object.values(CenterPieceLabel)) {
            if (val === tmpFInd) {
                centerFInd = val;
            }
        }

        if (typeof centerFInd === 'undefined') {
            throw new Error(`Unexpected ind: ${tmpFInd}`);
        }

        switch (centerFInd) {
            case  CenterPieceLabel.U:
                // 既にU, Dの位置は合っているはずなのでおかしい
                throw new Error(`Unexpected ind: ${centerFInd}`);
                break;

            case CenterPieceLabel.R:
                // y'
                rotatedState = rotatedState
                        .applyMove(State333.getYMoveState(), true)
                        .applyMove(State333.getYMoveState(), true)
                        .applyMove(State333.getYMoveState(), true);
                break;

            case CenterPieceLabel.F:
                // Do nothing
                break;

            case CenterPieceLabel.D:
                // 既にU, Dの位置は合っているはずなのでおかしい
                throw new Error(`Unexpected ind: ${centerFInd}`);
                break;

            case CenterPieceLabel.L:
                // y
                rotatedState = rotatedState.applyMove(State333.getYMoveState(), true);
                break;

            case CenterPieceLabel.B:
                // y2
                rotatedState = rotatedState
                        .applyMove(State333.getYMoveState(), true)
                        .applyMove(State333.getYMoveState(), true);
                break;

            default:
                // @ts-ignore TS6133: '_exhaustiveCheck' is declared but its value is never read.
                const _exhaustiveCheck: never = centerFInd;
        }

        const cp = rotatedState.getCp();
        const ep = rotatedState.getEp();

        return this.calcParity(cp) === this.calcParity(ep);
    }

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

    public applyMove(move: State333, skipValidation=false): State333 {
        const newCp: Array<number> = this.cp.map((_,i) => this.cp[move.getCp()[i]]);
        const newCo: Array<number> = this.co.map((_,i) => (this.co[move.getCp()[i]] + move.getCo()[i]) % 3);
        const newEp: Array<number> = this.ep.map((_,i) => this.ep[move.getEp()[i]]);
        const newEo: Array<number> = this.eo.map((_,i) => (this.eo[move.getEp()[i]] + move.getEo()[i]) % 2);
        const newCenter: Array<number> = this.center.map((_,i) => this.center[move.getCenter()[i]]);

        return new State333(newCp, newCo, newEp, newEo, newCenter, skipValidation);
    }

    public eq(state: State333) : boolean {
        return [
            _.isEqual(this.cp, state.getCp()),
            _.isEqual(this.co, state.getCo()),
            _.isEqual(this.ep, state.getEp()),
            _.isEqual(this.eo, state.getEo()),
            _.isEqual(this.center, state.getCenter()),
        ].every(b => b);
    }

    public static getInitialState(): State333 {
        return new State333(
            [ 0, 1, 2, 3, 4, 5, 6, 7, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, ],
            [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
            [ 0, 1, 2, 3, 4, 5, ],
            true
        );
    };

    public static getRMoveState(): State333 {
        return new State333(
            [ 0, 2, 6, 3, 4, 1, 5, 7],
            [ 0, 1, 2, 0, 0, 2, 1, 0],
            [ 0, 5, 9, 3, 4, 2, 6, 7, 8, 1, 10, 11],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 1, 2, 3, 4, 5, ],
            true
        );
    };

    public static getUMoveState(): State333 {
        return new State333(
            [ 3, 0, 1, 2, 4, 5, 6, 7, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, ],
            [ 0, 1, 2, 3, 7, 4, 5, 6, 8, 9, 10, 11, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
            [ 0, 1, 2, 3, 4, 5, ],
            true
        );
    };

    public static getLMoveState(): State333 {
        return new State333(
            [ 4, 1, 2, 0, 7, 5, 6, 3],
            [ 2, 0, 0, 1, 1, 0, 0, 2],
            [ 11, 1, 2, 7, 4, 5, 6, 0, 8, 9, 10, 3],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 1, 2, 3, 4, 5, ],
            true
        );
    };

    public static getDMoveState(): State333 {
        return new State333(
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
            true
        );
    };

    public static getFMoveState(): State333 {
        return new State333(
            [ 0, 1, 3, 7, 4, 5, 2, 6, ],
            [ 0, 0, 1, 2, 0, 0, 2, 1, ],
            [ 0, 1, 6, 10, 4, 5, 3, 7, 8, 9, 2, 11, ],
            [ 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, ],
            [ 0, 1, 2, 3, 4, 5, ],
            true
        );
    };

    public static getBMoveState(): State333 {
        return new State333(
            [ 1, 5, 2, 3, 0, 4, 6, 7, ],
            [ 1, 2, 0, 0, 2, 1, 0, 0, ],
            [ 4, 8, 2, 3, 1, 5, 6, 7, 0, 9, 10, 11, ],
            [ 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, ],
            [ 0, 1, 2, 3, 4, 5, ],
            true
        );
    };

    public static getEMoveState(): State333 {
        return new State333(
            [ 0, 1, 2, 3, 4, 5, 6, 7, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, ],
            [
                1, 2, 3, 0,
                4, 5, 6, 7,
                8, 9, 10, 11,
            ],
            [ 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, ],
            [ 0, 2, 4, 3, 5, 1, ],
            true
        );
    };

    public static getMMoveState(): State333 {
        return new State333(
            [ 0, 1, 2, 3, 4, 5, 6, 7, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, ],
            [ 0, 1, 2, 3, 8, 5, 4, 7, 10, 9, 6, 11, ],
            [ 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, ],
            [ 5, 1, 0, 2, 4, 3, ],
            true
        );
    };

    public static getSMoveState(): State333 {
        return new State333(
            [ 0, 1, 2, 3, 4, 5, 6, 7, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, ],
            [ 0, 1, 2, 3, 4, 7, 6, 11, 8, 5, 10, 9, ],
            [ 0, 0, 0, 0, 0, 1, 0, 1,  0, 1, 0, 1, ],
            [ 4, 0, 2, 1, 3, 5, ],
            true
        );
    };

    public static getXMoveState(): State333 {
        return new State333(
            [ 3, 2, 6, 7, 0, 1, 5, 4, ],
            [ 2, 1, 2, 1, 1, 2, 1, 2],
            [ 7,  5, 9, 11, 6, 2, 10, 3,  4, 1, 8, 0],
            [ 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
            [ 2, 1, 3, 5, 4, 0 ],
            true
        )
    };

    public static getYMoveState(): State333 {
        // y = U E' D'
        return new State333(
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
            true
        );
    };

    public static getZMoveState(): State333 {
        // z = F S B'
        return new State333(
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
            true
        )
    };
}
