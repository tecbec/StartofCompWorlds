// Haku's parameter
var HAKU = {
    INITIAL_POSITION : {X: -85},
    SIZE: 70,
    SCALE: 1, 
    IDLE: {RIGHT: {X: 0, Y: 70}, LEFT: {X: 0, Y: 0}, FRAME: 4, SPEED: .23, PADDING: 0, REVERSE: false, LOOP: true},
    BB_PADDING: {W: 20, H: 8},
    BB_SIZE: {BIG: {W: 35, H: 60}, SMALL: {W: 5, H: 60}}
};

class Haku {
    constructor( game, x, y ) {
        Object.assign(this, { game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/haku_spritesheet.png");

        // default values
        this.dead = false;
        this.deadCounter = 0;

        this.loadAnimations();
        this.updateBB();
    };

    loadAnimations() {
         this.animations = new Animator(this.spritesheet, HAKU.IDLE.RIGHT.X, HAKU.IDLE.RIGHT.Y,
            HAKU.SIZE, HAKU.SIZE,
            HAKU.IDLE.FRAME, HAKU.IDLE.SPEED,
            HAKU.IDLE.PADDING, HAKU.IDLE.REVERSE, HAKU.IDLE.LOOP);
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + HAKU.BB_PADDING.W, this.y + HAKU.BB_PADDING.H, HAKU.BB_SIZE.BIG.W, HAKU.BB_SIZE.BIG.H);
        this.leftBB = new BoundingBox(this.x + HAKU.BB_PADDING.W, this.y + HAKU.BB_PADDING.H, HAKU.BB_SIZE.SMALL.W, HAKU.BB_SIZE.SMALL.H);
        this.rightBB = new BoundingBox(this.BB.right - HAKU.BB_SIZE.SMALL.W, this.y + HAKU.BB_PADDING.H, HAKU.BB_SIZE.SMALL.W, HAKU.BB_SIZE.SMALL.H);
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
        this.animations.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, HAKU.SCALE);
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
