/* Chihiro's Params */
var CHIHIRO = {
    TITLE_POSITION: {X: 0, Y: 260},
    INITIAL_POSITION: {X: 0, Y: 0},
    SIZE: 70,
    SCALE: 1,
    BB_PADDING: 10,
    IDLE:   {RIGHT: {X: 0,  Y: 0},    LEFT: {X: 0,  Y: 70},   FRAME: 4, SPEED: 0.4,  PADDING: 0, REVERSE: false, LOOP: true}, 
    WALK:   {RIGHT: {X: 0,  Y: 140},  LEFT: {X: 0,  Y: 210},  FRAME: 4, SPEED: 0.2,  PADDING: 0, REVERSE: false, LOOP: true},
    JUMP:   {RIGHT: {X: 0,  Y: 280},  LEFT: {X: 0,  Y: 350},  FRAME: 7, SPEED: 0.1, PADDING: 0, REVERSE: false, LOOP: true}, 
    CROUCH: {RIGHT: {X: 0,  Y: 280},  LEFT: {X: 0,  Y: 350},  FRAME: 1, SPEED: 0.33, PADDING: 0, REVERSE: false, LOOP: true},
    RUN:    {RIGHT: {X: 0,  Y: 140},  LEFT: {X: 0,  Y: 210},  FRAME: 4, SPEED: 0.1, PADDING: 0, REVERSE: false, LOOP: true},
    DEAD:   {RIGHT: {X: 0,  Y: 420},  LEFT: {X: 0,  Y: 490},  FRAME: 3, SPEED: 0.3, PADDING: 0, REVERSE: false, LOOP: false}, 
    BREATH_BAR: {X: 275, Y: 10, HEIGHT: 10, MAX: 100},
    COIN_COUNTER: {X: 225, Y: 7.25}
};
/* Chihiro, the main character of the game */
class Player {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.game.chihiro = this;
        this.game.x = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/chihiro_spritesheet.png");

        // initialization of the breath bar and counter
        this.breathwidth = 100;
        this.coinCounter = new CoinCounter(this.game, CHIHIRO.COIN_COUNTER.X, CHIHIRO.COIN_COUNTER.Y);
        this.breathbar = new BreathBar(this.game, CHIHIRO.BREATH_BAR.X, CHIHIRO.BREATH_BAR.Y, this.breathwidth,
            CHIHIRO.BREATH_BAR.HEIGHT, CHIHIRO.BREATH_BAR.MAX);

        // default values
        this.velocity = { x: 0, y: 0};
        this.isGrounded = false;
        this.dead = false;
        this.deadCounter = 0;
        this.breathwidth = 100;
        // testing
        this.sootCount = 0;
        this.nofaceCount = 0;
        // animation
        this.facing = 0; // 0 = right; 1 = left
        this.state = 0;  // 0 = idle, 1 = walking, 2 = jumping/falling, 3 = crouching, 4 = death

        this.animations = [];
        this.updateBB();
        this.loadAnimations();
    };

    /* Load the following animations from the sprite sheet for Chihiro's current state and direction */
    loadAnimations() {
        // array with [state] [face] of the same animator
        for (var i = 0; i < 6; i++) {
            this.animations.push([]);
            for (var j = 0; j < 2; j++) {
                this.animations[i].push([]);
            }
        }
        // idle -> right
        this.animations[0][0] = new Animator (this.spritesheet, CHIHIRO.IDLE.RIGHT.X, CHIHIRO.IDLE.RIGHT.Y,
            CHIHIRO.SIZE, CHIHIRO.SIZE,
            CHIHIRO.IDLE.FRAME, CHIHIRO.IDLE.SPEED,
            CHIHIRO.IDLE.PADDING, CHIHIRO.IDLE.REVERSE, CHIHIRO.IDLE.LOOP);

        // idle -> left
        this.animations[0][1] = new Animator (this.spritesheet, CHIHIRO.IDLE.LEFT.X, CHIHIRO.IDLE.LEFT.Y,
            CHIHIRO.SIZE, CHIHIRO.SIZE, 
            CHIHIRO.IDLE.FRAME, CHIHIRO.IDLE.SPEED,
            CHIHIRO.IDLE.PADDING, CHIHIRO.IDLE.REVERSE, CHIHIRO.IDLE.LOOP);

        // walk -> right
        this.animations[1][0] = new Animator (this.spritesheet, CHIHIRO.WALK.RIGHT.X, CHIHIRO.WALK.RIGHT.Y,
            CHIHIRO.SIZE, CHIHIRO.SIZE,
            CHIHIRO.WALK.FRAME, CHIHIRO.WALK.SPEED,
            CHIHIRO.WALK.PADDING, CHIHIRO.WALK.REVERSE, CHIHIRO.WALK.LOOP);

        // walk -> left
        this.animations[1][1] = new Animator (this.spritesheet, CHIHIRO.WALK.LEFT.X, CHIHIRO.WALK.LEFT.Y,
            CHIHIRO.SIZE, CHIHIRO.SIZE,
            CHIHIRO.WALK.FRAME, CHIHIRO.WALK.SPEED,
            CHIHIRO.WALK.PADDING, CHIHIRO.WALK.REVERSE, CHIHIRO.WALK.LOOP);

        // jump -> right
        this.animations[2][0] = new Animator (this.spritesheet, CHIHIRO.JUMP.RIGHT.X, CHIHIRO.JUMP.RIGHT.Y,
            CHIHIRO.SIZE, CHIHIRO.SIZE,
            CHIHIRO.JUMP.FRAME, CHIHIRO.JUMP.SPEED,
            CHIHIRO.JUMP.PADDING, CHIHIRO.JUMP.REVERSE, CHIHIRO.JUMP.LOOP);

        // jump -> left
        this.animations[2][1] = new Animator (this.spritesheet, CHIHIRO.JUMP.LEFT.X, CHIHIRO.JUMP.LEFT.Y,
            CHIHIRO.SIZE, CHIHIRO.SIZE,
            CHIHIRO.JUMP.FRAME, CHIHIRO.JUMP.SPEED,
            CHIHIRO.JUMP.PADDING, CHIHIRO.JUMP.REVERSE, CHIHIRO.JUMP.LOOP);

        // crouch -> right
        this.animations[3][0] = new Animator (this.spritesheet, CHIHIRO.CROUCH.RIGHT.X, CHIHIRO.CROUCH.RIGHT.Y,
            CHIHIRO.SIZE, CHIHIRO.SIZE,
            CHIHIRO.CROUCH.FRAME, CHIHIRO.CROUCH.SPEED,
            CHIHIRO.CROUCH.PADDING, CHIHIRO.CROUCH.REVERSE, CHIHIRO.CROUCH.LOOP);

        // crouch -> left
        this.animations[3][1] = new Animator (this.spritesheet, CHIHIRO.CROUCH.LEFT.X, CHIHIRO.CROUCH.LEFT.Y,
            CHIHIRO.SIZE, CHIHIRO.SIZE,
            CHIHIRO.CROUCH.FRAME, CHIHIRO.CROUCH.SPEED,
            CHIHIRO.CROUCH.PADDING, CHIHIRO.CROUCH.REVERSE, CHIHIRO.CROUCH.LOOP);

        // run -> right
        this.animations[4][0] = new Animator (this.spritesheet, CHIHIRO.RUN.RIGHT.X, CHIHIRO.RUN.RIGHT.Y,
            CHIHIRO.SIZE, CHIHIRO.SIZE,
            CHIHIRO.RUN.FRAME, CHIHIRO.RUN.SPEED,
            CHIHIRO.RUN.PADDING, CHIHIRO.RUN.REVERSE, CHIHIRO.RUN.LOOP);

        // run -> left
        this.animations[4][1] = new Animator (this.spritesheet, CHIHIRO.RUN.LEFT.X, CHIHIRO.RUN.LEFT.Y,
            CHIHIRO.SIZE, CHIHIRO.SIZE,
            CHIHIRO.RUN.FRAME, CHIHIRO.RUN.SPEED,
            CHIHIRO.RUN.PADDING, CHIHIRO.RUN.REVERSE, CHIHIRO.RUN.LOOP);

        // dead -> right
        this.animations[5][0] = new Animator(this.spritesheet, CHIHIRO.DEAD.RIGHT.X, CHIHIRO.DEAD.RIGHT.Y,
            CHIHIRO.SIZE, CHIHIRO.SIZE,
            CHIHIRO.DEAD.FRAME, CHIHIRO.DEAD.SPEED,
            CHIHIRO.DEAD.PADDING, CHIHIRO.DEAD.REVERSE, CHIHIRO.DEAD.LOOP);
        // dead -> left
        this.animations[5][1] = new Animator(this.spritesheet, CHIHIRO.DEAD.LEFT.X, CHIHIRO.DEAD.LEFT.Y,
            CHIHIRO.SIZE, CHIHIRO.SIZE,
            CHIHIRO.DEAD.FRAME, 0.12,
            CHIHIRO.DEAD.PADDING, CHIHIRO.DEAD.REVERSE, CHIHIRO.DEAD.LOOP);
    };
    /* Update the bounding box of the player for collision detection */
    updateBB() {
        this.lastBB = this.BB;
        this.lastBBbottom = this.BBbottom;
        this.BB = new BoundingBox(this.x + CHIHIRO.BB_PADDING, this.y + CHIHIRO.BB_PADDING,
                                    CHIHIRO.SIZE * CHIHIRO.SCALE - CHIHIRO.BB_PADDING - CHIHIRO.BB_PADDING, // both side
                                    CHIHIRO.SIZE * CHIHIRO.SCALE - CHIHIRO.BB_PADDING); // KD changed the bounding box dimensions to hug the sprite
        // this.BBbottom = new BoundingBox(this.x + CHIHIRO.BB_PADDING + CHIHIRO.BB_PADDING, this.y - CHIHIRO.BB_PADDING + CHIHIRO.SIZE * CHIHIRO.SCALE,
        //     CHIHIRO.BB_PADDING + CHIHIRO.BB_PADDING, // both side
        //     CHIHIRO.BB_PADDING); // KD changed the bounding box dimensions to hug the sprite
    };

    /* Draw the images onto the screen */
    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, CHIHIRO.SCALE);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
            // ctx.strokeStyle = 'Green';
            // ctx.strokeRect(this.BBbottom.x - this.game.camera.x, this.BBbottom.y, this.BBbottom.width, this.BBbottom.height);
        }
        ctx.imageSmoothingEnabled = false;
        this.breathbar.draw(ctx);
        this.coinCounter.draw(ctx);
    };

    update() {
        const TICK = this.game.clockTick;
        const TICK_SCALE = 2;
        const MAX_FALL = 240;
        const MAX_RUN = 250;
        const MIN_WALK = 100;
        const RUN_ACC = 400;
        const FALL_ACC = 562.5;

        // TODO: add crouch speed
        // can only move while on the ground AND jump after has been grounded for x ticks
        if (this.isGrounded && !this.dead) {
            if(this.jumping) {         // just landed
                this.jumpTimer = 1000; // set off short timer, to prevent accidental double jumping
            }
            //updating jump timer
            this.jumpTimer -= .01;
            this.jumping = false;

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
                    if (this.game.right && !this.game.left) {   // make sure that only one button is pressed at a time
                        if (this.game.run) {                    // when player press shift + arrow
                            this.velocity.x += RUN_ACC * TICK;
                        }
                    } else {
                        this.velocity.x = 0;
                        this.state = 4;
                    }
                }
                if (this.facing === 1) {                        // if going right
                    if (this.game.left && !this.game.right) {
                        if (this.game.run) {
                            this.velocity.x -= RUN_ACC * TICK;
                        }
                    } else {
                        this.velocity.x = 0;
                        this.state = 4;
                    }
                }
            }
            if (this.game.up) {  // jumping
                this.jumping = true;
                this.velocity.y = -250;
                this.state = 2;
            } else {
                this.state = 0;
                this.velocity.y = 0;
            }
        } else {
            // fall straight down if did not jump
            if (this.velocity.y > 0 && !this.jumping) {
                this.state = 2;
                this.velocity.x = 0;
            }

            // can change direction they are falling
            if (this.game.left) {
                this.velocity.x = -Math.abs(this.velocity.x);
            }
            if (this.game.right) {
                this.velocity.x = Math.abs(this.velocity.x);
            }
        }
        //this makes chihiro always fall
        this.velocity.y += FALL_ACC * TICK;

        if (this.velocity.y >= MAX_FALL)  this.velocity.y =  MAX_FALL;
        if (this.velocity.y <= -MAX_FALL) this.velocity.y = -MAX_FALL;
        if (this.velocity.x >= MAX_RUN)   this.velocity.x =  MAX_RUN;
        if (this.velocity.x <= -MAX_RUN)  this.velocity.x = -MAX_RUN;

        this.x += this.velocity.x * TICK * TICK_SCALE;
        this.y += this.velocity.y * TICK * TICK_SCALE;

        this.updateBB();

        // collision handling
        var that = this; //need this because we are creating
        this.game.entities.forEach(function (entity) {  // this will look at all entities in relation to chihiro
            if (entity.BB && that.BB.collide(entity.BB)) {      // is there an entity bb & check to see if they collide
                if (that.velocity.y > 0) { // chihiro is falling
                    if((entity instanceof Ground || entity instanceof Platform || entity instanceof Haku || entity instanceof NoFace)
                    && (that.lastBB.bottom <= entity.BB.top)) { // bottom of chihiro hits the top of the entity
                        that.isGrounded = true;
                        that.y = entity.BB.top - CHIHIRO.SIZE * CHIHIRO.SCALE;
                        that.velocity.y === 0;
                        that.updateBB();
                    }
                    else {
                        that.isGrounded = false;
                    }
                }
                if (that.velocity.y < 0) { // chihiro is jumping up
                    if((entity instanceof Platform) // collision with platform
                        && (that.lastBB.top >= entity.BB.bottom)) { // top of chihiro goes above the bottom of the platform
                        that.velocity.y = 0;
                        that.updateBB();
                    } else {
                        that.isGrounded = false;
                    }
                }
                // left & right bounding boxes for platform
                if (entity instanceof Platform && that.BB.collide(entity.BB)) {
                    if (that.BB.collide(entity.leftBB) && (that.lastBB.right <= entity.leftBB.left)) { // left collision
                        that.x -= 3; // so that the player won't move up 
                        // that.x = entity.leftBB.left - CHIHIRO.SIZE * CHIHIRO.SCALE;
                        if (that.velocity.x > 0) that.velocity.x = 0;
                    } else if (that.BB.collide(entity.rightBB) && (that.lastBB.left >= entity.rightBB.right)) { // right collision
                        that.x += 3;
                        // that.x = entity.rightBB.right;
                        if (that.velocity.x < 0) that.velocity.x = 0;
                    } 
                    that.updateBB();
                }
                // collision with no face
                if (entity instanceof NoFace && that.BB.collide(entity.BB)) {
                    // Set a maximum amount of coins upon interact
                    if (that.coinCounter.coinCount <= 10) {
                        that.coinCounter.coinCount += 10;
                    }
                    entity.dead = true;
                    if (that.BB.collide(entity.leftBB)) { // left collision
                        that.x = entity.leftBB.left - CHIHIRO.SIZE * CHIHIRO.SCALE + CHIHIRO.BB_PADDING;
                        if (that.velocity.x > 0) that.velocity.x = 0;
                    } else if (that.BB.collide(entity.rightBB)) { // right
                        that.x = entity.rightBB.right - CHIHIRO.BB_PADDING;
                        if (that.velocity.x < 0) that.velocity.x = 0;
                    }
                }

                // Collision with crows
                if (entity instanceof Crow ) {
                    that.breathwidth -= 5;
                    that.breathbar.update(that.breathwidth);
                    entity.removeFromWorld = true;
                }

                //Collision with Yubaba
                //for now have Yubaba push Chihiro? but later  kills on impact 

                // collision with Haku
                if (entity instanceof Haku && that.BB.collide(entity.BB)) {
                    // instantly heal stamina bar
                    that.breathwidth +=  CHIHIRO.BREATH_BAR.MAX - that.breathwidth;
                    that.breathbar.update(that.breathwidth);

                    entity.dead = true; //Haku regenerate should always exist

                    if (that.BB.collide(entity.leftBB)) { // left collision
                        that.x = entity.leftBB.left - CHIHIRO.SIZE * CHIHIRO.SCALE + CHIHIRO.BB_PADDING;
                        if (that.velocity.x > 0) that.velocity.x = 0;
                    } else if (that.BB.collide(entity.rightBB)) { // right
                        that.x = entity.rightBB.right - CHIHIRO.BB_PADDING;
                        if (that.velocity.x < 0) that.velocity.x = 0;
                    }
                    
                }
                
                // collision with soot
                if (entity instanceof Soot ) {
                    that.breathwidth -= 2; // lose breath upon contact (can change)
                    that.breathbar.update(that.breathwidth);
                    entity.dead = true;
                    /*
                    if (that.BB.collide(entity.leftBB)) { // left collision
                        // that.x = entity.leftBB.left - CHIHIRO.SIZE * CHIHIRO.SCALE + CHIHIRO.BB_PADDING;  // check these out for push back
                        if (that.velocity.x > 0) that.velocity.x = 0;
                    } else if (that.BB.collide(entity.rightBB)) {
                        // that.x = entity.rightBB.right - CHIHIRO.BB_PADDING;  // check these out for push back
                        if (that.velocity.x < 0) that.velocity.x = 0;
                    }
                    */
                }
                // collision with coins
                if (entity instanceof Coins) {
                    entity.removeFromWorld = true;
                    if (that.breathbar < CHIHIRO.BREATH_BAR.MAX) {
                        that.breathwidth += 25; // gain breath upon contact (for testing ONLY)
                        that.breathbar.update(that.breathwidth);
                    }
                    that.breathwidth += CHIHIRO.BREATH_BAR.MAX - that.breathwidth;
                    that.breathbar.update(that.breathwidth);
                    that.coinCounter.coinCount ++;
                }
            }
        });

        // update state
        if (this.state !== 2 || this.state !== 5) {  // NOT jump or dead 
            if (this.game.crouch) this.state = 3;    // crouching state
            else if (Math.abs(this.velocity.x) > 0) this.state = 1;        // walking state
            else if (Math.abs(this.velocity.x) > MIN_WALK) this.state = 4; // running state
           
        } else {
            
        }
        if (this.velocity.y < 0) {
            this.state = 2;
        }
        
        if (this.dead) {
            this.state = 5;
            this.velocity.x = 0;
            this.deadCounter += this.game.clockTick;
            if (this.deadCounter > 1) {
                this.removeFromWorld = true;
            }
        } else {
            // do nothing
        }
         // update direction
        if (this.velocity.x < 0) this.facing = 1;
        if (this.velocity.x > 0) this.facing = 0;

        // updating the breath bar
        this.breathwidth -= .05; // changes for testing
        this.breathbar.update(this.breathwidth);

        if (this.breathwidth <= 0) {
            this.dead = true;
        } else {
            this.dead = false;
        }
    };

    toString(){
        return "Player: x-" + this.x + " y-" + this.y;
    };
};

