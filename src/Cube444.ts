const _ = require('lodash');
import {Notation444} from './Notation444';
import {Move444} from './Move444';
import {State444} from './State444';

export class Cube444 {
    private state : State444;

    constructor(sequence?: string) {
        this.state = State444.getInitialState();
        if (sequence) {
            this.move(sequence);
        }
    }

    public getOrder(): number {
        return 4;
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
        const oneMove = new Move444(sequence);

        const notation = oneMove.getNotation();
        switch (notation) {
            case Notation444.R:
                this.state = this.state
                        .applyMove(State444.getRMoveState());
                break;

            case Notation444.R2:
                this.state = this.state
                        .applyMove(State444.getRMoveState())
                        .applyMove(State444.getRMoveState());
                break;

            case Notation444.R_:
                this.state = this.state
                        .applyMove(State444.getRMoveState())
                        .applyMove(State444.getRMoveState())
                        .applyMove(State444.getRMoveState());
                break;

            case Notation444.U:
                this.state = this.state.applyMove(State444.getUMoveState());
                break;

            case Notation444.U2:
                this.state = this.state
                        .applyMove(State444.getUMoveState())
                        .applyMove(State444.getUMoveState());
                break;

            case Notation444.U_:
                this.state = this.state
                        .applyMove(State444.getUMoveState())
                        .applyMove(State444.getUMoveState())
                        .applyMove(State444.getUMoveState());
                break;

            case Notation444.L:
                this.state = this.state.applyMove(State444.getLMoveState());
                break;

            case Notation444.L2:
                this.state = this.state
                        .applyMove(State444.getLMoveState())
                        .applyMove(State444.getLMoveState());
                break;

            case Notation444.L_:
                this.state = this.state
                        .applyMove(State444.getLMoveState())
                        .applyMove(State444.getLMoveState())
                        .applyMove(State444.getLMoveState());
                break;

            case Notation444.D:
                this.state = this.state.applyMove(State444.getDMoveState());
                break;

            case Notation444.D2:
                this.state = this.state
                        .applyMove(State444.getDMoveState())
                        .applyMove(State444.getDMoveState());
                break;

            case Notation444.D_:
                this.state = this.state
                        .applyMove(State444.getDMoveState())
                        .applyMove(State444.getDMoveState())
                        .applyMove(State444.getDMoveState());
                break;

            case Notation444.F:
                this.state = this.state.applyMove(State444.getFMoveState());
                break;

            case Notation444.F2:
                this.state = this.state
                        .applyMove(State444.getFMoveState())
                        .applyMove(State444.getFMoveState());
                break;

            case Notation444.F_:
                this.state = this.state
                        .applyMove(State444.getFMoveState())
                        .applyMove(State444.getFMoveState())
                        .applyMove(State444.getFMoveState());
                break;

            case Notation444.B:
                this.state = this.state.applyMove(State444.getBMoveState());
                break;

            case Notation444.B2:
                this.state = this.state
                        .applyMove(State444.getBMoveState())
                        .applyMove(State444.getBMoveState());
                break;

            case Notation444.B_:
                this.state = this.state
                        .applyMove(State444.getBMoveState())
                        .applyMove(State444.getBMoveState())
                        .applyMove(State444.getBMoveState());
                break;

            case Notation444.x:
                this.state = this.state.applyMove(State444.getXMoveState());
                break;

            case Notation444.x2:
                this.state = this.state
                        .applyMove(State444.getXMoveState())
                        .applyMove(State444.getXMoveState());
                break;

            case Notation444.x_:
                this.state = this.state
                        .applyMove(State444.getXMoveState())
                        .applyMove(State444.getXMoveState())
                        .applyMove(State444.getXMoveState());
                break;

            case Notation444.y:
                this.state = this.state.applyMove(State444.getYMoveState());
                break;

            case Notation444.y2:
                this.state = this.state
                        .applyMove(State444.getYMoveState())
                        .applyMove(State444.getYMoveState());
                break;

            case Notation444.y_:
                this.state = this.state
                        .applyMove(State444.getYMoveState())
                        .applyMove(State444.getYMoveState())
                        .applyMove(State444.getYMoveState());
                break;

            case Notation444.z:
                this.state = this.state.applyMove(State444.getZMoveState());
                break;

            case Notation444.z2:
                this.state = this.state
                        .applyMove(State444.getZMoveState())
                        .applyMove(State444.getZMoveState());
                break;

            case Notation444.z_:
                this.state = this.state
                        .applyMove(State444.getZMoveState())
                        .applyMove(State444.getZMoveState())
                        .applyMove(State444.getZMoveState());
                break;

            case Notation444.r:
                this.state = this.state
                        .applyMove(State444.getSliceRMoveState());
                break;

            case Notation444.r2:
                this.state = this.state
                        .applyMove(State444.getSliceRMoveState())
                        .applyMove(State444.getSliceRMoveState());
                break;

            case Notation444.r_:
                this.state = this.state
                        .applyMove(State444.getSliceRMoveState())
                        .applyMove(State444.getSliceRMoveState())
                        .applyMove(State444.getSliceRMoveState());
                break;

            case Notation444.u:
                this.state = this.state
                        .applyMove(State444.getSliceUMoveState());
                break;

            case Notation444.u2:
                this.state = this.state
                        .applyMove(State444.getSliceUMoveState())
                        .applyMove(State444.getSliceUMoveState());
                break;

            case Notation444.u_:
                this.state = this.state
                        .applyMove(State444.getSliceUMoveState())
                        .applyMove(State444.getSliceUMoveState())
                        .applyMove(State444.getSliceUMoveState());
                break;

            case Notation444.l:
                this.state = this.state
                        .applyMove(State444.getSliceLMoveState());
                break;

            case Notation444.l2:
                this.state = this.state
                        .applyMove(State444.getSliceLMoveState())
                        .applyMove(State444.getSliceLMoveState());
                break;

            case Notation444.l_:
                this.state = this.state
                        .applyMove(State444.getSliceLMoveState())
                        .applyMove(State444.getSliceLMoveState())
                        .applyMove(State444.getSliceLMoveState());
                break;

            case Notation444.d:
                this.state = this.state
                        .applyMove(State444.getSliceDMoveState());
                break;

            case Notation444.d2:
                this.state = this.state
                        .applyMove(State444.getSliceDMoveState())
                        .applyMove(State444.getSliceDMoveState());
                break;

            case Notation444.d_:
                this.state = this.state
                        .applyMove(State444.getSliceDMoveState())
                        .applyMove(State444.getSliceDMoveState())
                        .applyMove(State444.getSliceDMoveState());
                break;

            case Notation444.f:
                this.state = this.state
                        .applyMove(State444.getSliceFMoveState());
                break;

            case Notation444.f2:
                this.state = this.state
                        .applyMove(State444.getSliceFMoveState())
                        .applyMove(State444.getSliceFMoveState());
                break;

            case Notation444.f_:
                this.state = this.state
                        .applyMove(State444.getSliceFMoveState())
                        .applyMove(State444.getSliceFMoveState())
                        .applyMove(State444.getSliceFMoveState());
                break;

            case Notation444.b:
                this.state = this.state
                        .applyMove(State444.getSliceBMoveState());
                break;

            case Notation444.b2:
                this.state = this.state
                        .applyMove(State444.getSliceBMoveState())
                        .applyMove(State444.getSliceBMoveState());
                break;

            case Notation444.b_:
                this.state = this.state
                        .applyMove(State444.getSliceBMoveState())
                        .applyMove(State444.getSliceBMoveState())
                        .applyMove(State444.getSliceBMoveState());
                break;

            case Notation444.Rw:
                this.state = this.state
                        .applyMove(State444.getSliceRMoveState())
                        .applyMove(State444.getSliceRMoveState())
                        .applyMove(State444.getSliceRMoveState())
                        .applyMove(State444.getRMoveState());
                break;

            case Notation444.Rw2:
                this.state = this.state
                        .applyMove(State444.getSliceRMoveState())
                        .applyMove(State444.getSliceRMoveState())
                        .applyMove(State444.getRMoveState())
                        .applyMove(State444.getRMoveState());
                break;

            case Notation444.Rw_:
                this.state = this.state
                        .applyMove(State444.getSliceRMoveState())
                        .applyMove(State444.getRMoveState())
                        .applyMove(State444.getRMoveState())
                        .applyMove(State444.getRMoveState());
                break;

            case Notation444.Uw:
                this.state = this.state
                        .applyMove(State444.getUMoveState())
                        .applyMove(State444.getSliceUMoveState())
                        .applyMove(State444.getSliceUMoveState())
                        .applyMove(State444.getSliceUMoveState());
                break;

            case Notation444.Uw2:
                this.state = this.state
                        .applyMove(State444.getUMoveState())
                        .applyMove(State444.getUMoveState())
                        .applyMove(State444.getSliceUMoveState())
                        .applyMove(State444.getSliceUMoveState());
                break;

            case Notation444.Uw_:
                this.state = this.state
                        .applyMove(State444.getUMoveState())
                        .applyMove(State444.getUMoveState())
                        .applyMove(State444.getUMoveState())
                        .applyMove(State444.getSliceUMoveState());
                break;

            case Notation444.Dw:
                this.state = this.state
                        .applyMove(State444.getDMoveState())
                        .applyMove(State444.getSliceDMoveState());
                break;

            case Notation444.Dw2:
                this.state = this.state
                        .applyMove(State444.getDMoveState())
                        .applyMove(State444.getDMoveState())
                        .applyMove(State444.getSliceDMoveState())
                        .applyMove(State444.getSliceDMoveState());
                break;

            case Notation444.Dw_:
                this.state = this.state
                        .applyMove(State444.getDMoveState())
                        .applyMove(State444.getDMoveState())
                        .applyMove(State444.getDMoveState())
                        .applyMove(State444.getSliceDMoveState())
                        .applyMove(State444.getSliceDMoveState())
                        .applyMove(State444.getSliceDMoveState());
                break;

            case Notation444.Lw:
                this.state = this.state
                        .applyMove(State444.getLMoveState())
                        .applyMove(State444.getSliceLMoveState());
                break;

            case Notation444.Lw2:
                this.state = this.state
                        .applyMove(State444.getLMoveState())
                        .applyMove(State444.getLMoveState())
                        .applyMove(State444.getSliceLMoveState())
                        .applyMove(State444.getSliceLMoveState());
                break;

            case Notation444.Lw_:
                this.state = this.state
                        .applyMove(State444.getLMoveState())
                        .applyMove(State444.getLMoveState())
                        .applyMove(State444.getLMoveState())
                        .applyMove(State444.getSliceLMoveState())
                        .applyMove(State444.getSliceLMoveState())
                        .applyMove(State444.getSliceLMoveState());
                break;

            case Notation444.Fw:
                this.state = this.state
                        .applyMove(State444.getFMoveState())
                        .applyMove(State444.getSliceFMoveState());
                break;

            case Notation444.Fw2:
                this.state = this.state
                        .applyMove(State444.getFMoveState())
                        .applyMove(State444.getFMoveState())
                        .applyMove(State444.getSliceFMoveState())
                        .applyMove(State444.getSliceFMoveState());
                break;

            case Notation444.Fw_:
                this.state = this.state
                        .applyMove(State444.getFMoveState())
                        .applyMove(State444.getFMoveState())
                        .applyMove(State444.getFMoveState())
                        .applyMove(State444.getSliceFMoveState())
                        .applyMove(State444.getSliceFMoveState())
                        .applyMove(State444.getSliceFMoveState());
                break;

            case Notation444.Bw:
                this.state = this.state
                        .applyMove(State444.getBMoveState())
                        .applyMove(State444.getSliceBMoveState())
                        .applyMove(State444.getSliceBMoveState())
                        .applyMove(State444.getSliceBMoveState());
                break;

            case Notation444.Bw2:
                this.state = this.state
                        .applyMove(State444.getBMoveState())
                        .applyMove(State444.getBMoveState())
                        .applyMove(State444.getSliceBMoveState())
                        .applyMove(State444.getSliceBMoveState());
                break;

            case Notation444.Bw_:
                this.state = this.state
                        .applyMove(State444.getBMoveState())
                        .applyMove(State444.getBMoveState())
                        .applyMove(State444.getBMoveState())
                        .applyMove(State444.getSliceBMoveState());
                break;

            case Notation444['3Rw']:
                this.state = this.state
                        .applyMove(State444.getXMoveState())
                        .applyMove(State444.getLMoveState());
                break;

            case Notation444['3Rw2']:
                this.state = this.state
                        .applyMove(State444.getXMoveState())
                        .applyMove(State444.getXMoveState())
                        .applyMove(State444.getLMoveState())
                        .applyMove(State444.getLMoveState());
                break;

            case Notation444['3Rw_']:
                this.state = this.state
                        .applyMove(State444.getXMoveState())
                        .applyMove(State444.getXMoveState())
                        .applyMove(State444.getXMoveState())
                        .applyMove(State444.getLMoveState())
                        .applyMove(State444.getLMoveState())
                        .applyMove(State444.getLMoveState());
                break;

            case Notation444['3Uw']:
                this.state = this.state
                        .applyMove(State444.getYMoveState())
                        .applyMove(State444.getDMoveState());
                break;

            case Notation444['3Uw2']:
                this.state = this.state
                        .applyMove(State444.getYMoveState())
                        .applyMove(State444.getYMoveState())
                        .applyMove(State444.getDMoveState())
                        .applyMove(State444.getDMoveState());
                break;

            case Notation444['3Uw_']:
                this.state = this.state
                        .applyMove(State444.getYMoveState())
                        .applyMove(State444.getYMoveState())
                        .applyMove(State444.getYMoveState())
                        .applyMove(State444.getDMoveState())
                        .applyMove(State444.getDMoveState())
                        .applyMove(State444.getDMoveState());
                break;

            case Notation444['3Dw']:
                this.state = this.state
                        .applyMove(State444.getYMoveState())
                        .applyMove(State444.getYMoveState())
                        .applyMove(State444.getYMoveState())
                        .applyMove(State444.getUMoveState());
                break;

            case Notation444['3Dw2']:
                this.state = this.state
                        .applyMove(State444.getYMoveState())
                        .applyMove(State444.getYMoveState())
                        .applyMove(State444.getUMoveState())
                        .applyMove(State444.getUMoveState());
                break;

            case Notation444['3Dw_']:
                this.state = this.state
                        .applyMove(State444.getYMoveState())
                        .applyMove(State444.getUMoveState())
                        .applyMove(State444.getUMoveState())
                        .applyMove(State444.getUMoveState());
                break;

            case Notation444['3Lw']:
                this.state = this.state
                        .applyMove(State444.getXMoveState())
                        .applyMove(State444.getXMoveState())
                        .applyMove(State444.getXMoveState())
                        .applyMove(State444.getRMoveState());
                break;

            case Notation444['3Lw2']:
                this.state = this.state
                        .applyMove(State444.getXMoveState())
                        .applyMove(State444.getXMoveState())
                        .applyMove(State444.getRMoveState())
                        .applyMove(State444.getRMoveState());
                break;

            case Notation444['3Lw_']:
                this.state = this.state
                        .applyMove(State444.getXMoveState())
                        .applyMove(State444.getRMoveState())
                        .applyMove(State444.getRMoveState())
                        .applyMove(State444.getRMoveState());
                break;

            case Notation444['3Fw']:
                this.state = this.state
                        .applyMove(State444.getZMoveState())
                        .applyMove(State444.getBMoveState());
                break;

            case Notation444['3Fw2']:
                this.state = this.state
                        .applyMove(State444.getZMoveState())
                        .applyMove(State444.getZMoveState())
                        .applyMove(State444.getBMoveState())
                        .applyMove(State444.getBMoveState());
                break;

            case Notation444['3Fw_']:
                this.state = this.state
                        .applyMove(State444.getZMoveState())
                        .applyMove(State444.getZMoveState())
                        .applyMove(State444.getZMoveState())
                        .applyMove(State444.getBMoveState())
                        .applyMove(State444.getBMoveState())
                        .applyMove(State444.getBMoveState());
                break;

            case Notation444['3Bw']:
                this.state = this.state
                        .applyMove(State444.getZMoveState())
                        .applyMove(State444.getZMoveState())
                        .applyMove(State444.getZMoveState())
                        .applyMove(State444.getFMoveState())
                break;

            case Notation444['3Bw2']:
                this.state = this.state
                        .applyMove(State444.getZMoveState())
                        .applyMove(State444.getZMoveState())
                        .applyMove(State444.getFMoveState())
                        .applyMove(State444.getFMoveState());
                break;

            case Notation444['3Bw_']:
                this.state = this.state
                        .applyMove(State444.getZMoveState())
                        .applyMove(State444.getFMoveState())
                        .applyMove(State444.getFMoveState())
                        .applyMove(State444.getFMoveState());
                break;

            default:
                // @ts-ignore TS6133: '_exhaustiveCheck' is declared but its value is never read.
                const _exhaustiveCheck: never = notation;

        }

    }

    public eq(c: Cube444): boolean {
        return this.state.eq(c.state);
    }

    public isSolved(): boolean {
        // FIXME センターパーツ同士の入れ換えを許可する
        return this.state.eq(State444.getInitialState());
    }

    public getState(): State444 {
        return _.cloneDeep(this.state);
    }
}
