import { Animator } from "./Animator";
import { CanvasRenderer } from "./CanvasRenderer";
import { CoordinateMapper } from "./CoordinateMapper";
import { DependentsRenderer } from "./DependentsRenderer";
import { Vector } from "./Vector";

export interface Dependent {
    coords: Vector;
    callback: (gridPos: Vector) => void;
}

export interface Renderer {
    initialize(triangles: number[]): void;
    updateFrom(triangles: number[]): void;
    updateTo(triangles: number[]): void;
    interpolate(x: number): void;    
}

export class CrumpledImage {    
    private nonce = 0;
    private canvasRenderer: CanvasRenderer;
    private dependentsRenderer: DependentsRenderer;
    private mapper: CoordinateMapper;

    constructor(gridDimen: Vector, private animationDurationMs: number) {
        this.mapper = new CoordinateMapper(gridDimen);
        this.canvasRenderer = new CanvasRenderer(this.mapper.aspectRatio());
        this.dependentsRenderer = new DependentsRenderer(this.mapper);
    }

    initialize(dependents: Dependent[]) {
        const triangles = this.mapper.defaultTriangles();
        this.canvasRenderer.initialize(triangles);
        this.dependentsRenderer.initializeWithDependents(dependents, triangles);
    }

    async streamUpdate(gridCoordinates: ReadableStream<Uint8Array>, animate: boolean) {
        const triangles = await this.mapper.streamToCanvasCoordinates(gridCoordinates);
        this.update(triangles, animate);
    }

    private update(triangles: number[], animate: boolean) {
        this.canvasRenderer.updateTo(triangles);
        this.dependentsRenderer.updateTo(triangles);

        this.nonce++;
        if (!animate) {
            this.canvasRenderer.interpolate(0);
            this.dependentsRenderer.interpolate(0);
            return;
        }
        const animator = new Animator();
        console.log(performance.now(), "started update");
        
        const nonce = this.nonce;
        animator.animate(this.animationDurationMs, (x, isLast) => {
            if (this.nonce != nonce) {
                return false;
            }
            
            this.canvasRenderer.interpolate(x);
            this.dependentsRenderer.interpolate(x);
            
            if (isLast) {
                this.canvasRenderer.updateFrom(triangles);
                this.dependentsRenderer.updateFrom(triangles);
                console.log(performance.now(), "applied update");
            }
            return true;
        });       
    }
}