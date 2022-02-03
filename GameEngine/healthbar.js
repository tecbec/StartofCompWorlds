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

        if(this.width >= 0) {
            this.width -= 0.05; // original
            //this.width -= .5; // changes for testing
            this.width = (this.width /this.maxHealth) *this.maxHealth;
            this.game.camera.breathwidth = this.width;
        }
    };

    draw(ctx) {
        var ratio = this.width / this.maxHealth;
        ctx.strokeStyle = "Black";
        ctx.fillStyle = ratio < 0.2 ? "Red" : ratio < 0.5 ? "Pink" : "Blue";
        ctx.fillRect(this.x, this.y, this.width * PARAMS.SCALE, this.height);
        ctx.strokeRect(this.x, this.y, this.maxHealth * PARAMS.SCALE, this.height);
    };

    updateOnFly(val) {
        if( val >= 0) { // we want our player to die when the val is less then zero
            this.width = (val /this.maxHealth) *this.maxHealth;
            this.game.camera.breathwidth = this.width;
            this.update();
        }
    };
};

