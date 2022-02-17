/*
 * NoFace
 * Created and animated by Kumiko
 */

class NoFace {
    constructor( game, x, y, scale ) {
        Object.assign(this, { game, x, y, scale});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/noface-spritesheet-fade-aura.png");

        this.loadAnimations();

        this.dead = false;
        this.deadCounter = 0;

        this.height = 150;
        this.width = 400;

        this.hasCoins = true;

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
        const bbwidth = 150;
        const bbheight = 400;

        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, bbwidth*this.scale, bbheight*this.scale);

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
        }

        ctx.imageSmoothingEnabled = false;
    };
};