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
        this.speed = 10;
};
    loadAnimations(spritesheet) {
        // declare the animator 
        // this.idleAnim = new Animator (this.spritesheet, 0, 64, 64, 64, 3, 0.5, 0, false, true);
    }

    draw(ctx) {
        // draw the drame 
        ctx.imageSmoothingEnabled = false;
    }

    update() {
        // update the location of the sprite
    }
}