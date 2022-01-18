/* The main character of the movie, Chihiro, will be the player of the game
*/
class Player {
    /* This constructor passes in the following paramters: 
    - game = game engine 
    - x, y = the location of the Player
    */
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        // NOTE: later on can be updated without the sprite sheet passed in the param. 
        this.game.chihiro = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/spritesheet.png");
        this.updateBB();

        this.animations = [];
        this.loadAnimations();
        this.facing = 0; // 0 = right; 1 = left
        this.state = 0; // 0 = idle, 1 = walking, 2 = jumping/falling, 

        // default values. 
        this.velocity = { x: 0, y: 0};
        this.fallAcc = 562.5;
        this.isGrounded = false;

        this.count = 0;
        
};
    loadAnimations() {
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
        this.animations[2][0] = new Animator (this.spritesheet, 0, 128, 32, 32, 8, 0.15, 0, false, true); 
        this.animations[2][1] = new Animator (this.spritesheet, 0, 160, 32, 32, 8, 0.15, 0, false, true); 

    }

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x + 10, this.y+10, 64-20, 64-10); // KD changed the bounding box dimensions to hug the sprite.
    };

    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
        
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);

        ctx.imageSmoothingEnabled = false;
    }

    update() {
        const TICK = this.game.clockTick;
        const MIN_WALK = 200;
        const MAX_FALL = 240;
        const RUN_FALL  = 2025;
        

        if (this.isGrounded) { // can only jump and move while on the ground.
            if (this.game.left) { // when left key is pressed
                this.velocity.x -= MIN_WALK * TICK; 
            } else if (this.game.right) {   // when right key is pressed
                this.velocity.x += MIN_WALK * TICK;        
            } else {            
                this.velocity.x = 0;       
            }  
            if (this.game.up) { 
                this.velocity.y = -300;   
                this.state = 2;
            }  else {  
                this.state = 0;
                this.velocity.y = 0;
            }
        }

        this.velocity.y += this.fallAcc * TICK;

        if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
        if (this.velocity.y <= -MAX_FALL) this.velocity.y = -MAX_FALL;
                
        this.x += this.velocity.x * TICK * 2; 
        this.y += this.velocity.y * TICK * 2;
        
        this.updateBB();
 
        var that = this;
        
        // collision
        // TODO: think about left and right bounding box.
        this.game.entities.forEach(function (entity) {              // this will look at all entities in relation to mario
                if (entity.BB && that.BB.collide(entity.BB)) {      //is there an entity bb & check to see if they collide
                    if(that.velocity.y > 0) { // so chihiro is falling
                        if((entity instanceof Ground || entity instanceof Platform) 
                        && (that.lastBB.bottom <= entity.BB.top)) { // bottom of the player hits the top of the ground.
                            that.isGrounded = true;
                            that.y = entity.BB.top - 32 * 2;
                            that.velocity.y = 0;  
                            that.updateBB();        
                        } else {
                            that.isGrounded = false;
                        }                   
                    }                    
                    if (that.velocity.y < 0) { // chihiro is jumping
                        if((entity instanceof Platform)  
                            && (that.lastBB.top >= entity.BB.bottom)) { // bottom of the player hits the top of the ground.
                                that.y = entity.BB.bottom;
                                that.velocity.y = 0;                                  
                                that.updateBB();      
                        } else {
                            that.isGrounded = false;
                        }  
                    }                 
                }
        });
        
         // update state
        if (this.state !== 2) {
            if (Math.abs(this.velocity.x) > 0) this.state = 1;
        } else {
            
        }
         // update direction
         if (this.velocity.x < 0) this.facing = 1;
         if (this.velocity.x > 0) this.facing = 0;
         

    }
}