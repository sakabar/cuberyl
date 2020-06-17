const _ = require('lodash');
import {CubeInterface} from './CubeInterface';
import {Notation} from './Notation';
import {Move} from './Move';
import {State333} from './State333';

export class Cube333 implements CubeInterface {
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
                this.state = this.state.applyMove(State333.getRMoveState());
                break;

            case Notation.R2:
                this.state = this.state
                        .applyMove(State333.getRMoveState())
                        .applyMove(State333.getRMoveState());
                break;

            case Notation.R_:
                this.state = this.state
                        .applyMove(State333.getRMoveState())
                        .applyMove(State333.getRMoveState())
                        .applyMove(State333.getRMoveState());
                break;

            case Notation.U:
                this.state = this.state.applyMove(State333.getUMoveState());
                break;

            case Notation.U2:
                this.state = this.state
                        .applyMove(State333.getUMoveState())
                        .applyMove(State333.getUMoveState());
                break;

            case Notation.U_:
                this.state = this.state
                        .applyMove(State333.getUMoveState())
                        .applyMove(State333.getUMoveState())
                        .applyMove(State333.getUMoveState());
                break;

            case Notation.L:
                this.state = this.state.applyMove(State333.getLMoveState());
                break;

            case Notation.L2:
                this.state = this.state
                        .applyMove(State333.getLMoveState())
                        .applyMove(State333.getLMoveState());
                break;

            case Notation.L_:
                this.state = this.state
                        .applyMove(State333.getLMoveState())
                        .applyMove(State333.getLMoveState())
                        .applyMove(State333.getLMoveState());
                break;

            case Notation.D:
                this.state = this.state.applyMove(State333.getDMoveState());
                break;

            case Notation.D2:
                this.state = this.state
                        .applyMove(State333.getDMoveState())
                        .applyMove(State333.getDMoveState());
                break;

            case Notation.D_:
                this.state = this.state
                        .applyMove(State333.getDMoveState())
                        .applyMove(State333.getDMoveState())
                        .applyMove(State333.getDMoveState());
                break;

            case Notation.F:
                this.state = this.state.applyMove(State333.getFMoveState());
                break;

            case Notation.F2:
                this.state = this.state
                        .applyMove(State333.getFMoveState())
                        .applyMove(State333.getFMoveState());
                break;

            case Notation.F_:
                this.state = this.state
                        .applyMove(State333.getFMoveState())
                        .applyMove(State333.getFMoveState())
                        .applyMove(State333.getFMoveState());
                break;

            case Notation.B:
                this.state = this.state.applyMove(State333.getBMoveState());
                break;

            case Notation.B2:
                this.state = this.state
                        .applyMove(State333.getBMoveState())
                        .applyMove(State333.getBMoveState());
                break;

            case Notation.B_:
                this.state = this.state
                        .applyMove(State333.getBMoveState())
                        .applyMove(State333.getBMoveState())
                        .applyMove(State333.getBMoveState());
                break;

            case Notation.E:
                this.state = this.state.applyMove(State333.getEMoveState());
                break;

            case Notation.E2:
                this.state = this.state
                        .applyMove(State333.getEMoveState())
                        .applyMove(State333.getEMoveState());
                break;

            case Notation.E_:
                this.state = this.state
                        .applyMove(State333.getEMoveState())
                        .applyMove(State333.getEMoveState())
                        .applyMove(State333.getEMoveState());
                break;

            case Notation.M:
                this.state = this.state
                        .applyMove(State333.getMMoveState());
                break;

            case Notation.M2:
                this.state = this.state
                        .applyMove(State333.getMMoveState())
                        .applyMove(State333.getMMoveState());
                break;

            case Notation.M_:
                this.state = this.state
                        .applyMove(State333.getMMoveState())
                        .applyMove(State333.getMMoveState())
                        .applyMove(State333.getMMoveState());
                break;

            case Notation.S:
                this.state = this.state.applyMove(State333.getSMoveState());
                break;

            case Notation.S2:
                this.state = this.state
                        .applyMove(State333.getSMoveState())
                        .applyMove(State333.getSMoveState());
                break;

            case Notation.S_:
                this.state = this.state
                        .applyMove(State333.getSMoveState())
                        .applyMove(State333.getSMoveState())
                        .applyMove(State333.getSMoveState());
                break;

            default:
                // @ts-ignore TS6133: '_exhaustiveCheck' is declared but its value is never read.
                // const _exhaustiveCheck: never = notation;
                throw new Error(`Not implemented for notation ${notation}`);
        }

    }

    public eq(c: Cube333): boolean {
        return this.state.eq(c.state);
    }
}


