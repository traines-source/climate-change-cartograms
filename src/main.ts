import { Vector } from "./Vector";
import { CrumpledImage, Dependent } from "./CrumpledImage";

const GRID_DIMEN = new Vector(600, 300);

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

function findTriangles(resolver: (x: number, y: number) => Vector) {
    const triangles: [Vector, Vector, Vector][] = []
    for (let i=0;i<GRID_DIMEN.y; i+=1) {
        for (let j=0;j<GRID_DIMEN.x; j+=1) {
            triangles.push([resolver(j, i), resolver(j+1, i), resolver(j, i+1)]);
            triangles.push([resolver(j+1, i+1), resolver(j+1, i), resolver(j, i+1)]);
        }
    }
    return triangles;
}

function readGrid(grid: string) {
    console.log(performance.now(), "befread");
    const rows = grid.split("\n") //30ms
    console.log(performance.now(), "befread1");
    rows.pop();
    console.log(performance.now(), "befread2"); 

    const numbers: number[][] = rows.map(row => row.split(" ").map(parseFloat)); //200ms
    console.log(performance.now(), "befread3"); 
    const vectors: Vector[] = numbers.map(row => Vector.fromArray(row)); //100ms
    console.log(performance.now(), "befread4"); 


    const resolver = (x: number, y: number) => {
        const v = vectors[y*(GRID_DIMEN.x+1)+x];
        if (v == undefined) {
            console.log("hey", x, y);
        }
        return new Vector(v.x, v.y);
    }
    console.log(performance.now(), "beftriangles");
    const triangles = findTriangles(resolver); //200ms
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
    for (let i=0; i<binaries.length; i++) {
        (<HTMLInputElement>document.getElementById(binaries[i].id)).oninput = updateMap
    }
    updateMap();
}

function isChecked(id: string) {
    return (<HTMLInputElement>document.getElementById(id)).checked
}

function permutationStr(ignoreParameters: boolean): string {
    if (mappings == undefined) {
        return "";
    }
    const l = (b: Mapping) => b.id+"-"+(+isChecked(b.id))
    const year = mappings.year.mapping.map(l);
    const params = mappings.parameters.mapping.map(b => b.id+"-"+(+(isChecked(b.id) && !ignoreParameters)));
    const metrics = mappings.metrics.mapping.map(l);
    const impacts = mappings.impacts.mapping.map(l);
    return year.concat(params, metrics, impacts).join("_");
}

function toggleParameterCheckboxes(disabled: boolean) {
    if (mappings == undefined) {
        return;
    }
    console.log("dis", disabled, mappings.impacts.mapping.map(impact => isChecked(impact.id)));
    mappings.parameters.mapping.map(param => (<HTMLInputElement>document.getElementById(param.id)).disabled = disabled);
}

function updateMap() {
    console.log(performance.now(), "upd trig")
    if (mappings == undefined) {
        return;
    }
    const todayMode = !isChecked(mappings.year.mapping[0].id);
    const anyImpact = mappings.impacts.mapping.map(impact => isChecked(impact.id)).reduce((a, b) => a || b);
    const anyParameters = mappings.parameters.mapping.map(param => isChecked(param.id)).reduce((a, b) => a || b);

    toggleParameterCheckboxes(todayMode);

    const emissions = todayMode ? 0 : cumulateCo2Emissions();
    console.log('Cumulated CO2 emissions:', emissions);
    const temperature = interpolateMapping(mappings.impacts_scenarios.mapping, emissions);
    console.log('Temperature forecast:', temperature);
    updateTemperature(temperature);

    console.log(performance.now(), "beffetch");

    fetch('/dist/permutations/'+permutationStr(todayMode || !anyImpact)+'.csv') //100ms
    .then(response => {
        console.log(performance.now(), "beftext");
        const t = response.text(); //500ms-1000ms in promise 
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

function v(p: number, q: number, t: number) {
    return p*(1-t)+q*t;
}

function createCities(cities: any, triangles: [Vector, Vector, Vector][]): Dependent[] {
    const dependents: Dependent[] = [];
    const container = document.getElementById('container');
    for (let i=0; i<cities.length; i++) {
        const city = cities[i];
        const c = document.createElement('span');
        c.innerHTML = city['name'];
        c.className = 'city';
        container?.appendChild(c);
        const x = city['coordinates'][0];
        const y = city['coordinates'][1];
        const evenIndex = (Math.floor(x)+Math.floor(y)*(GRID_DIMEN.x))*2;
        const uneven = x-Math.floor(x)+y-Math.floor(y) > 1 ? 1 : 0;
        const index = evenIndex + uneven;
        console.log(city['name'], index, index%((GRID_DIMEN.x)*2), triangles[index]);
        const barycentric = (new Vector(x, y)).barycentricCoordinates(triangles[index]);
        console.log(x, y, barycentric, Vector.euclidianCoordinates(triangles[index], barycentric));
        dependents.push({
            callback: (gridPos: Vector) => {
                c.style.left = (gridPos.x/2*100+50)+'%';
                c.style.top = (gridPos.y/-2*100+50)+'%';
            },
            triangleIndex: index,
            barycentric: barycentric
        });
    }
    return dependents;
}

function loadMappings() {
    console.log(performance.now(), "http1");
    fetch('/dist/mappings.json')
    .then(response => response.json())
    .then(json => {
        console.log(performance.now(), "res");
        mappings = json;
        createControls();
        window.setTimeout(() => {
            console.log(performance.now(), "faketriang");
            const triangles = findTriangles((x, y) => new Vector(x, y));
            crumpledMap.setTexCoords(triangles, createCities(json["cities"]["mapping"], triangles)); // 600ms
            console.log(performance.now(), "afterfaketriang");
        }, 1);      
    });
    
    console.log(performance.now(), "http2");
}

loadMappings();