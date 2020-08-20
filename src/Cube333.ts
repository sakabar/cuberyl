const _ = require('lodash');
import {Notation333} from './Notation333';
import {Move333} from './Move333';
import {State333} from './State333';

export class Cube333 {
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
        const oneMove = new Move333(sequence);

        const notation = oneMove.getNotation();
        switch (notation) {
            case Notation333.R:
                this.state = this.state.applyMove(State333.getRMoveState());
                break;

            case Notation333.R2:
                this.state = this.state
                        .applyMove(State333.getRMoveState())
                        .applyMove(State333.getRMoveState());
                break;

            case Notation333.R_:
                this.state = this.state
                        .applyMove(State333.getRMoveState())
                        .applyMove(State333.getRMoveState())
                        .applyMove(State333.getRMoveState());
                break;

            case Notation333.U:
                this.state = this.state.applyMove(State333.getUMoveState());
                break;

            case Notation333.U2:
                this.state = this.state
                        .applyMove(State333.getUMoveState())
                        .applyMove(State333.getUMoveState());
                break;

            case Notation333.U_:
                this.state = this.state
                        .applyMove(State333.getUMoveState())
                        .applyMove(State333.getUMoveState())
                        .applyMove(State333.getUMoveState());
                break;

            case Notation333.L:
                this.state = this.state.applyMove(State333.getLMoveState());
                break;

            case Notation333.L2:
                this.state = this.state
                        .applyMove(State333.getLMoveState())
                        .applyMove(State333.getLMoveState());
                break;

            case Notation333.L_:
                this.state = this.state
                        .applyMove(State333.getLMoveState())
                        .applyMove(State333.getLMoveState())
                        .applyMove(State333.getLMoveState());
                break;

            case Notation333.D:
                this.state = this.state.applyMove(State333.getDMoveState());
                break;

            case Notation333.D2:
                this.state = this.state
                        .applyMove(State333.getDMoveState())
                        .applyMove(State333.getDMoveState());
                break;

            case Notation333.D_:
                this.state = this.state
                        .applyMove(State333.getDMoveState())
                        .applyMove(State333.getDMoveState())
                        .applyMove(State333.getDMoveState());
                break;

            case Notation333.F:
                this.state = this.state.applyMove(State333.getFMoveState());
                break;

            case Notation333.F2:
                this.state = this.state
                        .applyMove(State333.getFMoveState())
                        .applyMove(State333.getFMoveState());
                break;

            case Notation333.F_:
                this.state = this.state
                        .applyMove(State333.getFMoveState())
                        .applyMove(State333.getFMoveState())
                        .applyMove(State333.getFMoveState());
                break;

            case Notation333.B:
                this.state = this.state.applyMove(State333.getBMoveState());
                break;

            case Notation333.B2:
                this.state = this.state
                        .applyMove(State333.getBMoveState())
                        .applyMove(State333.getBMoveState());
                break;

            case Notation333.B_:
                this.state = this.state
                        .applyMove(State333.getBMoveState())
                        .applyMove(State333.getBMoveState())
                        .applyMove(State333.getBMoveState());
                break;

            case Notation333.E:
                this.state = this.state.applyMove(State333.getEMoveState());
                break;

            case Notation333.E2:
                this.state = this.state
                        .applyMove(State333.getEMoveState())
                        .applyMove(State333.getEMoveState());
                break;

            case Notation333.E_:
                this.state = this.state
                        .applyMove(State333.getEMoveState())
                        .applyMove(State333.getEMoveState())
                        .applyMove(State333.getEMoveState());
                break;

            case Notation333.M:
                this.state = this.state
                        .applyMove(State333.getMMoveState());
                break;

            case Notation333.M2:
                this.state = this.state
                        .applyMove(State333.getMMoveState())
                        .applyMove(State333.getMMoveState());
                break;

            case Notation333.M_:
                this.state = this.state
                        .applyMove(State333.getMMoveState())
                        .applyMove(State333.getMMoveState())
                        .applyMove(State333.getMMoveState());
                break;

            case Notation333.S:
                this.state = this.state.applyMove(State333.getSMoveState());
                break;

            case Notation333.S2:
                this.state = this.state
                        .applyMove(State333.getSMoveState())
                        .applyMove(State333.getSMoveState());
                break;

            case Notation333.S_:
                this.state = this.state
                        .applyMove(State333.getSMoveState())
                        .applyMove(State333.getSMoveState())
                        .applyMove(State333.getSMoveState());
                break;

            case Notation333.x:
                this.state = this.state.applyMove(State333.getXMoveState());
                break;

            case Notation333.x2:
                this.state = this.state
                        .applyMove(State333.getXMoveState())
                        .applyMove(State333.getXMoveState());
                break;

            case Notation333.x_:
                this.state = this.state
                        .applyMove(State333.getXMoveState())
                        .applyMove(State333.getXMoveState())
                        .applyMove(State333.getXMoveState());
                break;

            case Notation333.y:
                this.state = this.state.applyMove(State333.getYMoveState());
                break;

            case Notation333.y2:
                this.state = this.state
                        .applyMove(State333.getYMoveState())
                        .applyMove(State333.getYMoveState());
                break;

            case Notation333.y_:
                this.state = this.state
                        .applyMove(State333.getYMoveState())
                        .applyMove(State333.getYMoveState())
                        .applyMove(State333.getYMoveState());
                break;

            case Notation333.z:
                this.state = this.state.applyMove(State333.getZMoveState());
                break;

            case Notation333.z2:
                this.state = this.state
                        .applyMove(State333.getZMoveState())
                        .applyMove(State333.getZMoveState());
                break;

            case Notation333.z_:
                this.state = this.state
                        .applyMove(State333.getZMoveState())
                        .applyMove(State333.getZMoveState())
                        .applyMove(State333.getZMoveState());
                break;

            case Notation333.r:
            case Notation333.Rw:
                this.state = this.state
                        .applyMove(State333.getMMoveState())
                        .applyMove(State333.getMMoveState())
                        .applyMove(State333.getMMoveState())
                        .applyMove(State333.getRMoveState());
                break;

            case Notation333.r2:
            case Notation333.Rw2:
                this.state = this.state
                        .applyMove(State333.getMMoveState())
                        .applyMove(State333.getMMoveState())
                        .applyMove(State333.getRMoveState())
                        .applyMove(State333.getRMoveState());
                break;

            case Notation333.r_:
            case Notation333.Rw_:
                this.state = this.state
                        .applyMove(State333.getMMoveState())
                        .applyMove(State333.getRMoveState())
                        .applyMove(State333.getRMoveState())
                        .applyMove(State333.getRMoveState());
                break;

            case Notation333.u:
            case Notation333.Uw:
                this.state = this.state
                        .applyMove(State333.getUMoveState())
                        .applyMove(State333.getEMoveState())
                        .applyMove(State333.getEMoveState())
                        .applyMove(State333.getEMoveState());
                break;

            case Notation333.u2:
            case Notation333.Uw2:
                this.state = this.state
                        .applyMove(State333.getUMoveState())
                        .applyMove(State333.getUMoveState())
                        .applyMove(State333.getEMoveState())
                        .applyMove(State333.getEMoveState());
                break;

            case Notation333.u_:
            case Notation333.Uw_:
                this.state = this.state
                        .applyMove(State333.getUMoveState())
                        .applyMove(State333.getUMoveState())
                        .applyMove(State333.getUMoveState())
                        .applyMove(State333.getEMoveState());
                break;

            case Notation333.d:
            case Notation333.Dw:
                this.state = this.state
                        .applyMove(State333.getDMoveState())
                        .applyMove(State333.getEMoveState());
                break;

            case Notation333.d2:
            case Notation333.Dw2:
                this.state = this.state
                        .applyMove(State333.getDMoveState())
                        .applyMove(State333.getDMoveState())
                        .applyMove(State333.getEMoveState())
                        .applyMove(State333.getEMoveState());
                break;

            case Notation333.d_:
            case Notation333.Dw_:
                this.state = this.state
                        .applyMove(State333.getDMoveState())
                        .applyMove(State333.getDMoveState())
                        .applyMove(State333.getDMoveState())
                        .applyMove(State333.getEMoveState())
                        .applyMove(State333.getEMoveState())
                        .applyMove(State333.getEMoveState());
                break;

            case Notation333.l:
            case Notation333.Lw:
                this.state = this.state
                        .applyMove(State333.getLMoveState())
                        .applyMove(State333.getMMoveState());
                break;

            case Notation333.l2:
            case Notation333.Lw2:
                this.state = this.state
                        .applyMove(State333.getLMoveState())
                        .applyMove(State333.getLMoveState())
                        .applyMove(State333.getMMoveState())
                        .applyMove(State333.getMMoveState());
                break;

            case Notation333.l_:
            case Notation333.Lw_:
                this.state = this.state
                        .applyMove(State333.getLMoveState())
                        .applyMove(State333.getLMoveState())
                        .applyMove(State333.getLMoveState())
                        .applyMove(State333.getMMoveState())
                        .applyMove(State333.getMMoveState())
                        .applyMove(State333.getMMoveState());
                break;

            case Notation333.f:
            case Notation333.Fw:
                this.state = this.state
                        .applyMove(State333.getFMoveState())
                        .applyMove(State333.getSMoveState());
                break;

            case Notation333.f2:
            case Notation333.Fw2:
                this.state = this.state
                        .applyMove(State333.getFMoveState())
                        .applyMove(State333.getFMoveState())
                        .applyMove(State333.getSMoveState())
                        .applyMove(State333.getSMoveState());
                break;

            case Notation333.f_:
            case Notation333.Fw_:
                this.state = this.state
                        .applyMove(State333.getFMoveState())
                        .applyMove(State333.getFMoveState())
                        .applyMove(State333.getFMoveState())
                        .applyMove(State333.getSMoveState())
                        .applyMove(State333.getSMoveState())
                        .applyMove(State333.getSMoveState());
                break;

            case Notation333.b:
            case Notation333.Bw:
                this.state = this.state
                        .applyMove(State333.getBMoveState())
                        .applyMove(State333.getSMoveState())
                        .applyMove(State333.getSMoveState())
                        .applyMove(State333.getSMoveState());
                break;

            case Notation333.b2:
            case Notation333.Bw2:
                this.state = this.state
                        .applyMove(State333.getBMoveState())
                        .applyMove(State333.getBMoveState())
                        .applyMove(State333.getSMoveState())
                        .applyMove(State333.getSMoveState());
                break;

            case Notation333.b_:
            case Notation333.Bw_:
                this.state = this.state
                        .applyMove(State333.getBMoveState())
                        .applyMove(State333.getBMoveState())
                        .applyMove(State333.getBMoveState())
                        .applyMove(State333.getSMoveState());
                break;

            default:
                // @ts-ignore TS6133: '_exhaustiveCheck' is declared but its value is never read.
                const _exhaustiveCheck: never = notation;
        }


    }

    public eq(c: Cube333): boolean {
        return this.state.eq(c.state);
    }

    public isSolved(): boolean {
        return this.state.eq(State333.getInitialState());
    }
}


