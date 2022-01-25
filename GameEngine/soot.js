/*
 * Soot Object
 * Created and animated by Kumiko
 *
 */

class Soot {
    constructor( game, x, y, sootDir) {
        Object.assign(this, { game, x, y, sootDir});
        // this.spritesheet_aura = ASSET_MANAGER.getAsset("./sprites/soot-jump-long_aura.png");
        this.spritesheet_aura2 = ASSET_MANAGER.getAsset("./sprites/soot-jump-long_aura2_bidir.png");

        this.loadAnimations();

        // sets the areas the soot will be located in
        this.minScreen = {x: x, y: y};
        this.maxScreen = {x: x+50, y: y+25};

        // velocity values
        const randomx = getRandomInteger(25,50);
        const randomy = getRandomInteger(25,50);

        this.START_V = {x: randomx, y: randomy};

        this.velocity = {x: this.START_V.x, y: this.START_V.y};

        this.dead = false;

        // bounding box
        this.updateBB();

    };

    loadAnimations() {
        if(this.sootDir === 1) { // soots move left to right
            this.animations = new Animator(this.spritesheet_aura2, 0, 0, 100, 100, 6, .2, 15, false, true);
        } else {            // soots move right to left
            this.animations = new Animator(this.spritesheet_aura2, 0, 125, 100, 100, 6, .2, 15, false, true);
        }
    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + 2, this.y + 5, 10, 10);
        this.leftBB = new BoundingBox(this.x + 2, this.y + 5, 2, 10);
        this.rightBB = new BoundingBox(this.BB.right - 2, this.y, 2, 10);
    };

    // this is set to move the piece across the screen
    update() {
        const STOP_FALL = 100;
        const STOP_FALL_A = 200;

        let curFrame = this.animations.currentFrame(); // determines the current frame

        if (this.dead) {
            this.removeFromWorld = true;
        }

        if (this.sootDir === 1){     // soots moving left to right
             if(curFrame < 3 && this.x < this.maxScreen.x && this.y >= this.minScreen.y) { // check the current frame, x value, top y
                this.velocity.y -= (STOP_FALL - STOP_FALL_A) * this.game.clockTick;
                this.x += this.velocity.x * this.game.clockTick;
                this.y -= this.velocity.y * this.game.clockTick;
            }
            else if (curFrame >= 3 && curFrame < 6 && this.x < this.maxScreen.x && this.y >= this.minScreen.y) {
                this.velocity.y += (STOP_FALL - STOP_FALL_A) * this.game.clockTick;
                this.x += this.velocity.x * this.game.clockTick;
                this.y += this.velocity.y * this.game.clockTick;
            }
            else if (this.x >= this.maxScreen.x) {
                this.x = this.minScreen.x;
            }
            else if (this.y < this.minScreen.y) {
                this.y = this.maxScreen.y;
                this.x = this.minScreen.x;
                this.velocity.y = this.START_V.y;
                this.velocity.x = this.START_V.x;

            } else {
                this.velocity.y = this.START_V.y;
                this.velocity.x = this.START_V.x;
            }

        } else {        // soots moving right to left
            if(curFrame < 3 && this.x > this.minScreen.x && this.y >= this.minScreen.y) {
                this.velocity.y -= (STOP_FALL - STOP_FALL_A) * this.game.clockTick;
                this.x -= this.velocity.x * this.game.clockTick;
                this.y -= this.velocity.y * this.game.clockTick;
            }
            else if (curFrame  >= 3 && curFrame < 6 && this.x > this.minScreen.x && this.y >= this.minScreen.y) {
                this.velocity.y += (STOP_FALL - STOP_FALL_A) * this.game.clockTick;
                this.x -= this.velocity.x * this.game.clockTick;
                this.y += this.velocity.y * this.game.clockTick;
            }
            else if (this.x <= this.minScreen.x) {
                this.x = this.maxScreen.x;
            }
            else if (this.y < this.minScreen.y){
                this.y = this.maxScreen.y;
                this.x = this.maxScreen.x;
                this.velocity.y = this.START_V.y;
                this.velocity.x = this.START_V.x;
            } else {
                this.velocity.y = this.START_V.y;
                this.velocity.x = this.START_V.x;
            }
        }
            this.updateBB();
    };

    draw(ctx) {
        this.animations.drawFrame(this.game.clockTick, ctx, this.x  - this.game.camera.x, this.y, 0.15);

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