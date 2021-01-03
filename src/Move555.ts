const _ = require('lodash');
import {Notation555} from './Notation555';

export class Move555 {
    private notation: Notation555;

    constructor(notationStr: string) {
        let notation : Notation555 | undefined;

        for (let val of Object.values(Notation555)) {
            if (val === notationStr.replace("'2", '2')) {
                notation = val;
            }
        }

        if(!notation) {
            throw new Error(`Unexpected notation : ${notationStr}`)
        }

        this.notation = notation;
    };

    public getNotation() : Notation555 {
        return _.cloneDeep(this.notation);
    };

    public makeInverse() : Move555 {
        // Notationの命名規則を使う。
        // x2 -> x2
        // x' -> x
        // x -> x'

        if (this.notation.slice(-1) === '2') {
            return new Move555(this.notation);
        } else if (this.notation.slice(-1) === "'") {
            return new Move555(this.notation.slice(0, -1));
        } else {
            return new Move555(`${this.notation}'`);
        }
    }
}
