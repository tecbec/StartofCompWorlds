/*
 * NoFace
 * Created and animated by Kumiko
 */

class NoFace {
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

        this.startXLeft = 0;
        this.startXRight = 100;
        this.startY = 400;

        // determine the starting x and y values for all the soots
        for (let i = 0; i < this.NUM_SOOTS; i++){
            if (i < 5) {
                this.x[i] = this.startXLeft ;
            } else {
                this.x[i] = this.startXRight;
            }
            this.y[i] = this.startY;
        };

        // the starting velocities for the soots
        this.START_Vx = [];
        this.START_Vy = [];

        let temp = 50;
        let temp1 = 100;

        for (let i = 0; i < this.NUM_SOOTS_HALF; i++){
            this.START_Vx[i] = temp;
            this.START_Vy[i] = temp1;
            temp += 15;
            temp1 += 15;
        };

        temp = 50;
        temp1 = 100;

        for (let i = this.NUM_SOOTS_HALF; i < this.NUM_SOOTS; i++){
            this.START_Vx[i] = temp;
            this.START_Vy[i] = temp1;
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

        const SCREEN_X = 100;
        const SCREEN_Y = 350;

        const MIN_Y = 300;

        let temp1 = 100;
        let temp2 = 200;

        for(let i = 0; i < this.NUM_SOOTS_HALF; i++ ) {
            STOP_FALL[i] = temp1;
            STOP_FALL_A[i] = temp2;
            temp1 += 25;
            temp2 += 50;
        }

        temp1 = 100;
        temp2 = 200;

        for(let i = 5; i < this.NUM_SOOTS; i++ ) {
            STOP_FALL[i] = temp1;
            STOP_FALL_A[i] = temp2;
            temp1 += 25;
            temp2 += 50;
        }

        // let curFrame = [];

        // for(let i = 0; i < this.NUM_SOOTS; i++){
        //     curFrame[i] = this.animations[i].currentFrame(); // determines the current frame
        // }

        let curFrame = this.animations[0].currentFrame(); // determines the current frame

        for(let i = 0; i < this.NUM_SOOTS; i++){
            if (i < 5){     // soots moving left to right

                if(curFrame < 3 && this.x[i] < SCREEN_X && this.y[i] >= MIN_Y) {
                    this.velocityy[i] -= (STOP_FALL[i] - STOP_FALL_A[i]) * this.game.clockTick;
                    this.x[i] += this.velocityx[i] * this.game.clockTick;
                    this.y[i] -= this.velocityy[i] * this.game.clockTick;
                }
                else if (curFrame  >= 3 && curFrame < 6 && this.x[i] < SCREEN_X && this.y[i] >= MIN_Y) {
                    this.velocityy[i] += (STOP_FALL[i] - STOP_FALL_A[i]) * this.game.clockTick;
                    this.x[i] += this.velocityx[i] * this.game.clockTick;
                    this.y[i] += this.velocityy[i] * this.game.clockTick;
                }
                else if (this.x[i] >= SCREEN_X) {
                    this.x[i] = 0;
                }
                else if (this.y[i] < MIN_Y) {
                    this.y[i] = SCREEN_Y;
                    this.x[i] = SCREEN_X;

                } else {
                    this.velocityy[i] = this.START_Vy[i];
                }

            } else {        // soots moving right to left
                if(curFrame < 3 && this.x[i] >= 0 && this.y[i] >= MIN_Y) {
                    this.velocityy[i] -= (STOP_FALL[i] - STOP_FALL_A[i]) * this.game.clockTick;
                    this.x[i] -= this.velocityx[i] * this.game.clockTick;
                    this.y[i] -= this.velocityy[i] * this.game.clockTick;
                }
                else if (curFrame  >= 3 && curFrame < 6 && this.x[i] >= 0 && this.y[i] >= MIN_Y) {
                    this.velocityy[i] += (STOP_FALL[i] - STOP_FALL_A[i]) * this.game.clockTick;
                    this.x[i] -= this.velocityx[i] * this.game.clockTick;
                    this.y[i] += this.velocityy[i] * this.game.clockTick;
                }
                else if (this.x[i] < 0) {
                    this.x[i] = 100;
                }
                else if (this.y[i] < MIN_Y){
                    this.y[i] = SCREEN_Y;
                    this.x[i] = SCREEN_X;
                    this.velocityy[i] = this.START_Vy[i];
                } else {
                    this.velocityy[i] = this.START_Vy[i];
                }
            }
            this.updateBB();
        }
    };

    draw(ctx) {
        ctx.strokeStyle = 'Red';
        for(let i = 0; i < this.NUM_SOOTS; i++) {
            this.animations[i].drawFrame(this.game.clockTick, ctx, this.x[i], this.y[i], 0.3);
            ctx.strokeRect(this.BB[i].x, this.BB[i].y, this.BB[i].width, this.BB[i].height);
        }
        ctx.imageSmoothingEnabled = false;

    };

};