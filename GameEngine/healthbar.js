class BreathBar {
    constructor(game, x, y, width, height, maxHealth) {
        Object.assign(this, {game, x, y, width, height, maxHealth});
    };

    update() {
    };

    draw(ctx) {
        var ratio = this.width / this.maxHealth;
        ctx.strokeStyle = "Black";
        ctx.fillStyle = ratio < 0.2 ? "Red" : ratio < 0.5 ? "Pink" : "Blue";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.maxHealth, this.height);
    };

    update(val) {
        if( val >= 0) { // we want our player to die when the val is less then zero
            this.health = val; 
            this.width = (this.health /this.maxHealth) *this.maxHealth;
        }       
    };
};

