/* The main character of the movie, Chihiro, will be the player of the game
*/
class Player {
    /* This constructor passes in the following paramters: 
    - game = game engine 
    - x, y = the location of the Player
    */
    constructor(game, x, y, spritesheet) {
        Object.assign(this, {game, x, y, spritesheet });

        this.game.player = this;

        

        // NOTE: later on can be updated without the sprite sheet passed in the param. 
        this.updateBB();
        this.animations = [];
        
        this.facing = 0; // 0 = right; 1 = left
        this.state = 0; // 0 = idle, 1 = walking, 2 = jumping/falling, 

        this.dead = false;

        // default values. 
        this.velocity = { x: 0, y: 0};
        this.fallAcc = 562.5;
        // this.speed = 100;
        
};
    loadAnimations(spritesheet) {
        // showcase each state
        //this.walkRightAnim = new Animator (this.spritesheet, 0, 64, 32, 32, 6, 0.1, 0, false, true);    
        //this.walkLeftAnim = new Animator (this.spritesheet, 0, 96, 32, 32, 6, 0.1, 0, false, true);  
        //this.jumpRightAnim = new Animator (this.spritesheet, 0, 128, 32, 32, 8, 0.1, 0, false, true);  
        //this.jumpLeftAnim = new Animator (this.spritesheet, 0, 160, 32, 32, 8, 0.1, 0, false, true); 

        // array with [state] [face] of the same animator.
        for (var i = 0; i < 3; i++) {
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
        this.animations[2][0] = new Animator (this.spritesheet, 0, 128, 32, 32, 8, 0.1, 0, false, true); 
        this.animations[2][1] = new Animator (this.spritesheet, 0, 160, 32, 32, 8, 0.1, 0, false, true); 

    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
    };

    draw(ctx) {
        // draw with [state][face]   
        //this.walkRightAnim.drawFrame(this.game.clockTick, ctx, this.x, 64, 2);
        //this.walkLeftAnim.drawFrame(this.game.clockTick, ctx, this.x, 128, 2);
        //this.jumpRightAnim.drawFrame(this.game.clockTick, ctx, this.x, 192, 2);
        //this.jumpLeftAnim.drawFrame(this.game.clockTick, ctx, this.x, 256, 2);

        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);

        //ctx.strokeStyle = 'Red';
        //ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);

        ctx.imageSmoothingEnabled = false;
    }

    update() {
       /** Clock Tick variable */
        const TICK = this.game.clockTick;

        /** Velocity and acceleration variables  */
        const MIN_WALK = 200;
        // const MIN_WALK = 2;
        const STOP_FALL = 1575;
        const STOP_FALL_A = 450;


        /**  */
        if (this.dead)

       if (this.state !== 2) { // when its not jumping 
            if (this.game.left) { // when left key is pressed
                this.velocity.x -= MIN_WALK * TICK; 
                // this.velocity.x -= MIN_WALK; 
            } else if (this.game.right) {   // when right key is pressed
                this.velocity.x += MIN_WALK * TICK;        
                // this.velocity.x += MIN_WALK;   
            } else { 
                this.velocity.x = 0;    
            }
        
        
            this.velocity.y += this.velocity.y * TICK;

            if (this.state === 2 && this.game.up) { // jumping 

                // jumping stuff
                this.velocity.y += this.fallAcc * TICK; // gravity
                // if (this.game.up) {
                    this.velocity.y = -240;
                    this.state = 2;
                // } 
                // if (this.fallAcc === STOP_FALL) this.velocity.y -= (STOP_FALL - STOP_FALL_A) * TICK;
                if (this.y >= 178) this.velocity.y = 0;
                // if (this.game.right && ! this.game.left) {
                //     this.velocity.x += MIN_WALK * TICK;
                // } else if (this.game.left && !this.game.right) {
                //     this.velocity.x -= MIN_WALK * TICK;
                // } else {
                // }       
            }   
        } else {
            
        }

        
        // implement jumping 

        this.x += this.velocity.x * TICK * 2; 
        this.y += this.velocity.y * TICK * 2;
        this.updateBB();

        // update state
        if (this.state !== 2) {
            if (Math.abs(this.velocity.x) > 0) this.state = 1;  // walking
            else this.state = 0;                                // idle
        } else {
            
        }

         // update direction
         if (this.velocity.x < 0) this.facing = 1;
         if (this.velocity.x > 0) this.facing = 0;

      

        // collision
        // this.game.entities.forEach(function (entity) {
        //     if (entity.BB && that.BB.collide(entity.BB)) {
        //     if (entity instanceof Ground) {
        //         that.velocity.y == 0; 
        //     }
        // }
        // });
    }
}