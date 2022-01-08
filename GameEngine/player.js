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

        this.loadAnimations(spritesheet);
        this.facing = 0; // 0 = right; 1 = left
        this.state = 0; // 0 = idle, 1 = walking, 2 = jumping/falling, 
        // default values. 
        this.velocity = { x: 0, y: 0};
        //this.speed = 100;
};
    loadAnimations(spritesheet) {
        // array with [state] [face] of the same animator.
        this.idleAnim = new Animator (this.spritesheet, 0, 0, 32, 32, 4, 0.1, 0, false, true); 
        this.walkRightAnim = new Animator (this.spritesheet, 0, 32, 32, 32, 6, 0.1, 0, false, true);    
        this.walkLeftAnim = new Animator (this.spritesheet, 0, 64, 32, 32, 6, 0.1, 0, false, true);  
        this.jumpRightAnim = new Animator (this.spritesheet, 0, 96, 32, 32, 8, 0.1, 0, false, true);  
        this.jumpLeftAnim = new Animator (this.spritesheet, 0, 128, 32, 32, 8, 0.1, 0, false, true); 
    }

    draw(ctx) {
        // for each state 0 - 2 -> idle, walking, jumping
        // this.idleAnim = [];
        // draw with [state][face]
        this.idleAnim.drawFrame(this.game.clockTick, ctx, this.x, 0, 2);
        this.walkRightAnim.drawFrame(this.game.clockTick, ctx, this.x, 64, 2);
        this.walkLeftAnim.drawFrame(this.game.clockTick, ctx, this.x, 128, 2);
        this.jumpRightAnim.drawFrame(this.game.clockTick, ctx, this.x, 192, 2);
        this.jumpLeftAnim.drawFrame(this.game.clockTick, ctx, this.x, 256, 2);
        ctx.imageSmoothingEnabled = false;
    }

    update() {
        const MIN_WALK = 4.453125;
        // if this.game.left -> change velocity of X (negative) 
        if (this.game.left) {

            this.velocity.x -= MIN_WALK;

        }

        // if this game.right -> change velocity of X (positive)


        // update position of x 

   
        // collision
        
    }
}