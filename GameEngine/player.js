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
        this.animations = [];
        this.loadAnimations(spritesheet);
        this.facing = 0; // 0 = right; 1 = left
        this.state = 0; // 0 = idle, 1 = walking, 2 = jumping/falling, 
        // default values. 
        this.velocity = { x: 0, y: 0};
        // this.fallAcc = 562.5;
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

    draw(ctx) {
        // draw with [state][face]   
        //this.walkRightAnim.drawFrame(this.game.clockTick, ctx, this.x, 64, 2);
        //this.walkLeftAnim.drawFrame(this.game.clockTick, ctx, this.x, 128, 2);
        //this.jumpRightAnim.drawFrame(this.game.clockTick, ctx, this.x, 192, 2);
        //this.jumpLeftAnim.drawFrame(this.game.clockTick, ctx, this.x, 256, 2);

        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 5);

        ctx.imageSmoothingEnabled = false;
    }

    update() {
        const TICK = this.game.clockTick;
        const MIN_WALK = 2;

       if (this.state !== 2) { // when its not jumping 
            if (this.game.left) { // when left key is pressed
                this.velocity.x -= MIN_WALK; 
            } else if (this.game.right) {   // when right key is pressed
                this.velocity.x += MIN_WALK;        
            } else { 
                this.velocity.x = 0;    
        }
    }

        // implement jumping 

        this.x += this.velocity.x * TICK * 2; 
        this.y += this.velocity.y * TICK * 2;

        // update state
         if (this.state !== 2) {
            if (Math.abs(this.velocity.x) >= MIN_WALK) this.state = 1;
            else this.state = 0;
        } else {

        }
         // update direction
         if (this.velocity.x < 0) this.facing = 1;
         if (this.velocity.x > 0) this.facing = 0;
         
        // collision
        
    }
}