class BreathBar {
    // the agent is the player it is a has a relationship chihiro has a breath bar
    // use this to avoid inheriting a health bar
    constructor(game, x, y, width, height) {
        Object.assign(this, {game, x, y, width, height});
        this.game.introbar = this; // for instructions
        /* this.x and this.y set the top left corner of the breathbar */
        /* this.width and this.height are for the dimensions of the blue bar */
        this.removeFromWorld = false;
        this.maxHealth = 100; // this sets the width of the whole breath bar
        this.game.camera.breathwidth = 100;
        this.introWidth = 50;

    };

    update() {
        this.elapsed += this.game.clockTick;
        if (!this.game.camera.chihiro.winGame && !this.game.camera.onInstructions) {
            if (this.width > 0 && this.game.camera.chihiro.x > 440 && this.game.camera.chihiro.state != 0) {
                this.width -= 0.02; // original
                // this.width -= 0.5; // changes for testing
                this.width = (this.width / this.maxHealth) * this.maxHealth;
                this.game.camera.breathwidth = this.width;
            }
        }
        if (this.game.camera.onInstructions) {
            if (this.introWidth > 0) {
                this.introWidth -= 0.07; // original
                this.introWidth = (this.introWidth / this.maxHealth) * this.maxHealth;
            }
        }
    };

    draw(ctx) {
        if (!this.game.camera.chihiro.winGame && !this.game.camera.onInstructions) {
            if (this.width > 0) {
                var ratio = this.width / this.maxHealth;
                ctx.strokeStyle = "Black";
                if(ratio <= 1){
                ctx.fillStyle = ratio < 0.2 ? "#ff2121" : ratio < 0.5 ? "#e8d587" : "#b9c87e";}
                ctx.fillRect(this.x, this.y, this.width * PARAMS.SCALE, this.height);
                ctx.strokeRect(this.x, this.y, this.maxHealth * PARAMS.SCALE, this.height);
            }
        }
        if (this.game.camera.onInstructions && this.game.instructions.count == 4) {
            if (this.introWidth > 0) {
                var ratio = this.introWidth / this.maxHealth;
                ctx.strokeStyle = "Black";
                if(ratio <= 1) {
                ctx.fillStyle = ratio < 0.2 ? "Red" : ratio < 0.5 ? "Pink" : "Blue";}
                ctx.fillRect(this.x, this.y, this.introWidth * PARAMS.SCALE, this.height);
                ctx.strokeRect(this.x, this.y, this.introWidth * PARAMS.SCALE, this.height);
            }
        } else if (this.game.camera.onInstructions && this.game.instructions.count != 4) {
            this.introWidth = 50;
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
        this.animation = new Animator( ASSET_MANAGER.getAsset("./GameEngine/sprites/healthBar.png"), 0, 0, this.width, 
        this.height , this.frameCount, 1, 0, false, true);
    };

    update(){

    };

    draw(ctx){
        if (!this.game.camera.chihiro.winGame) {
            this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, PARAMS.SCALE * 1.5);
            ctx.imageSmoothingEnabled = false;
        }


    };

}