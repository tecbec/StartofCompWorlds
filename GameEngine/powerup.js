class Coins {
    constructor( game, x, y) {
        Object.assign(this, { game, x, y});

        //constant for animation 
        const scaleCoins = 3; 
        const heightofCoins = 9; 
        const widthofCoins = 9; 
        const frameCount = 6; 
        this.animation = new Animator (ASSET_MANAGER.getAsset("./sprites/coins.png"), 
                                        0, 33, heightofCoins, widthofCoins, frameCount, 0.1, 0, false, true );
        this.BB = new BoundingBox(this.x, this.y, 8*scaleCoins,8*scaleCoins);
    }

    update(){

    };

    draw(ctx){
        const scaleCoins = 3; 
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE * scaleCoins);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);  
        }
        ctx.imageSmoothingEnabled = false; 
    };
};

class CoinCounter {
    constructor( game, x, y) {
        Object.assign(this, { game, x, y});
        console.log("Here");
        this.animation = new Animator (
            ASSET_MANAGER.getAsset("./sprites/coins.png"), 0, 33, 9, 9, 6, 0.1, 0, false, true );

        this.coinCount = 0;
    }

    update(){

    };

    draw(ctx){
        this.animation.drawFrame(this.game.clockTick, ctx, 
            this.x, this.y, PARAMS.SCALE * 2);
        
        ctx.fillStyle = "Black";
        ctx.fillText(this.coinCount,  this.x + 22, this.y + 13);

    };
};