import { Vector } from "./Vector";

export interface Renderer {
    initialize(triangles: number[], dependents: Dependent[]): void;
    updateFrom(triangles: number[]): void;
    updateTo(triangles: number[]): void;
    interpolate(x: number): void;    
}

export interface Dependent {
    coords: Vector;
    callback: (canvasCoords: Vector) => void;
}

export class CommonRenderer implements Renderer {
    private renderers: Renderer[];

    constructor(...renderers: Renderer[]) {
        this.renderers = renderers;
    }
    
    initialize(triangles: number[], dependents: Dependent[]): void {
        this.renderers.map(r => r.initialize(triangles, dependents));
    }

    updateFrom(triangles: number[]): void {
        this.renderers.map(r => r.updateFrom(triangles));
    }

    updateTo(triangles: number[]): void {
        this.renderers.map(r => r.updateTo(triangles));
    }

    interpolate(x: number): void {
        this.renderers.map(r => r.interpolate(x));
    }

}