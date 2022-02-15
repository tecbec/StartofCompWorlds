/*
 * NoFace
 * Created and animated by Kumiko
 */

class NoFace {
    constructor( game, x, y ) {
        Object.assign(this, { game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/noface-spritesheet-fade-aura.png");

        this.loadAnimations();

        this.dead = false;
        this.deadCounter = 0;
        this.scale = .5;

        // bounding box
        this.updateBB();

    };

    loadAnimations() {

        const start = {x: 0, y: 0};
        const height = 150;
        const width = 400;
        const frames = 7;
        const framedur = 0.2;
        const pad = 10;

        this.animations = new Animator(this.spritesheet, start.x, start.y, height, width, frames, framedur, pad, false, true);
    }

    updateBB() {
        const subwidth = 10;
        let width = 30;
        const height = 110;

        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x+subwidth, this.y, width, height);

        width = 5;
        this.leftBB = new BoundingBox(this.x+subwidth, this.y, width, height);
        this.rightBB = new BoundingBox(this.BB.right-subwidth, this.y, width, height);

    };


    update() {
        const pause = 0.75; 
        if (this.dead) {
            this.deadCounter += this.game.clockTick;
            if (this.deadCounter > pause) this.removeFromWorld = true;
        }
    };

    draw(ctx) {
        var blurValues = 64;
        ctx.shadowColor = 'green';
         ctx.shadowBlur = blurValues;
    
        this.animations.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale);
        ctx.shadowColor = "transparent"; // remove shadow !

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
            ctx.strokeStyle = 'Yellow';
            ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y, this.leftBB.width, this.leftBB.height);
            ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y, this.rightBB.width, this.rightBB.height);
        }

        ctx.imageSmoothingEnabled = false;
    };
};