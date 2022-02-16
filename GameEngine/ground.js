// Background's parameter
var BACKGROUND = {
    X: 0,
    Y: 0,
    SIZE: {W: 1000, H: 500},
    SCALE: 2,
    GROUND: {X: 32, Y: 0, SIZE: 32, SCALE: 4},
    STONE_LAMP: {X: 0, Y: 0, SIZE: {X:71, Y:142 }, SCALE:{ X:3, Y: 2}, BB_SIZE: {W: 10, H: 10}},
    LAMP: {X: 0, Y: 0, SIZE: 64, SCALE:  {W: 3, H: 5}, BB_SIZE: {W: 5, H: 10}, PADDING: {W: 50, H: 13}},
    RAILING: {X: 0, Y: 10, SIZE: 64, SCALE: 2.5, BB_SIZE: {W: 5, H: 10}, PADDING: 20},
    PLATFORM: {LEFT: {X: 0, Y: 32}, MID: {X: 16, Y: 32}, RIGHT: {X: 32, Y: 32}, SIZE: 16, SCALE: 4, COUNT: 2, BB_SIZE: {W: 10, H: 10}},
    CLOUD: {X: 0, Y: 0, WIDTH: 192, HEIGHT:64, SCALE: 1},
    CLOUD_BB:[{W: 64, H: 54}, {W: 64, H: 54}, {W: 128, H: 54}, {W: 148, H: 54}, {W: 192, H: 54}],
    BATHHOUSE: {X:0, Y: 0, W: 987, H: 1104}
};

class TitlePlaque { //bridge
    constructor() {
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/title.png");
    };
    update() {

    };

    draw(ctx) {
        var width = 800;
        var height = 200;
        ctx.drawImage(this.spritesheet, 
                      PARAMS.CANVAS_WIDTH / 2 - width * PARAMS.SCALE / 2 , PARAMS.CANVAS_HEIGHT / 2 - height * PARAMS.SCALE, 
                      width * PARAMS.SCALE, height * PARAMS.SCALE);
        ctx.imageSmoothingEnabled = false;
    };

};

class Bathhouse {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/Bathhouse.png");
    }

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 
            BACKGROUND.BATHHOUSE.X, BACKGROUND.BATHHOUSE.Y,  BACKGROUND.BATHHOUSE.W,  BACKGROUND.BATHHOUSE.H,
            this.x - this.game.camera.x, this.y, 
            BACKGROUND.BATHHOUSE.W *  PARAMS.SCALE, BACKGROUND.BATHHOUSE.H *  PARAMS.SCALE);
        ctx.imageSmoothingEnabled = false;
    }
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
        // console.log(COUNT);
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
    constructor(game, x, y, w, type) { 
        Object.assign(this, { game, x, y, w, type});
        this.spritesheet = this.spritesheet = ASSET_MANAGER.getAsset("./sprites/platform_sheet.png");
    }

    update() {

    };

    draw(ctx) {
        let LOCATION = 1;
        if (this.type == 0) { // long platforms - 2 count.
            // left platform
            ctx.drawImage(this.spritesheet, BACKGROUND.PLATFORM.LEFT.X, BACKGROUND.PLATFORM.LEFT.Y,
                BACKGROUND.PLATFORM.SIZE, BACKGROUND.PLATFORM.SIZE,
                this.x - this.game.camera.x, this.y,
                BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE, BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE);

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

            this.leftBB = new BoundingBox(this.x, this.y + 20,
                BACKGROUND.PLATFORM.BB_SIZE.W, BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE - 40);

            this.rightBB = new BoundingBox(this.BB.right - BACKGROUND.PLATFORM.BB_SIZE.W, this.y + 20,
                BACKGROUND.PLATFORM.BB_SIZE.W, BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE - 40);
        }

        if (this.type == 1) { // small platforms (just middle piece)
            ctx.drawImage(this.spritesheet, BACKGROUND.PLATFORM.MID.X, BACKGROUND.PLATFORM.MID.Y,
                BACKGROUND.PLATFORM.SIZE, BACKGROUND.PLATFORM.SIZE,
                this.x - this.game.camera.x, this.y,
                BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE, BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE);
            this.BB = new BoundingBox(this.x, this.y,
                BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE * LOCATION, BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE);

            this.leftBB = new BoundingBox(this.x, this.y + 20,
                BACKGROUND.PLATFORM.BB_SIZE.W, BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE - 40);

            this.rightBB = new BoundingBox(this.BB.right - BACKGROUND.PLATFORM.BB_SIZE.W, this.y + 20,
                BACKGROUND.PLATFORM.BB_SIZE.W, BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE - 40);
        }


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
    constructor(game, x, y, size) {
        Object.assign(this, { game, x, y, size});
        this.spritesheet = this.spritesheet = ASSET_MANAGER.getAsset("./sprites/cloud-Sheet.png");

        this.BB = new BoundingBox(this.x + 5 , this.y + 10, 
            BACKGROUND.CLOUD_BB[this.size].W * BACKGROUND.CLOUD.SCALE - 10, 
            BACKGROUND.CLOUD_BB[this.size].H * BACKGROUND.CLOUD.SCALE); 
    }

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 
                BACKGROUND.CLOUD.X, BACKGROUND.CLOUD.Y + BACKGROUND.CLOUD.HEIGHT * this.size,
                BACKGROUND.CLOUD.WIDTH, BACKGROUND.CLOUD.HEIGHT,
                this.x  - this.game.camera.x, this.y,
                BACKGROUND.CLOUD.WIDTH * BACKGROUND.CLOUD.SCALE, 
                BACKGROUND.CLOUD.HEIGHT * BACKGROUND.CLOUD.SCALE);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
        ctx.imageSmoothingEnabled = false;
    };

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
            BACKGROUND.STONE_LAMP.SIZE.X, BACKGROUND.STONE_LAMP.SIZE.Y,
            this.x - this.game.camera.x, this.y,
            BACKGROUND.STONE_LAMP.SIZE.X * BACKGROUND.STONE_LAMP.SCALE.X, BACKGROUND.STONE_LAMP.SIZE.Y * BACKGROUND.STONE_LAMP.SCALE.Y);

        this.BB = new BoundingBox(this.x , this.y ,
            (BACKGROUND.STONE_LAMP.SIZE.X) * BACKGROUND.STONE_LAMP.SCALE.X,( BACKGROUND.STONE_LAMP.SIZE.Y )* BACKGROUND.STONE_LAMP.SCALE.Y);

        this.leftBB = new BoundingBox(this.x, this.y + 20,
            BACKGROUND.STONE_LAMP.BB_SIZE.W, BACKGROUND.STONE_LAMP.SIZE * BACKGROUND.STONE_LAMP.SCALE - 40);

        this.rightBB = new BoundingBox(this.BB.right - BACKGROUND.STONE_LAMP.BB_SIZE.W, this.y ,
            BACKGROUND.STONE_LAMP.BB_SIZE.W, BACKGROUND.STONE_LAMP.SIZE.Y * BACKGROUND.STONE_LAMP.SCALE.Y );

        if (PARAMS.DEBUG) {
            // ctx.lineWidth = 2;
            ctx.strokeStyle = 'Green';
            ctx.strokeRect(this.BB.x -this.game.camera.x, this.BB.y,
                BACKGROUND.STONE_LAMP.SIZE.X * BACKGROUND.STONE_LAMP.SCALE.X,
                BACKGROUND.STONE_LAMP.SIZE.Y * BACKGROUND.STONE_LAMP.SCALE.Y);
            // ctx.lineWidth = 10;
            ctx.strokeStyle = 'Red';
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
                this.BB.width,  //BACKGROUND.RAILING.SIZE * BACKGROUND.RAILING.SCALE,
                this.BB.height);//BACKGROUND.RAILING.SIZE * BACKGROUND.RAILING.SCALE);
            ctx.strokeStyle = 'Orange';
            ctx.strokeRect(this.topBB.x - this.game.camera.x, this.topBB.y, this.topBB.width, this.topBB.height);
        }
        ctx.imageSmoothingEnabled = false;
    }
}