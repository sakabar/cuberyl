const _ = require('lodash');
import {Notation333} from './Notation333';

export class Move333 {
    private notation: Notation333;

    constructor(notationStr: string) {
        let notation : Notation333 | undefined;

        for (let val of Object.values(Notation333)) {
            if (val === notationStr) {
                notation = val;
            }
        }

        if(!notation) {
            throw new Error(`Unexpected notation : ${notationStr}`)
        }

        this.notation = notation;
    };

    public getNotation() : Notation333 {
        return _.cloneDeep(this.notation);
    };

    public makeInverse() : Move333 {
        // Notationの命名規則を使う。
        // x2 -> x2
        // x' -> x
        // x -> x'

        if (this.notation.slice(-1) === '2') {
            return new Move333(this.notation);
        } else if (this.notation.slice(-1) === "'") {
            return new Move333(this.notation.slice(0, -1));
        } else {
            return new Move333(`${this.notation}'`);
        }
    }
}
