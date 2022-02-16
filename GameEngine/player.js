/* Chihiro's Params */
var CHIHIRO = {
    TITLE_POSITION:   {X: 0,  Y: 800},
    INITIAL_POSITION: {X: 15000,  Y: 0},  // 14739
    SIZE: 70,
    SCALE: 2,
    PADDING:{X: 28, Y: 20}, // same padding for BB and imaginary x,y,w,h calculations
    IDLE:   {RIGHT: {X: 0,  Y: 0},    LEFT: {X: 0,  Y: 70},   FRAME: 4, SPEED: 0.4,  PADDING: 0, REVERSE: false, LOOP: true},
    WALK:   {RIGHT: {X: 0,  Y: 140},  LEFT: {X: 0,  Y: 210},  FRAME: 4, SPEED: 0.2,  PADDING: 0, REVERSE: false, LOOP: true},
    JUMP:   {RIGHT: {X: 0,  Y: 280},  LEFT: {X: 0,  Y: 350},  FRAME: 4, SPEED: 0.1, PADDING: 0, REVERSE: false, LOOP: true},
    CROUCH: {RIGHT: {X: 0,  Y: 560},  LEFT: {X: 0,  Y: 630},  FRAME: 4, SPEED: 0.33, PADDING: 0, REVERSE: false, LOOP: true},
    RUN:    {RIGHT: {X: 0,  Y: 140},  LEFT: {X: 0,  Y: 210},  FRAME: 4, SPEED: 0.1, PADDING: 0, REVERSE: false, LOOP: true},
    DEAD:   {RIGHT: {X: 0,  Y: 420},  LEFT: {X: 0,  Y: 490},  FRAME: 3, SPEED: 0.12, PADDING: 0, REVERSE: false, LOOP: false},
    CROUCH_WALK: {RIGHT: {X: 0,  Y: 700}, LEFT: {X: 0,  Y: 770}, FRAME: 4, SPEED: 0.33, PADDING: 0, REVERSE: false, LOOP: true},
    BREATH_BAR:  {X: 1700, Y: 10, HEIGHT: 10, MAX: 100},
    COIN_COUNTER:{X: 1620, Y: 7.25}
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
        this.animations = [];

        this.elapsedTime = 0; 
        this.fireRate = 1;

        this.updateBB();
        this.loadAnimations();

    };

    /* Load the following animations from the sprite sheet for Chihiro's current state and direction */
    loadAnimations() {
        // array with [state] [face] of the same animator
        for (var i = 0; i < 7; i++) {
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
            CHIHIRO.DEAD.FRAME, CHIHIRO.DEAD.SPEED,
            CHIHIRO.DEAD.PADDING, CHIHIRO.DEAD.REVERSE, CHIHIRO.DEAD.LOOP);

        // crouch walk -> right
        this.animations[6][0] = new Animator (this.spritesheet, CHIHIRO.CROUCH_WALK.RIGHT.X, CHIHIRO.CROUCH_WALK.RIGHT.Y,
            CHIHIRO.SIZE, CHIHIRO.SIZE,
            CHIHIRO.CROUCH_WALK.FRAME, CHIHIRO.CROUCH_WALK.SPEED,
            CHIHIRO.CROUCH_WALK.PADDING, CHIHIRO.CROUCH_WALK.REVERSE, CHIHIRO.CROUCH_WALK.LOOP);

        // crouch walk -> left
        this.animations[6][1] = new Animator (this.spritesheet, CHIHIRO.CROUCH_WALK.LEFT.X, CHIHIRO.CROUCH_WALK.LEFT.Y,
            CHIHIRO.SIZE, CHIHIRO.SIZE,
            CHIHIRO.CROUCH_WALK.FRAME, CHIHIRO.CROUCH_WALK.SPEED,
            CHIHIRO.CROUCH_WALK.PADDING, CHIHIRO.CROUCH_WALK.REVERSE, CHIHIRO.CROUCH_WALK.LOOP);

    };

    /* Update the bounding box of the player for collision detection */
    updateBB() {
        this.lastBB = this.BB;
        this.lastBBbottom = this.BBbottom;
        if(this.game.crouch && this.velocity.y == 0){ // if crouching
            var crouchHeight = ((CHIHIRO.SIZE- CHIHIRO.PADDING.Y) * CHIHIRO.SCALE)/2;
            this.BB = new BoundingBox(this.x + CHIHIRO.PADDING.X*CHIHIRO.SCALE, 
                                        (this.y + CHIHIRO.PADDING.Y*CHIHIRO.SCALE) + crouchHeight,
                                        (CHIHIRO.SIZE - (CHIHIRO.PADDING.X * 2))* CHIHIRO.SCALE, // padding on left and right
                                        crouchHeight - 1); // padding on top
        }else{
            this.BB = new BoundingBox(this.x + CHIHIRO.PADDING.X*CHIHIRO.SCALE, this.y + CHIHIRO.PADDING.Y*CHIHIRO.SCALE,
                (CHIHIRO.SIZE - (CHIHIRO.PADDING.X * 2))* CHIHIRO.SCALE, // padding on left and right
                (CHIHIRO.SIZE- CHIHIRO.PADDING.Y) * CHIHIRO.SCALE - 1); // padding on top
        }
    };

    /* Draw the images onto the screen */
    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, CHIHIRO.SCALE);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
        ctx.imageSmoothingEnabled = false;
        // this.breathbar.draw(ctx);
        // this.coinCounter.draw(ctx);

    };
    
    update() {
        const TICK = this.game.clockTick;
        const TICK_SCALE = 2;
        const MAX_FALL = 240 * PARAMS.SCALE;
        const MAX_RUN = 150 * PARAMS.SCALE;
        const MIN_WALK = 100 * PARAMS.SCALE;
        const CROUCH_SPEED = 25 * PARAMS.SCALE;
        const RUN_ACC = 400 * PARAMS.SCALE;
        const FALL_ACC = 562.5 * PARAMS.SCALE;

        // can only move while on the ground AND jump after has been grounded for x ticks
        if (this.isGrounded && !this.dead) {
            if(this.jumping) {         // just landed
                this.jumpTimer = 1000; // set off short timer, to prevent accidental double jumping
            }
            //updating jump timer
            this.jumpTimer -= .01;
            this.jumping = false;
            // Consider removing deactivate -> should only use it for double jump fix
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
                    }
                }
                if (this.facing === 1) {                        // if going right
                    if (this.game.left && !this.game.right && !this.game.deactivate) {
                        if (this.game.run) {
                            this.velocity.x -= RUN_ACC * TICK;
                        }
                    } else {
                        this.velocity.x = 0;
                    }
                }
            } 
            
            if (this.game.up) {  // jumping
                this.jumping = true;
                this.velocity.y = -250 * PARAMS.SCALE;
                this.state = 2; 
            } else {
                // set the default idle if not anything else.
                this.state = 0;
                this.velocity.y = 0;
            }

        } else {
            // fall straight down if did not jump
            if (this.velocity.y > 0 && !this.jumping) {
                this.velocity.x = 0;
            }
            // can change direction they are falling
            if (this.game.left) {
                this.velocity.x = -Math.abs(this.velocity.x);
            }
            if (this.game.right) {
                this.velocity.x = Math.abs(this.velocity.x);
            }
            if (this.game.crouch && this.velocity.y > 0) { // if shes pressing crouch and falls, set the game crouch to false so she can only press it once.
                this.game.crouch = false;
            }
        }
        //this makes chihiro always fall
        this.velocity.y += FALL_ACC * TICK;

        if (this.velocity.y >= MAX_FALL)  this.velocity.y =  MAX_FALL;
        if (this.velocity.y <= -MAX_FALL) this.velocity.y = -MAX_FALL;
        if (this.velocity.x >= MAX_RUN)   this.velocity.x =  MAX_RUN;
        if (this.velocity.x <= -MAX_RUN)  this.velocity.x = -MAX_RUN;
        if (this.game.crouch && this.velocity.x <= -MIN_WALK) this.velocity.x = -CROUCH_SPEED;
        if (this.game.crouch && this.velocity.x >= MIN_WALK) this.velocity.x = CROUCH_SPEED;

        this.x += this.velocity.x * TICK * TICK_SCALE;
        this.y += this.velocity.y * TICK * TICK_SCALE;

        this.updateBB();

        // collision handling
        var that = this; //need this because we are creating
        this.game.entities.forEach(function (entity) {          // this will look at all entities in relation to chihiro

            if (entity.BB && that.BB.collide(entity.BB)) {      // is there an entity bb & check to see if they collide

                if (that.velocity.y > 0) {                      // chihiro is falling
                    if((entity instanceof Ground || entity instanceof Platform || entity instanceof CloudPlatform ||
                        entity instanceof StoneLamp ||
                        entity instanceof Railing || entity instanceof Lamp) && (that.lastBB.bottom  <= entity.BB.top)) // minus one?? idk how this works
                  { // bottom of chihiro hits the top of the entity
                        that.isGrounded = true;
                        that.setY(entity.BB.top - that.getHeight());
                        that.velocity.y = 0;
                        //that.updateBB();
                    }
                    else {
                        that.isGrounded = false;
                    }
                }

                if (that.velocity.y < 0) {     // chihiro is jumping up and hits the bottom of a platform
                    if((entity instanceof Platform )    // collision w/ bottom of platform
                        && (that.lastBB.top >= entity.BB.bottom)) { // top of chihiro goes above the bottom of the platform
                        that.velocity.y = 0;
                        //that.updateBB();
                    } else {
                        that.isGrounded = false;
                    }
                }

                // SIDE COLLISIONS --> left & right bounding boxes for platform
                if ((entity instanceof Platform || entity instanceof StoneLamp) && that.BB.collide(entity.BB)) {
                        //that.game.deactivate = true;   // don't let player access key press once collision happens
                        if (that.BB.collide(entity.leftBB) && that.BB.right >= entity.leftBB.left ) { // left collision
                            that.setX(entity.BB.left - that.getWidth()); // so that the player won't stick to the bb of the entity
                            //that.velocity.y = 0;
                            if (that.velocity.x > 0) that.velocity.x = 0;
                        } else if (that.BB.collide(entity.rightBB) && that.BB.left <= entity.rightBB.right ) { // right collision
                            that.setX(entity.BB.right);// so that the player won't stick to the bb of the entity
                            //that.velocity.y = 0;
                            if (that.velocity.x < 0) that.velocity.x = 0;
                        } else {

                        }
                        //that.updateBB(); 
                }

                if(entity instanceof Railing) {// if she's crouching she'll fall to ground
                    if (that.BB.bottom >= entity.BB.top && that.game.crouch) {
                        that.isGrounded = false;
                        that.setY(entity.BB.top - that.getHeight() + 1); // the 1 is just to get her past the bb of the railing
                        //that.velocity.y += FALL_ACC * TICK;
                        //that.updateBB();;
                    }
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

                }

                // Collision with CROWS
                if (entity instanceof Crow && that.BB.collide(entity.BB) && !that.dead) {
                    that.game.camera.breathwidth -= 5;
                    that.game.camera.changeBreath();
                    entity.removeFromWorld = true;
                }

                //Collision with Yubaba
                 if (entity instanceof Yubaba && that.BB.collide(entity.BB) && !that.dead) {
                    that.game.camera.breathwidth -= CHIHIRO.BREATH_BAR.MAX;
                    that.game.camera.changeBreath();
                    
                }

                // collision with Chicks
                if (entity instanceof Chick && that.BB.collide(entity.BB) && !that.dead) {
                    that.game.camera.breathwidth -= CHIHIRO.BREATH_BAR.MAX/4;
                    that.game.camera.changeBreath();

                    if (that.BB.collide(entity.leftBB)) { // left collision
                       // maybe replace with a push animation?
                       that.setX(that.getX() + 20);
                       that.velocity.x = 100;
                    } else if (that.BB.collide(entity.rightBB)) { // right
                        that.setX(that.getX() - 20);
                        that.velocity.x = -100;
                    }else if (that.BB.collide(entity.topBB)) { // right
                        that.setY(that.getY() - 20);
                        that.velocity.y = -100;
                    }
                    //that.updateBB();

                }

                // collision with HAKU
                if (entity instanceof Haku && that.BB.collide(entity.BB)) {
                    // instantly heal stamina bar
                    that.game.camera.breathwidth = CHIHIRO.BREATH_BAR.MAX;
                    that.game.camera.changeBreath();
                }

                // collision with SOOTS
                if (entity instanceof Soot && !that.dead) {
                    that.game.camera.breathwidth -= 1;
                    // for testing make soot breath -=20;
                    entity.dead = true;
                    that.game.camera.changeBreath();
                    //that.updateBB()
                }

                // collision with COINS
                if (entity instanceof Coins) {
                    entity.removeFromWorld = true;
                    that.game.camera.coinCounter.coinCount ++;
                }
            }
        });
        this.updateBB();

        if (this.game.camera.breathwidth <= 0) {
            this.dead = true;
            this.state = 5;
        } else {
            this.dead = false;
        }

        // update state
        if (this.state !== 5 && this.state !== 3) {  // NOT dead, or crouch
            if (this.game.crouch && this.velocity.x == 0) this.state = 3;  // crouch idle state
            else if (!this.isGrounded && Math.abs(this.velocity.x) > 0) this.state = 2; // jump walk state
            else if (this.game.crouch && Math.abs(this.velocity.x) > 0) this.state = 6; // crouch walk state
            else if (Math.abs(this.velocity.x) > 0) this.state = 1;        // walking state
            else if (Math.abs(this.velocity.x) > MIN_WALK) this.state = 4; // running state
        }

        if (this.dead || this.state === 5) {

            this.velocity.x = 0;

            this.deadCounter += this.game.clockTick;

            if (this.deadCounter > 0.5) this.state = 0;
            if (this.deadCounter > 0.55) {
                this.game.camera.title = true;
                this.game.camera.breathwidth = 100;
                this.deadCounter = 0;
                this.game.camera.loadLevel(1, this.game.camera.title);
            }
        }

        // update direction
        if (this.velocity.x < 0) this.facing = 1;
        if (this.velocity.x > 0) this.facing = 0;

        this.elapsedTime += TICK; 
        if(this.game.shoot && this.elapsedTime > 1){
            this.game.addEntity(new BubblesController(this.game, this.getX() + this.getWidth() - this.game.camera.x ,
                 this.getY()+ this.getHeight()/2,  this.facing));
                  this.elapsedTime = 0;
         }

        if (this.game.camera.breathwidth <= 0 ) {
            this.game.camera.chihiro.dead = true;
        } else {
            this.game.camera.chihiro.dead = false;
        }

    };

    /*

    SETTERS AND GETTERS
    THESE ALREADY ACCOUNT FOR PADDING & SCALE
    */
    // adjust these to have if statements that adjust the padding based on the current animation

    //sets an x value while removing the padding
    setX(newX){
        this.x = newX - (CHIHIRO.PADDING.X * CHIHIRO.SCALE);
    };

    setY(newY){
        this.y = newY - (CHIHIRO.PADDING.Y*CHIHIRO.SCALE - 1);
    };

    //gets the fake x value
    getX(){
        return this.x + (CHIHIRO.PADDING.X) *CHIHIRO.SCALE;
    };

    //gets the fake y value
    getY(){
        return this.y + (CHIHIRO.PADDING.Y) *CHIHIRO.SCALE;
                       // padding only on the top
    };

    //gets width while removing the padding
    getWidth(){
        return (CHIHIRO.SIZE - (CHIHIRO.PADDING.X * 2))*CHIHIRO.SCALE;
    };

    //gets height while removing the padding
    getHeight(){
        return (CHIHIRO.SIZE - CHIHIRO.PADDING.Y)*CHIHIRO.SCALE;
    };

    toString(){
        return "Player: x-" + this.x + " y-" + this.y;
    };
};

