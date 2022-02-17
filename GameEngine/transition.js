var END_SCREEN = {
    LOCATION: {X: 0, Y: 0, SIZE: 500, FRAME: 7, SPEED:0.2, PADDING:0, REVERSE: false, LOOP: true}
};

class TransitionScreen {
    constructor(game, level, x, y) {
        Object.assign(this, { game, level, x, y});
        this.elapsed = 0;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/youwin_text.png");
        this.animator = new Animator(this.spritesheet, END_SCREEN.LOCATION.X, END_SCREEN.LOCATION.Y, END_SCREEN.LOCATION.SIZE, END_SCREEN.LOCATION.SIZE,
                                    END_SCREEN.LOCATION.FRAME, END_SCREEN.LOCATION.SPEED, END_SCREEN.LOCATION.PADDING, END_SCREEN.LOCATION.REVERSE, END_SCREEN.LOCATION.LOOP);
    };

    update() {
        if (this.game.camera.chihiro.endPosition && this.game.click && this.game.click.y < 600 && this.game.click.y > 500) {
            this.game.camera.loadLevel(1, this.game.camera.title);
            this.game.click = false;
        }
    };

    draw(ctx) {       
        if (this.game.camera.chihiro.winGame) {   
            this.elapsed += this.game.clockTick;
            if (this.elapsed < 1) {
                ctx.fillStyle = "Black";
                ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT); 
            } 
            if (this.game.camera.chihiro.endPosition) {
                this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y, 0.8);
                ctx.font = '50px Impact';
                ctx.fillStyle = this.game.mouse && this.game.mouse.y < 600 && this.game.mouse.y > 500? "LightCoral" : "Grey";
                ctx.fillText("Play again", 330, 600); 
            }
        }
    };
};
