import {CubeUnion} from './CubeUnion';
import {Cube333} from './Cube333';
import {Cube444} from './Cube444';
import {Cube555} from './Cube555';
import {StateUnion} from './StateUnion';

export class Cube {
    cube: CubeUnion;

    constructor(order: number){
        if (order == 3) {
            this.cube = new Cube333();
        } else if (order == 4) {
            this.cube = new Cube444();
        } else if (order == 5) {
            this.cube = new Cube555();
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

    public eq(c: Cube): boolean {
        // @ts-ignore (Orderが同じなら同じ形状のキューブなのでeq判定してOK)
        // TS2345: Argument of type 'CubeUnion' is not assignable to parameter of type 'never'.
        // The intersection 'Cube333 & Cube444' was reduced to 'never' because property 'state' exists in multiple constituents and is private in some.
        // Type 'Cube333' is not assignable to type 'never'.
        return this.getOrder() === c.getOrder() && this.cube.eq(c.cube);
    }

    public isSolved(): boolean {
        return this.cube.isSolved();
    }

    public getState(): StateUnion {
        return this.cube.getState();
    }
}
