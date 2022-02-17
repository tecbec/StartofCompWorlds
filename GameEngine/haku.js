// Haku's parameter
var HAKU = {
    SIZE: 70,
    SCALE: 2, 
    IDLE: {RIGHT: {X: 0, Y: 70}, LEFT: {X: 0, Y: 0}, FRAME: 4, SPEED: .23, PADDING: 0, REVERSE: false, LOOP: true},
    BB_PADDING: {W: 20, H: 8},
    BB_SIZE: {BIG: {W: 35, H: 60}, SMALL: {W: 5, H: 60}},
    TEXT_ANIMATION: {LOCATION: {X: 0, Y: 0}, SIZE: {W:139, H:67}, FRAME: 12, SPEED: .1, PADDING:0, REVERSE: false, LOOP: true}, // you made it across the bridge!
};

class Haku {
    constructor( game, x, y, text) {
        Object.assign(this, { game, x, y, text});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/haku_spritesheet.png");
        this.textsheet = ASSET_MANAGER.getAsset("./sprites/haku_text.png");

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

        this.textAnim = new Animator(this.textsheet, HAKU.TEXT_ANIMATION.LOCATION.X,  HAKU.TEXT_ANIMATION.LOCATION.Y,
            HAKU.TEXT_ANIMATION.SIZE.W, HAKU.TEXT_ANIMATION.SIZE.H, HAKU.TEXT_ANIMATION.FRAME,
            HAKU.TEXT_ANIMATION.SPEED, HAKU.TEXT_ANIMATION.PADDING, HAKU.TEXT_ANIMATION.REVERSE, HAKU.TEXT_ANIMATION.LOOP);
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + HAKU.BB_PADDING.W*HAKU.SCALE, this.y + HAKU.BB_PADDING.H * HAKU.SCALE, HAKU.BB_SIZE.BIG.W*HAKU.SCALE, HAKU.BB_SIZE.BIG.H * HAKU.SCALE);
        this.leftBB = new BoundingBox(this.x + HAKU.BB_PADDING.W*HAKU.SCALE, this.y + HAKU.BB_PADDING.H *HAKU.SCALE, HAKU.BB_SIZE.SMALL.W, HAKU.BB_SIZE.SMALL.H *HAKU.SCALE);
        this.rightBB = new BoundingBox(this.BB.right - HAKU.BB_SIZE.SMALL.W, this.y + HAKU.BB_PADDING.H *HAKU.SCALE, HAKU.BB_SIZE.SMALL.W, HAKU.BB_SIZE.SMALL.H *HAKU.SCALE);
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
        var blurValues = 50;
        ctx.shadowColor = '#b9c87e';
        ctx.shadowBlur = blurValues;
        this.animations.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, HAKU.SCALE);
        ctx.shadowColor = "transparent"; // remove shadow !
        
        if (this.text == 1 && this.game.camera.chihiro.collideWithHaku) {
            this.textAnim.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x + 20, this.y - 40, 1);  
        }
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
