/*
 * Soot Object
 * Created and animated by Kumiko
 *
 */

class Soot {
    constructor( game, x, y, sootDir,widthSootArea,heightSootArea) {
        Object.assign(this, { game, x, y, sootDir, widthSootArea, heightSootArea});
        // this.spritesheet_aura = ASSET_MANAGER.getAsset("./sprites/soot-jump-long_aura.png");
        this.spritesheet_aura2 = ASSET_MANAGER.getAsset("./sprites/soot-jump-long_aura2_bidir.png");

        this.loadAnimations();

        // sets the areas the soot will be located in
        this.minScreen = {x: x, y: y};
        this.maxScreen = {x: x+this.widthSootArea, y: y+this.heightSootArea};

        // velocity values
        const randomx = getRandomInteger(25,50);
        const randomy = getRandomInteger(25,50);

        this.START_V = {x: randomx, y: randomy};

        this.velocity = {x: this.START_V.x, y: this.START_V.y};

        this.dead = false;
        this.scale = 0.2;

        // bounding box
        this.updateBB();

    };

    loadAnimations() {
        let start = {x: 0, y: 0};
        const height = 100;
        const width = 100;
        const frames = 6;
        const framedur = 0.2;
        const pad = 15;
        if(this.sootDir === 1) { // soots move left to right
            this.animations = new Animator(this.spritesheet_aura2, start.x, start.y, height, width, frames, framedur, pad, false, true);
        } else {            // soots move right to left
            start.y = 125;
            this.animations = new Animator(this.spritesheet_aura2, start.x, start.y, height, width, frames, framedur, pad, false, true);
        }
    }

    updateBB() {
        const subwidth = 2;
        const subheight = 5;
        let width = 10;
        const height = 10;

        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x+subwidth, this.y+subheight, width, height);
        width = 2;
        this.leftBB = new BoundingBox(this.x+subwidth, this.y+subheight, width, height);
        this.rightBB = new BoundingBox(this.BB.right-subwidth, this.y, width, height);
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
        var blurValues = 16;
        ctx.shadowColor = '#fdd834';
         ctx.shadowBlur = blurValues;
        this.animations.drawFrame(this.game.clockTick, ctx, this.x  - this.game.camera.x, this.y, this.scale);
        ctx.shadowColor = "transparent"; // remove shadow !

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