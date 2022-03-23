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

    private static toTriangle(state: number[], i: number): [Vector, Vector, Vector] {
        return [new Vector(state[i*6], state[i*6+1]), new Vector(state[i*6+2], state[i*6+3]), new Vector(state[i*6+4], state[i*6+5])];
    }

    barycentricCoordinates(triangles: number[], index: number): [number, number, number] {
        const triangle = Vector.toTriangle(triangles, index);
        const v0 = triangle[0].delta(triangle[1])
        const v1 = triangle[0].delta(triangle[2])
        const v2 = triangle[0].delta(this);
        const den = 1 / (v0.x * v1.y - v1.x * v0.y);
        const v = (v2.x * v1.y - v1.x * v2.y) * den;
        const w = (v0.x * v2.y - v2.x * v0.y) * den;
        const u = 1.0 - v - w;
        return [u, v, w];
    }

    static euclidianCoordinates(triangles: number[], index: number, barycentric: [number, number, number]): Vector {
        const triangle = this.toTriangle(triangles, index);
        let r = new Vector(0, 0);
        for (let i=0; i<3; i++) {
            r = r.add(triangle[i].times(barycentric[i]));
        }
        return r;
    }
}