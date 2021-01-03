const _ = require('lodash');
import {Notation555} from './Notation555';
import {Move555} from './Move555';
import {State555} from './State555';

export class Cube555 {
    private state : State555;

    constructor(sequence?: string) {
        this.state = State555.getInitialState();
        if (sequence) {
            this.move(sequence);
        }
    }

    public getOrder(): number {
        return 5;
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
        const oneMove = new Move555(sequence);

        const notation = oneMove.getNotation();
        switch (notation) {
            case Notation555.R:
                this.state = this.state
                        .applyMove(State555.getRMoveState());
                break;

            case Notation555.R2:
                this.state = this.state
                        .applyMove(State555.getRMoveState())
                        .applyMove(State555.getRMoveState());
                break;

            case Notation555.R_:
                this.state = this.state
                        .applyMove(State555.getRMoveState())
                        .applyMove(State555.getRMoveState())
                        .applyMove(State555.getRMoveState());
                break;

            case Notation555.U:
                this.state = this.state.applyMove(State555.getUMoveState());
                break;

            case Notation555.U2:
                this.state = this.state
                        .applyMove(State555.getUMoveState())
                        .applyMove(State555.getUMoveState());
                break;

            case Notation555.U_:
                this.state = this.state
                        .applyMove(State555.getUMoveState())
                        .applyMove(State555.getUMoveState())
                        .applyMove(State555.getUMoveState());
                break;

            case Notation555.L:
                this.state = this.state.applyMove(State555.getLMoveState());
                break;

            case Notation555.L2:
                this.state = this.state
                        .applyMove(State555.getLMoveState())
                        .applyMove(State555.getLMoveState());
                break;

            case Notation555.L_:
                this.state = this.state
                        .applyMove(State555.getLMoveState())
                        .applyMove(State555.getLMoveState())
                        .applyMove(State555.getLMoveState());
                break;

            case Notation555.D:
                this.state = this.state.applyMove(State555.getDMoveState());
                break;

            case Notation555.D2:
                this.state = this.state
                        .applyMove(State555.getDMoveState())
                        .applyMove(State555.getDMoveState());
                break;

            case Notation555.D_:
                this.state = this.state
                        .applyMove(State555.getDMoveState())
                        .applyMove(State555.getDMoveState())
                        .applyMove(State555.getDMoveState());
                break;

            case Notation555.F:
                this.state = this.state.applyMove(State555.getFMoveState());
                break;

            case Notation555.F2:
                this.state = this.state
                        .applyMove(State555.getFMoveState())
                        .applyMove(State555.getFMoveState());
                break;

            case Notation555.F_:
                this.state = this.state
                        .applyMove(State555.getFMoveState())
                        .applyMove(State555.getFMoveState())
                        .applyMove(State555.getFMoveState());
                break;

            case Notation555.B:
                this.state = this.state.applyMove(State555.getBMoveState());
                break;

            case Notation555.B2:
                this.state = this.state
                        .applyMove(State555.getBMoveState())
                        .applyMove(State555.getBMoveState());
                break;

            case Notation555.B_:
                this.state = this.state
                        .applyMove(State555.getBMoveState())
                        .applyMove(State555.getBMoveState())
                        .applyMove(State555.getBMoveState());
                break;

            case Notation555.E:
                this.state = this.state.applyMove(State555.getEMoveState());
                break;

            case Notation555.E2:
                this.state = this.state
                        .applyMove(State555.getEMoveState())
                        .applyMove(State555.getEMoveState());
                break;

            case Notation555.E_:
                this.state = this.state
                        .applyMove(State555.getEMoveState())
                        .applyMove(State555.getEMoveState())
                        .applyMove(State555.getEMoveState());
                break;

            case Notation555.M:
                this.state = this.state
                        .applyMove(State555.getMMoveState());
                break;

            case Notation555.M2:
                this.state = this.state
                        .applyMove(State555.getMMoveState())
                        .applyMove(State555.getMMoveState());
                break;

            case Notation555.M_:
                this.state = this.state
                        .applyMove(State555.getMMoveState())
                        .applyMove(State555.getMMoveState())
                        .applyMove(State555.getMMoveState());
                break;

            case Notation555.S:
                this.state = this.state.applyMove(State555.getSMoveState());
                break;

            case Notation555.S2:
                this.state = this.state
                        .applyMove(State555.getSMoveState())
                        .applyMove(State555.getSMoveState());
                break;

            case Notation555.S_:
                this.state = this.state
                        .applyMove(State555.getSMoveState())
                        .applyMove(State555.getSMoveState())
                        .applyMove(State555.getSMoveState());
                break;

            case Notation555.x:
                this.state = this.state.applyMove(State555.getXMoveState());
                break;

            case Notation555.x2:
                this.state = this.state
                        .applyMove(State555.getXMoveState())
                        .applyMove(State555.getXMoveState());
                break;

            case Notation555.x_:
                this.state = this.state
                        .applyMove(State555.getXMoveState())
                        .applyMove(State555.getXMoveState())
                        .applyMove(State555.getXMoveState());
                break;

            case Notation555.y:
                this.state = this.state.applyMove(State555.getYMoveState());
                break;

            case Notation555.y2:
                this.state = this.state
                        .applyMove(State555.getYMoveState())
                        .applyMove(State555.getYMoveState());
                break;

            case Notation555.y_:
                this.state = this.state
                        .applyMove(State555.getYMoveState())
                        .applyMove(State555.getYMoveState())
                        .applyMove(State555.getYMoveState());
                break;

            case Notation555.z:
                this.state = this.state.applyMove(State555.getZMoveState());
                break;

            case Notation555.z2:
                this.state = this.state
                        .applyMove(State555.getZMoveState())
                        .applyMove(State555.getZMoveState());
                break;

            case Notation555.z_:
                this.state = this.state
                        .applyMove(State555.getZMoveState())
                        .applyMove(State555.getZMoveState())
                        .applyMove(State555.getZMoveState());
                break;

            case Notation555.r:
                this.state = this.state
                        .applyMove(State555.getSliceRMoveState());
                break;

            case Notation555.r2:
                this.state = this.state
                        .applyMove(State555.getSliceRMoveState())
                        .applyMove(State555.getSliceRMoveState());
                break;

            case Notation555.r_:
                this.state = this.state
                        .applyMove(State555.getSliceRMoveState())
                        .applyMove(State555.getSliceRMoveState())
                        .applyMove(State555.getSliceRMoveState());
                break;

            case Notation555.u:
                this.state = this.state
                        .applyMove(State555.getSliceUMoveState());
                break;

            case Notation555.u2:
                this.state = this.state
                        .applyMove(State555.getSliceUMoveState())
                        .applyMove(State555.getSliceUMoveState());
                break;

            case Notation555.u_:
                this.state = this.state
                        .applyMove(State555.getSliceUMoveState())
                        .applyMove(State555.getSliceUMoveState())
                        .applyMove(State555.getSliceUMoveState());
                break;

            case Notation555.l:
                this.state = this.state
                        .applyMove(State555.getSliceLMoveState());
                break;

            case Notation555.l2:
                this.state = this.state
                        .applyMove(State555.getSliceLMoveState())
                        .applyMove(State555.getSliceLMoveState());
                break;

            case Notation555.l_:
                this.state = this.state
                        .applyMove(State555.getSliceLMoveState())
                        .applyMove(State555.getSliceLMoveState())
                        .applyMove(State555.getSliceLMoveState());
                break;

            case Notation555.d:
                this.state = this.state
                        .applyMove(State555.getSliceDMoveState());
                break;

            case Notation555.d2:
                this.state = this.state
                        .applyMove(State555.getSliceDMoveState())
                        .applyMove(State555.getSliceDMoveState());
                break;

            case Notation555.d_:
                this.state = this.state
                        .applyMove(State555.getSliceDMoveState())
                        .applyMove(State555.getSliceDMoveState())
                        .applyMove(State555.getSliceDMoveState());
                break;

            case Notation555.f:
                this.state = this.state
                        .applyMove(State555.getSliceFMoveState());
                break;

            case Notation555.f2:
                this.state = this.state
                        .applyMove(State555.getSliceFMoveState())
                        .applyMove(State555.getSliceFMoveState());
                break;

            case Notation555.f_:
                this.state = this.state
                        .applyMove(State555.getSliceFMoveState())
                        .applyMove(State555.getSliceFMoveState())
                        .applyMove(State555.getSliceFMoveState());
                break;

            case Notation555.b:
                this.state = this.state
                        .applyMove(State555.getSliceBMoveState());
                break;

            case Notation555.b2:
                this.state = this.state
                        .applyMove(State555.getSliceBMoveState())
                        .applyMove(State555.getSliceBMoveState());
                break;

            case Notation555.b_:
                this.state = this.state
                        .applyMove(State555.getSliceBMoveState())
                        .applyMove(State555.getSliceBMoveState())
                        .applyMove(State555.getSliceBMoveState());
                break;

            case Notation555.Rw:
                this.state = this.state
                        .applyMove(State555.getSliceRMoveState())
                        .applyMove(State555.getRMoveState());
                break;

            case Notation555.Rw2:
                this.state = this.state
                        .applyMove(State555.getSliceRMoveState())
                        .applyMove(State555.getSliceRMoveState())
                        .applyMove(State555.getRMoveState())
                        .applyMove(State555.getRMoveState());
                break;

            case Notation555.Rw_:
                this.state = this.state
                        .applyMove(State555.getSliceRMoveState())
                        .applyMove(State555.getSliceRMoveState())
                        .applyMove(State555.getSliceRMoveState())
                        .applyMove(State555.getRMoveState())
                        .applyMove(State555.getRMoveState())
                        .applyMove(State555.getRMoveState());
                break;

            case Notation555.Uw:
                this.state = this.state
                        .applyMove(State555.getUMoveState())
                        .applyMove(State555.getSliceUMoveState());
                break;

            case Notation555.Uw2:
                this.state = this.state
                        .applyMove(State555.getUMoveState())
                        .applyMove(State555.getUMoveState())
                        .applyMove(State555.getSliceUMoveState())
                        .applyMove(State555.getSliceUMoveState());
                break;

            case Notation555.Uw_:
                this.state = this.state
                        .applyMove(State555.getUMoveState())
                        .applyMove(State555.getUMoveState())
                        .applyMove(State555.getUMoveState())
                        .applyMove(State555.getSliceUMoveState())
                        .applyMove(State555.getSliceUMoveState())
                        .applyMove(State555.getSliceUMoveState());
                break;

            case Notation555.Dw:
                this.state = this.state
                        .applyMove(State555.getDMoveState())
                        .applyMove(State555.getSliceDMoveState());
                break;

            case Notation555.Dw2:
                this.state = this.state
                        .applyMove(State555.getDMoveState())
                        .applyMove(State555.getDMoveState())
                        .applyMove(State555.getSliceDMoveState())
                        .applyMove(State555.getSliceDMoveState());
                break;

            case Notation555.Dw_:
                this.state = this.state
                        .applyMove(State555.getDMoveState())
                        .applyMove(State555.getDMoveState())
                        .applyMove(State555.getDMoveState())
                        .applyMove(State555.getSliceDMoveState())
                        .applyMove(State555.getSliceDMoveState())
                        .applyMove(State555.getSliceDMoveState());
                break;

            case Notation555.Lw:
                this.state = this.state
                        .applyMove(State555.getLMoveState())
                        .applyMove(State555.getSliceLMoveState());
                break;

            case Notation555.Lw2:
                this.state = this.state
                        .applyMove(State555.getLMoveState())
                        .applyMove(State555.getLMoveState())
                        .applyMove(State555.getSliceLMoveState())
                        .applyMove(State555.getSliceLMoveState());
                break;

            case Notation555.Lw_:
                this.state = this.state
                        .applyMove(State555.getLMoveState())
                        .applyMove(State555.getLMoveState())
                        .applyMove(State555.getLMoveState())
                        .applyMove(State555.getSliceLMoveState())
                        .applyMove(State555.getSliceLMoveState())
                        .applyMove(State555.getSliceLMoveState());
                break;

            case Notation555.Fw:
                this.state = this.state
                        .applyMove(State555.getFMoveState())
                        .applyMove(State555.getSliceFMoveState());
                break;

            case Notation555.Fw2:
                this.state = this.state
                        .applyMove(State555.getFMoveState())
                        .applyMove(State555.getFMoveState())
                        .applyMove(State555.getSliceFMoveState())
                        .applyMove(State555.getSliceFMoveState());
                break;

            case Notation555.Fw_:
                this.state = this.state
                        .applyMove(State555.getFMoveState())
                        .applyMove(State555.getFMoveState())
                        .applyMove(State555.getFMoveState())
                        .applyMove(State555.getSliceFMoveState())
                        .applyMove(State555.getSliceFMoveState())
                        .applyMove(State555.getSliceFMoveState());
                break;

            case Notation555.Bw:
                this.state = this.state
                        .applyMove(State555.getBMoveState())
                        .applyMove(State555.getSliceBMoveState());
                break;

            case Notation555.Bw2:
                this.state = this.state
                        .applyMove(State555.getBMoveState())
                        .applyMove(State555.getBMoveState())
                        .applyMove(State555.getSliceBMoveState())
                        .applyMove(State555.getSliceBMoveState());
                break;

            case Notation555.Bw_:
                this.state = this.state
                        .applyMove(State555.getBMoveState())
                        .applyMove(State555.getBMoveState())
                        .applyMove(State555.getBMoveState())
                        .applyMove(State555.getSliceBMoveState())
                        .applyMove(State555.getSliceBMoveState())
                        .applyMove(State555.getSliceBMoveState());
                break;

            case Notation555['3Rw']:
                this.state = this.state
                        .applyMove(State555.getRMoveState())
                        .applyMove(State555.getSliceRMoveState())
                        .applyMove(State555.getMMoveState())
                        .applyMove(State555.getMMoveState())
                        .applyMove(State555.getMMoveState());
                break;

            case Notation555['3Rw2']:
                this.state = this.state
                        .applyMove(State555.getRMoveState())
                        .applyMove(State555.getRMoveState())
                        .applyMove(State555.getSliceRMoveState())
                        .applyMove(State555.getSliceRMoveState())
                        .applyMove(State555.getMMoveState())
                        .applyMove(State555.getMMoveState());
                break;

            case Notation555['3Rw_']:
                this.state = this.state
                        .applyMove(State555.getRMoveState())
                        .applyMove(State555.getRMoveState())
                        .applyMove(State555.getRMoveState())
                        .applyMove(State555.getSliceRMoveState())
                        .applyMove(State555.getSliceRMoveState())
                        .applyMove(State555.getSliceRMoveState())
                        .applyMove(State555.getMMoveState());
                break;

            case Notation555['3Uw']:
                this.state = this.state
                        .applyMove(State555.getUMoveState())
                        .applyMove(State555.getSliceUMoveState())
                        .applyMove(State555.getEMoveState())
                        .applyMove(State555.getEMoveState())
                        .applyMove(State555.getEMoveState());
                break;

            case Notation555['3Uw2']:
                this.state = this.state
                        .applyMove(State555.getUMoveState())
                        .applyMove(State555.getUMoveState())
                        .applyMove(State555.getSliceUMoveState())
                        .applyMove(State555.getSliceUMoveState())
                        .applyMove(State555.getEMoveState())
                        .applyMove(State555.getEMoveState());
                break;

            case Notation555['3Uw_']:
                this.state = this.state
                        .applyMove(State555.getUMoveState())
                        .applyMove(State555.getUMoveState())
                        .applyMove(State555.getUMoveState())
                        .applyMove(State555.getSliceUMoveState())
                        .applyMove(State555.getSliceUMoveState())
                        .applyMove(State555.getSliceUMoveState())
                        .applyMove(State555.getEMoveState());
                break;

            case Notation555['3Dw']:
                this.state = this.state
                        .applyMove(State555.getDMoveState())
                        .applyMove(State555.getSliceDMoveState())
                        .applyMove(State555.getEMoveState());
                break;

            case Notation555['3Dw2']:
                this.state = this.state
                        .applyMove(State555.getDMoveState())
                        .applyMove(State555.getDMoveState())
                        .applyMove(State555.getSliceDMoveState())
                        .applyMove(State555.getSliceDMoveState())
                        .applyMove(State555.getEMoveState())
                        .applyMove(State555.getEMoveState());
                break;

            case Notation555['3Dw_']:
                this.state = this.state
                        .applyMove(State555.getDMoveState())
                        .applyMove(State555.getDMoveState())
                        .applyMove(State555.getDMoveState())
                        .applyMove(State555.getSliceDMoveState())
                        .applyMove(State555.getSliceDMoveState())
                        .applyMove(State555.getSliceDMoveState())
                        .applyMove(State555.getEMoveState())
                        .applyMove(State555.getEMoveState())
                        .applyMove(State555.getEMoveState());
                break;

            case Notation555['3Lw']:
                this.state = this.state
                        .applyMove(State555.getLMoveState())
                        .applyMove(State555.getSliceLMoveState())
                        .applyMove(State555.getMMoveState());
                break;

            case Notation555['3Lw2']:
                this.state = this.state
                        .applyMove(State555.getLMoveState())
                        .applyMove(State555.getLMoveState())
                        .applyMove(State555.getSliceLMoveState())
                        .applyMove(State555.getSliceLMoveState())
                        .applyMove(State555.getMMoveState())
                        .applyMove(State555.getMMoveState());
                break;

            case Notation555['3Lw_']:
                this.state = this.state
                        .applyMove(State555.getLMoveState())
                        .applyMove(State555.getLMoveState())
                        .applyMove(State555.getLMoveState())
                        .applyMove(State555.getSliceLMoveState())
                        .applyMove(State555.getSliceLMoveState())
                        .applyMove(State555.getSliceLMoveState())
                        .applyMove(State555.getMMoveState())
                        .applyMove(State555.getMMoveState())
                        .applyMove(State555.getMMoveState());
                break;

            case Notation555['3Fw']:
                this.state = this.state
                        .applyMove(State555.getFMoveState())
                        .applyMove(State555.getSliceFMoveState())
                        .applyMove(State555.getSMoveState());
                break;

            case Notation555['3Fw2']:
                this.state = this.state
                        .applyMove(State555.getFMoveState())
                        .applyMove(State555.getFMoveState())
                        .applyMove(State555.getSliceFMoveState())
                        .applyMove(State555.getSliceFMoveState())
                        .applyMove(State555.getSMoveState())
                        .applyMove(State555.getSMoveState());
                break;

            case Notation555['3Fw_']:
                this.state = this.state
                        .applyMove(State555.getFMoveState())
                        .applyMove(State555.getFMoveState())
                        .applyMove(State555.getFMoveState())
                        .applyMove(State555.getSliceFMoveState())
                        .applyMove(State555.getSliceFMoveState())
                        .applyMove(State555.getSliceFMoveState())
                        .applyMove(State555.getSMoveState())
                        .applyMove(State555.getSMoveState())
                        .applyMove(State555.getSMoveState());
                break;

            case Notation555['3Bw']:
                this.state = this.state
                        .applyMove(State555.getBMoveState())
                        .applyMove(State555.getSliceBMoveState())
                        .applyMove(State555.getSMoveState())
                        .applyMove(State555.getSMoveState())
                        .applyMove(State555.getSMoveState());
                break;

            case Notation555['3Bw2']:
                this.state = this.state
                        .applyMove(State555.getBMoveState())
                        .applyMove(State555.getBMoveState())
                        .applyMove(State555.getSliceBMoveState())
                        .applyMove(State555.getSliceBMoveState())
                        .applyMove(State555.getSMoveState())
                        .applyMove(State555.getSMoveState());
                break;

            case Notation555['3Bw_']:
                this.state = this.state
                        .applyMove(State555.getBMoveState())
                        .applyMove(State555.getBMoveState())
                        .applyMove(State555.getBMoveState())
                        .applyMove(State555.getSliceBMoveState())
                        .applyMove(State555.getSliceBMoveState())
                        .applyMove(State555.getSliceBMoveState())
                        .applyMove(State555.getSMoveState());
                break;

            case Notation555['4Rw']:
                this.state = this.state
                        .applyMove(State555.getXMoveState())
                        .applyMove(State555.getLMoveState());
                break;

            case Notation555['4Rw2']:
                this.state = this.state
                        .applyMove(State555.getXMoveState())
                        .applyMove(State555.getXMoveState())
                        .applyMove(State555.getLMoveState())
                        .applyMove(State555.getLMoveState());
                break;

            case Notation555['4Rw_']:
                this.state = this.state
                        .applyMove(State555.getXMoveState())
                        .applyMove(State555.getXMoveState())
                        .applyMove(State555.getXMoveState())
                        .applyMove(State555.getLMoveState())
                        .applyMove(State555.getLMoveState())
                        .applyMove(State555.getLMoveState());
                break;

            case Notation555['4Uw']:
                this.state = this.state
                        .applyMove(State555.getYMoveState())
                        .applyMove(State555.getDMoveState());
                break;

            case Notation555['4Uw2']:
                this.state = this.state
                        .applyMove(State555.getYMoveState())
                        .applyMove(State555.getYMoveState())
                        .applyMove(State555.getDMoveState())
                        .applyMove(State555.getDMoveState());
                break;

            case Notation555['4Uw_']:
                this.state = this.state
                        .applyMove(State555.getYMoveState())
                        .applyMove(State555.getYMoveState())
                        .applyMove(State555.getYMoveState())
                        .applyMove(State555.getDMoveState())
                        .applyMove(State555.getDMoveState())
                        .applyMove(State555.getDMoveState());
                break;

            case Notation555['4Dw']:
                this.state = this.state
                        .applyMove(State555.getYMoveState())
                        .applyMove(State555.getYMoveState())
                        .applyMove(State555.getYMoveState())
                        .applyMove(State555.getUMoveState());
                break;

            case Notation555['4Dw2']:
                this.state = this.state
                        .applyMove(State555.getYMoveState())
                        .applyMove(State555.getYMoveState())
                        .applyMove(State555.getUMoveState())
                        .applyMove(State555.getUMoveState());
                break;

            case Notation555['4Dw_']:
                this.state = this.state
                        .applyMove(State555.getYMoveState())
                        .applyMove(State555.getUMoveState())
                        .applyMove(State555.getUMoveState())
                        .applyMove(State555.getUMoveState());
                break;

            case Notation555['4Lw']:
                this.state = this.state
                        .applyMove(State555.getXMoveState())
                        .applyMove(State555.getXMoveState())
                        .applyMove(State555.getXMoveState())
                        .applyMove(State555.getRMoveState());
                break;

            case Notation555['4Lw2']:
                this.state = this.state
                        .applyMove(State555.getXMoveState())
                        .applyMove(State555.getXMoveState())
                        .applyMove(State555.getRMoveState())
                        .applyMove(State555.getRMoveState());
                break;

            case Notation555['4Lw_']:
                this.state = this.state
                        .applyMove(State555.getXMoveState())
                        .applyMove(State555.getRMoveState())
                        .applyMove(State555.getRMoveState())
                        .applyMove(State555.getRMoveState());
                break;

            case Notation555['4Fw']:
                this.state = this.state
                        .applyMove(State555.getZMoveState())
                        .applyMove(State555.getBMoveState());
                break;

            case Notation555['4Fw2']:
                this.state = this.state
                        .applyMove(State555.getZMoveState())
                        .applyMove(State555.getZMoveState())
                        .applyMove(State555.getBMoveState())
                        .applyMove(State555.getBMoveState());
                break;

            case Notation555['4Fw_']:
                this.state = this.state
                        .applyMove(State555.getZMoveState())
                        .applyMove(State555.getZMoveState())
                        .applyMove(State555.getZMoveState())
                        .applyMove(State555.getBMoveState())
                        .applyMove(State555.getBMoveState())
                        .applyMove(State555.getBMoveState());
                break;

            case Notation555['4Bw']:
                this.state = this.state
                        .applyMove(State555.getZMoveState())
                        .applyMove(State555.getZMoveState())
                        .applyMove(State555.getZMoveState())
                        .applyMove(State555.getFMoveState())
                break;

            case Notation555['4Bw2']:
                this.state = this.state
                        .applyMove(State555.getZMoveState())
                        .applyMove(State555.getZMoveState())
                        .applyMove(State555.getFMoveState())
                        .applyMove(State555.getFMoveState());
                break;

            case Notation555['4Bw_']:
                this.state = this.state
                        .applyMove(State555.getZMoveState())
                        .applyMove(State555.getFMoveState())
                        .applyMove(State555.getFMoveState())
                        .applyMove(State555.getFMoveState());
                break;

            default:
                // @ts-ignore TS6133: '_exhaustiveCheck' is declared but its value is never read.
                const _exhaustiveCheck: never = notation;
        }

    }

    public eq(c: Cube555): boolean {
        return this.state.eq(c.state);
    }

    public isSolved(): boolean {
        return this.state.isSolved();
    }

    public getState(): State555 {
        return _.cloneDeep(this.state);
    }
}
