import { Vector } from "./Vector";

export class CoordinateMapper {
    readonly sX = 2/this.gridDimen.x;
    readonly sY = (-2)/this.gridDimen.y;

    constructor(private gridDimen: Vector) {
    }

    aspectRatio() {
        return this.gridDimen.x/this.gridDimen.y;
    }

    gridToBarycentricCoords(gridCoords: Vector, triangles: number[]): {coords: Vector, masses: [number, number, number], index: number} {
        const x = gridCoords.x;
        const y = gridCoords.y;
        const evenIndex = (Math.floor(x)+Math.floor(y)*(this.gridDimen.x))*2;
        const uneven = x-Math.floor(x)+y-Math.floor(y) > 1 ? 1 : 0;
        const index = evenIndex + uneven;
        const v = this.gridToCanvasCoords(gridCoords);
        const bary = this.barycentricMasses(v, triangles, index);
        return {coords: v, masses: bary, index: index};
    }

    private barycentricMasses(euclidian: Vector, triangles: number[], index: number): [number, number, number] {
        const triangle = this.toTriangle(triangles, index);
        const v0 = triangle[0].delta(triangle[1])
        const v1 = triangle[0].delta(triangle[2])
        const v2 = triangle[0].delta(euclidian);
        const den = 1 / (v0.x * v1.y - v1.x * v0.y);
        const v = (v2.x * v1.y - v1.x * v2.y) * den;
        const w = (v0.x * v2.y - v2.x * v0.y) * den;
        const u = 1.0 - v - w;
        return [u, v, w];
    }

    private toTriangle(state: number[], i: number): [Vector, Vector, Vector] {
        return [new Vector(state[i*6], state[i*6+1]), new Vector(state[i*6+2], state[i*6+3]), new Vector(state[i*6+4], state[i*6+5])];
    }

    barycentricToCanvasCoords(barycentric: [number, number, number], index: number, triangles: number[]): Vector {
        const triangle = this.toTriangle(triangles, index);
        let r = new Vector(0, 0);
        for (let i=0; i<3; i++) {
            r = r.add(triangle[i].times(barycentric[i]));
        }
        return r;
    }

    private gridToCanvasCoords(coords: Vector) {
        return new Vector(this.sX*coords.x-1, this.sY*coords.y+1);
    }

    defaultTriangles() {
        const triangles: number[] = [];
        for (let y=0;y<this.gridDimen.y; y+=1) {
            for (let x=0;x<this.gridDimen.x; x+=1) {
                const trX = this.sX*(x+1)-1;
                const trY = this.sY*(y)+1;
                const blX = this.sX*(x)-1;
                const blY = this.sY*(y+1)+1;
                triangles.push(this.sX*(x)-1, this.sY*(y)+1, blX, blY, trX, trY);
                triangles.push(this.sX*(x+1)-1, this.sY*(y+1)+1, trX, trY, blX, blY);
            }
        }
        return triangles;
    }
}