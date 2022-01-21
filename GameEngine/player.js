/* The main character of the movie, Chihiro, will be the player of the game
*/
class Player {
    /* This constructor passes in the following parameters:
    - game = game engine
    - x, y = the location of the Player
    */
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        // NOTE: later on can be updated without the sprite sheet passed in the param.
        this.game.chihiro = this;
        this.game.x = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/spritesheet.png");
        this.updateBB();

        this.animations = [];
        this.loadAnimations();
        this.facing = 0; // 0 = right; 1 = left
        this.state = 0; // 0 = idle, 1 = walking, 2 = jumping/falling,

        this.breathwidth = 100; 
        this.breathbarheight = 10; 
        this.maxBreath = 100; 
        this.breathbar = new BreathBar(this.game, 275, 10, this.breathwidth, this.breathbarheight, this.maxBreath);
        // default values. 
        this.velocity = { x: 0, y: 0};
        this.fallAcc = 562.5;
        this.isGrounded = false;

        this.sootCount = 0;
        this.nofaceCount = 0;
};
    loadAnimations() {
        // array with [state] [face] of the same animator.
        for (var i = 0; i < 5; i++) {
            this.animations.push([]);
            for (var j = 0; j < 2; j++) {
                this.animations[i].push([]);
            }
        }
        // idle -> right, left
        this.animations[0][0] = new Animator (this.spritesheet, 0, 0, 32, 32, 4, 0.1, 0, false, true);
        this.animations[0][1] = new Animator (this.spritesheet, 0, 32, 32, 32, 4, 0.1, 0, false, true);

        // walk -> right, left
        this.animations[1][0] = new Animator (this.spritesheet, 0, 64, 32, 32, 6, 0.1, 0, false, true);
        this.animations[1][1] = new Animator (this.spritesheet, 0, 96, 32, 32, 6, 0.1, 0, false, true);

        // jump -> right, left
        this.animations[2][0] = new Animator (this.spritesheet, 0, 128, 32, 32, 8, 0.15, 0, false, true);
        this.animations[2][1] = new Animator (this.spritesheet, 0, 160, 32, 32, 8, 0.15, 0, false, true);

        // crouch -> right, left
        this.animations[3][0] = new Animator (this.spritesheet, 32, 128, 32, 32, 1, 0.33, 0, false, true);
        this.animations[3][1] = new Animator (this.spritesheet, 32, 160, 32, 32, 1, 0.33, 0, false, true);

        // run -> right, left
        this.animations[4][0] = new Animator (this.spritesheet, 0, 64, 32, 32, 6, 0.05, 0, false, true);
        this.animations[4][1] = new Animator (this.spritesheet, 0, 96, 32, 32, 6, 0.05, 0, false, true);


    }

    updateBB() {
        this.lastBB = this.BB;
        //making the box smaller here
        this.BB = new BoundingBox(this.x + 10, this.y+10, 64-20, 64-10); // KD changed the bounding box dimensions to hug the sprite.

    };

    draw(ctx) {
        // this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 2);

        ctx.strokeStyle = 'Red';
        //ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        ctx.imageSmoothingEnabled = false;
        this.breathbar.draw(ctx);
    }

    update() {
        const TICK = this.game.clockTick;
        const MAX_FALL = 240;
        const MIN_WALK = 100;
        const RUN_ACC = 400;
        const crouch_spe = 350;
        // can only jump and move while on the ground.
        if (this.isGrounded) {
            if (Math.abs(this.velocity.x) < MIN_WALK) { // walking
                this.velocity.x = 0;
                if (this.game.left) {
                    this.velocity.x -= MIN_WALK;
                }
                if (this.game.right) {
                    this.velocity.x += MIN_WALK;
                }
            } else if (Math.abs(this.velocity.x) >= MIN_WALK) { // running
                if (this.facing === 0) {                        // if going left
                    if (this.game.right && !this.game.left) {   // make sure that only one arrow is pressed at a time
                        if (this.game.run) {                    // when player press shift + arrow
                            this.velocity.x += RUN_ACC * TICK;
                        }
                    } else {
                        this.velocity.x = 0; 
                        this.state = 4;
                    }
                } 
                if (this.facing === 1) {                        // if going right
                    if (this.game.left && !this.game.right) {   // make sure that only one arrow is pressed at a time
                        if (this.game.run) {                    // when player press shift + arrow
                            this.velocity.x -= RUN_ACC * TICK;
                        }
                    } else {
                        this.velocity.x = 0;
                        this.state = 4;
                    }
                }
            }
            if (this.game.up) { 
                this.velocity.y = -250;   
                this.state = 2;     
            } else {  
                this.state = 0;
                this.velocity.y = 0;
            }
        } else {
            if (this.velocity.y > 0) {
                this.velocity.x = 0;
            }
        }


        this.velocity.y += this.fallAcc * TICK; //this makes mario always falling

        if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
        if (this.velocity.y <= -MAX_FALL) this.velocity.y = -MAX_FALL;

        this.x += this.velocity.x * TICK * 2;
        this.y += this.velocity.y * TICK * 2;

        this.updateBB();

        var that = this; //need this because we are creating

        // collision
        // TODO: think about left and right bounding box.
        this.game.entities.forEach(function (entity) {              // this will look at all entities in relation to mario
                if (entity.BB && that.BB.collide(entity.BB)) {      //is there an entity bb & check to see if they collide
                    if (that.velocity.y > 0) { // so chihiro is falling
                        if((entity instanceof Ground || entity instanceof Platform)
                        && (that.lastBB.bottom <= entity.BB.top)) { // bottom of the player hits the top of the ground.
                            that.isGrounded = true;
                            that.y = entity.BB.top - 32 * 2;
                            that.velocity.y === 0;
                            that.updateBB();
                        } else {
                            that.isGrounded = false;
                        }
                    }
                    if (that.velocity.y < 0) { // chihiro is jumping
                        if((entity instanceof Platform)
                            && (that.lastBB.top >= entity.BB.bottom)) { // bottom of the player hits the top of the ground.
                            that.y = entity.BB.bottom;
                            that.velocity.y === 0;
                            that.updateBB();
                        } else {
                            that.isGrounded = false;
                        }
                    }
                    // left and right bounding boxes for platform
                    if (entity instanceof Platform && that.BB.collide(entity.BB)) {
                        if (that.BB.collide(entity.leftBB)) { // left collision
                            that.x = entity.leftBB.left - 32 * 2;
                            if (that.velocity.x > 0) that.velocity.x = 0;
                        } else if (that.BB.collide(entity.rightBB)) { // right collision
                            that.x = entity.rightBB.right;
                            if (that.velocity.x < 0) that.velocity.x = 0;
                        }
                        that.updateBB();
                    }
                    // Collision with no face
                    // TODO: Include top collision maybe, or just resize no face to be shorter.
                    // TODO: fix the velocity changes. 
                    if (entity instanceof NoFace && that.BB.collide(entity.BB)) { 
                        if (that.BB.collide(entity.leftBB)) { // left collision
                            that.x = entity.leftBB.left - 32 * 2;   
                            if (that.velocity.x > 0) that.velocity.x = 0; 
                        } else if (that.BB.collide(entity.rightBB)) {
                            that.x = entity.rightBB.right - 5;
                            if (that.velocity.x < 0) that.velocity.x = 0;
                        }
                        // This is where we want to make no face give chihiro coins
                        // and after some amount of time make no face disappear.
                        entity.removeFromWorld = true;
                        that.nofaceCount++;
                        console.log("that.nofaceCount++: " + that.nofaceCount++);
                    }
                    // Collision with soot
                    if (entity instanceof Soot ) { 
                        console.log("entered")
                        that.sootCount++;
                        console.log("that.sootCount " + that.sootCount);
                        // This is where we want to make chihiro loose stamina
                        // and after make the soots disappear?
                    }
                    // Collision with coins
                    if (entity instanceof Coins) {
                        entity.removeFromWorld = true; 
                        if (that.breathbar < that.maxBreath) {
                            that.breathwidth += 25; 
                            that.breathbar.update(that.breathwidth);
                        } 
                        that.breathwidth +=  that.maxBreath - that.breathwidth; 
                        that.breathbar.update(that.breathwidth);
                    }     
                }
        });

         // update state
        if (this.state !== 2) {
            if (this.game.crouch) this.state = 3; //crouching state
            else if (Math.abs(this.velocity.x) > 0) this.state = 1;
            else if(Math.abs(this.velocity.x) > MIN_WALK) this.state = 4; //running state
        } else {

        }
         // update direction
         if (this.velocity.x < 0) this.facing = 1;
         if (this.velocity.x > 0) this.facing = 0;
         
         //updating the healthbar 
         this.breathwidth -= .01; // changes for testing
         this.breathbar.update(this.breathwidth);
    }
}