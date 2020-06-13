import {CubeInterface} from './CubeInterface';
import {Cube333} from './Cube333';
import {Cube444} from './Cube444';

export class Cube implements CubeInterface {
    cube: CubeInterface;

    constructor(private order: number){
        if (order == 3) {
            this.cube = new Cube333();
        } else if (order == 4) {
            this.cube = new Cube444();
        } else {
            throw new Error(`Not Implemented: n = ${order}`);
        }
    }

    public getOrder(): number {
        return this.cube.getOrder();
    }

    public move(sequence: string): void {
        return this.cube.move(sequence);
    };
}
