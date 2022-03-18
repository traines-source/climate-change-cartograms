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

    times(f: number): Vector {
        return new Vector(this.x * f, this.y * f);
    }

    withLength(length: number): Vector {
        const ratio = this.length != 0 ? length/this.length : 0;
        return new Vector(this.x*ratio, this.y*ratio);
    }

    between(other: Vector, x: number) {
        const delta = this.delta(other);
        return this.add(delta.withLength(delta.length*x));
    }

    barycentricCoordinates(triangle: [Vector, Vector, Vector]): [number, number, number]
    {
        const v0 = triangle[0].delta(triangle[1])
        const v1 = triangle[0].delta(triangle[2])
        const v2 = triangle[0].delta(this);
        const den = 1 / (v0.x * v1.y - v1.x * v0.y);
        const v = (v2.x * v1.y - v1.x * v2.y) * den;
        const w = (v0.x * v2.y - v2.x * v0.y) * den;
        const u = 1.0 - v - w;
        return [u, v, w];
    }

    static euclidianCoordinates(triangle: [Vector, Vector, Vector], barycentric: [number, number, number]): Vector {
        let r = new Vector(0, 0);
        for (let i=0; i<3; i++) {
            r = r.add(triangle[i].times(barycentric[i]));
        }
        return r;
    }
}