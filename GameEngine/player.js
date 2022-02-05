/* Chihiro's Params */
var CHIHIRO = {
    TITLE_POSITION: {X: 0, Y: 260},
    INITIAL_POSITION: {X: 0, Y: 0},
    SIZE: 70,
    SCALE: 2,
    // BB_PADDING: 30,
    BB_PADDING: 0,
    IDLE:   {RIGHT: {X: 0,  Y: 0},    LEFT: {X: 0,  Y: 70},   FRAME: 4, SPEED: 0.4,  PADDING: 0, REVERSE: false, LOOP: true}, 
    WALK:   {RIGHT: {X: 0,  Y: 140},  LEFT: {X: 0,  Y: 210},  FRAME: 4, SPEED: 0.2,  PADDING: 0, REVERSE: false, LOOP: true},
    JUMP:   {RIGHT: {X: 0,  Y: 280},  LEFT: {X: 0,  Y: 350},  FRAME: 7, SPEED: 0.1, PADDING: 0, REVERSE: false, LOOP: true}, 
    CROUCH: {RIGHT: {X: 0,  Y: 280},  LEFT: {X: 0,  Y: 350},  FRAME: 1, SPEED: 0.33, PADDING: 0, REVERSE: false, LOOP: true},
    RUN:    {RIGHT: {X: 0,  Y: 140},  LEFT: {X: 0,  Y: 210},  FRAME: 4, SPEED: 0.1, PADDING: 0, REVERSE: false, LOOP: true},
    DEAD:   {RIGHT: {X: 0,  Y: 420},  LEFT: {X: 0,  Y: 490},  FRAME: 3, SPEED: 0.3, PADDING: 0, REVERSE: false, LOOP: false}, 
    BREATH_BAR: {X: 1700, Y: 10, HEIGHT: 10, MAX: 100},
    COIN_COUNTER: {X: 1620, Y: 7.25}
};
/* Chihiro, the main character of the game */
class Player {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.game.chihiro = this;  // chihiro adds a reference to herself into the game engine
        this.game.x = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/chihiro_spritesheet.png");

        // default values
        this.velocity = { x: 0, y: 0};
        this.isGrounded = false;
        this.deadCounter = 0;
        this.dead = false;

        // testing
        this.sootCount = 0;
        this.nofaceCount = 0;
        // animation
        this.facing = 0; // 0 = right; 1 = left
        this.state = 0;  // 0 = idle, 1 = walking, 2 = jumping/falling, 3 = crouching, 4 = running, 5 = death

        this.bubbleController = new BubblesController(this.game);

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
                                    CHIHIRO.SIZE * CHIHIRO.SCALE - CHIHIRO.BB_PADDING); 

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
        this.bubbleController.draw(ctx);
        this.shoot();
    };

    shoot(){
        if(this.game.bubble) {
            const speed = 2;
            const delayBubble = 5;
            const damage = 1;
            const bubbleX = this.x + CHIHIRO.SIZE /2 - this.game.camera.x ;
            const bubbleY = this.y+ CHIHIRO.SIZE /2;
            this.bubbleController.update( bubbleX, bubbleY, speed, damage, delayBubble);
        }
    };

    update() {
        const TICK = this.game.clockTick;
        const TICK_SCALE = 2;
        const MAX_FALL = 240 * PARAMS.SCALE;
        const MAX_RUN = 250 * PARAMS.SCALE;
        const MIN_WALK = 100 * PARAMS.SCALE;
        const RUN_ACC = 400 * PARAMS.SCALE;
        const FALL_ACC = 562.5 * PARAMS.SCALE;

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
                if (this.game.left && !this.game.deactivate) {
                    this.velocity.x -= MIN_WALK;
                }
                if (this.game.right && !this.game.deactivate) {
                    this.velocity.x += MIN_WALK;
                }
            } else if (Math.abs(this.velocity.x) >= MIN_WALK) { // running
                if (this.facing === 0) {                        // if going left
                    if (this.game.right && !this.game.left && !this.game.deactivate) {   // make sure that only one button is pressed at a time
                        if (this.game.run) {                    // when player press shift + arrow
                            this.velocity.x += RUN_ACC * TICK;
                        }
                    } else {
                        this.velocity.x = 0;
                        // this.state = 4;
                    }
                }
                if (this.facing === 1) {                        // if going right
                    if (this.game.left && !this.game.right && !this.game.deactivate) {
                        if (this.game.run) {
                            this.velocity.x -= RUN_ACC * TICK;
                        }
                    } else {
                        this.velocity.x = 0;
                        // this.state = 4;
                    }
                }
            }
            if (this.game.up) {  // jumping
                this.jumping = true;
                this.velocity.y = -250 * PARAMS.SCALE;
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
        this.game.entities.forEach(function (entity) {          // this will look at all entities in relation to chihiro

            if (entity.BB && that.BB.collide(entity.BB)) {      // is there an entity bb & check to see if they collide

                if (that.velocity.y > 0) {                      // chihiro is falling

                    if((entity instanceof Ground || entity instanceof Platform || entity instanceof CloudPlatform ||
                        entity instanceof StoneLamp || entity instanceof Haku || entity instanceof NoFace ||
                        entity instanceof Railing || entity instanceof Lamp)
                    && (that.lastBB.bottom <= entity.BB.top)) { // bottom of chihiro hits the top of the entity
                        that.isGrounded = true;
                        that.y = entity.BB.top - CHIHIRO.SIZE * CHIHIRO.SCALE;
                        that.velocity.y = 0;
                        that.updateBB();
                    }
                    else {
                        that.isGrounded = false;
                    }
                }

                if(entity instanceof Railing && that.game.crouch) // if she's crouching she'll fall to ground
                {
                    that.isGrounded = false;
                    that.y = entity.BB.top - CHIHIRO.SIZE * CHIHIRO.SCALE + 1; // the 1 is just to get her past the bb of the railing
                    that.velocity.y += FALL_ACC + TICK;
                    that.updateBB();
                }

                if (that.velocity.y < 0) {     // chihiro is jumping up and hits the bottom of a platform
                    if((entity instanceof Platform )    // collision w/ bottom of platform
                        && (that.lastBB.top >= entity.BB.bottom)) { // top of chihiro goes above the bottom of the platform
                        that.velocity.y = 0;
                        that.updateBB();
                    } else {
                        that.isGrounded = false;
                    }
                }

                // SIDE COLLISIONS --> left & right bounding boxes for platform
                if ((entity instanceof Platform || entity instanceof StoneLamp) &&
                    that.BB.collide(entity.BB)) {

                        that.game.deactivate = true;   // don't let player access key press once collision happens

                        if (that.BB.collide(entity.leftBB) && that.lastBB.right >= entity.leftBB.left ) { // left collision
                            that.x = entity.BB.left - CHIHIRO.SIZE * CHIHIRO.SCALE; // so that the player won't stick to the bb of the entity
                            if (that.velocity.x > 0) that.velocity.x = 0;
                            that.velocity.y = 0;
                        } else if (that.BB.collide(entity.rightBB) && that.lastBB.left <= entity.rightBB.right ) { // right collision
                            that.x = entity.BB.right; // so that the player won't stick to the bb of the entity
                            if (that.velocity.x < 0) that.velocity.x = 0;
                            that.velocity.y = 0;
                    }
                    that.updateBB();
                }


                /** ***************************************************************
                 * NON-PLATFORM ENTITIES
                 * ***************************************************************/
                // collision with no face
                if (entity instanceof NoFace && that.BB.collide(entity.BB)) {
                    // Set a maximum amount of coins upon interact
                    if (that.game.camera.coinCounter.coinCount <= 10) {
                        that.game.camera.coinCounter.coinCount += 10;
                    }
                    entity.dead = true;
                    if (that.BB.collide(entity.leftBB)) { // left collision
                        that.x = entity.leftBB.left - CHIHIRO.SIZE * CHIHIRO.SCALE + CHIHIRO.BB_PADDING;
                        if (that.velocity.x > 0) that.velocity.x = 0;
                    } else if (that.BB.collide(entity.rightBB)) { // right
                        that.x = entity.rightBB.right - CHIHIRO.BB_PADDING;
                        if (that.velocity.x < 0) that.velocity.x = 0;
                    }
                    that.updateBB();
                }

                // Collision with CROWS
                if (entity instanceof Crow ) {
                    that.game.camera.breathwidth -= 5;
                    that.game.camera.changeBreath();
                    entity.removeFromWorld = true;
                }

                //Collision with Yubaba
                //for now have Yubaba push Chihiro? but later  kills on impact


                // collision with Chicks
                if (entity instanceof Chick && that.BB.collide(entity.BB)) {
                    that.game.camera.breathwidth -= CHIHIRO.BREATH_BAR.MAX/4;
                    that.game.camera.changeBreath();

                    if (that.BB.collide(entity.leftBB)) { // left collision
                       // maybe replace with a push animation?
                       that.x += 20
                       that.velocity.x = 100;
                    } else if (that.BB.collide(entity.rightBB)) { // right
                        that.x -= 20
                        that.velocity.x = -100;
                    }else if (that.BB.collide(entity.topBB)) { // right
                        that.y -= 20
                        that.velocity.y = -100;
                    }
                    that.updateBB();

                }

                // collision with HAKU
                if (entity instanceof Haku && that.BB.collide(entity.BB)) {
                    // instantly heal stamina bar
                    that.game.camera.breathwidth = CHIHIRO.BREATH_BAR.MAX;
                    that.game.camera.changeBreath();
                    entity.dead = true;

                    if (that.BB.collide(entity.leftBB)) { // left collision
                         that.x = entity.leftBB.left - CHIHIRO.SIZE * CHIHIRO.SCALE + CHIHIRO.BB_PADDING;
                        if (that.velocity.x > 0) that.velocity.x = 0;
                    } else if (that.BB.collide(entity.rightBB)) { // right
                         that.x = entity.rightBB.right - CHIHIRO.BB_PADDING;
                        if (that.velocity.x < 0) that.velocity.x = 0;
                    }
                    that.updateBB();
                }

                // collision with SOOTS
                if (entity instanceof Soot ) {
                    that.game.camera.breathwidth -= 1;
                    entity.dead = true;
                    that.game.camera.changeBreath();
                    that.updateBB()
                }

                // collision with COINS
                if (entity instanceof Coins) {
                    entity.removeFromWorld = true;
                    that.game.camera.coinCounter.coinCount ++;
                }
            }
        });

        // if (this.game.camera.breathwidth <= 0) {
        //     this.dead = true;
        //     this.state = 5;
        // } else {
        //     this.dead = false;
        // }

        // update state
        if (this.state !== 2 || this.state !== 5) {  // NOT jump or dead
            if (this.game.crouch) this.state = 3;    // crouching state
            else if (Math.abs(this.velocity.x) > 0) this.state = 1;        // walking state
            else if (Math.abs(this.velocity.x) > MIN_WALK) this.state = 4; // running state
        } else {

        }


        if (this.dead || this.state === 5) {
            this.velocity.x = 0;
            this.deadCounter += this.game.clockTick;
            if (this.deadCounter > 0.25) {
                this.state = 0;
                this.game.camera.title = true;
                this.game.camera.breathwidth = 100;
                this.deadCounter = 0;
                this.game.camera.loadLevel(1, this.game.camera.title);
            }
        } else {
            // do nothing
        }

        // update direction
        if (this.velocity.x < 0) this.facing = 1;
        if (this.velocity.x > 0) this.facing = 0;
    };

    toString(){
        return "Player: x-" + this.x + " y-" + this.y;
    };
};

