import {CubeInterface} from './CubeInterface';

export class Cube444 implements CubeInterface {
    constructor(sequence?: string) {
        throw new Error('Not implemented');
    }

    public getOrder(): number {
        return 4;
    }

    public move(sequence: string): void {
        throw new Error('Not implemented');
    }
}
