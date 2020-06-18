const _ = require('lodash');
import {State444} from './State444';

export class Cube444 {
    private state : State444;

    constructor(sequence?: string) {
        throw new Error('Not implemented');
    }

    public getOrder(): number {
        return 4;
    }

    public move(sequence: string): void {
        throw new Error('Not implemented');
    }

    public eq(c: Cube444): boolean {
        throw new Error('Not implemented');
        // return false;
    }

    public isSolved(): boolean {
        throw new Error('Not implemented');
        // return false;
    }

    public getState(): State444 {
        return _.cloneDeep(this.state);
        // return false;
    }
}
