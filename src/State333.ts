const _ = require('lodash');
import {StateInterface} from './StateInterface';

export class State333 {
    constructor(private cp: Array<number>,
                private co: Array<number>,
                private ep: Array<number>,
                private eo: Array<number>,
                private center: Array<number>) {

        // TODO: ひねり量の和が0になっていることを確認する
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
