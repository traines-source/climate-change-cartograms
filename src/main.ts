import { Vector } from "./Vector";
import { CrumpledImage, Dependent } from "./CrumpledImage";

const GRID_DIMEN = new Vector(600, 300);

let mappings: MappingCollection | undefined = undefined;
let initial = true;
let selectedBinary: string = '2100';

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
    const hash = window.location.hash.replace('#', '').split('_').map(b => b.split('-')[1]);
    for (let i=0; i<binaries.length; i++) {
        const el = <HTMLInputElement>document.getElementById(binaries[i].id);
        el.onchange = updateMap;
        if (hash.length == binaries.length) {
            el.checked = hash[i] == '1';
        }
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
    mappings.parameters.mapping.map(param => (<HTMLInputElement>document.getElementById(param.id)).disabled = disabled);
}

function updateMap(evt?: Event) {
    console.log(performance.now(), "update triggered")
    if (mappings == undefined) {
        return;
    }
    if (evt != undefined) {
        const id = (<HTMLInputElement>evt?.target).id;
        (<HTMLInputElement>document.getElementById(selectedBinary)).style.display = 'none';
        if (isChecked(id)) {
            (<HTMLInputElement>document.getElementById(id+'_description')).style.display = 'block';
        }
        selectedBinary = id+'_description';
        location.hash = '#'+permutationStr(false);
    }
    const todayMode = !isChecked(mappings.year.mapping[0].id);
    const anyImpact = mappings.impacts.mapping.map(impact => isChecked(impact.id)).reduce((a, b) => a || b);

    toggleParameterCheckboxes(todayMode);

    const emissions = todayMode ? 0 : cumulateCo2Emissions();
    console.log('Cumulated CO2 emissions:', emissions);
    const temperature = interpolateMapping(mappings.impacts_scenarios.mapping, emissions);
    console.log('Temperature forecast:', temperature);
    updateTemperature(temperature);

    fetch('/dist/permutations/'+permutationStr(todayMode || !anyImpact)+'.csv')
    .then(response => {
        console.log(performance.now(), "file received");
        if (response.body != null) {
            crumpledMap.streamUpdate(response.body, true);
            initial = false;
        } else {
            console.log("Response was null");
        }
    });
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

function createCities(cities: any): Dependent[] {
    const dependents: Dependent[] = [];
    const container = document.getElementById('container');
    for (let i=0; i<cities.length; i++) {
        const city = cities[i];
        const c = document.createElement('span');
        c.innerHTML = city['name'];
        c.className = 'city';
        container?.appendChild(c);
        dependents.push({
            callback: (canvasCoords: Vector) => {
                c.style.left = (canvasCoords.x/2*100+50)+'%';
                c.style.top = (canvasCoords.y/-2*100+50)+'%';
            },
            coords: Vector.fromArray(city['coordinates'])
        });
    }
    return dependents;
}

function loadMappings() {
    fetch('/dist/mappings.json')
    .then(response => response.json())
    .then(json => {
        mappings = json;
        createControls();
        window.setTimeout(() => {
            crumpledMap.initialize(createCities(json["cities"]["mapping"]));
        }, 1);      
    });
}

loadMappings();