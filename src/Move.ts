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
}
