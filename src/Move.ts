const _ = require('lodash');
import {Notation} from './Notation';

export class Move {
    private notation: Notation;

    constructor(notationStr: string) {
        let notation : Notation | undefined;

        for (let val of Object.values(Notation)) {
            if (val === notationStr) {
                notation = val;
            }
        }

        if(!notation) {
            throw new Error(`Unexpected notation : ${notationStr}`)
        }

        this.notation = notation;
    };

    public getNotation() : Notation {
        return _.cloneDeep(this.notation);
    };

    public makeInverse() : Move {
        // Notationの命名規則を使う。
        // x2 -> x2
        // x' -> x
        // x -> x'

        if (this.notation.slice(-1) === '2') {
            return new Move(this.notation);
        } else if (this.notation.slice(-1) === "'") {
            return new Move(this.notation.slice(0, -1));
        } else {
            return new Move(`${this.notation}'`);
        }
    }
}
