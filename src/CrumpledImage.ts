import { Animator } from "./Animator";
import { Vector } from "./Vector";

export class CrumpledImage {
    private canvas: HTMLCanvasElement;
    private canvasDimen: Vector = Vector.NULL;
    private canvasTl: Vector = Vector.NULL;
    private img: HTMLImageElement;
    private imgDimen: Vector = Vector.NULL;
    private currentState?: [Vector, Vector, Vector][];

    constructor(private gridDimen: Vector, private animationDurationMs: number, private srcTriangles: [Vector, Vector, Vector][]) {
        this.currentState = srcTriangles;
        this.canvas = <HTMLCanvasElement>document.getElementById('map');
        this.img = <HTMLImageElement>document.getElementById('map-src');
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas(), false);

        if (this.img.complete) {
            this.initialDraw();
        } else {
            this.img.onload = () => this.initialDraw();
        }        
    }

    private resizeCanvas() {
        const r = this.canvas.getBoundingClientRect();
        this.canvasDimen = new Vector(r.width, r.height);
        this.canvasTl = new Vector(r.top, r.left);
    }

    private initialDraw() {
        const ctx = this.canvas.getContext('2d');
        this.imgDimen = new Vector(this.img.width, this.img.height);
        console.log(this.canvasDimen);
        //ctx?.drawImage(this.img, 0, 0, this.canvasDimen.x, this.imgDimen.y/this.imgDimen.x*this.canvasDimen.x);
        if (this.currentState != undefined) this.update(this.currentState);
    }

    update(newState: [Vector, Vector, Vector][]) {
        console.log("received update");
        const animator = new Animator();
        const ctx = this.canvas.getContext('2d');
        if (ctx != null) {
            animator.animate(this.animationDurationMs, (x, isLast) => {
                const s = performance.now();
                console.log("started update");
                this.mapTriangles(newState, x, ctx);
                if (isLast) {
                    this.currentState = newState;
                    console.log("applied update", performance.now()-s);
                }
                return true;
            });
        }
    }

    private mapTriangles(newState: [Vector, Vector, Vector][], x: number, ctx: CanvasRenderingContext2D) {
        if (newState.length != this.currentState?.length) {
            throw new Error("newState has different length ("+newState.length+") than currentState ("+this.currentState?.length+")");
        }
        ctx.clearRect(0, 0, this.canvasDimen.x, this.canvasDimen.y);
        for (let i=0;i<newState.length;i++) {
            const src = this.srcTriangles[i].map(c => this.grid2ImgCoords(c));
            const start = this.currentState[i];
            const dst = newState[i].map((c: Vector, j: number) => this.grid2CanvasCoords(start[j].between(c, x)));
            if (i == 0) {
                console.log(src, start, dst);
            }
            this.drawTriangle(ctx, this.img,
                dst[0], dst[1], dst[2],
                src[0], src[1], src[2]
            );
        }
    }
    
    private grid2ImgCoords(v: Vector) {
        const scale = this.imgDimen.x / this.gridDimen.x;
        return new Vector(v.x*scale, v.y*scale);
    }
    
    private grid2CanvasCoords(v: Vector) {
        const scale = this.canvasDimen.x / this.gridDimen.x;
        return new Vector(v.x*scale, v.y*scale);
    }
    
    // inspired by http://tulrich.com/geekstuff/canvas/jsgl.js
    private drawTriangle(ctx: CanvasRenderingContext2D, im: HTMLImageElement, d0: Vector, d1: Vector, d2: Vector, s0: Vector, s1: Vector, s2: Vector) {
        ctx.save();
    
        ctx.beginPath();
        ctx.moveTo(d0.x, d0.y);
        ctx.lineTo(d1.x, d1.y);
        ctx.lineTo(d2.x, d2.y);
        ctx.closePath();
        //ctx.stroke();
        ctx.clip();
    
        var denom = s0.x * (s2.y - s1.y) - s1.x * s2.y + s2.x * s1.y + (s1.x - s2.x) * s0.y;
        if (denom == 0) {
            return;
        }
        var m11 = -(s0.y * (d2.x - d1.x) - s1.y * d2.x + s2.y * d1.x + (s1.y - s2.y) * d0.x) / denom;
        var m12 = (s1.y * d2.y + s0.y * (d1.y - d2.y) - s2.y * d1.y + (s2.y - s1.y) * d0.y) / denom;
        var m21 = (s0.x * (d2.x - d1.x) - s1.x * d2.x + s2.x * d1.x + (s1.x - s2.x) * d0.x) / denom;
        var m22 = -(s1.x * d2.y + s0.x * (d1.y - d2.y) - s2.x * d1.y + (s2.x - s1.x) * d0.y) / denom;
        var dx = (s0.x * (s2.y * d1.x - s1.y * d2.x) + s0.y * (s1.x * d2.x - s2.x * d1.x) + (s2.x * s1.y - s1.x * s2.y) * d0.x) / denom;
        var dy = (s0.x * (s2.y * d1.y - s1.y * d2.y) + s0.y * (s1.x * d2.y - s2.x * d1.y) + (s2.x * s1.y - s1.x * s2.y) * d0.y) / denom;
    
        ctx.transform(m11, m12, m21, m22, dx, dy);        
        ctx.drawImage(im, 0, 0);
        
        ctx.restore();
    };
}