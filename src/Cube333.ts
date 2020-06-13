const _ = require('lodash');
import {CubeInterface} from './CubeInterface';
import {Notation} from './Notation';
import {State333} from './State333';


interface StringToNumber {
    [key: string]: number;
}

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

        // TODO: 他のNotationにも対応する
        // TODO: Caseで網羅的に書く
        if (sequence === Notation.R) {
            this.state = this.state.applyMove(this.#r_state);
        } else if (sequence === Notation.R2) {
            this.state = this.state.applyMove(this.#r_state).applyMove(this.#r_state);
        } else if (sequence === Notation.R_) {
            this.state = this.state.applyMove(this.#r_state).applyMove(this.#r_state).applyMove(this.#r_state);
        } else if (sequence === Notation.U) {
            this.state = this.state.applyMove(this.#u_state);
        } else if (sequence === Notation.U2) {
            this.state = this.state.applyMove(this.#u_state).applyMove(this.#u_state);
        } else if (sequence === Notation.U_) {
            this.state = this.state.applyMove(this.#u_state).applyMove(this.#u_state).applyMove(this.#u_state);
        } else if (sequence === Notation.D) {
            this.state = this.state.applyMove(this.#d_state);
        } else if (sequence === Notation.D2) {
            this.state = this.state.applyMove(this.#d_state).applyMove(this.#d_state);
        } else if (sequence === Notation.D_) {
            this.state = this.state.applyMove(this.#d_state).applyMove(this.#d_state).applyMove(this.#d_state);
        }

    }

    public eq(c: Cube333): boolean {
        return this.state.eq(c.state);
    }
}


