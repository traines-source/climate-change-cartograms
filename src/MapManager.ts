import { Vector } from "./Vector";
import { CrumpledImage } from "./CrumpledImage";
import { Dependent } from "./CommonRenderer";
import { Mapping, MappingCollection } from "./MappingCollection";
import { Co2EmissionsMapper as Co2EmissionsCalculator } from "./Co2EmissionsMapper";
import { CoordinateMapper } from "./CoordinateMapper";

export class MapManager {

    private mappings: MappingCollection | undefined = undefined;
    private initial = true;
    private selectedBinary: string = '2100';

    private mapper: CoordinateMapper;
    private crumpledMap: CrumpledImage;
    private co2Calculator: Co2EmissionsCalculator;
    private worker: Worker;

    constructor(gridDimen: Vector, animationDurationMs: number) {
        this.mapper = new CoordinateMapper(gridDimen);
        this.crumpledMap = new CrumpledImage(this.mapper, animationDurationMs);
        this.co2Calculator = new Co2EmissionsCalculator(this.isChecked);
        this.worker = new Worker('/dist/filestream.worker.js');
        this.worker.onmessage = (evt) => {
            const s = <number[]><unknown>evt.data;
            this.crumpledMap.update(s, true);
            this.initial = false;
            (<HTMLInputElement>document.getElementById('loading-indicator')).className = '';
        };
    }

    private getBinaries(): Mapping[] {
        if (this.mappings == undefined) {
            return [];
        }
        return this.mappings.year.mapping.concat(this.mappings.parameters.mapping, this.mappings.metrics.mapping, this.mappings.impacts.mapping);
    }
    
    private isChecked(id: string) {
        return (<HTMLInputElement>document.getElementById(id)).checked
    }
    
    private permutationStr(ignoreParameters: boolean): string {
        if (this.mappings == undefined) {
            return "";
        }
        const l = (b: Mapping) => b.id+"-"+(+this.isChecked(b.id))
        const year = this.mappings.year.mapping.map(l);
        const params = this.mappings.parameters.mapping.map(b => b.id+"-"+(+(this.isChecked(b.id) && !ignoreParameters)));
        const metrics = this.mappings.metrics.mapping.map(l);
        const impacts = this.mappings.impacts.mapping.map(l);
        return year.concat(params, metrics, impacts).join("_");
    }
    
    private toggleParameterCheckboxes(disabled: boolean) {
        if (this.mappings == undefined) {
            return;
        }
        this.mappings.parameters.mapping.map(param => (<HTMLInputElement>document.getElementById(param.id)).disabled = disabled);
    }
    
    private deselectOtherImpacts(selectedOption: string) {
        if (this.mappings == undefined) {
            return;
        }
        if (this.mappings.impacts.mapping.map(impact => impact.id).includes(selectedOption)) {
            this.mappings.impacts.mapping.map(impact => (<HTMLInputElement>document.getElementById(impact.id)).checked = (impact.id == selectedOption));
        }
    }

    private setClassName(id: string, className: string) {
        const e = (<HTMLInputElement>document.getElementById(id));
        if (e) e.className = className;
    }
    
    private updateMap(evt?: Event) {
        console.log(performance.now(), "update triggered");

        if (this.mappings == undefined) {
            return;
        }
        if (evt != undefined) {
            const id = (<HTMLInputElement>evt?.target).id;
            this.setClassName('loading-indicator', 'loading');
            this.setClassName(id, 'loading');
            this.setClassName(this.selectedBinary, 'binary-description');
            if (this.isChecked(id)) {
                this.setClassName(id+'_description', 'binary-description active');
                this.deselectOtherImpacts(id);
            }
            this.selectedBinary = id+'_description';
            //location.hash = '#'+this.permutationStr(false);
        }
        const todayMode = !this.isChecked(this.mappings.year.mapping[0].id);
        const anyImpact = this.mappings.impacts.mapping.map(impact => this.isChecked(impact.id)).reduce((a, b) => a || b);
        this.toggleParameterCheckboxes(todayMode);
        
        const temperature = this.co2Calculator.calculateTemperature(this.mappings, todayMode);
        this.updateTemperature(temperature);
    
        this.fetchMapFile('/dist/permutations/'+this.permutationStr(todayMode || !anyImpact)+'.csv'); 
    }

    public fetchMapFile(url: string) {
        this.worker.postMessage({
            url: url,
            coordinateMapper: this.mapper
        }); 
    }
    
    private updateTemperature(temperature: number) {
        const t = <HTMLElement>document.getElementById('temperature');
        const deltaPreIndustrialTo19862005Mean = 1;
        t.innerHTML = Math.round((temperature+deltaPreIndustrialTo19862005Mean)*10)/10+"";
    }
    
    private createControls() {
        if (this.mappings == undefined) {
            return;
        }
    
        const controls = document.getElementById('controls');
        if (controls == undefined)
            throw new Error("Can't populate controls")
    
        this.setPermutation(window.location.hash.replace('#', ''));
    }
    
    public setPermutation(permutation: string) {
        const binaries = this.getBinaries();
        const states = permutation.split('_').map(b => b.split('-')[1]);
        for (let i=0; i<binaries.length; i++) {
            const el = <HTMLInputElement>document.getElementById(binaries[i].id);
            el.onchange = evt => this.updateMap(evt);
            if (states.length == binaries.length) {
                el.checked = states[i] == '1';
            }
        }
        this.updateMap();
    }

    private createCities(cities: any): Dependent[] {
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
    
    public loadMappings() {
        fetch('/dist/mappings.json')
        .then(response => response.json())
        .then(json => {
            this.mappings = json;
            this.createControls();
            window.setTimeout(() => {
                this.crumpledMap.initialize(this.createCities(json["cities"]["mapping"]));
            }, 1);      
        });
    }
 
}
