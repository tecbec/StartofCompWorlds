var FROG = {
    IDLE: {RIGHT: {X:0 , Y:0},   LEFT: {X:0, Y:100}, SPEED: 0.2, FRAME: 6, PADDING: 0, REVERSE: false, LOOP: true},
    JUMP: {RIGHT: {X:0,  Y:200}, LEFT: {X:0, Y:300}, SPEED: 0.2, FRAME: 6, PADDING: 0, REVERSE: false, LOOP: true},
    SIZE: {WIDTH:100, HEIGHT: 100},
}

class Frog {
    constructor(game, x, y, direction, min, max, jumpHeight, jumpTime, railing) {
        Object.assign(this, {game, x, y, direction, min, max, jumpHeight, jumpTime, railing});
        this.facing = this.direction ; // 0 = right 1 = left
        this.state = 0; // 0 = idle 1 = jump
        this.isGrounded = false;
        this.elapsedTime = 0;
        this.spritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/frog.png");
        this.animations = [];
        this.velocity = { x: 0, y: 0};
        this.loadAnimations(); 
        this.hitpoints = 60; 
        this.updateBB();
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + 70, this.y + 90, 70, 100);
        this.leftBB = new BoundingBox(this.x + 70, this.y + 90, 10, 100);
        this.rightBB = new BoundingBox(this.BB.right - 10, this.y + 90, 10, 100);
        this.topLBB = new BoundingBox(this.x + 70, this.y + 90, 70 / 2 - 10, 10);
        this.topRBB = new BoundingBox(this.BB.right - (70/2 - 10), this.y + 90, 70 / 2 - 10, 10);
    };

    loadAnimations() {
        for (var i = 0; i < 2; i++) {
            this.animations.push([]);
            for (var j = 0; j < 2; j++) {
                this.animations[i].push([]);
            }
        }
        this.animations[0][0] = new Animator (this.spritesheet, FROG.IDLE.RIGHT.X, FROG.IDLE.RIGHT.Y, FROG.SIZE.WIDTH, FROG.SIZE.HEIGHT, FROG.IDLE.FRAME, FROG.IDLE.SPEED, FROG.IDLE.PADDING, FROG.IDLE.REVERSE, FROG.IDLE.LOOP);
        this.animations[0][1] = new Animator (this.spritesheet, FROG.IDLE.LEFT.X, FROG.IDLE.LEFT.Y, FROG.SIZE.WIDTH, FROG.SIZE.HEIGHT, FROG.IDLE.FRAME, FROG.IDLE.SPEED, FROG.IDLE.PADDING, FROG.IDLE.REVERSE, FROG.IDLE.LOOP);

        this.animations[1][0] = new Animator (this.spritesheet, FROG.JUMP.RIGHT.X, FROG.JUMP.RIGHT.Y, FROG.SIZE.WIDTH, FROG.SIZE.HEIGHT, FROG.JUMP.FRAME, FROG.JUMP.SPEED, FROG.JUMP.PADDING, FROG.JUMP.REVERSE, FROG.JUMP.LOOP);
        this.animations[1][1] = new Animator (this.spritesheet, FROG.JUMP.LEFT.X, FROG.JUMP.LEFT.Y, FROG.SIZE.WIDTH, FROG.SIZE.HEIGHT, FROG.JUMP.FRAME, FROG.JUMP.SPEED, FROG.JUMP.PADDING, FROG.JUMP.REVERSE, FROG.JUMP.LOOP);
    };

    update() {
        const TICK = this.game.clockTick;
        const TICK_SCALE = 2;
        const MIN_JUMP = 100 * PARAMS.SCALE;
        const MAX_FALL = 240 * PARAMS.SCALE;
        const FALL_ACC = 562.5 * PARAMS.SCALE;

        // update direction
        if (this.velocity.x < 0) this.facing = 1;
        if (this.velocity.x > 0) this.facing = 0;

        if (this.isGrounded) {
            if (this.x > this.max) {
                this.direction = 1;
            }
            if (this.x < this.min) {
                this.direction = 0;
            }
        }
        if (this.isGrounded) {
            this.elapsedTime += TICK; 
            if (this.elapsedTime > this.jumpTime) {
                if (this.direction == 1) {
                    this.velocity.x -= MIN_JUMP; 
                }
                if (this.direction == 0) {
                    this.velocity.x += MIN_JUMP; 
                }
                this.velocity.y = this.jumpHeight * PARAMS.SCALE;
                this.state = 1; 
                this.elapsedTime = 0;
            } else {
                this.state = 0;
                this.velocity.x = 0;
            }     
        }
        if (this.game.camera.chihiro.collideWithFrog) { 
            this.velocity.y = this.jumpHeight * PARAMS.SCALE;
            if (this.direction == 1) {
                this.velocity.x -= MIN_JUMP; 
            }
            if (this.direction == 0) {
                this.velocity.x += MIN_JUMP; 
            }
            this.state = 1; 
            this.game.camera.chihiro.collideWithFrog = false;
        }
       
        this.velocity.y += FALL_ACC * TICK;

        if (this.velocity.y >= MAX_FALL)  this.velocity.y =  MAX_FALL;
        if (this.velocity.y <= -MAX_FALL) this.velocity.y = -MAX_FALL;
        if (this.velocity.x >= MIN_JUMP)   this.velocity.x =  MIN_JUMP;
        if (this.velocity.x <= -MIN_JUMP)  this.velocity.x = -MIN_JUMP;
        
        this.x += this.velocity.x * TICK * TICK_SCALE;
        this.y += this.velocity.y * TICK * TICK_SCALE;

        this.updateBB();
        var that = this;
        this.game.entities.forEach(function (entity) {  
            if (entity.BB && that.BB.collide(entity.BB) ) { 
                if (that.velocity.y > 0) {   
                    if ((entity instanceof Ground || entity instanceof Platform || entity instanceof CloudPlatform ||
                        entity instanceof StoneLamp || // entity instanceof Railing ||
                        entity instanceof Lamp) && (that.lastBB.bottom  <= entity.BB.top)) {
                        that.isGrounded = true;
                        that.y = entity.BB.top - 190; 
                    }
                    if (that.railing && (entity instanceof Ground || entity instanceof Platform || entity instanceof CloudPlatform ||
                        entity instanceof StoneLamp || entity instanceof Railing ||
                        entity instanceof Lamp) && (that.lastBB.bottom  <= entity.BB.top)) {
                            that.isGrounded = true;
                            that.y = entity.BB.top - 190; 
                        }
                } else {
                    that.isGrounded = false;
                }
                // bottom collisions
                if (that.velocity.y < 0) {    
                    if((entity instanceof Platform )    
                        && (that.lastBB.top >= entity.BB.bottom)) { 
                        that.velocity.y = 0;
                    } else {
                        that.isGrounded = false;
                    }
                }
                // side collisions
                 if ((entity instanceof Platform) && that.BB.collide(entity.BB)) {
                    if (that.BB.collide(entity.leftBB) && that.BB.right >= entity.leftBB.left ) { // left collision
                        that.x = entity.BB.left - 140;
                    } else if (that.BB.collide(entity.rightBB) && that.BB.left <= entity.rightBB.right ) { // right collision
                        that.x = entity.BB.right - 70;
                    } else {

                    }
            }
            

            }
            
            if (entity instanceof StoneLamp && that.BB.collide(entity.BBmiddle)) {
                if (that.BB.collide(entity.BBmiddleleft) && that.BB.right >= entity.BBmiddleleft.left ) { // left collision
                    that.x = entity.BB.left - 140;
                    if (that.velocity.x > 0) that.velocity.x = 0;
                } else if (that.BB.collide(entity.BBmiddleright) && that.BB.left <= entity.BBmiddleright.right ) { // right collision
                    that.x = entity.BB.right - 70;
                    if (that.velocity.x < 0) that.velocity.x = 0;
                }
            }
        });
        this.updateBB();
        if(this.hitpoints <= 0 ) {this.removeFromWorld = true;}

    };

    draw(ctx) {
        ctx.shadowColor = '#ff2121';
        ctx.shadowBlur = 64;
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, 2);
        ctx.shadowColor = "transparent"; // remove shadow !
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
            ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y, this.leftBB.width, this.leftBB.height);
            ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y, this.rightBB.width, this.rightBB.height);
            ctx.strokeStyle = 'Yellow';
            ctx.strokeRect(this.topLBB.x - this.game.camera.x, this.topLBB.y, this.topLBB.width, this.topLBB.height);
            ctx.strokeRect(this.topRBB.x - this.game.camera.x, this.topRBB.y, this.topRBB.width, this.topRBB.height);
        }
    };
}