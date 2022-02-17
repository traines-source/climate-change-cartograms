import { Vector } from "./Vector";
import { CrumpledImage } from "./CrumpledImage";

const GRID_DIMEN = new Vector(202, 101);

const crumpledMap = new CrumpledImage(GRID_DIMEN, 2000, findTriangles(GRID_DIMEN.x*GRID_DIMEN.y, (x, y) => new Vector(x, y)));

function findTriangles(elementsCount: number, resolver: (x: number, y: number) => Vector) {
    const triangles: [Vector, Vector, Vector][] = []
    const rowCount = Math.floor(elementsCount/GRID_DIMEN.x);
    console.log(rowCount);
    for (let i=0;i<GRID_DIMEN.y; i+=1) {
        for (let j=0;j<GRID_DIMEN.x-1; j+=1) {
            triangles.push([resolver(j, i), resolver(j+1, i), resolver(j, i+1)]);
            triangles.push([resolver(j+1, i+1), resolver(j+1, i), resolver(j, i+1)]);
        }
    }
    return triangles;
}

function readGrid(grid: string) {
    const rows = grid.split("\n")
    rows.pop();
    const vectors: Vector[] = rows.map(row => Vector.fromArray(row.split(" ").map(parseFloat)));

    const resolver = (x: number, y: number) => vectors[y*GRID_DIMEN.x+x];
    const triangles = findTriangles(vectors.length, resolver);
    crumpledMap.update(triangles);    
}

fetch('data/wildfires.dat')
    .then(response => response.text())
    .then(grid => readGrid(grid));
