// Background's parameter
var BACKGROUND = {
    X: 0,
    Y: 0,
    SIZE: {W: 1000, H: 500},
    SCALE: 2,
    GROUND: {X: 32, Y: 0, SIZE: 32, SCALE: 4},
    STONE_LAMP: {X: 0, Y: 0, SIZE: {W:45, H:142 }, SCALE:{ X:4, Y: 5}, BB_SIZE: {W: 10, H: 10}},
    LAMP: {X: 0, Y: 0, SIZE: {W: 107, H:188}, SCALE:  {W: 2, H: 2}, BB_SIZE: {W: 5, H: 10}, PADDING: {W: 40, H: 10}},
    RAILING: {X: 0, Y: 10, SIZE: 64, SCALE: 2.5, BB_SIZE: {W: 5, H: 10}, PADDING: 20},
    PLATFORM: {LEFT: {X: 0, Y: 32}, MID: {X: 16, Y: 32}, RIGHT: {X: 32, Y: 32}, SIZE: 16, SCALE: 4, COUNT: 2, BB_SIZE: {W: 10, H: 10}},
    CLOUD_PLATFORM: {LEFT: {X: 0, Y: 0}, MID: {X: 0, Y: 0}, RIGHT: {X: 0, Y: 0}, SIZE: 16, SCALE: 4, COUNT: 2, BB_SIZE: {W: 5, H: 16}},
    CLOUD: {X: 0, Y: 0, WIDTH: 192, HEIGHT:64, SCALE: 1},
    CLOUD_BB:[{W: 64, H: 54}, {W: 64, H: 54}, {W: 128, H: 54}, {W: 148, H: 54}, {W: 192, H: 54}],
    BATHHOUSE: {X:0, Y: 0, W: 987, H: 1104},
    FIREWORKS:      [{X: -600, Y: 50,       SPRITEX: 0, SPRITEY: 0,     NUM_FRAMES: 21,     DUR: 0.1,       SCALE: 5},      // index = 0 
                    {X: 100,   Y: 250,      SPRITEX: 0, SPRITEY: 64,    NUM_FRAMES: 21,     DUR: 0.15 ,      SCALE: 5},      // index = 1 
                    {X: 750,   Y: 100,       SPRITEX: 0, SPRITEY: 128,   NUM_FRAMES: 21,     DUR: 0.1,       SCALE: 4},      // index = 2 
                    {X: -300,  Y: 500,      SPRITEX: 0, SPRITEY: 192,   NUM_FRAMES: 21,     DUR: 0.15,       SCALE: 2},     // index = 3 
                    {X: 500,   Y: 550,      SPRITEX: 0, SPRITEY: 384,   NUM_FRAMES: 21,     DUR: 0.1,       SCALE: 2}],     // index = 4 

    BUTTONS:       [{X: -10,   Y: 700,      SPRITEX: 0, SPRITEY: 0,     SWIDTH: 48,         SHEIGHT: 16,    SCALE: 4},
                    {X: 125,   Y: 1045,     SPRITEX: 0, SPRITEY: 16,    SWIDTH: 48,         SHEIGHT: 16,    SCALE: 1.5},
                    {X: 250,   Y: 1045,     SPRITEX: 0, SPRITEY: 32,    SWIDTH: 48,         SHEIGHT: 16,    SCALE: 1.5}],

    VOLUMEUP:      {X: 475,   Y: 1000,      SPRITEX: 0, SPRITEY: 16,     SWIDTH: 16,         SHEIGHT: 16,    SCALE: 2},
    VOLUMEDOWN:    {X: 475,   Y: 1040,      SPRITEX: 0, SPRITEY: 0,      SWIDTH: 16,         SHEIGHT: 16,    SCALE: 2},
    VOLUMESIGN:    {X: 375,   Y: 1045,      SPRITEX: 0, SPRITEY: 32,     SWIDTH: 64,         SHEIGHT: 16,    SCALE: 1.5},

    // PLATFORM_SHORT: {LEFT: {X: 0, Y: 32}, MID: {X: 16, Y: 32}, RIGHT: {X: 32, Y: 32}, SIZE: 16, SCALE: 2, COUNT: 2, BB_SIZE: {W: 5, H: 16}}
    // PLATFORM_LONG: {LEFT: {X: 0, Y: 0}, MID: {X: 16, Y: 32}, RIGHT: {X: 32, Y: 32}, SIZE: 16, SCALE: 2, COUNT: 5, BB_SIZE: {W: 5, H: 16}}
};

class TitlePlaque { //bridge
    constructor(game) {
        Object.assign(this, {game});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/title.png");

        this.x = -650;
        this.y = 250;
        this.velocity = {x: 100};

        this.spritedim = {height: 160, width: 784};
        this.spritestart = {x: 0, y: 0};
        const frames = 13; //13
        const framedur = 0.2;
        const pad = 0;

        this.count = 0;

        this.animations = new Animator(this.spritesheet, this.spritestart.x, this.spritestart.y, this.spritedim.width, this.spritedim.height, frames, framedur, pad, false, true);
        this.animation = new Animator(  this.spritesheet,
                                        this.spritestart.x + (12 * this.spritedim.width) ,   this.spritestart.y,
                                        this.spritedim.width,                               this.spritedim.height,
                                        1, 100000000, pad, false, false);
    };

    update() {
    };

    draw(ctx) {
        var width = 800;
        var height = 200;

        this.count++;

        if(this.count < 85) {
            this.animations.drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y, 2);
        } else {

            this.animation.drawFrame(this.game.clockTick, ctx, this.x-this.game.camera.x, this.y, 2);
        }
        ctx.imageSmoothingEnabled = false;
    };
};

class TitleButtons {
    constructor(game) {
        Object.assign(this, { game});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/title-buttons.png");
        this.volumesprite = ASSET_MANAGER.getAsset("./sprites/volume.png");
        this.mute = true;
        this.up = false;
        this.down = false; 
    }

    update() {
    };

    draw(ctx) {
        if(this.game.camera.title) {
            if (this.game.mouse && this.game.mouse.y > 700 && this.game.mouse.y < 750 && this.game.mouse.x > 815  && this.game.mouse.x < 1003) {   // Start
                ctx.drawImage(  this.spritesheet,
                    BACKGROUND.BUTTONS[0].SPRITEX+BACKGROUND.BUTTONS[0].SWIDTH,     BACKGROUND.BUTTONS[0].SPRITEY,             // x and y of the spritesheet
                    BACKGROUND.BUTTONS[0].SWIDTH,                                   BACKGROUND.BUTTONS[0].SHEIGHT,             // width and height of the spritesheet
                    BACKGROUND.BUTTONS[0].X-this.game.camera.x,                     BACKGROUND.BUTTONS[0].Y,                   // x and y of the canvas
                    BACKGROUND.BUTTONS[0].SWIDTH * BACKGROUND.BUTTONS[0].SCALE,      BACKGROUND.BUTTONS[0].SHEIGHT * BACKGROUND.BUTTONS[0].SCALE);                      // width and height of the canvas
            } else {
                ctx.drawImage(  this.spritesheet,
                    BACKGROUND.BUTTONS[0].SPRITEX,                                  BACKGROUND.BUTTONS[0].SPRITEY,             // x and y of the spritesheet
                    BACKGROUND.BUTTONS[0].SWIDTH,                                   BACKGROUND.BUTTONS[0].SHEIGHT,             // width and height of the spritesheet
                    BACKGROUND.BUTTONS[0].X-this.game.camera.x,                     BACKGROUND.BUTTONS[0].Y,                   // x and y of the canvas
                    BACKGROUND.BUTTONS[0].SWIDTH * BACKGROUND.BUTTONS[0].SCALE,     BACKGROUND.BUTTONS[0].SHEIGHT * BACKGROUND.BUTTONS[0].SCALE);                      // width and height of the canvas
            }
        }

        // if (this.game.mouse && this.game.mouse.y > 1040 && this.game.mouse.y < 1100 && this.game.mouse.x < 200 && this.game.mouse.x > 100 ) { // Debug
        if (PARAMS.DEBUG === true) { // Debug
            ctx.drawImage(  this.spritesheet,
                BACKGROUND.BUTTONS[1].SPRITEX+BACKGROUND.BUTTONS[1].SWIDTH,     BACKGROUND.BUTTONS[1].SPRITEY,             // x and y of the spritesheet
                BACKGROUND.BUTTONS[1].SWIDTH,                                   BACKGROUND.BUTTONS[1].SHEIGHT,             // width and height of the spritesheet
                BACKGROUND.BUTTONS[1].X,                                        BACKGROUND.BUTTONS[1].Y,                   // x and y of the canvas
                BACKGROUND.BUTTONS[1].SWIDTH * BACKGROUND.BUTTONS[1].SCALE,      BACKGROUND.BUTTONS[1].SHEIGHT * BACKGROUND.BUTTONS[1].SCALE);                      // width and height of the canvas
        } else {
            ctx.drawImage(  this.spritesheet,
                BACKGROUND.BUTTONS[1].SPRITEX,                                  BACKGROUND.BUTTONS[1].SPRITEY,             // x and y of the spritesheet
                BACKGROUND.BUTTONS[1].SWIDTH,                                   BACKGROUND.BUTTONS[1].SHEIGHT,             // width and height of the spritesheet
                BACKGROUND.BUTTONS[1].X,                                        BACKGROUND.BUTTONS[1].Y,                   // x and y of the canvas
                BACKGROUND.BUTTONS[1].SWIDTH * BACKGROUND.BUTTONS[1].SCALE,     BACKGROUND.BUTTONS[1].SHEIGHT * BACKGROUND.BUTTONS[1].SCALE);                      // width and height of the canvas
        }

        if (this.mute === true) {   // Mute
            ctx.drawImage(  this.spritesheet,
                BACKGROUND.BUTTONS[2].SPRITEX+BACKGROUND.BUTTONS[2].SWIDTH,      BACKGROUND.BUTTONS[2].SPRITEY,             // x and y of the spritesheet
                BACKGROUND.BUTTONS[2].SWIDTH,                                    BACKGROUND.BUTTONS[2].SHEIGHT,             // width and height of the spritesheet
                BACKGROUND.BUTTONS[2].X,                                         BACKGROUND.BUTTONS[2].Y,                   // x and y of the canvas
                BACKGROUND.BUTTONS[2].SWIDTH * BACKGROUND.BUTTONS[2].SCALE,      BACKGROUND.BUTTONS[2].SHEIGHT * BACKGROUND.BUTTONS[2].SCALE);                      // width and height of the canvas
        } else {
            ctx.drawImage(  this.spritesheet,
                BACKGROUND.BUTTONS[2].SPRITEX,                                  BACKGROUND.BUTTONS[2].SPRITEY,             // x and y of the spritesheet
                BACKGROUND.BUTTONS[2].SWIDTH,                                   BACKGROUND.BUTTONS[2].SHEIGHT,             // width and height of the spritesheet
                BACKGROUND.BUTTONS[2].X,                                        BACKGROUND.BUTTONS[2].Y,                   // x and y of the canvas
                BACKGROUND.BUTTONS[2].SWIDTH * BACKGROUND.BUTTONS[2].SCALE,     BACKGROUND.BUTTONS[2].SHEIGHT * BACKGROUND.BUTTONS[2].SCALE);                      // width and height of the canvas
        }

        ctx.drawImage(  this.volumesprite,
            BACKGROUND.VOLUMESIGN.SPRITEX,                                  BACKGROUND.VOLUMESIGN.SPRITEY,             // x and y of the spritesheet
            BACKGROUND.VOLUMESIGN.SWIDTH,                                   BACKGROUND.VOLUMESIGN.SHEIGHT,             // width and height of the spritesheet
            BACKGROUND.VOLUMESIGN.X,                                        BACKGROUND.VOLUMESIGN.Y,                   // x and y of the canvas
            BACKGROUND.VOLUMESIGN.SWIDTH * BACKGROUND.VOLUMESIGN.SCALE,     BACKGROUND.VOLUMESIGN.SHEIGHT * BACKGROUND.VOLUMESIGN.SCALE);                      // width and height of the canvas


        if (this.game.mouse && this.game.mouse.y > 1000 && this.game.mouse.y < 1032 && this.game.mouse.x > 475  && this.game.mouse.x < 510) {   // volume up
            ctx.drawImage(  this.volumesprite,
                BACKGROUND.VOLUMEUP.SPRITEX,                                  BACKGROUND.VOLUMEUP.SPRITEY,             // x and y of the spritesheet
                BACKGROUND.VOLUMEUP.SWIDTH,                                   BACKGROUND.VOLUMEUP.SHEIGHT,             // width and height of the spritesheet
                BACKGROUND.VOLUMEUP.X,                                        BACKGROUND.VOLUMEUP.Y,                   // x and y of the canvas
                BACKGROUND.VOLUMEUP.SWIDTH * BACKGROUND.VOLUMEUP.SCALE,     BACKGROUND.VOLUMEUP.SHEIGHT * BACKGROUND.VOLUMEUP.SCALE);                      // width and height of the canvas
        } else {
            ctx.drawImage (  this.volumesprite,
                BACKGROUND.VOLUMEUP.SPRITEX+BACKGROUND.VOLUMEUP.SWIDTH,      BACKGROUND.VOLUMEUP.SPRITEY,             // x and y of the spritesheet
                BACKGROUND.VOLUMEUP.SWIDTH,                                    BACKGROUND.VOLUMEUP.SHEIGHT,             // width and height of the spritesheet
                BACKGROUND.VOLUMEUP.X,                                         BACKGROUND.VOLUMEUP.Y,                   // x and y of the canvas
                BACKGROUND.VOLUMEUP.SWIDTH * BACKGROUND.VOLUMEUP.SCALE,      BACKGROUND.VOLUMEUP.SHEIGHT * BACKGROUND.VOLUMEUP.SCALE);                      // width and height of the canvas
        }

        if (this.game.mouse && this.game.mouse.y > 1040 && this.game.mouse.y < 1072 && this.game.mouse.x > 475  && this.game.mouse.x < 510)  {   // volume up
            ctx.drawImage(  this.volumesprite,
                BACKGROUND.VOLUMEDOWN.SPRITEX,                                  BACKGROUND.VOLUMEDOWN.SPRITEY,             // x and y of the spritesheet
                BACKGROUND.VOLUMEDOWN.SWIDTH,                                   BACKGROUND.VOLUMEDOWN.SHEIGHT,             // width and height of the spritesheet
                BACKGROUND.VOLUMEDOWN.X,                                        BACKGROUND.VOLUMEDOWN.Y,                   // x and y of the canvas
                BACKGROUND.VOLUMEDOWN.SWIDTH * BACKGROUND.VOLUMEDOWN.SCALE,     BACKGROUND.VOLUMEDOWN.SHEIGHT * BACKGROUND.VOLUMEDOWN.SCALE);                      // width and height of the canvas
        } else {
            ctx.drawImage(  this.volumesprite,
                BACKGROUND.VOLUMEDOWN.SPRITEX+BACKGROUND.VOLUMEDOWN.SWIDTH,      BACKGROUND.VOLUMEDOWN.SPRITEY,             // x and y of the spritesheet
                BACKGROUND.VOLUMEDOWN.SWIDTH,                                    BACKGROUND.VOLUMEDOWN.SHEIGHT,             // width and height of the spritesheet
                BACKGROUND.VOLUMEDOWN.X,                                         BACKGROUND.VOLUMEDOWN.Y,                   // x and y of the canvas
                BACKGROUND.VOLUMEDOWN.SWIDTH * BACKGROUND.VOLUMEDOWN.SCALE,      BACKGROUND.VOLUMEDOWN.SHEIGHT * BACKGROUND.VOLUMEDOWN.SCALE);                      // width and height of the canvas   
        }
        ctx.imageSmoothingEnabled = false;
    }
};


class Fireworks {                   //Firework animation
    constructor(game) {
        Object.assign(this, {game});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/Firework-animation.png");
        this.velocity = {x: 100};

        this.spritedim = {height: 64, width: 64};
        this.pad = 0;
        this.count = 0;
        this.loadAnimations();
    };

    loadAnimations() {
        this.animations = []
        for(let i = 0; i < 3; i++) { // 0 - 2  BACKGROUND.FIREWORKS.length = 4
            this.animations[i] = new Animator(  this.spritesheet, 
                                                BACKGROUND.FIREWORKS[i].SPRITEX,     BACKGROUND.FIREWORKS[i].SPRITEY, 
                                                this.spritedim.width,             this.spritedim.height, 
                                                BACKGROUND.FIREWORKS[i].NUM_FRAMES, BACKGROUND.FIREWORKS[i].DUR, this.pad, false, true);
        }

        this.animations[3] = new Animator(  this.spritesheet, 
                                                    BACKGROUND.FIREWORKS[3].SPRITEX,     BACKGROUND.FIREWORKS[3].SPRITEY, 
                                                    this.spritedim.width,             this.spritedim.height*3, 
                                                    BACKGROUND.FIREWORKS[3].NUM_FRAMES, BACKGROUND.FIREWORKS[3].DUR, this.pad, false, true);

        this.animations[4] = new Animator(  this.spritesheet, 
                                                     BACKGROUND.FIREWORKS[4].SPRITEX,     BACKGROUND.FIREWORKS[4].SPRITEY, 
                                                    this.spritedim.width,             this.spritedim.height*3, 
                                                     BACKGROUND.FIREWORKS[4].NUM_FRAMES, BACKGROUND.FIREWORKS[4].DUR, this.pad, false, true);
    };

    update() {
    };

    draw(ctx) {
        this.count++;
        this.fireCount = [85, 105, 125, 155, 190];
        this.fireDur = [110, 121, 160, 200, 245];

        // first display of each
        if (this.count > this.fireCount[0] && this.count < this.fireDur[0]) {
            this.animations[2].drawFrame(this.game.clockTick, ctx, BACKGROUND.FIREWORKS[2].X-this.game.camera.x, BACKGROUND.FIREWORKS[2].Y, BACKGROUND.FIREWORKS[2].SCALE);

        }
        if (this.count > this.fireCount[1]  && this.count < this.fireDur[1] ) {
            this.animations[0].drawFrame(this.game.clockTick, ctx, BACKGROUND.FIREWORKS[0].X-this.game.camera.x, BACKGROUND.FIREWORKS[0].Y, BACKGROUND.FIREWORKS[0].SCALE);
        }
        if (this.count > this.fireCount[2]  && this.count < this.fireDur[2] ) {
            this.animations[1].drawFrame(this.game.clockTick, ctx, BACKGROUND.FIREWORKS[1].X-this.game.camera.x, BACKGROUND.FIREWORKS[1].Y, BACKGROUND.FIREWORKS[1].SCALE);
        }

        if (this.count > this.fireCount[3] && this.count < this.fireDur[3]) {
            this.animations[3].drawFrame(this.game.clockTick, ctx, BACKGROUND.FIREWORKS[3].X-this.game.camera.x, 
                                            BACKGROUND.FIREWORKS[3].Y, BACKGROUND.FIREWORKS[3].SCALE);
        }

        if (this.count > this.fireCount[4] && this.count < this.fireDur[4]) {
            this.animations[4].drawFrame(this.game.clockTick, ctx, BACKGROUND.FIREWORKS[4].X-this.game.camera.x, 
                                            BACKGROUND.FIREWORKS[4].Y, BACKGROUND.FIREWORKS[4].SCALE);
        }

        // start the periodic presentation of the fireworks
        if (this.count > 130) {
                this.animations[0].drawFrame(this.game.clockTick, ctx, BACKGROUND.FIREWORKS[0].X-this.game.camera.x, BACKGROUND.FIREWORKS[0].Y, BACKGROUND.FIREWORKS[0].SCALE);
        }
        if (this.count > 150) {
            this.animations[2].drawFrame(this.game.clockTick, ctx, BACKGROUND.FIREWORKS[2].X-this.game.camera.x, BACKGROUND.FIREWORKS[2].Y, BACKGROUND.FIREWORKS[2].SCALE);
        }
        if (this.count > 180) {
            this.animations[4].drawFrame(this.game.clockTick, ctx, BACKGROUND.FIREWORKS[4].X-this.game.camera.x, BACKGROUND.FIREWORKS[4].Y, BACKGROUND.FIREWORKS[4].SCALE);
        }
        if (this.count > 210) {
            this.animations[3].drawFrame(this.game.clockTick, ctx, BACKGROUND.FIREWORKS[3].X-this.game.camera.x, BACKGROUND.FIREWORKS[3].Y, BACKGROUND.FIREWORKS[3].SCALE);
        }
        if (this.count > 250) {
            this.animations[1].drawFrame(this.game.clockTick, ctx, BACKGROUND.FIREWORKS[1].X-this.game.camera.x, BACKGROUND.FIREWORKS[1].Y, BACKGROUND.FIREWORKS[1].SCALE);
        }


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
        if (this.game.camera.chihiro.winGame) {
            ctx.drawImage(this.spritesheet,
                BACKGROUND.BATHHOUSE.X, BACKGROUND.BATHHOUSE.Y,  BACKGROUND.BATHHOUSE.W,  BACKGROUND.BATHHOUSE.H,
                this.x - this.game.camera.x, - 100,
                BACKGROUND.BATHHOUSE.W, BACKGROUND.BATHHOUSE.H );

        } else {
            ctx.drawImage(this.spritesheet,
                BACKGROUND.BATHHOUSE.X, BACKGROUND.BATHHOUSE.Y,  BACKGROUND.BATHHOUSE.W,  BACKGROUND.BATHHOUSE.H,
                this.x - this.game.camera.x, this.y,
                BACKGROUND.BATHHOUSE.W * PARAMS.SCALE, BACKGROUND.BATHHOUSE.H * PARAMS.SCALE);
        }
        ctx.imageSmoothingEnabled = false;
    }
};


class Ground { //bridge
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/platform_sheet.png");
    };
    update() {

    };

    draw(ctx) {
        let COUNT = PARAMS.CANVAS_WIDTH * LEVEL.FRAME_COUNT / BACKGROUND.GROUND.SIZE * BACKGROUND.GROUND.SCALE;
        if (this.game.camera.chihiro.winGame) {
            let padding = 20;
            for (var i = 0; i < COUNT; i ++) {
                ctx.drawImage(this.spritesheet, BACKGROUND.GROUND.X, BACKGROUND.GROUND.Y,
                    BACKGROUND.GROUND.SIZE, BACKGROUND.GROUND.SIZE,
                    this.x + BACKGROUND.GROUND.SIZE * BACKGROUND.GROUND.SCALE * i / PARAMS.SCALE - this.game.camera.x, this.y + padding,
                    BACKGROUND.GROUND.SIZE * BACKGROUND.GROUND.SCALE / PARAMS.SCALE, BACKGROUND.GROUND.SIZE * 7 / PARAMS.SCALE);
            }
            this.BB = new BoundingBox(this.x , this.y + padding, this.w, BACKGROUND.GROUND.SCALE * BACKGROUND.GROUND.SIZE);
        } else {

            if(this.game.camera.title) {
                for (var i = 0; i < COUNT; i ++) {
                    ctx.drawImage(this.spritesheet, BACKGROUND.GROUND.X, BACKGROUND.GROUND.Y,
                        BACKGROUND.GROUND.SIZE, BACKGROUND.GROUND.SIZE,
                        this.x + BACKGROUND.GROUND.SIZE * BACKGROUND.GROUND.SCALE * i  - this.game.camera.x, this.y,
                        BACKGROUND.GROUND.SIZE * BACKGROUND.GROUND.SCALE, BACKGROUND.GROUND.SIZE * 7);
                }
            } else {
                for (var i = 0; i < 9; i ++) {

                    ctx.drawImage(this.spritesheet, 0, 80,
                        BACKGROUND.GROUND.SIZE, BACKGROUND.GROUND.SIZE,
                        this.x + BACKGROUND.GROUND.SIZE * BACKGROUND.GROUND.SCALE * i  - this.game.camera.x, this.y,
                        BACKGROUND.GROUND.SIZE * BACKGROUND.GROUND.SCALE, BACKGROUND.GROUND.SIZE * 7);
                }

                for (var i = 9; i < 10; i ++) {
                    ctx.drawImage(this.spritesheet, 0, 48,
                        BACKGROUND.GROUND.SIZE, BACKGROUND.GROUND.SIZE,
                        this.x + BACKGROUND.GROUND.SIZE * BACKGROUND.GROUND.SCALE * i  - this.game.camera.x, this.y,
                        BACKGROUND.GROUND.SIZE * BACKGROUND.GROUND.SCALE, BACKGROUND.GROUND.SIZE * 7);
                }

                for (var i = 10; i < COUNT; i ++) {
                        ctx.drawImage(this.spritesheet, BACKGROUND.GROUND.X, BACKGROUND.GROUND.Y,
                            BACKGROUND.GROUND.SIZE, BACKGROUND.GROUND.SIZE,
                            this.x + BACKGROUND.GROUND.SIZE * BACKGROUND.GROUND.SCALE * i  - this.game.camera.x, this.y,
                            BACKGROUND.GROUND.SIZE * BACKGROUND.GROUND.SCALE, BACKGROUND.GROUND.SIZE * 7);
                }
            }



            this.BB = new BoundingBox(this.x , this.y, this.w, BACKGROUND.GROUND.SCALE * BACKGROUND.GROUND.SIZE);
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
             ctx.drawImage(this.spritesheet,
                BACKGROUND.X, BACKGROUND.Y,             // x and y of the spritesheet
                BACKGROUND.SIZE.W, BACKGROUND.SIZE.H,   // width and height of the spritesheet
                this.x - this.game.camera.x + (PARAMS.CANVAS_WIDTH * i), this.y, // x and y of the canvas
                PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);                      // width and height of the canvas
        }
        ctx.imageSmoothingEnabled = false;
    }
}

class Platform {  // tree
    constructor(game, x, y, w, type) {
        Object.assign(this, { game, x, y, w, type});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/platform_sheet.png");
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
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/cloud-Sheet.png");

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
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/stonelamp.png");
    }

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, BACKGROUND.STONE_LAMP.X, BACKGROUND.STONE_LAMP.Y, BACKGROUND.STONE_LAMP.SIZE.W, BACKGROUND.STONE_LAMP.SIZE.H,
            this.x - this.game.camera.x, this.y,
            BACKGROUND.STONE_LAMP.SIZE.W * BACKGROUND.STONE_LAMP.SCALE.X, BACKGROUND.STONE_LAMP.SIZE.H * BACKGROUND.STONE_LAMP.SCALE.Y);
        this.BB = new BoundingBox(this.x , this.y + 55,
            32, BACKGROUND.STONE_LAMP.SIZE.H * BACKGROUND.STONE_LAMP.SCALE.Y);
        this.BBmiddleleft = new BoundingBox(this.x , this.y + (BACKGROUND.STONE_LAMP.SIZE.W) + 10,
            5 ,  BACKGROUND.STONE_LAMP.SIZE.H * BACKGROUND.STONE_LAMP.SCALE.Y);
        this.BBmiddleright = new BoundingBox(this.x +32, this.y + (BACKGROUND.STONE_LAMP.SIZE.W) +10,
            5 ,  BACKGROUND.STONE_LAMP.SIZE.H * BACKGROUND.STONE_LAMP.SCALE.Y);

        if (PARAMS.DEBUG) {

            ctx.strokeStyle = 'red';

            ctx.strokeRect(this.BB.x -this.game.camera.x, this.BB.y,
                this.BB.width,
                this.BB.height);
                ctx.strokeStyle = 'Yellow';
            ctx.strokeRect(this.BBmiddleleft.x -this.game.camera.x, this.BBmiddleleft.y,
                this.BBmiddleleft.width,
                this.BBmiddleleft.height);
            ctx.strokeRect(this.BBmiddleright.x -this.game.camera.x, this.BBmiddleright.y,
                this.BBmiddleright.width,
                this.BBmiddleright.height);
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
        this.spritesheet2 =  ASSET_MANAGER.getAsset("./sprites/flame.png");
        this.BB = new BoundingBox(this.x+BACKGROUND.LAMP.PADDING.W, this.y +5,
            BACKGROUND.LAMP.SIZE.W * BACKGROUND.LAMP.SCALE.W-BACKGROUND.LAMP.PADDING.W -20, BACKGROUND.LAMP.SIZE.H * BACKGROUND.LAMP.SCALE.H);

    }

    update() {

    };

    draw(ctx) {
        var iterations = 16, radius = 50,
        step = radius / iterations;
        for(var i = 1; i < iterations; i++) {
            ctx.filter = "blur(" + (step * i) + "px)";
            ctx.drawImage(this.spritesheet2, BACKGROUND.LAMP.X, BACKGROUND.LAMP.Y,
                BACKGROUND.LAMP.SIZE.W, BACKGROUND.LAMP.SIZE.H,
                this.x - this.game.camera.x, this.y,
                BACKGROUND.LAMP.SIZE.W * BACKGROUND.LAMP.SCALE.W, BACKGROUND.LAMP.SIZE.H * BACKGROUND.LAMP.SCALE.H);
        }
       // ctx.shadowColor = "transparent"; // remove shadow !
       ctx.filter = "none";
       ctx.fillStyle = "Yellow";
       ctx.drawImage(this.spritesheet2, BACKGROUND.LAMP.X, BACKGROUND.LAMP.Y,
            BACKGROUND.LAMP.SIZE.W, BACKGROUND.LAMP.SIZE.H,
            this.x - this.game.camera.x, this.y,
            BACKGROUND.LAMP.SIZE.W * BACKGROUND.LAMP.SCALE.W, BACKGROUND.LAMP.SIZE.H * BACKGROUND.LAMP.SCALE.H);

        ctx.drawImage(this.spritesheet, BACKGROUND.LAMP.X, BACKGROUND.LAMP.Y,
            BACKGROUND.LAMP.SIZE.W, BACKGROUND.LAMP.SIZE.H,
            this.x - this.game.camera.x, this.y,
            BACKGROUND.LAMP.SIZE.W * BACKGROUND.LAMP.SCALE.W, BACKGROUND.LAMP.SIZE.H * BACKGROUND.LAMP.SCALE.H);

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
       this.topBB = new BoundingBox(this.x, this.y + BACKGROUND.RAILING.PADDING,
           this.w,  BACKGROUND.RAILING.BB_SIZE.H);
    }

    update() {

    };

    draw(ctx) {
        let COUNT = PARAMS.CANVAS_WIDTH * (LEVEL.FRAME_COUNT - 3) / BACKGROUND.RAILING.SIZE / BACKGROUND.RAILING.SCALE;
        for (var i = 0; i < COUNT; i++) {
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