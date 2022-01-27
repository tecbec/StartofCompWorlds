class BreathBar {
    // the agent is the player it is a has a relationship chihiro has a breath bar 
    // use this to avoid inheriting a health bar 
    constructor(game, x, y, width, height, maxHealth) {
        Object.assign(this, {game, x, y, width, height, maxHealth});
        this.width = 100;
        this.game.camera.breathbar -= this.width;
    };

    update() {

        if(this.width >= 0) {
            // this.width -= 0.05; // original
            this.width -= 1; // changes for testing
            this.width = (this.width /this.maxHealth) *this.maxHealth;
        }
    };

    draw(ctx) {
        var ratio = this.width / this.maxHealth;
        ctx.strokeStyle = "Black";
        ctx.fillStyle = ratio < 0.2 ? "Red" : ratio < 0.5 ? "Pink" : "Blue";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.maxHealth, this.height);
    };

    // updateOnFly(val) {
    //     if( val >= 0) { // we want our player to die when the val is less then zero
    //         this.width = (val /this.maxHealth) *this.maxHealth;
    //         this.update();
    //     }
    // }
};

