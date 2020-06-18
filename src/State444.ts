// const _ = require('lodash');
// import {CenterPieceLabel} from './CenterPieceLabel';

export class State444 {
    constructor(private cp: Array<number>,
                private co: Array<number>,
                private xp: Array<number>,
                private wp: Array<number>
               ){
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

    public applyMove(move: State444, skipValidation=false): State444 {
        // FIXME
        return new State444([], [], [], []);
    }

    public static getInitialState(): State444 {
        // FIXME
        return new State444([], [], [], []);
    }

    public eq(state: State444) : boolean {
        return false;
    }
}

