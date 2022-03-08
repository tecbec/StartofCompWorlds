/*
 * Soot Object
 * Created and animated by Kumiko
 * Rev. 3
 */
class Soot {
    constructor( game, x, y, startDir, widthSootArea, heightSootArea, numSoots)  {
        Object.assign(this, { game, x, y, startDir, widthSootArea, heightSootArea, numSoots });
        this.spritesheet= ASSET_MANAGER.getAsset("./GameEngine/sprites/soot-jump-long_aura2_bidir.png");
        this.candyspritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/candy.png");

        
        console.log("1. soot num: " , this.numSoots);

        // set the soot direction
        this.sootDir = this.startDir;
        this.soots = [];


        // Set the number of candies and candy for each soot randomly
        this.candyNum = [];  
        for (let i = 0; i < this.numSoots; i++){
            this.candyNum[i] = getRandomInteger(0,3);
            console.log("candy num: " , this.candyNum[i]);
        }

        console.log(this.candyNum.length);

        // sets the areas the soot will be located in
        this.minScreen = {x: this.x, y: this.y};
        this.maxScreen = {x: this.x+this.widthSootArea, y: this.y+this.heightSootArea};

        // Velocity values
        this.START_V = {x: 25, y: 25};
        this.velocity = {x: this.START_V.x, y: this.START_V.y};

        // life values
        this.dead = false;

        // sprite dimensions
        this.SootHeight = 100;         // height of the sprite
        this.SootWidth = 100;          // width of the sprite

        // scaling desired
        this.scale = 0.4;         // scaling of the soot

        // starting location of the soot on the screen
        if(startDir == 1) {             // going left to right
            this.Sootx = this.x;        // position of the soot x
        } else {                        // going right to left
            this.Sootx = this.maxScreen.x - (this.SootWidth * this.scale * this.numSoots); // position of the soot x
        }
        this.Sooty = this.maxScreen.y - (this.SootHeight * this.scale) - 1;                   // position of the soot y

        // load the animations
        this.loadAnimations();

        // bounding box
        this.updateBB();

        // total life of the soot at the beginning of the game this depletes with bubble hits
        this.hitpoints = 30;
    };

    loadAnimations() {
        let start = {x: 0, y: 0};   // location on the spritesheet to start
        const frames = 6;           // number of frames
        const framedur = 0.16;       // the duration of the frame to be up
        const pad = 15;             // padding between the soot frames

        if(this.startDir === 1) { // soots move left to right
            this.animations = new Animator(this.spritesheet, start.x, start.y, this.SootWidth, this.SootHeight, frames, framedur, pad, false, true);
        } else {                  // soots move right to left
            start.y = 125;
            this.animations = new Animator(this.spritesheet, start.x, start.y, this.SootWidth, this.SootHeight, frames, framedur, pad, false, true);
        }

        const candyFramDur = 0.2;

        this.pinkCandyAnim  = new Animator(this.candyspritesheet, 0,   0, 60, 50, 4, candyFramDur, 0, false, true);
        this.greenCandyAnim = new Animator(this.candyspritesheet, 0,  50, 60, 50, 4, candyFramDur, 0, false, true);
        this.lgreenCandyAnim= new Animator(this.candyspritesheet, 0, 150, 60, 50, 4, candyFramDur, 0, false, true);
        this.whiteCandyAnim = new Animator(this.candyspritesheet, 0, 100, 60, 50, 4, candyFramDur, 0, false, true);


    }

    updateBB() {
        this.lastBB = this.BB;

        // This will be the bounding box for all the soots.
        let width =(this.numSoots * this.SootWidth * this.scale);
        this.BB = new BoundingBox(this.Sootx, this.Sooty+((this.SootHeight*this.scale)/2), width, (this.SootHeight * this.scale)/2);

        // This will display the area the soots are in
        this.areaBB = new BoundingBox(this.x, this.y, this.widthSootArea, this.heightSootArea);
    };

    update() {
        let curFrame = this.animations.currentFrame(); // determines the current frame

        // remove all the soots within the area if the area is hit
        if (this.dead) {
            this.removeFromWorld = true;
        }

        // This will control jumping movement of the soot
        if (this.sootDir === 1){     // soots moving left to right
            if(curFrame < 3) {
                this.velocity.y -= this.game.clockTick;
                this.Sootx += this.velocity.x * this.game.clockTick;
                this.Sooty -= this.velocity.y * this.game.clockTick;
            } else if (curFrame >= 3) {
                this.velocity.y += this.game.clockTick;
                this.Sootx += this.velocity.x * this.game.clockTick;
                this.Sooty += this.velocity.y * this.game.clockTick;
            }
        } else {                    // soots moving right to left
            if(curFrame < 3) {
                this.velocity.y -= this.game.clockTick;
                this.Sootx -= this.velocity.x * this.game.clockTick;
                this.Sooty -= this.velocity.y * this.game.clockTick;
            } else if (curFrame >= 3) {
                this.velocity.y += this.game.clockTick;
                this.Sootx -= this.velocity.x * this.game.clockTick;
                this.Sooty += this.velocity.y * this.game.clockTick;
            }
        }

        // This will cause the back and forth movement of the soots within the specified area
        if (this.BB.left < this.x) {
            this.velocity.x = this.START_V.x;
            this.sootDir = 1;
        } else if (this.BB.right > this.maxScreen.x) {
            this.velocity.x = this.START_V.x;
            this.sootDir = 0;
        }

        this.updateBB();

        // keeps track of whether the soots have been struck by the bubbles
        if(this.hitpoints <= 0 ) {this.removeFromWorld = true;}
    };

    draw(ctx) {
        var blurValues = 16;
        ctx.shadowColor = '#fdd834';
        ctx.shadowBlur = blurValues;

        const candyPad = {x: 5, y: 12};

        // draws multiple soots
        for (let i = 0; i < this.numSoots; i++){

            this.animations.drawFrame((this.game.clockTick/this.numSoots), ctx, 
                                        ((this.Sootx + (i * this.SootWidth * this.scale)) - this.game.camera.x), 
                                        this.Sooty, this.scale);

            switch(this.candyNum[i]) {
                case 0:
                    ctx.shadowColor = '#6abe30';
                    ctx.shadowBlur = 10;
                    this.greenCandyAnim.drawFrame(this.game.clockTick, ctx, 
                                                    ((this.Sootx + (i * this.SootWidth * this.scale)) - this.game.camera.x) + candyPad.x, 
                                                    this.Sooty - candyPad.y, 0.5);
                    break;
                case 1:
                    ctx.shadowColor = '#ffb1cb';
                    ctx.shadowBlur = 10;
                    this.pinkCandyAnim.drawFrame(this.game.clockTick, ctx, 
                                                ((this.Sootx + (i * this.SootWidth * this.scale)) - this.game.camera.x) + candyPad.x, 
                                                this.Sooty - candyPad.y, 0.5);
                    break;
                case 2:
                    ctx.shadowColor = '#d2e086';
                    ctx.shadowBlur = 10;
                    this.lgreenCandyAnim.drawFrame(this.game.clockTick, ctx, 
                                                    ((this.Sootx + (i * this.SootWidth * this.scale)) - this.game.camera.x) + candyPad.x,  
                                                    this.Sooty - candyPad.y, 0.5);
                    break;
                case 3:
                    ctx.shadowColor = '#ffffff';
                    ctx.shadowBlur = 10;
                    this.whiteCandyAnim.drawFrame(this.game.clockTick, ctx, 
                                                    ((this.Sootx + (i * this.SootWidth * this.scale)) - this.game.camera.x) + candyPad.x,
                                                    this.Sooty - candyPad.y, 0.5);
                    break;
                default:
                    break;
            }
        }
        ctx.shadowColor = "transparent"; // remove shadow !

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            // This will be the bounding box for a all the soots.
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);

            ctx.strokeStyle = 'Yellow';
            ctx.strokeRect(this.areaBB.x - this.game.camera.x, this.areaBB.y, this.areaBB.width, this.areaBB.height);
        }

        ctx.imageSmoothingEnabled = false;
    };
};