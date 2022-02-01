// Background's parameter
var BACKGROUND = {
    X: 0,
    Y: 0,
    SIZE: {W: 288, H: 208},
    SCALE: 1,
    CANVAS_SCALE: 3,
    GROUND: {X: 32, Y: 0, SIZE: 32, SCALE: 2},
    PLATFORM: {LEFT: {X: 0, Y: 32}, MID: {X: 16, Y: 32}, RIGHT: {X: 32, Y: 32}, SIZE: 16, SCALE: 2, COUNT: 3, BB_SIZE: {W: 5, H: 16}}
    // PLATFORM_SHORT: {LEFT: {X: 0, Y: 32}, MID: {X: 16, Y: 32}, RIGHT: {X: 32, Y: 32}, SIZE: 16, SCALE: 2, COUNT: 2, BB_SIZE: {W: 5, H: 16}}
    // PLATFORM_LONG: {LEFT: {X: 0, Y: 32}, MID: {X: 16, Y: 32}, RIGHT: {X: 32, Y: 32}, SIZE: 16, SCALE: 2, COUNT: 5, BB_SIZE: {W: 5, H: 16}}
};

class Ground {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/platform_sheet.png");
        this.BB = new BoundingBox(this.x , this.y, this.w, 64);

    };

    update() {

    };

    draw(ctx) {
        let COUNT = PARAMS.CANVAS_WIDTH * BACKGROUND.CANVAS_SCALE / BACKGROUND.GROUND.SIZE * BACKGROUND.GROUND.SCALE;
        for (var i = 0; i < COUNT; i ++) {
            ctx.drawImage(this.spritesheet, BACKGROUND.GROUND.X, BACKGROUND.GROUND.Y,
                BACKGROUND.GROUND.SIZE, BACKGROUND.GROUND.SIZE,
                this.x + BACKGROUND.GROUND.SIZE * BACKGROUND.GROUND.SCALE * i  - this.game.camera.x, this.y,
                BACKGROUND.GROUND.SIZE * BACKGROUND.GROUND.SCALE, BACKGROUND.GROUND.SIZE * BACKGROUND.GROUND.SCALE);
        }
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);  
        }
        ctx.imageSmoothingEnabled = false;
    };

};

class BackGround {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/background.png");      
    }

    update() {

    };

    draw(ctx) {
        let COUNT = PARAMS.CANVAS_WIDTH * BACKGROUND.CANVAS_SCALE / BACKGROUND.SIZE.W * BACKGROUND.SIZE.H * BACKGROUND.SCALE;
        for (var i = 0; i < COUNT; i++) {
             ctx.drawImage(this.spritesheet, BACKGROUND.X, BACKGROUND.Y,
                BACKGROUND.SIZE.W, BACKGROUND.SIZE.H,
                this.x - this.game.camera.x + (PARAMS.CANVAS_WIDTH * i), this.y,
                PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);
        }
        ctx.imageSmoothingEnabled = false;
    }
}

class Platform {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w});
        this.spritesheet = this.spritesheet = ASSET_MANAGER.getAsset("./sprites/platform_sheet.png");
    }

    update() {

    };

    draw(ctx) {

        // left platform
        ctx.drawImage(this.spritesheet, BACKGROUND.PLATFORM.LEFT.X, BACKGROUND.PLATFORM.LEFT.Y,
            BACKGROUND.PLATFORM.SIZE, BACKGROUND.PLATFORM.SIZE,
            this.x - this.game.camera.x, this.y,
            BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE, BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE);

        // default values to draw platform
        let LOCATION = 1;    

        // middle platform
        for (var i = 1; i < BACKGROUND.PLATFORM.COUNT; i++) {
            ctx.drawImage(this.spritesheet, BACKGROUND.PLATFORM.MID.X, BACKGROUND.PLATFORM.MID.Y,
                BACKGROUND.PLATFORM.SIZE, BACKGROUND.PLATFORM.SIZE,
                this.x + BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE - this.game.camera.x, this.y,
                BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE * i, BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE);
                LOCATION++;
        }

        // right platform
        ctx.drawImage(this.spritesheet, BACKGROUND.PLATFORM.RIGHT.X, BACKGROUND.PLATFORM.RIGHT.Y,
            BACKGROUND.PLATFORM.SIZE, BACKGROUND.PLATFORM.SIZE,
            this.x + BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE * LOCATION++ - this.game.camera.x, this.y,
            BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE, BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE);
        
        this.BB = new BoundingBox(this.x, this.y,
            BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE * LOCATION, BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE);

        this.topBB = new BoundingBox(this.x, this.y,
            BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE * LOCATION, BACKGROUND.PLATFORM.BB_SIZE.H);

        this.bottomBB = new BoundingBox(this.x, this.y,
            BACKGROUND.PLATFORM.SIZE * LOCATION, BACKGROUND.PLATFORM.BB_SIZE.H);

        this.leftBB = new BoundingBox(this.x, this.y,
            BACKGROUND.PLATFORM.BB_SIZE.W, BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE);

        this.rightBB = new BoundingBox(this.BB.right - BACKGROUND.PLATFORM.BB_SIZE.W, this.y,
            BACKGROUND.PLATFORM.BB_SIZE.W, BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE);   

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x -this.game.camera.x, this.BB.y, BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE * LOCATION, BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE);    
            ctx.strokeStyle = 'Orange';
            ctx.strokeRect(this.topBB.x - this.game.camera.x, this.topBB.y, this.topBB.width, this.topBB.height);  
            ctx.strokeRect(this.bottomBB.x - this.game.camera.x, this.bottomBB.y, this.bottomBB.width, this.bottomBB.height);  
            ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y, this.leftBB.width, this.leftBB.height);  
            ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y, this.rightBB.width, this.rightBB.height);  
        } 
        ctx.imageSmoothingEnabled = false;
    }
}
