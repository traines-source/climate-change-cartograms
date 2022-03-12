import { Vector } from "./Vector";
import { CrumpledImage } from "./CrumpledImage";

const GRID_DIMEN = new Vector(401, 201);

let mappings: MappingCollection | undefined = undefined;
let initial = true;

interface Label { [id: string]: string }
interface Mapping {
    id: string;
    label: Label;
    x: number;
    y: number;
}
interface MappingCollection { 
    [id: string]: {
        label: Label;
        mapping: Mapping[];
    }
};

const crumpledMap = new CrumpledImage(GRID_DIMEN, 2000);

function findTriangles(elementsCount: number, resolver: (x: number, y: number) => Vector) {
    const triangles: [Vector, Vector, Vector][] = []
    const rowCount = Math.floor(elementsCount/GRID_DIMEN.x);
    console.log(rowCount);
    for (let i=0;i<GRID_DIMEN.y-1; i+=1) {
        for (let j=0;j<GRID_DIMEN.x-1; j+=1) {
            triangles.push([resolver(j, i), resolver(j+1, i), resolver(j, i+1)]);
            triangles.push([resolver(j+1, i+1), resolver(j+1, i), resolver(j, i+1)]);
        }
    }
    return triangles;
}

function readGrid(grid: string) {
    console.log(performance.now(), "befread"); //500ms
    const rows = grid.split("\n")
    console.log(performance.now(), "befread1");
    rows.pop();
    console.log(performance.now(), "befread2"); 

    const numbers: number[][] = rows.map(row => row.split(" ").map(parseFloat));
    console.log(performance.now(), "befread3"); 
    const vectors: Vector[] = numbers.map(row => Vector.fromArray(row));
    console.log(performance.now(), "befread4"); 


    const resolver = (x: number, y: number) => {
        const v = vectors[y*GRID_DIMEN.x+x];
        if (v == undefined) {
            console.log("hey", x, y);
        }
        return new Vector(v.x, v.y);
    }
    console.log(performance.now(), "beftriangles");
    const triangles = findTriangles(vectors.length, resolver); //600ms
    console.log(performance.now(), "hey");

    crumpledMap.update(triangles, !initial);
    initial = false;
}

function interpolateMapping(mappings: Mapping[], x: number): number {
    let upper : Mapping | undefined = undefined;
    let lower : Mapping | undefined = undefined;
    for (let i=0; i<mappings.length; i++) {
        if (mappings[i].x >= x && (upper == undefined || mappings[i].x < upper.x)) {
            upper = mappings[i];
        }
        if (mappings[i].x <= x && (lower == undefined || mappings[i].x > lower.x)) {
            lower = mappings[i];
        }
    }
    if (lower == undefined) {
        if (upper == undefined) {
            throw new Error("No interpolation possible")
        }
        return upper.y;
    }
    if (upper == undefined)
        return lower.y;
    if (upper == lower)
        return upper.y;
    return (x-lower.x)/(upper.x-lower.x)*(upper.y-lower.y)+lower.y;
}

function getBinaries(): Mapping[] {
    if (mappings == undefined) {
        return [];
    }
    return mappings.year.mapping.concat(mappings.parameters.mapping, mappings.metrics.mapping, mappings.impacts.mapping);
}

function createControls() {
    if (mappings == undefined) {
        return;
    }

    const controls = document.getElementById('controls');
    if (controls == undefined)
        throw new Error("Can't populate controls")

    const binaries = getBinaries();
    console.log(binaries);

    for (let i=0; i<binaries.length; i++) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = binaries[i].id;
        checkbox.id = binaries[i].id;
        checkbox.oninput = updateMap;

        const label = document.createElement('label');
        label.htmlFor = binaries[i].id;
        label.innerHTML = binaries[i].label.en;

        const div = document.createElement('div');
        div.appendChild(checkbox);
        div.appendChild(label);
        controls.appendChild(div);
        console.log(binaries[i].id);
    }
    updateMap();
}

function isChecked(id: string) {
    return (<HTMLInputElement>document.getElementById(id)).checked
}

function permutationStr(binaries: Mapping[]) {
    return binaries.map(b => b.id+"-"+(+isChecked(b.id))).join("_");
}

function updateMap() {
    console.log(performance.now(), "upd trig")
    if (mappings == undefined) {
        return;
    }
    const year2100 = isChecked(mappings.year.mapping[0].id);
    const emissions = year2100 ? cumulateCo2Emissions() : 0;
    console.log('Cumulated CO2 emissions:', emissions);
    const temperature = interpolateMapping(mappings.impacts_scenarios.mapping, emissions);
    console.log('Temperature forecast:', temperature);
    updateTemperature(temperature);

    console.log(performance.now(), "beffetch");

    fetch('data/'+permutationStr(getBinaries())+'.csv') //100ms
    .then(response => {
        console.log(performance.now(), "beftext");
        const t = response.text();
        console.log(performance.now(), "afztext");
        return t;

    })
    .then(grid => readGrid(grid));
}

function cumulateCo2Emissions() {
    if (mappings == undefined) {
        return 0;
    }
    let cumul_co2 = mappings.year.mapping[0].y;
    const params = mappings.parameters.mapping
    for (let i=0; i<params.length; i++) {
        const checkbox = <HTMLInputElement>document.getElementById(params[i].id);
        if (checkbox.checked) {
            cumul_co2 += params[i].y;
        }
    }
    return cumul_co2;
}

function updateTemperature(temperature: number) {
    const t = <HTMLElement>document.getElementById('temperature');
    t.innerHTML = Math.round((temperature+1)*10)/10+"";
}

function loadMappings() {
    console.log(performance.now(), "http1");
    fetch('res/mappings.json')
    .then(response => response.json())
    .then(json => {
        console.log(performance.now(), "res");
        mappings = json;
        createControls();
        window.setTimeout(() => {
            console.log(performance.now(), "faketriang");
            crumpledMap.setTexCoords(findTriangles(GRID_DIMEN.x*GRID_DIMEN.y, (x, y) => new Vector(x, y))); // 600ms
            console.log(performance.now(), "afterfaketriang");
        }, 1);
    });
    console.log(performance.now(), "http2");
}

loadMappings();