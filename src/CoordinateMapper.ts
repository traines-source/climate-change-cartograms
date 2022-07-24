import { Vector } from "./Vector";

export class CoordinateMapper {
    static BUFFER_SIZE = 16384;
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

    async streamToCanvasCoordinates(gridCoordinates: ReadableStream<Uint8Array>): Promise<number[]> {
        const reader = gridCoordinates.getReader();
        const re = /\n| /gm;
        const width = (this.gridDimen.x+1)*2;

        const triangles: number[] = [];
        
        let char = 0;
        let index = 0;
        let remainder = '';
        let lastLine: number[] = new Array(width);
        let currLine: number[] = new Array(width);

        const defer = () => {
            return new Promise(resolve => setTimeout(resolve));
        }

        const parse = async (chunk: string) => {
            let buffer = 0;
            while (buffer < CoordinateMapper.BUFFER_SIZE) {
                let result = re.exec(chunk);
                if (!result) {
                    remainder = chunk.substring(char);
                    char = 0;
                    re.lastIndex = 0;
                    return false;
                }
                const x = index%width;
                if (x == 0 && index > 0) {
                    const tmp = lastLine;
                    lastLine = currLine;
                    currLine = tmp;
                }
                const xOrYValue = parseFloat(chunk.substring(char, result.index));
                currLine[x] = x%2 == 0 ? xOrYValue*this.sX-1 : xOrYValue*this.sY+1;
                if (x % 2 == 1 && x >= 3 && index > width) {
                    triangles.push(lastLine[x-3], lastLine[x-2], currLine[x-3], currLine[x-2], lastLine[x-1], lastLine[x-0]);
                    triangles.push(currLine[x-1], currLine[x-0], lastLine[x-1], lastLine[x-0], currLine[x-3], currLine[x-2]);
                }
                index++;
                buffer++;
                char = re.lastIndex;
            }
            return true;
        }
        console.log(performance.now(), "stream start");
        while (true) {
            const { done, value } = await reader.read();
            const chunk = remainder + (value ? this.textDecode(value) : "");
            let bytesRemaining = true;
            while (bytesRemaining) {
                await defer();
                bytesRemaining = await parse(chunk);
            }
            if (done) {
                break;
            }
        }
        console.log(performance.now(), "stream end");
        return triangles;
    }

    private textDecode(arr: Uint8Array) {
        let str = '';
        for (var i = 0; i < arr.byteLength; i++) {
            str += String.fromCharCode(arr[i]);
        }
        return str;
    }
}