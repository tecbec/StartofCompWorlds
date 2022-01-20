/* The main character of the movie, Chihiro, will be the player of the game
*/
class Player {
    /* This constructor passes in the following paramters: 
    - game = game engine 
    - x, y = the location of the Player
    */
    constructor(game, x, y, spritesheet) {
        Object.assign(this, {game, x, y, spritesheet });
        // NOTE: later on can be updated without the sprite sheet passed in the param. 
        this.updateBB();
        this.animations = [];
        this.loadAnimations(spritesheet);
        this.facing = 0; // 0 = right; 1 = left
        this.state = 0; // 0 = idle, 1 = walking, 2 = jumping/falling, 
        // default values. 
        this.velocity = { x: 0, y: 0};
        this.fallAcc = 562.5;
        this.isGrounded = false;
        
};
    loadAnimations(spritesheet) {
        // array with [state] [face] of the same animator.
        for (var i = 0; i < 5; i++) { // state
            this.animations.push([]); 
            for (var j = 0; j < 2; j++) { // direction facing
                this.animations[i].push([]);
            }
        }
        // 5 STATES
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
        this.BB = new BoundingBox(this.x, this.y, 64, 64);
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
        const MAX_RUN = 400;
        const crouch_spe = 350;

        if (this.isGrounded) { // can only jump and move while on the ground.
            if (this.game.left) { // when left key is pressed
                this.velocity.x -= MIN_WALK * TICK; 
            } else if(this.game.runL){ //run added 
                this.velocity.x -= MAX_RUN * TICK; 
                this.state = 4;
            } else if (this.game.right) {   // when right key is pressed
                this.velocity.x += MIN_WALK * TICK;        
            } else if (this.game.runR) { //running
                this.velocity.x += MAX_RUN * TICK; 
                this.state = 4;
            }      
            else {
                this.velocity.x = 0;       
            }  
            if (this.game.up) { 
                this.velocity.y = -240;   
                this.state = 2;
            }  else {  
                this.state = 0;
                this.velocity.y = 0;
            }
        }
        this.velocity.y += this.fallAcc * TICK;

        // ground imitation
        // if (this.y > 178){
        //     this.isGrounded = true;
        //     this.y = 178;
        //     this.velocity.y = 0;
        // } else {
        //     this.isGrounded = false
        // }
        // player is constantly falling 
                
        this.x += this.velocity.x * TICK * 2; 
        this.y += this.velocity.y * TICK *2;

        this.updateBB();
 
        var that = this;
   
        // collision
        this.game.entities.forEach(function (entity) {
            if (entity.BB && that.BB.collide(entity.BB)) {        
                    if((entity instanceof Ground) && that.lastBB.bottom >= entity.BB.top) { // bottom of the player hits the top of the ground.
                        that.isGrounded = true;
                        that.y = 178;
                        that.velocity.y === 0;  
                    }  else {  
                        that.isGrounded = false;
                    }
                    that.updateBB();      
              }     
        });
        
         // update state
        if (this.state !== 2) {
             if(this.game.crouch) this.state = 3; //crouching state
            else if (Math.abs(this.velocity.x) > 0) this.state = 1;
            else if(Math.abs(this.velocity.x) > MIN_WALK) this.state = 4; //running state 
        } else {
            
        }
         // update direction
         if (this.velocity.x < 0) this.facing = 1;
         if (this.velocity.x > 0) this.facing = 0;

    }
}