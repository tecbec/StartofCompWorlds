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

        const NUM_SOOTS = 10; // must be an even number
        const NUM_SOOTS_HALF = NUM_SOOTS / 2; 

        // Constants for the x and y 
        const STARTx = [];
        const STARTy = [];
        let temp3 = 50;

        // initialize x1, x2, x3; y1, y2, y3
        this.x = [];
        this.y = [];


        for (let i = 0; i < NUM_SOOTS; i++){
            
            if (i < 5) {
                STARTx[i] = this.x[i] = 0;
            } else {
                STARTx[i] = this.x[i] = 400;
            }
            STARTy[i] = this.y[i] = 400;
        };

        const START_Vx = [];
        const START_Vy = [];

        let temp = 50;
        let temp1 = 100;

        for (let i = 0; i < NUM_SOOTS_HALF; i++){
            START_Vx[i] = temp;
            START_Vy[i] = temp1;
            temp += 15;
            temp1 += 15;
        };

        temp = 50;
        temp1 = 100;

        for (let i = NUM_SOOTS_HALF; i < NUM_SOOTS; i++){
            START_Vx[i] = temp;
            START_Vy[i] = temp1;
            temp += 15;
            temp1 += 15;
        };


        this.velocityx = [];
        this.velocityy = [];
        for (let i = 0; i < NUM_SOOTS; i++) {
            this.velocityx[i] = START_Vx[i];
            this.velocityy[i] = START_Vy[i];
        };

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

    // this is set to move the piece across the screen
    update() {   
        const NUM_SOOTS = 10; // must be an even number
        const NUM_SOOTS_HALF = NUM_SOOTS / 2; 
        const STOP_FALL = [];
        const STOP_FALL_A = [];

        const SCREEN_X = 400;
        const SCREEN_Y = 400;
        
        let temp1 = 100;
        let temp2 = 200;
        
        for(let i = 0; i < NUM_SOOTS_HALF; i++ ) {
            STOP_FALL[i] = temp1;
            STOP_FALL_A[i] = temp2;
            temp1 += 25;
            temp2 += 50;
        }

        temp1 = 100;
        temp2 = 200;

        for(let i = 5; i < NUM_SOOTS; i++ ) {
            STOP_FALL[i] = temp1;
            STOP_FALL_A[i] = temp2;
            temp1 += 25;
            temp2 += 50;
        }

        // let curFrame = [];

        // for(let i = 0; i < NUM_SOOTS; i++){
        //     curFrame[i] = this.animations[i].currentFrame(); // determines the current frame
        // }

        let curFrame = this.animations[0].currentFrame(); // determines the current frame

        for(let i = 0; i < NUM_SOOTS; i++){
            if (i < 5){     // soots moving left to right 

                if(curFrame < 3 && this.x[i] < SCREEN_X) {
                    this.velocityy[i] -= (STOP_FALL[i] - STOP_FALL_A[i]) * this.game.clockTick;
                    this.x[i] += this.velocityx[i] * this.game.clockTick;
                    this.y[i] -= this.velocityy[i] * this.game.clockTick;
                } 
                else if (curFrame  >= 3 && curFrame < 6 && this.x[i] < SCREEN_X) {
                    this.velocityy[i] += (STOP_FALL[i] - STOP_FALL_A[i]) * this.game.clockTick;
                    this.x[i] += this.velocityx[i] * this.game.clockTick;
                    this.y[i] += this.velocityy[i] * this.game.clockTick;
                } 
                else if (this.x[i] >= SCREEN_X) {
                    this.x[i] = 0;
                }
                else if (this.y[i] <= 350) {
                    this.y[i] = 400;
                    this.velocityy[i] = this.START_Vy[i];
                } else {
                    this.velocityy[i] = this.START_Vy[i];
                }

            } else {        // soots moving right to left
                if(curFrame < 3 && this.x[i] >= 0) {
                    this.velocityy[i] -= (STOP_FALL[i] - STOP_FALL_A[i]) * this.game.clockTick;
                    this.x[i] -= this.velocityx[i] * this.game.clockTick;
                    this.y[i] -= this.velocityy[i] * this.game.clockTick;
                } 
                else if (curFrame  >= 3 && curFrame < 6 && this.x[i] >= 0) {
                    this.velocityy[i] += (STOP_FALL[i] - STOP_FALL_A[i]) * this.game.clockTick;
                    this.x[i] -= this.velocityx[i] * this.game.clockTick;
                    this.y[i] += this.velocityy[i] * this.game.clockTick;
                } 
                else if (this.x[i] < 0) {
                    this.x[i] = 800;
                }
                else if (this.y[i] <= 350){
                    this.y[i] = 400;
                    this.velocityy[i] = this.START_Vy[i];
                } else {
                    this.velocityy[i] = this.START_Vy[i];
                }
            }
        }
    };

    draw(ctx) {

        const NUM_SOOTS = 10;

        for(let i = 0; i < NUM_SOOTS; i++) {
            this.animations[i].drawFrame(this.game.clockTick, ctx, this.x[i], this.y[i], 0.3);
        }

    };

};