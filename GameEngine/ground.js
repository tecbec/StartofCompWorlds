// Background's parameter
var BACKGROUND = {
    X: 0,
    Y: 0,
    SIZE: {W: 1000, H: 500},
    SCALE: 2,
    GROUND:         {X: 32, Y: 0, SIZE: 32, SCALE: 4},
    FLAG:           {X: 0,  Y: 0, W: 264, H: 268, COUNT:5, SCALE: 1},
    STONE_LAMP:     {X: 0, Y: 0,  SIZE: {W:45, H:142 },  SCALE:{ X:4, Y: 5},   BB_SIZE: {W: 10, H: 10}},
    LAMP:           {X: 0, Y: 0,  SIZE: {W: 107, H:188}, SCALE:  {W: 2, H: 2}, BB_SIZE: {W: 5,  H: 10}, PADDING: {W: 40, H: 10}},
    RAILING:        {X: 0, Y: 10, SIZE: 64, SCALE: 2.5, BB_SIZE: {W: 5, H: 10}, PADDING: 20},
    PLATFORM:       {LEFT: {X: 0, Y: 32}, MID: {X: 16, Y: 32}, RIGHT: {X: 32, Y: 32}, SIZE: 16, SCALE: 4, COUNT: 2, BB_SIZE: {W: 10, H: 10}},
    CLOUD_PLATFORM: {LEFT: {X: 0, Y: 0},  MID: {X: 0, Y: 0},   RIGHT: {X: 0, Y: 0},   SIZE: 16, SCALE: 4, COUNT: 2, BB_SIZE: {W: 5, H: 16}},
    CLOUD:          {X: 0, Y: 0, WIDTH: 192, HEIGHT:64, SCALE: 1},
    CLOUD_BB:       [{W: 64, H: 54}, {W: 64, H: 54}, {W: 128, H: 54}, {W: 148, H: 54}, {W: 192, H: 54}],
    BATHHOUSE:      {X:0, Y: 0, W: 987, H: 1104},
    TREE:           {X:0, Y:0, W:512, H:248, SCALE:4},
    FIREWORKS:      [{X: -600,  Y: 50,       SPRITEX: 0, SPRITEY: 0,     NUM_FRAMES: 21,     DUR: 0.1,       SCALE: 5},     // index = 0 
                     {X: 100,   Y: 250,      SPRITEX: 0, SPRITEY: 64,    NUM_FRAMES: 21,     DUR: 0.15 ,     SCALE: 5},     // index = 1 
                     {X: 750,   Y: 100,      SPRITEX: 0, SPRITEY: 128,   NUM_FRAMES: 21,     DUR: 0.1,       SCALE: 4},     // index = 2 
                     {X: -300,  Y: 500,      SPRITEX: 0, SPRITEY: 192,   NUM_FRAMES: 21,     DUR: 0.15,      SCALE: 2},     // index = 3 
                     {X: 100,   Y: 550,      SPRITEX: 0, SPRITEY: 384,   NUM_FRAMES: 21,     DUR: 0.1,       SCALE: 2},     // index = 4 
                     {X: 200,   Y: 50,       SPRITEX: 0, SPRITEY: 0,     NUM_FRAMES: 21,     DUR: 0.1,       SCALE: 5},     // index = 5 
                     {X: 500,   Y: 250,      SPRITEX: 0, SPRITEY: 64,    NUM_FRAMES: 21,     DUR: 0.15 ,     SCALE: 5},     // index = 6 
                     {X: 800,   Y: 100,      SPRITEX: 0, SPRITEY: 128,   NUM_FRAMES: 21,     DUR: 0.1,       SCALE: 4},     // index = 7 
                     {X: 200,   Y: 500,      SPRITEX: 0, SPRITEY: 192,   NUM_FRAMES: 21,     DUR: 0.15,      SCALE: 2},     // index = 8 
                     {X: 100,   Y: 350,      SPRITEX: 0, SPRITEY: 384,   NUM_FRAMES: 21,     DUR: 0.1,       SCALE: 2}],    // index = 9

    BUTTONS:       [{X: 800,   Y: 600,      SPRITEX: 0, SPRITEY: 0,     SWIDTH: 48,         SHEIGHT: 16,    SCALE: 4},
                    {X: 125,   Y: 1045,     SPRITEX: 0, SPRITEY: 16,    SWIDTH: 48,         SHEIGHT: 16,    SCALE: 1.5},
                    {X: 250,   Y: 1045,     SPRITEX: 0, SPRITEY: 32,    SWIDTH: 48,         SHEIGHT: 16,    SCALE: 1.5},
                    {X: 715,   Y: 700,      SPRITEX: 0, SPRITEY: 48,    SWIDTH: 96,         SHEIGHT: 16,    SCALE: 4}],

    START_BUTTON:  {W: 200, H: 75},
    START_PADDING: 800,

    VOLUMEUP:      {X: 475,   Y: 1000,      SPRITEX: 0, SPRITEY: 16,     SWIDTH: 16,         SHEIGHT: 16,    SCALE: 2},
    VOLUMEDOWN:    {X: 475,   Y: 1040,      SPRITEX: 0, SPRITEY: 0,      SWIDTH: 16,         SHEIGHT: 16,    SCALE: 2},
    VOLUMESIGN:    {X: 375,   Y: 1045,      SPRITEX: 0, SPRITEY: 32,     SWIDTH: 64,         SHEIGHT: 16,    SCALE: 1.5},

    // PLATFORM_SHORT: {LEFT: {X: 0, Y: 32}, MID: {X: 16, Y: 32}, RIGHT: {X: 32, Y: 32}, SIZE: 16, SCALE: 2, COUNT: 2, BB_SIZE: {W: 5, H: 16}}
    // PLATFORM_LONG: {LEFT: {X: 0, Y: 0}, MID: {X: 16, Y: 32}, RIGHT: {X: 32, Y: 32}, SIZE: 16, SCALE: 2, COUNT: 5, BB_SIZE: {W: 5, H: 16}}
};

class TitlePlaque { //bridge
    constructor(game) {
        Object.assign(this, {game});
        this.spritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/title.png");

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
        this.spritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/title-buttons.png");
        this.volumesprite = ASSET_MANAGER.getAsset("./GameEngine/sprites/volume.png");
        this.mute = true;
        this.up = false;
        this.down = false;
        this.startSelected = true; // true by default
        this.startbuttonAnim = new Animator (this.spritesheet,BACKGROUND.BUTTONS[0].SPRITEX, BACKGROUND.BUTTONS[0].SPRITEY,
                                 BACKGROUND.BUTTONS[0].SWIDTH,
                                 BACKGROUND.BUTTONS[0].SHEIGHT, 2, 0.8, 0, false, true);

        this.instructbuttonAnim = new Animator (this.spritesheet,BACKGROUND.BUTTONS[3].SPRITEX, BACKGROUND.BUTTONS[3].SPRITEY,
                                BACKGROUND.BUTTONS[3].SWIDTH,
                                BACKGROUND.BUTTONS[3].SHEIGHT, 2, 0.8, 0, false, true);                         
        this.instructionsSelected = false;
        this.count = 0;
    }

    update() {
    };

    draw(ctx) {
        if(this.game.camera.title) {
            if (this.count == 0) {
                this.startSelected = true;
            } else if (this.count == 1) {
                this.instructionsSelected = true;
            } 
           
            if (this.instructionsSelected && this.game.crouch) {
                this.startSelected = false
                this.instructionsSelected = true;
                this.count = 1;
            } else if(this.startSelected && this.game.up) {
                this.instructionsSelected = false;
                this.startSelected = true;
                this.count = 0;
            } else if (this.startSelected && this.game.crouch) {
                this.instructionsSelected = true;
                this.startSelected = false
                this.count = 1;
            } else if (this.instructionsSelected && this.game.up) {
                this.instructionsSelected = false
                this.startSelected = true
                this.count = 0;
            } else {
                
            }
            if ((this.game.mouse && this.game.mouse.y > 700 && this.game.mouse.y < 750 && this.game.mouse.x > 728  && this.game.mouse.x < 1113)) {   // Instructions
                this.instructionsSelected = false;
                this.startSelected = false;
                ctx.drawImage(  this.spritesheet,
                    BACKGROUND.BUTTONS[3].SPRITEX+BACKGROUND.BUTTONS[3].SWIDTH,     BACKGROUND.BUTTONS[3].SPRITEY,             // x and y of the spritesheet
                    BACKGROUND.BUTTONS[3].SWIDTH,                                   BACKGROUND.BUTTONS[3].SHEIGHT,             // width and height of the spritesheet
                    BACKGROUND.BUTTONS[3].X,                                        BACKGROUND.BUTTONS[3].Y,                   // x and y of the canvas
                    BACKGROUND.BUTTONS[3].SWIDTH * BACKGROUND.BUTTONS[3].SCALE,      BACKGROUND.BUTTONS[3].SHEIGHT * BACKGROUND.BUTTONS[3].SCALE);                      // width and height of the canvas
            } else {
                ctx.drawImage(this.spritesheet,
                    BACKGROUND.BUTTONS[3].SPRITEX,                                  BACKGROUND.BUTTONS[3].SPRITEY,             // x and y of the spritesheet
                    BACKGROUND.BUTTONS[3].SWIDTH,                                   BACKGROUND.BUTTONS[3].SHEIGHT,             // width and height of the spritesheet
                    BACKGROUND.BUTTONS[3].X,                                        BACKGROUND.BUTTONS[3].Y,                   // x and y of the canvas
                    BACKGROUND.BUTTONS[3].SWIDTH * BACKGROUND.BUTTONS[3].SCALE,     BACKGROUND.BUTTONS[3].SHEIGHT * BACKGROUND.BUTTONS[0].SCALE);                      // width and height of the canvas
            }
      
            if ((this.game.mouse &&
                this.game.mouse.y > BACKGROUND.BUTTONS[0].Y &&                                                                                        // Start
                this.game.mouse.y < BACKGROUND.BUTTONS[0].Y + BACKGROUND.START_BUTTON.H &&
                // this.game.mouse.x > BACKGROUND.BUTTONS[0].X  + BACKGROUND.START_PADDING &&
                // this.game.mouse.x < BACKGROUND.BUTTONS[0].X + BACKGROUND.START_BUTTON.W + BACKGROUND.START_PADDING) {
                this.game.mouse.x > BACKGROUND.BUTTONS[0].X  &&
                this.game.mouse.x < BACKGROUND.BUTTONS[0].X + BACKGROUND.START_BUTTON.W)) {
                this.instructionsSelected = false;
                this.startSelected = false;
                ctx.drawImage(  this.spritesheet,
                    BACKGROUND.BUTTONS[0].SPRITEX+BACKGROUND.BUTTONS[0].SWIDTH,     BACKGROUND.BUTTONS[0].SPRITEY,             // x and y of the spritesheet
                    BACKGROUND.BUTTONS[0].SWIDTH,                                   BACKGROUND.BUTTONS[0].SHEIGHT,             // width and height of the spritesheet
                    // BACKGROUND.BUTTONS[0].X-/this.game.camera.x,                     BACKGROUND.BUTTONS[0].Y,                   // x and y of the canvas
                    BACKGROUND.BUTTONS[0].X,                                        BACKGROUND.BUTTONS[0].Y,                   // x and y of the canvas
                    BACKGROUND.BUTTONS[0].SWIDTH * BACKGROUND.BUTTONS[0].SCALE,      BACKGROUND.BUTTONS[0].SHEIGHT * BACKGROUND.BUTTONS[0].SCALE);                      // width and height of the canvas
            } else  {
                // if not on instructions
               
                ctx.drawImage(  this.spritesheet,
                    BACKGROUND.BUTTONS[0].SPRITEX,                                  BACKGROUND.BUTTONS[0].SPRITEY,             // x and y of the spritesheet
                    BACKGROUND.BUTTONS[0].SWIDTH,                                   BACKGROUND.BUTTONS[0].SHEIGHT,             // width and height of the spritesheet
                    // BACKGROUND.BUTTONS[0].X-this.game.camera.x,                     BACKGROUND.BUTTONS[0].Y,                   // x and y of the canvas
                    BACKGROUND.BUTTONS[0].X,                                        BACKGROUND.BUTTONS[0].Y,                   // x and y of the canvas
                    BACKGROUND.BUTTONS[0].SWIDTH * BACKGROUND.BUTTONS[0].SCALE,     BACKGROUND.BUTTONS[0].SHEIGHT * BACKGROUND.BUTTONS[0].SCALE);                      // width and height of the canvas
            }
           
            if (this.startSelected && this.count == 0) {
                this.startbuttonAnim.drawFrame(this.game.clockTick, ctx, BACKGROUND.BUTTONS[0].X, BACKGROUND.BUTTONS[0].Y, 4);
            } 

            if (this.instructionsSelected && this.count == 1) {
                this.instructbuttonAnim.drawFrame(this.game.clockTick, ctx, BACKGROUND.BUTTONS[3].X, BACKGROUND.BUTTONS[3].Y, 4);
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

        // Volume
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
        this.spritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/Firework-animation.png");
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
        if (!this.game.camera.chihiro.winGame && !this.game.camera.chihiro.endPosition && this.game.camera.title) {
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

        }
        

        else if (this.game.camera.chihiro.endPosition) {
            if (this.count > this.fireCount[0] && this.count < this.fireDur[0]) {
                this.animations[2].drawFrame(this.game.clockTick, ctx, BACKGROUND.FIREWORKS[7].X, BACKGROUND.FIREWORKS[7].Y, BACKGROUND.FIREWORKS[7].SCALE);
    
            }
            if (this.count > this.fireCount[1]  && this.count < this.fireDur[1] ) {
                this.animations[0].drawFrame(this.game.clockTick, ctx, BACKGROUND.FIREWORKS[5].X, BACKGROUND.FIREWORKS[5].Y, BACKGROUND.FIREWORKS[5].SCALE);
            }
            if (this.count > this.fireCount[2]  && this.count < this.fireDur[2] ) {
                this.animations[1].drawFrame(this.game.clockTick, ctx, BACKGROUND.FIREWORKS[6].X, BACKGROUND.FIREWORKS[6].Y, BACKGROUND.FIREWORKS[6].SCALE);
            }
    
            if (this.count > this.fireCount[3] && this.count < this.fireDur[3]) {
                this.animations[3].drawFrame(this.game.clockTick, ctx, BACKGROUND.FIREWORKS[8].X, 
                                                BACKGROUND.FIREWORKS[8].Y, BACKGROUND.FIREWORKS[8].SCALE);
            }
    
            if (this.count > this.fireCount[4] && this.count < this.fireDur[4]) {
                this.animations[4].drawFrame(this.game.clockTick, ctx, BACKGROUND.FIREWORKS[9].X, 
                                                BACKGROUND.FIREWORKS[9].Y, BACKGROUND.FIREWORKS[9].SCALE);
            }
    
            // start the periodic presentation of the fireworks
            if (this.count > 130) {
                    this.animations[0].drawFrame(this.game.clockTick, ctx, BACKGROUND.FIREWORKS[5].X, BACKGROUND.FIREWORKS[5].Y, BACKGROUND.FIREWORKS[5].SCALE);
            }
            if (this.count > 150) {
                this.animations[2].drawFrame(this.game.clockTick, ctx, BACKGROUND.FIREWORKS[7].X, BACKGROUND.FIREWORKS[7].Y, BACKGROUND.FIREWORKS[7].SCALE);
            }
            if (this.count > 180) {
                this.animations[4].drawFrame(this.game.clockTick, ctx, BACKGROUND.FIREWORKS[9].X, BACKGROUND.FIREWORKS[9].Y, BACKGROUND.FIREWORKS[9].SCALE);
            }
            if (this.count > 210) {
                this.animations[3].drawFrame(this.game.clockTick, ctx, BACKGROUND.FIREWORKS[8].X, BACKGROUND.FIREWORKS[8].Y, BACKGROUND.FIREWORKS[8].SCALE);
            }
            if (this.count > 250) {
                this.animations[1].drawFrame(this.game.clockTick, ctx, BACKGROUND.FIREWORKS[6].X, BACKGROUND.FIREWORKS[6].Y, BACKGROUND.FIREWORKS[6].SCALE);
            }
        }

        ctx.imageSmoothingEnabled = false;
    };
};


class Bathhouse {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/Bathhouse.png");
        this.treespritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/tree-sheet.png");
        this.flagspritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/flag.png");
        this.flagAnim = new Animator (this.flagspritesheet,BACKGROUND.FLAG.X, BACKGROUND.FLAG.Y,  BACKGROUND.FLAG.W,  BACKGROUND.FLAG.H, BACKGROUND.FLAG.COUNT, 0.1, 0, false, true );
    }

    update() {
    };

    draw(ctx) {
        // draw the bath house && trees

        if (this.game.camera.chihiro.winGame) {

            ctx.drawImage(this.treespritesheet,
                512, 0, 158,  268,
                this.x - 70 - this.game.camera.x, 490,
                158 * 2, 268 * 2);

            ctx.drawImage(this.treespritesheet,
                1024, 0,  272,  158,
                this.x + 700 - this.game.camera.x, 670,
                272 * 2, 158 * 2);

 
            this.flagAnim.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x - 100, 0, 2);
            

            ctx.drawImage(this.spritesheet,
                BACKGROUND.BATHHOUSE.X, BACKGROUND.BATHHOUSE.Y,  BACKGROUND.BATHHOUSE.W,  BACKGROUND.BATHHOUSE.H,
                this.x - this.game.camera.x, - 100,
                BACKGROUND.BATHHOUSE.W, BACKGROUND.BATHHOUSE.H );

            ctx.drawImage(this.treespritesheet,
                BACKGROUND.TREE.X, BACKGROUND.TREE.Y,  BACKGROUND.TREE.W,  BACKGROUND.TREE.H,
                this.x + 400 - this.game.camera.x, 650,
                BACKGROUND.TREE.W * 2, BACKGROUND.TREE.H * 2);

            ctx.drawImage(this.treespritesheet,
                1552, 0,  496,  160,
                this.x + 800 - this.game.camera.x, 680,
                496 * 2, 160 * 2);
           
        // draw the trees

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
        this.spritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/platform_sheet.png");
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
        this.spritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/background_nightsky.png");
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

class Tree {  // tree
    constructor(game, x, y, type) {
        Object.assign(this, { game, x, y, type});
        this.spritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/tree-sheet.png");
    }

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet,
            BACKGROUND.TREE.X + (BACKGROUND.TREE.W * this.type), BACKGROUND.TREE.Y,
            BACKGROUND.TREE.W, BACKGROUND.TREE.H,
            this.x  - this.game.camera.x, this.y,
            BACKGROUND.TREE.W * BACKGROUND.TREE.SCALE,
            BACKGROUND.TREE.H * BACKGROUND.TREE.SCALE);
    }
}

class Platform {  // leaf platforms
    constructor(game, x, y, w, type) {
        Object.assign(this, { game, x, y, w, type});
        this.spritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/platform_sheet.png");
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
    constructor(game, x, y, size, min = 0, max = 0, vertical = false) {
        Object.assign(this, { game, x, y, size, min, max, vertical});
        this.spritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/cloud-Sheet.png");

        this.BB = new BoundingBox(this.x + 5 , this.y + 10,
            BACKGROUND.CLOUD_BB[this.size].W * BACKGROUND.CLOUD.SCALE - 10,
            BACKGROUND.CLOUD_BB[this.size].H * BACKGROUND.CLOUD.SCALE);

        this.moving = (this.max - this.min > 0);

        if(this.moving){
            this.speed = 20;
        }else{
            this.speed = 0;
        }
    }

    update() {
        if(this.moving){
            if(!this.vertical && this.x + this.BB.width >= this.max){ 
                this.speed = -Math.abs(this.speed);
           }else if(!this.vertical && this.x <= this.min){
                this.speed = Math.abs(this.speed);     
           }
           
           else if(this.vertical && this.y <= this.min){
            this.speed = Math.abs(this.speed);  
           }else if(this.vertical && this.y + this.BB.height >= this.max){ 
            this.speed = -Math.abs(this.speed);
           }

           if(!this.vertical){
               this.x += this.speed * this.game.clockTick;
           }else{
               this.y += this.speed * this.game.clockTick; 
           }

           this.BB = new BoundingBox(this.x + 5 , this.y + 10,
            BACKGROUND.CLOUD_BB[this.size].W * BACKGROUND.CLOUD.SCALE - 10,
            BACKGROUND.CLOUD_BB[this.size].H * BACKGROUND.CLOUD.SCALE);

            /* doesnt work, not sensing player collisions*/
            // var that = this; 
            // this.game.entities.forEach(function (entity) {   
            //     if(entity instanceof Player){
            //         console.log("Player " + entity.BB.x + " " + entity.BB.y);
            //         console.log("Cloud " + that.BB.x + " " + that.BB.y);  
            //      }      
            //     if (entity.BB && that.BB.collide(entity.BB)) {
            //         if(entity instanceof Player && entity.lastBB.bottom <= that.BB.top){
            //             console.log("Collision with Player");
                       
            //             if(!that.vertical){
            //                 entity.x += that.speed * that.game.clockTick;
            //             }else{
            //                 entity.y += that.speed * that.game.clockTick; 
            //             }
            //         }
            //     }
            // });
        }
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
        ctx.imageSmoothingEnabled = true;
    };

}


/**
 * StoneLamp
 * Allows walking on top of it but not through.
 */
 class StoneLamp {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w});
        this.spritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/stonelamp.png");
        this.BB = new BoundingBox(this.x , this.y + 55,
            (BACKGROUND.STONE_LAMP.SIZE.W) * BACKGROUND.STONE_LAMP.SCALE.X, 75);
        this.BBmiddle = new BoundingBox(this.x +19*4, this.y + 25 * 4,
            7 *4, 275);
        this.BBtopleft = new BoundingBox(this.x , this.y + (BACKGROUND.STONE_LAMP.SIZE.W) + 20,
            5 , 55);
        this.BBtopright = new BoundingBox(this.x + (BACKGROUND.STONE_LAMP.SIZE.W) *4 - 5, this.y + (BACKGROUND.STONE_LAMP.SIZE.W) + 20,
            5 , 55);
        this.BBmiddleleft = new BoundingBox(this.x +19*4, this.y + 25 * 4,
            5, BACKGROUND.STONE_LAMP.SIZE.H * BACKGROUND.STONE_LAMP.SCALE.Y);
        this.BBmiddleright = new BoundingBox(this.x +19*4 +23, this.y + 25 * 4,
            5, BACKGROUND.STONE_LAMP.SIZE.H * BACKGROUND.STONE_LAMP.SCALE.Y);
    }

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, BACKGROUND.STONE_LAMP.X, BACKGROUND.STONE_LAMP.Y, BACKGROUND.STONE_LAMP.SIZE.W, BACKGROUND.STONE_LAMP.SIZE.H,
            this.x - this.game.camera.x, this.y,
            BACKGROUND.STONE_LAMP.SIZE.W * BACKGROUND.STONE_LAMP.SCALE.X, BACKGROUND.STONE_LAMP.SIZE.H * BACKGROUND.STONE_LAMP.SCALE.Y);

     
    
        if (PARAMS.DEBUG) {
            // ctx.lineWidth = 2;
            ctx.strokeStyle = 'red';
            ctx.strokeRect(this.BB.x -this.game.camera.x, this.BB.y,
                this.BB.width,
                this.BB.height);
            ctx.strokeRect(this.BBmiddle.x -this.game.camera.x, this.BBmiddle.y,
                this.BBmiddle.width,
                this.BBmiddle.height);
                ctx.strokeStyle = 'yellow';
            ctx.strokeRect(this.BBmiddleleft.x -this.game.camera.x, this.BBmiddleleft.y,
                this.BBmiddleleft.width,
                this.BBmiddleleft.height);
            ctx.strokeRect(this.BBmiddleright.x -this.game.camera.x, this.BBmiddleright.y,
                this.BBmiddleright.width,
                this.BBmiddleright.height);

            ctx.strokeRect(this.BBtopleft.x -this.game.camera.x, this.BBtopleft.y,
                this.BBtopleft.width,
                this.BBtopleft.height);
            ctx.strokeRect(this.BBtopright.x -this.game.camera.x, this.BBtopright.y,
                this.BBtopright.width,
                this.BBtopright.height);
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
        this.spritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/lamp.png");
        this.spritesheet2 =  ASSET_MANAGER.getAsset("./GameEngine/sprites/flame.png");
        this.BB = new BoundingBox(this.x+BACKGROUND.LAMP.PADDING.W +20 , this.y +5,
            BACKGROUND.LAMP.SIZE.W * BACKGROUND.LAMP.SCALE.W-BACKGROUND.LAMP.PADDING.W - 30, BACKGROUND.LAMP.SIZE.H * BACKGROUND.LAMP.SCALE.H);

    }

    update() {

    };

    draw(ctx) {
    // uncomment below to make the lamp turn on ;)
    // Hana's laptop can't handle
    //     var iterations = 16, radius = 50,
    //     step = radius / iterations;
    //     for(var i = 1; i < iterations; i++) {
    //         ctx.filter = "blur(" + (step * i) + "px)";
    //         ctx.drawImage(this.spritesheet2, BACKGROUND.LAMP.X, BACKGROUND.LAMP.Y,
    //             BACKGROUND.LAMP.SIZE.W, BACKGROUND.LAMP.SIZE.H,
    //             this.x - this.game.camera.x, this.y,
    //             BACKGROUND.LAMP.SIZE.W * BACKGROUND.LAMP.SCALE.W, BACKGROUND.LAMP.SIZE.H * BACKGROUND.LAMP.SCALE.H);
    //     }
    //    //ctx.shadowColor = "transparent"; // remove shadow !
    //    ctx.filter = "none";
    //    ctx.fillStyle = "Yellow";
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
        this.spritesheet = this.spritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/railing.png");
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