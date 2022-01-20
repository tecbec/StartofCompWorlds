/*
 * NoFace
 * Created and animated by Kumiko
 */

class NoFace {
    constructor( game, x, y ) {
        Object.assign(this, { game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/noface-spritesheet.png");

        this.loadAnimations();

        // initialize this.x and this.y
        this.x = 100;
        this.y = 150;

        // initialize the velocity .
        this.velocity = {x: 100, y: 100};

        this.updateBB();

    };

    loadAnimations() {
        this.animations = new Animator(this.spritesheet, 0, 0, 198, 400, 9, .3, 10, false, true);
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x+5, this.y, 40, 100);
    };


    update() {

    };

    draw(ctx) {
        this.animations.drawFrame(this.game.clockTick, ctx, this.x, this.y, .25);

        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        ctx.imageSmoothingEnabled = false;

    };

};