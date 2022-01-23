/**
 * Friendly Spirit Haku
 * Art by Chau 
 */
class Haku {
    constructor( game, x, y ) {
        Object.assign(this, { game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/haku_spritesheet.png");
        this.dead = false;
        this.deadCounter = 0;
        this.spawnCounter = 0;
        this.loadAnimations();
        this.updateBB();

    };

    loadAnimations() {
         this.animations = new Animator(this.spritesheet, 0, 70, 70, 70, 4, .23 ,0, false, true);
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + 20, this.y + 8, 35, 60);
        this.leftBB = new BoundingBox(this.x + 20, this.y + 8, 5, 60);
        this.rightBB = new BoundingBox(this.BB.right - 5, this.y + 8, 5, 60);
    };

    update() {
        if (this.dead) {
            this.deadCounter += this.game.clockTick;
            if (this.deadCounter > 0.75) {
                this.removeFromWorld = true; 
            }      
        } 
    };

    draw(ctx) {
        this.animations.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 1);
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