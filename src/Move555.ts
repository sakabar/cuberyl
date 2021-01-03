const _ = require('lodash');
import {Notation444} from './Notation444';

export class Move444 {
    private notation: Notation444;

    constructor(notationStr: string) {
        let notation : Notation444 | undefined;

        for (let val of Object.values(Notation444)) {
            if (val === notationStr.replace("'2", '2')) {
                notation = val;
            }
        }

        if(!notation) {
            throw new Error(`Unexpected notation : ${notationStr}`)
        }

        this.notation = notation;
    };

    public getNotation() : Notation444 {
        return _.cloneDeep(this.notation);
    };

    public makeInverse() : Move444 {
        // Notationの命名規則を使う。
        // x2 -> x2
        // x' -> x
        // x -> x'

        if (this.notation.slice(-1) === '2') {
            return new Move444(this.notation);
        } else if (this.notation.slice(-1) === "'") {
            return new Move444(this.notation.slice(0, -1));
        } else {
            return new Move444(`${this.notation}'`);
        }
    }
}
