import { Dependent, Renderer } from "./CommonRenderer";
import { CoordinateMapper } from "./CoordinateMapper";
import { Vector } from "./Vector";

interface EnrichedDependent extends Dependent {    
    triangleIndex: number;
    barycentric: [number, number, number];
    from?: Vector;
    to?: Vector;    
}

export class DependentsRenderer implements Renderer {

    private dependents: EnrichedDependent[] = [];

    constructor(private mapper: CoordinateMapper) {
    }

    initialize(triangles: number[], dependents: Dependent[]) {
        const enrichedDependents: EnrichedDependent[] = [];
        for (const dependent of dependents) {            
            const barycentric = this.mapper.gridToBarycentricCoords(dependent.coords, triangles);
            enrichedDependents.push({
                coords: dependent.coords,
                callback: dependent.callback,
                triangleIndex: barycentric.index,
                barycentric: barycentric.masses,
                from: barycentric.coords,
                to: barycentric.coords
            });            
        }
        this.dependents = enrichedDependents;
        this.interpolate(0);
    }

    updateFrom(triangles: number[]) {
        for (const dependent of this.dependents) {
            dependent.from = this.mapper.barycentricToCanvasCoords(dependent.barycentric, dependent.triangleIndex, triangles);
        }
    }

    updateTo(triangles: number[]) {
        for (const dependent of this.dependents) {
            dependent.to = this.mapper.barycentricToCanvasCoords(dependent.barycentric, dependent.triangleIndex, triangles);
        }
    }    

    interpolate(x: number) {
        for (const dependent of this.dependents) {
            if (dependent.from && dependent.to) {
                const canvasCoords = dependent.from.between(dependent.to, x);
                dependent.callback(canvasCoords);
            }
        }
    }
    
}