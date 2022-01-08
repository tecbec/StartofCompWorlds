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

        // default values. 
        this.x = 0;
        this.y = 0;
        //this.speed = 100;
};
    loadAnimations(spritesheet) {
        // declare the animator 
        this.idleAnim = new Animator (this.spritesheet, 0, 0, 32, 32, 4, 0.1, 0, false, true); 
        this.walkRightAnim = new Animator (this.spritesheet, 0, 32, 32, 32, 6, 0.1, 0, false, true);    
        this.walkLeftAnim = new Animator (this.spritesheet, 0, 64, 32, 32, 6, 0.1, 0, false, true);  
        this.jumpAnim = new Animator (this.spritesheet, 0, 96, 32, 32, 8, 0.1, 0, false, true);  
    }

    draw(ctx) {
        this.idleAnim.drawFrame(this.game.clockTick, ctx, 0, 0, 2);
        this.walkRightAnim.drawFrame(this.game.clockTick, ctx, 0, 64, 2);
        this.walkLeftAnim.drawFrame(this.game.clockTick, ctx, 0, 128, 2);
        this.jumpAnim.drawFrame(this.game.clockTick, ctx, 0, 192, 2);
        ctx.imageSmoothingEnabled = false;
    }

    update() {
        
    }
}