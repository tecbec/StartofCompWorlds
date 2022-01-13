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
        // this.speed = 100;
        
};
    loadAnimations(spritesheet) {
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
        const MIN_WALK = 2;
        const STOP_FALL = 1575;
        const STOP_FALL_A = 450;
        if (this.game.left) { // when left key is pressed
            this.velocity.x -= MIN_WALK; 
        } else if (this.game.right) {   // when right key is pressed
            this.velocity.x += MIN_WALK;        
        } else { 
        
            this.velocity.x = 0;       
        }
        if (this.game.up) {
            this.velocity.y = -240;  
            this.inAir = true;  
        }      
        this.updateBB();
        // changes by tick
        this.velocity.y += this.fallAcc * TICK; 
              
        this.x += this.velocity.x * TICK * 2; 
        this.y += this.velocity.y * TICK *2;

        // mimic ground
        if (this.y > 178) {
            this.y = 178;
            this.velocity.y = 0; 
        }
        
        // update state
        if (this.state !== 2) {
            if (Math.abs(this.velocity.x) > 0) this.state = 1;
            else this.state = 0;
        } else {
            
        }
         // update direction
         if (this.velocity.x < 0) this.facing = 1;
         if (this.velocity.x > 0) this.facing = 0;

        var that = this;

        // collision
     
    }
}