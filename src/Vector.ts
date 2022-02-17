export class Vector {
    static NULL: Vector = new Vector(0, 0);

    constructor(public x: number, public y: number) {
    }

    static fromArray(arr: number[]) {
        return new Vector(arr[0], arr[1]);
    }

    get length(): number {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    delta(that: Vector): Vector {
        return new Vector(that.x - this.x, that.y - this.y);
    }

    add(that: Vector): Vector {
        return new Vector(this.x + that.x, this.y + that.y);
    }

    withLength(length: number): Vector {
        const ratio = this.length != 0 ? length/this.length : 0;
        return new Vector(this.x*ratio, this.y*ratio);
    }

    between(other: Vector, x: number) {
        const delta = this.delta(other);
        return this.add(delta.withLength(delta.length*x));
    }
}