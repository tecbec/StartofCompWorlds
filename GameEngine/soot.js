/*
 * Soot Object
 * Created and animated by Kumiko
 *
 */

class Soot {
    constructor( game, x, y ) {
        Object.assign(this, { game, x, y});
        this.spritesheet_aura = ASSET_MANAGER.getAsset("./sprites/soot-jump-long_aura.png");
        this.spritesheet_aura2 = ASSET_MANAGER.getAsset("./sprites/soot-jump-long_aura2_bidir.png");

        this.loadAnimations();

        this.NUM_SOOTS = 10; // must be an even number
        this.NUM_SOOTS_HALF = this.NUM_SOOTS / 2;

        this.BB = [];
        this.lastBB = [];

        // initialize this.x and this.y arrays
        this.x = [];
        this.y = [];

        // the top x and y location the soots will be located.
        this.minScreen = {x: 175, y: 175};
        this.maxScreen = {x: 200, y: 200};

        // determine the starting x and y values for all the soots
        for (let i = 0; i < this.NUM_SOOTS; i++){
            if (i < 5) { // from left
                this.x[i] = this.minScreen.x ;
            } else { // from right
                this.x[i] = this.maxScreen.x;
            }
            this.y[i] = this.maxScreen.y;
        };

        // the starting velocities for the soots
        this.START_Vx = [];
        this.START_Vy = [];

        let temp = 50;
        let temp1 = 100;

        for (let i = 0; i < this.NUM_SOOTS_HALF; i++){
            this.START_Vx[i] = temp;
            this.START_Vy[i] = temp1;
            this.START_Vx[i+5] = temp;
            this.START_Vy[i+5] = temp1;
            temp += 15;
            temp1 += 15;
        };

        // the changing velocities for the soots.
        this.velocityx = [];
        this.velocityy = [];

        for (let i = 0; i < this.NUM_SOOTS; i++) {
            this.velocityx[i] = this.START_Vx[i];
            this.velocityy[i] = this.START_Vy[i];
        };


        this.updateBB();

    };

    loadAnimations() {

        this.animations = [];
        this.animations[0] = new Animator(this.spritesheet_aura, 0, 0, 100, 100, 6, .1, 15, false, true);
        this.animations[1] = new Animator(this.spritesheet_aura, 0, 0, 100, 100, 6, .1, 15, false, true);
        this.animations[2] = new Animator(this.spritesheet_aura2, 0, 0, 100, 100, 6, .1, 15, false, true);
        this.animations[3] = new Animator(this.spritesheet_aura, 0, 0, 100, 100, 6, .1, 15, false, true);
        this.animations[4] = new Animator(this.spritesheet_aura2, 0, 0, 100, 100, 6, .1, 15, false, true);

        this.animations[5] = new Animator(this.spritesheet_aura2, 0, 125, 100, 100, 6, .1, 15, false, true);
        this.animations[6] = new Animator(this.spritesheet_aura2, 0, 125, 100, 100, 6, .1, 15, false, true);
        this.animations[7] = new Animator(this.spritesheet_aura2, 0, 125, 100, 100, 6, .1, 15, false, true);
        this.animations[8] = new Animator(this.spritesheet_aura2, 0, 125, 100, 100, 6, .1, 15, false, true);
        this.animations[9] = new Animator(this.spritesheet_aura2, 0, 125, 100, 100, 6, .1, 15, false, true);
    }

    updateBB() {
        for(let i = 0; i < this.NUM_SOOTS; i++) {
            this.lastBB[i] = this.BB[i];
            this.BB[i] = new BoundingBox(this.x[i]+5, this.y[i]+10, 17, 17);
        }
    };

    // this is set to move the piece across the screen
    update() {
        const STOP_FALL = [];
        const STOP_FALL_A = [];

        let temp1 = 100;
        let temp2 = 200;

        for(let i = 0; i < this.NUM_SOOTS_HALF; i++ ) {
            STOP_FALL[i] = temp1;
            STOP_FALL_A[i] = temp2;
            STOP_FALL[i+5] = temp1;
            STOP_FALL_A[i+5] = temp2;
            temp1 += 25;
            temp2 += 50;
        }

        let curFrame = this.animations[0].currentFrame(); // determines the current frame

        for(let i = 0; i < this.NUM_SOOTS; i++){
            if (i < 5){     // soots moving left to right

                if(curFrame < 3 && this.x[i] < this.maxScreen.x && this.y[i] >= this.minScreen.y) { // check the current frame, x value, top y
                    this.velocityy[i] -= (STOP_FALL[i] - STOP_FALL_A[i]) * this.game.clockTick;
                    this.x[i] += this.velocityx[i] * this.game.clockTick;
                    this.y[i] -= this.velocityy[i] * this.game.clockTick;
                }
                else if (curFrame >= 3 && curFrame < 6 && this.x[i] < this.maxScreen.x && this.y[i] >= this.minScreen.y) {
                    this.velocityy[i] += (STOP_FALL[i] - STOP_FALL_A[i]) * this.game.clockTick;
                    this.x[i] += this.velocityx[i] * this.game.clockTick;
                    this.y[i] += this.velocityy[i] * this.game.clockTick;
                }
                else if (this.x[i] >= this.maxScreen.x) {
                    this.x[i] = this.minScreen.x;
                }
                else if (this.y[i] < this.minScreen.y) {
                    this.y[i] = this.maxScreen.y;
                    this.x[i] = this.minScreen.x;
                    this.velocityy[i] = this.START_Vy[i];
                    this.velocityx[i] = this.START_Vx[i];

                } else {
                    this.velocityy[i] = this.START_Vy[i];
                    this.velocityx[i] = this.START_Vx[i];
                }

            } else {        // soots moving right to left
                if(curFrame < 3 && this.x[i] > this.minScreen.x && this.y[i] >= this.minScreen.y) {
                    this.velocityy[i] -= (STOP_FALL[i] - STOP_FALL_A[i]) * this.game.clockTick;
                    this.x[i] -= this.velocityx[i] * this.game.clockTick;
                    this.y[i] -= this.velocityy[i] * this.game.clockTick;
                }
                else if (curFrame  >= 3 && curFrame < 6 && this.x[i] > this.minScreen.x && this.y[i] >= this.minScreen.y) {
                    this.velocityy[i] += (STOP_FALL[i] - STOP_FALL_A[i]) * this.game.clockTick;
                    this.x[i] -= this.velocityx[i] * this.game.clockTick;
                    this.y[i] += this.velocityy[i] * this.game.clockTick;
                }
                else if (this.x[i] <= this.minScreen.x) {
                    this.x[i] = this.maxScreen.x;
                }
                else if (this.y[i] < this.minScreen.y){
                    this.y[i] = this.maxScreen.y;
                    this.x[i] = this.maxScreen.x;
                    this.velocityy[i] = this.START_Vy[i];
                    this.velocityx[i] = this.START_Vx[i];
                } else {
                    this.velocityy[i] = this.START_Vy[i];
                    this.velocityx[i] = this.START_Vx[i];
                }
            }
            this.updateBB();
        }
    };

    draw(ctx) {
        ctx.strokeStyle = 'Red';
        for(let i = 0; i < this.NUM_SOOTS; i++) {
        // for(let i = 0; i < this.NUM_SOOTS_HALF; i++) {
            this.animations[i].drawFrame(this.game.clockTick, ctx, this.x[i]  - this.game.camera.x, this.y[i], 0.3);
            ctx.strokeRect(this.BB[i].x  - this.game.camera.x, this.BB[i].y, this.BB[i].width, this.BB[i].height);
        }
        ctx.imageSmoothingEnabled = false;
    };
};