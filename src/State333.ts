const _ = require('lodash');
import {StateInterface} from './StateInterface';

export class State333 {
    constructor(private cp: Array<number>,
                private co: Array<number>,
                private ep: Array<number>,
                private eo: Array<number>,
                private center: Array<number>) {

        if (!this.isValidCp(cp)) {
            throw new Error(`CP of this state is invalid: ${cp}`);
        }

        if (!this.isValidCo(co)) {
            throw new Error(`CO of this state is invalid: ${co}`);
        }

        if (!this.isValidEp(ep)) {
            throw new Error(`EP of this state is invalid: ${ep}`);
        }

        if (!this.isValidEo(eo)) {
            throw new Error(`EO of this state is invalid: ${eo}`);
        }

        if (!this.isValidCenter(center)) {
            throw new Error(`Center of this state is invalid: ${center}`);
        }

        if (!this.isSameParity(cp, ep)) {
            throw new Error(`This this state makes 2-cycle, CP: ${cp} EP: ${ep}`);
        }

    }

    private isValidCp(cp: Array<number>): boolean {
        return _.isEqual(cp.slice().sort((a, b) => a - b), [ ...Array(cp.length).keys(), ]);
    }

    private isValidCo(co: Array<number>): boolean {
        const valIsValid = co.filter(n => !(0 <= n && n < 3)).length === 0;
        const twistIsValid = _.sum(co) % 3 === 0;
        return valIsValid && twistIsValid;
    }

    private isValidEp(ep: Array<number>): boolean {
        return _.isEqual(ep.slice().sort((a, b) => a - b), [ ...Array(ep.length).keys(), ]);
    }

    private isValidEo(eo: Array<number>): boolean {
        const valIsValid = eo.filter(n => !(0 <= n && n < 2)).length === 0;
        const twistIsValid = _.sum(eo) % 2 === 0;
        return valIsValid && twistIsValid;
    }

    private isValidCenter(center: Array<number>): boolean {
        return _.isEqual(center.slice().sort((a, b) => a - b), [ ...Array(center.length).keys(), ]);
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

    private isSameParity(cp: Array<number>, ep: Array<number>): boolean {
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

    public static getInitialState(): State333 {
        return new State333(
            [ 0, 1, 2, 3, 4, 5, 6, 7, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, ],
            [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],
            [ 0, 1, 2, 3, 4, 5, ]
        );
    };

    public applyMove(move: State333): State333 {
        const new_cp: Array<number> = this.cp.map((_,i) => this.cp[move.getCp()[i]]);
        const new_co: Array<number> = this.co.map((_,i) => (this.co[move.getCp()[i]] + move.getCo()[i]) % 3);
        const new_ep: Array<number> = this.ep.map((_,i) => this.ep[move.getEp()[i]]);
        const new_eo: Array<number> = this.eo.map((_,i) => (this.eo[move.getEp()[i]] + move.getEo()[i]) % 2);
        const new_center: Array<number> = move.getCenter().map(i => this.center[i]);
        return new State333(new_cp, new_co, new_ep, new_eo, new_center);
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

}
