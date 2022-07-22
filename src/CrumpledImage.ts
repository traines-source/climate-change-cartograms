import { Animator } from "./Animator";
import { CanvasRenderer } from "./CanvasRenderer";
import { CommonRenderer, Dependent } from "./CommonRenderer";
import { CoordinateMapper } from "./CoordinateMapper";
import { DependentsRenderer } from "./DependentsRenderer";
import { Vector } from "./Vector";

export class CrumpledImage {    
    private nonce = 0;
    private animRunning = false;
    private animQueue: number[][] = [];
    private renderer: CommonRenderer;
    private mapper: CoordinateMapper;

    constructor(gridDimen: Vector, private animationDurationMs: number) {
        this.mapper = new CoordinateMapper(gridDimen);
        this.renderer = new CommonRenderer(new CanvasRenderer(this.mapper.aspectRatio()), new DependentsRenderer(this.mapper));
    }

    initialize(dependents: Dependent[]) {
        const triangles = this.mapper.defaultTriangles();
        this.renderer.initialize(triangles, dependents);
    }

    async streamUpdate(gridCoordinates: ReadableStream<Uint8Array>, animate: boolean) {
        const triangles = await this.mapper.streamToCanvasCoordinates(gridCoordinates);
        this.update(triangles, animate);
    }

    private update(triangles: number[], animate: boolean) {
        if (this.animRunning) {
            this.animQueue.push(triangles);
            return;
        }
        this.renderer.updateTo(triangles);

        this.nonce++;
        if (!animate) {
            this.renderer.interpolate(0);
            return;
        }
        const animator = new Animator();
        console.log(performance.now(), "started update");
        
        const nonce = this.nonce;
        this.animRunning = true;
        animator.animate(this.animationDurationMs, (x, isLast) => {
            if (this.nonce != nonce) {
                return false;
            }
            
            this.renderer.interpolate(x);
            
            if (isLast) {
                this.renderer.updateFrom(triangles);
                console.log(performance.now(), "applied update");
                this.animRunning = false;
                const queued = this.animQueue.shift()
                if (queued) {
                    this.update(queued, true);
                }
            }
            return true;
        });       
    }
}