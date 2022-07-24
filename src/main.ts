import { Vector } from "./Vector";
import { CrumpledImage } from "./CrumpledImage";
import { Dependent } from "./CommonRenderer";
import { Mapping, MappingCollection } from "./MappingCollection";
import { Co2EmissionsMapper as Co2EmissionsCalculator } from "./Co2EmissionsMapper";

const GRID_DIMEN = new Vector(600, 300);

let mappings: MappingCollection | undefined = undefined;
let initial = true;
let selectedBinary: string = '2100';

const crumpledMap = new CrumpledImage(GRID_DIMEN, 2000);
const co2Calculator = new Co2EmissionsCalculator(isChecked);

function getBinaries(): Mapping[] {
    if (mappings == undefined) {
        return [];
    }
    return mappings.year.mapping.concat(mappings.parameters.mapping, mappings.metrics.mapping, mappings.impacts.mapping);
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

function deselectOtherImpacts(selectedOption: string) {
    if (mappings == undefined) {
        return;
    }
    if (mappings.impacts.mapping.map(impact => impact.id).includes(selectedOption)) {
        mappings.impacts.mapping.map(impact => (<HTMLInputElement>document.getElementById(impact.id)).checked = (impact.id == selectedOption));
    }
}

function updateMap(evt?: Event) {
    console.log(performance.now(), "update triggered");
    if (mappings == undefined) {
        return;
    }
    if (evt != undefined) {
        const id = (<HTMLInputElement>evt?.target).id;
        (<HTMLInputElement>document.getElementById('loading-indicator')).className = 'loading';
        (<HTMLInputElement>document.getElementById(id)).className = 'loading';
        (<HTMLInputElement>document.getElementById(selectedBinary)).className = 'binary-description';
        if (isChecked(id)) {
            (<HTMLInputElement>document.getElementById(id+'_description')).className = 'binary-description active';
            deselectOtherImpacts(id);
        }
        selectedBinary = id+'_description';
        location.hash = '#'+permutationStr(false);
    }
    const todayMode = !isChecked(mappings.year.mapping[0].id);
    const anyImpact = mappings.impacts.mapping.map(impact => isChecked(impact.id)).reduce((a, b) => a || b);
    toggleParameterCheckboxes(todayMode);
    
    const temperature = co2Calculator.calculateTemperature(mappings, todayMode);
    updateTemperature(temperature);

    fetch('/dist/permutations/'+permutationStr(todayMode || !anyImpact)+'.csv')
    .then(response => {
        console.log(performance.now(), "file received");
        if (response.body != null) {
            crumpledMap.streamUpdate(response.body, true).then(() => {
                if (evt != undefined) {
                    const id = (<HTMLInputElement>evt?.target).id;
                    (<HTMLInputElement>document.getElementById('loading-indicator')).className = '';
                    (<HTMLInputElement>document.getElementById(id)).className = '';
                }
            });            
            initial = false;
        } else {
            console.log("Response was null");
        }
    });
}

function updateTemperature(temperature: number) {
    const t = <HTMLElement>document.getElementById('temperature');
    const deltaPreIndustrialTo19862005Mean = 1;
    t.innerHTML = Math.round((temperature+deltaPreIndustrialTo19862005Mean)*10)/10+"";
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