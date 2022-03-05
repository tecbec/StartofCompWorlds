class BreathBar {
    // the agent is the player it is a has a relationship chihiro has a breath bar
    // use this to avoid inheriting a health bar
    constructor(game, x, y, width, height) {
        Object.assign(this, {game, x, y, width, height});
        /* this.x and this.y set the top left corner of the breathbar */
        /* this.width and this.height are for the dimensions of the blue bar */

        this.maxHealth = 100; // this sets the width of the whole breath bar
        this.game.camera.breathwidth = this.width;
    };

    update() {
        this.elapsed += this.game.clockTick;
        if (!this.game.camera.chihiro.winGame) { 
            if (this.width > 0 && this.game.camera.chihiro.x > 440 && this.game.camera.chihiro.state != 0) {
                this.width -= 0.03; // original
                // this.width -= 0.5; // changes for testing
                this.width = (this.width / this.maxHealth) * this.maxHealth;
                this.game.camera.breathwidth = this.width;
            }
        }   
    };

    draw(ctx) {
        // Implemented god mode only for debug purposes
        if (!this.game.camera.chihiro.winGame) {
            if (this.width > 0) {
                var ratio = this.width / this.maxHealth;
                ctx.strokeStyle = "Black";
                if(ratio <= 1){
                ctx.fillStyle = ratio < 0.2 ? "#ff2121" : ratio < 0.5 ? "#e8d587" : "#b9c87e";}
                ctx.fillRect(this.x, this.y, this.width * PARAMS.SCALE, this.height);
                ctx.strokeRect(this.x, this.y, this.maxHealth * PARAMS.SCALE, this.height);
            }
        }      
    };
};

class BreathBarOutline {
    // the agent is the player it is a has a relationship chihiro has a breath bar
    // use this to avoid inheriting a health bar
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.width = 93;
        this.height =  14;
        this.frameCount = 1;  
      this.animation = new Animator( ASSET_MANAGER.getAsset("./GameEngine/sprites/healthbar.png"), 0, 0, this.width, 
        this.height , this.frameCount, 1, 0, false, true);
    };

    update(){

    };

    draw(ctx){
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, PARAMS.SCALE * 1.5);
        ctx.imageSmoothingEnabled = false;


    };

}