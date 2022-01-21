/*
 * NoFace
 * Created and animated by Kumiko
 */

class NoFace {
    constructor( game, x, y ) {
        Object.assign(this, { game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/noface-spritesheet-fade.png");

        this.loadAnimations();

        this.BB = new BoundingBox(this.x + 5, this.y, 20, 75);
        this.leftBB = new BoundingBox(this.x + 5, this.y, 5, 75);
        this.rightBB = new BoundingBox(this.BB.right, this.y, 5, 75);
        // initialize the velocity .
        // this.velocity = {x: 100, y: 100};
        // this.updateBB();


    };

    loadAnimations() {
        this.animations = new Animator(this.spritesheet, 0, 0, 150, 400, 7, .2, 10, false, true);
    }

    // updateBB() {
    //     this.lastBB = this.BB;
    //     this.BB = new BoundingBox(this.x+5, this.y, 20, 75);
    // };


    update() {

    };

    draw(ctx) {
        this.animations.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, .2);
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y, this.leftBB.width, this.leftBB.height);
        ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y, this.rightBB.width, this.rightBB.height);
        ctx.imageSmoothingEnabled = false;

    };

};