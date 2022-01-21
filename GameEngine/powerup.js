class Coins {
    constructor( game, x, y) {
        Object.assign(this, { game, x, y});
        console.log("Here");
        this.animation = new Animator (
            ASSET_MANAGER.getAsset("./sprites/coins.png"), 
            0, 33, 9, 9, 6, 0.1, 0, false, true );
        //the coin is 9x9 long 
        this.BB = new BoundingBox(this.x, this.y, 8*3,8*3);
    }

    update(){

    };

    draw(ctx){
        this.animation.drawFrame(this.game.clockTick, ctx, 
            this.x - this.game.camera.x, this.y, PARAMS.SCALE * 3);

        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);  

    };
};