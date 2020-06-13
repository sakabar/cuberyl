const _ = require('lodash');
import {CubeInterface} from './CubeInterface';
import {Notation} from './Notation';
import {Move} from './Move';
import {State333} from './State333';

export class Cube333 implements CubeInterface {
    #u_state = new State333(
        [ 3, 0, 1, 2, 4, 5, 6, 7, ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, ],
        [ 0, 1, 2, 3, 7, 4, 5, 6, 8, 9, 10, 11, ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
        [ 0, 1, 2, 3, 4, 5, ]
    );

    #r_state = new State333(
        [ 0, 2, 6, 3, 4, 1, 5, 7],
        [ 0, 1, 2, 0, 0, 2, 1, 0],
        [ 0, 5, 9, 3, 4, 2, 6, 7, 8, 1, 10, 11],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 1, 2, 3, 4, 5, ]
    );

    #l_state = new State333(
        [ 4, 1, 2, 0, 7, 5, 6, 3],
        [ 2, 0, 0, 1, 1, 0, 0, 2],
        [ 11, 1, 2, 7, 4, 5, 6, 0, 8, 9, 10, 3],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [ 0, 1, 2, 3, 4, 5, ]
    );

    #d_state = new State333(
        [ 0, 1, 2, 3, 5, 6, 7, 4, ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, ],
        [ 0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 8, ],
        [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
        [ 0, 1, 2, 3, 4, 5, ]
    );

    private state : State333;

    constructor(sequence?: string) {
        this.state = State333.getInitialState();
        if (sequence) {
            this.move(sequence);
        }
    }

    public getState(): State333 {
        return _.cloneDeep(this.state);
    }

    public getOrder(): number {
        return 3;
    }

    public move(sequence: string): void {
        const lst = sequence.trim().split(' ');
        if (lst.length > 1) {
            for (let i = 0; i < lst.length; i++) {
                const notation = lst[i];
                this.move(notation);
            }
            return
        }

        // ここから下は1回転の場合
        const oneMove = new Move(sequence);

        // TODO: 他のNotationにも対応する
        // TODO: Caseで網羅的に書く
        const notation = oneMove.getNotation();
        switch (notation) {
            case Notation.R:
                this.state = this.state.applyMove(this.#r_state);
                break;

            case Notation.R2:
                this.state = this.state.applyMove(this.#r_state).applyMove(this.#r_state);
                break;

            case Notation.R_:
            this.state = this.state.applyMove(this.#r_state).applyMove(this.#r_state).applyMove(this.#r_state);
                break;

            case Notation.U:
                this.state = this.state.applyMove(this.#u_state);
                break;

            case Notation.U2:
                this.state = this.state.applyMove(this.#u_state).applyMove(this.#u_state);
                break;

            case Notation.U_:
                this.state = this.state.applyMove(this.#u_state).applyMove(this.#u_state).applyMove(this.#u_state);
                break;

            case Notation.L:
                this.state = this.state.applyMove(this.#l_state);
                break;

            case Notation.L2:
                this.state = this.state.applyMove(this.#l_state).applyMove(this.#l_state);
                break;

            case Notation.L_:
                this.state = this.state.applyMove(this.#l_state).applyMove(this.#l_state).applyMove(this.#l_state);
                break;

            case Notation.D:
                this.state = this.state.applyMove(this.#d_state);
                break;

            case Notation.D2:
                this.state = this.state.applyMove(this.#d_state).applyMove(this.#d_state);
                break;

            case Notation.D_:
                this.state = this.state.applyMove(this.#d_state).applyMove(this.#d_state).applyMove(this.#d_state);
                break;

            default:
                // const _exhaustiveCheck: never = notation;
                throw new Error(`Not implemented for notation ${notation}`);
        }

    }

    public eq(c: Cube333): boolean {
        return this.state.eq(c.state);
    }
}


