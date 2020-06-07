export class Sample {
    constructor(private a: number, private b: number){
    }

    public get_y(x: number) : number {
        return this.a * x + this.b;
    }

    public inc(x: number) : number {
        return x + 1;
    }
}
