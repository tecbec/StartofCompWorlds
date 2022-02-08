// Background's parameter
var BACKGROUND = {
    X: 0,
    Y: 0,
    SIZE: {W: 1000, H: 500},
    SCALE: 2,
    GROUND: {X: 32, Y: 0, SIZE: 32, SCALE: 4},
    STONE_LAMP: {X: 0, Y: 0, SIZE: 64, SCALE: 4, BB_SIZE: {W: 10, H: 10}},
    LAMP: {X: 0, Y: 0, SIZE: 64, SCALE:  {W: 3, H: 5}, BB_SIZE: {W: 5, H: 10}, PADDING: {W: 50, H: 13}},
    RAILING: {X: 0, Y: 10, SIZE: 64, SCALE: 2.5, BB_SIZE: {W: 5, H: 10}, PADDING: 20},
    PLATFORM: {LEFT: {X: 0, Y: 32}, MID: {X: 16, Y: 32}, RIGHT: {X: 32, Y: 32}, SIZE: 16, SCALE: 4, COUNT: 2, BB_SIZE: {W: 10, H: 10}},
    CLOUD_PLATFORM: {LEFT: {X: 0, Y: 0}, MID: {X: 0, Y: 0}, RIGHT: {X: 0, Y: 0}, SIZE: 16, SCALE: 4, COUNT: 2, BB_SIZE: {W: 5, H: 16}}
    // PLATFORM_SHORT: {LEFT: {X: 0, Y: 32}, MID: {X: 16, Y: 32}, RIGHT: {X: 32, Y: 32}, SIZE: 16, SCALE: 2, COUNT: 2, BB_SIZE: {W: 5, H: 16}}
    // PLATFORM_LONG: {LEFT: {X: 0, Y: 0}, MID: {X: 16, Y: 32}, RIGHT: {X: 32, Y: 32}, SIZE: 16, SCALE: 2, COUNT: 5, BB_SIZE: {W: 5, H: 16}}
};

class Ground { //bridge
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/platform_sheet.png");
        this.BB = new BoundingBox(this.x , this.y, this.w, BACKGROUND.GROUND.SCALE * BACKGROUND.GROUND.SIZE);
    };
    update() {

    };

    draw(ctx) {
        let COUNT = PARAMS.CANVAS_WIDTH * LEVEL.FRAME_COUNT / BACKGROUND.GROUND.SIZE * BACKGROUND.GROUND.SCALE;
        for (var i = 0; i < COUNT; i ++) {
            ctx.drawImage(this.spritesheet, BACKGROUND.GROUND.X, BACKGROUND.GROUND.Y,
                BACKGROUND.GROUND.SIZE, BACKGROUND.GROUND.SIZE,
                this.x + BACKGROUND.GROUND.SIZE * BACKGROUND.GROUND.SCALE * i  - this.game.camera.x, this.y,
                BACKGROUND.GROUND.SIZE * BACKGROUND.GROUND.SCALE, BACKGROUND.GROUND.SIZE * 7);
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
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/background_nightsky.png");
    }

    update() {

    };

    draw(ctx) {
        // console.log(PARAMS.CANVAS_WIDTH, LEVEL.FRAME_COUNT, BACKGROUND.SIZE.W, BACKGROUND.SIZE.H, BACKGROUND.SCALE)
        let COUNT = PARAMS.CANVAS_WIDTH * LEVEL.FRAME_COUNT / BACKGROUND.SIZE.W * BACKGROUND.SIZE.H * BACKGROUND.SCALE;
        for (var i = 0; i < COUNT; i++) {
             ctx.drawImage(this.spritesheet, BACKGROUND.X, BACKGROUND.Y,
                BACKGROUND.SIZE.W, BACKGROUND.SIZE.H,
                this.x - this.game.camera.x + (PARAMS.CANVAS_WIDTH * i), this.y,
                PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);
        }
        ctx.imageSmoothingEnabled = false;
    }
}

class Platform {  // tree
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

        // this.topBB = new BoundingBox(this.x, this.y,
        //     BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE * LOCATION, BACKGROUND.PLATFORM.BB_SIZE.H);

        // this.bottomBB = new BoundingBox(this.x, this.y,
        //     BACKGROUND.PLATFORM.SIZE * LOCATION, BACKGROUND.PLATFORM.BB_SIZE.H);


        this.leftBB = new BoundingBox(this.x, this.y + 10,
            BACKGROUND.PLATFORM.BB_SIZE.W, BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE - 20);

        this.rightBB = new BoundingBox(this.BB.right - BACKGROUND.PLATFORM.BB_SIZE.W, this.y + 10,
            BACKGROUND.PLATFORM.BB_SIZE.W, BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE - 20);


        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x -this.game.camera.x, this.BB.y, BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE * LOCATION, BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE);    
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y, this.leftBB.width, this.leftBB.height);
            ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y, this.rightBB.width, this.rightBB.height);
        }
        ctx.imageSmoothingEnabled = false;
    }
}

/**
 * Cloud Platforms:
 *  Allow player to jump through from the bottom but not from any other direction.
 */
class CloudPlatform {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w});
        this.spritesheet = this.spritesheet = ASSET_MANAGER.getAsset("./sprites/cloud.png");
    }

    update() {

    };

    draw(ctx) {
        // left platform
        ctx.drawImage(this.spritesheet, BACKGROUND.CLOUD_PLATFORM.LEFT.X, BACKGROUND.CLOUD_PLATFORM.LEFT.Y,
            BACKGROUND.CLOUD_PLATFORM.SIZE, BACKGROUND.CLOUD_PLATFORM.SIZE,
            this.x - this.game.camera.x, this.y,
            BACKGROUND.CLOUD_PLATFORM.SIZE * BACKGROUND.CLOUD_PLATFORM.SCALE, BACKGROUND.CLOUD_PLATFORM.SIZE * BACKGROUND.CLOUD_PLATFORM.SCALE);

        // default values to draw platform
        let LOCATION = 1;

        // middle platform
        for (var i = 1; i < BACKGROUND.CLOUD_PLATFORM.COUNT; i++) {
            ctx.drawImage(this.spritesheet, BACKGROUND.CLOUD_PLATFORM.MID.X, BACKGROUND.CLOUD_PLATFORM.MID.Y,
                BACKGROUND.CLOUD_PLATFORM.SIZE, BACKGROUND.CLOUD_PLATFORM.SIZE,
                this.x + BACKGROUND.CLOUD_PLATFORM.SIZE * BACKGROUND.CLOUD_PLATFORM.SCALE - this.game.camera.x, this.y,
                BACKGROUND.CLOUD_PLATFORM.SIZE * BACKGROUND.CLOUD_PLATFORM.SCALE * i, 
                BACKGROUND.CLOUD_PLATFORM.SIZE * BACKGROUND.CLOUD_PLATFORM.SCALE);
                LOCATION++;
        }

        // right platform
        ctx.drawImage(this.spritesheet, BACKGROUND.CLOUD_PLATFORM.RIGHT.X, BACKGROUND.CLOUD_PLATFORM.RIGHT.Y,
            BACKGROUND.CLOUD_PLATFORM.SIZE, BACKGROUND.CLOUD_PLATFORM.SIZE,
            this.x + BACKGROUND.CLOUD_PLATFORM.SIZE * BACKGROUND.CLOUD_PLATFORM.SCALE * LOCATION++ - this.game.camera.x, this.y,
            BACKGROUND.CLOUD_PLATFORM.SIZE * BACKGROUND.CLOUD_PLATFORM.SCALE, BACKGROUND.CLOUD_PLATFORM.SIZE * BACKGROUND.CLOUD_PLATFORM.SCALE);

        this.BB = new BoundingBox(this.x, this.y,
            BACKGROUND.CLOUD_PLATFORM.SIZE * BACKGROUND.CLOUD_PLATFORM.SCALE * LOCATION, BACKGROUND.CLOUD_PLATFORM.SIZE * BACKGROUND.CLOUD_PLATFORM.SCALE);

        // this.topBB = new BoundingBox(this.x, this.y,
        //     BACKGROUND.CLOUD_PLATFORM.SIZE * BACKGROUND.CLOUD_PLATFORM.SCALE * LOCATION, BACKGROUND.CLOUD_PLATFORM.BB_SIZE.H);

        // this.bottomBB = new BoundingBox(this.x, this.y,
        //     BACKGROUND.CLOUD_PLATFORM.SIZE * BACKGROUND.CLOUD_PLATFORM.SCALE * LOCATION, BACKGROUND.CLOUD_PLATFORM.BB_SIZE.H);

        this.leftBB = new BoundingBox(this.x, this.y,
            BACKGROUND.CLOUD_PLATFORM.BB_SIZE.W, BACKGROUND.CLOUD_PLATFORM.SIZE * BACKGROUND.CLOUD_PLATFORM.SCALE);

        this.rightBB = new BoundingBox(this.BB.right - BACKGROUND.CLOUD_PLATFORM.BB_SIZE.W, this.y,
            BACKGROUND.CLOUD_PLATFORM.BB_SIZE.W, BACKGROUND.CLOUD_PLATFORM.SIZE * BACKGROUND.CLOUD_PLATFORM.SCALE);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x -this.game.camera.x, this.BB.y,
                 BACKGROUND.CLOUD_PLATFORM.SIZE * BACKGROUND.CLOUD_PLATFORM.SCALE * LOCATION,
                 BACKGROUND.CLOUD_PLATFORM.SIZE * BACKGROUND.CLOUD_PLATFORM.SCALE);
            ctx.strokeStyle = 'Orange';
            // ctx.strokeRect(this.topBB.x - this.game.camera.x, this.topBB.y, this.topBB.width, this.topBB.height);
            // ctx.strokeRect(this.bottomBB.x - this.game.camera.x, this.bottomBB.y, this.bottomBB.width, this.bottomBB.height);
            ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y, this.leftBB.width, this.leftBB.height);
            ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y, this.rightBB.width, this.rightBB.height);
        }
        ctx.imageSmoothingEnabled = false;
    }
}


/**
 * StoneLamp
 * Allows walking on top of it but not through.
 */
class StoneLamp {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w});
        this.spritesheet = this.spritesheet = ASSET_MANAGER.getAsset("./sprites/stonelamp.png");
    }

    update() {

    };

    draw(ctx) {

        ctx.drawImage(this.spritesheet, BACKGROUND.STONE_LAMP.X, BACKGROUND.STONE_LAMP.Y,
            BACKGROUND.STONE_LAMP.SIZE, BACKGROUND.STONE_LAMP.SIZE,
            this.x - this.game.camera.x, this.y,
            BACKGROUND.STONE_LAMP.SIZE * BACKGROUND.STONE_LAMP.SCALE, BACKGROUND.STONE_LAMP.SIZE * BACKGROUND.STONE_LAMP.SCALE);

        this.BB = new BoundingBox(this.x, this.y,
            BACKGROUND.STONE_LAMP.SIZE * BACKGROUND.STONE_LAMP.SCALE, BACKGROUND.STONE_LAMP.SIZE * BACKGROUND.STONE_LAMP.SCALE);

        // this.topBB = new BoundingBox(this.x, this.y,
        //     BACKGROUND.STONE_LAMP.SIZE * BACKGROUND.STONE_LAMP.SCALE, BACKGROUND.STONE_LAMP.BB_SIZE.H);

        // this.bottomBB = new BoundingBox(this.x, this.y ,
        //     BACKGROUND.STONE_LAMP.SIZE * BACKGROUND.STONE_LAMP.SCALE, BACKGROUND.STONE_LAMP.BB_SIZE.H);

        this.leftBB = new BoundingBox(this.x, this.y + 10,
            BACKGROUND.STONE_LAMP.BB_SIZE.W, BACKGROUND.STONE_LAMP.SIZE * BACKGROUND.STONE_LAMP.SCALE - 20);

        this.rightBB = new BoundingBox(this.BB.right - BACKGROUND.STONE_LAMP.BB_SIZE.W, this.y + 10,
            BACKGROUND.STONE_LAMP.BB_SIZE.W, BACKGROUND.STONE_LAMP.SIZE * BACKGROUND.STONE_LAMP.SCALE - 20);

        if (PARAMS.DEBUG) {
            // ctx.lineWidth = 2;
            ctx.strokeStyle = 'Green';
            ctx.strokeRect(this.BB.x -this.game.camera.x, this.BB.y,
                BACKGROUND.STONE_LAMP.SIZE * BACKGROUND.STONE_LAMP.SCALE,
                BACKGROUND.STONE_LAMP.SIZE * BACKGROUND.STONE_LAMP.SCALE);
            // ctx.lineWidth = 10;
            ctx.strokeStyle = 'Red';
            // ctx.strokeRect(this.topBB.x - this.game.camera.x, this.topBB.y, this.topBB.width, this.topBB.height);
            // ctx.strokeRect(this.bottomBB.x - this.game.camera.x, this.bottomBB.y, this.bottomBB.width, this.bottomBB.height);
            ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y, this.leftBB.width, this.leftBB.height);
            ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y, this.rightBB.width, this.rightBB.height);
        }
        ctx.imageSmoothingEnabled = false;
    }
}

/**
 * Lamp
 *  Allows player to walk on top and through
 */
class Lamp {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w});
        this.spritesheet = this.spritesheet = ASSET_MANAGER.getAsset("./sprites/lamp.png");
        this.BB = new BoundingBox(this.x+BACKGROUND.LAMP.PADDING.W, this.y,
            BACKGROUND.LAMP.SIZE * BACKGROUND.LAMP.SCALE.W-BACKGROUND.LAMP.PADDING.W + 20, BACKGROUND.LAMP.SIZE * BACKGROUND.LAMP.SCALE.H);

        // this.topBB = new BoundingBox(this.x+BACKGROUND.LAMP.PADDING.W, this.y+BACKGROUND.LAMP.PADDING.H,
        //     BACKGROUND.LAMP.SIZE * BACKGROUND.LAMP.SCALE.W-BACKGROUND.LAMP.PADDING.W, BACKGROUND.LAMP.BB_SIZE.H);

    }

    update() {

    };

    draw(ctx) {

        ctx.drawImage(this.spritesheet, BACKGROUND.LAMP.X, BACKGROUND.LAMP.Y,
            BACKGROUND.LAMP.SIZE, BACKGROUND.LAMP.SIZE,
            this.x - this.game.camera.x, this.y,
            BACKGROUND.LAMP.SIZE * BACKGROUND.LAMP.SCALE.W, BACKGROUND.LAMP.SIZE * BACKGROUND.LAMP.SCALE.H);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x -this.game.camera.x, this.BB.y,
                this.BB.width,
                this.BB.height);
            // ctx.strokeStyle = 'Orange';
            // ctx.strokeRect(this.topBB.x - this.game.camera.x, this.topBB.y, this.topBB.width, this.topBB.height);
        }
        ctx.imageSmoothingEnabled = false;
    }
}

/**
 * Railing
 *  Allows player to walk on top and through
 */

class Railing {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w});
        this.spritesheet = this.spritesheet = ASSET_MANAGER.getAsset("./sprites/railing.png");
       this.BB = new BoundingBox(this.x, this.y,
           this.w, BACKGROUND.RAILING.SIZE * BACKGROUND.RAILING.SCALE);
       this.topBB = new BoundingBox(this.x, this.y+BACKGROUND.RAILING.PADDING,
           this.w,  BACKGROUND.RAILING.BB_SIZE.H);
    }

    update() {

    };

    draw(ctx) {
        let COUNT = PARAMS.CANVAS_WIDTH * LEVEL.FRAME_COUNT / BACKGROUND.RAILING.SIZE * BACKGROUND.RAILING.SCALE;
        for (var i = 0; i < COUNT; i ++) {
            ctx.drawImage(this.spritesheet, BACKGROUND.RAILING.X, BACKGROUND.RAILING.Y,
                BACKGROUND.RAILING.SIZE, BACKGROUND.RAILING.SIZE,
                this.x + BACKGROUND.RAILING.SIZE * BACKGROUND.RAILING.SCALE * i  - this.game.camera.x, this.y,
                BACKGROUND.RAILING.SIZE * BACKGROUND.RAILING.SCALE, BACKGROUND.RAILING.SIZE * BACKGROUND.RAILING.SCALE);
        }

       if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x -this.game.camera.x, this.BB.y,
              this.BB.width,//  BACKGROUND.RAILING.SIZE * BACKGROUND.RAILING.SCALE,
                this.BB.height);//BACKGROUND.RAILING.SIZE * BACKGROUND.RAILING.SCALE);
            ctx.strokeStyle = 'Orange';
            ctx.strokeRect(this.topBB.x - this.game.camera.x, this.topBB.y, this.topBB.width, this.topBB.height);
        }
        ctx.imageSmoothingEnabled = false;
    }
}