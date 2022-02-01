class BubblesController{
    bubble = [];
    timeTillNextBubble = 0;
    constructor( game) {
        Object.assign(this, {game});
       // this.game = game;
    }

    update( bubbleX, bubbleY, speed, damage, delay) {
        if(this.timeTillNextBubble <= 0){
            this.bubble.push(new Bubbles(this.game, bubbleX, bubbleY, speed, damage));
            this.timeTillNextBubble = delay; 
        }
        this.timeTillNextBubble--;
    };

    draw(ctx){
        console.log(this.bubble.length);
        this.bubble.forEach((bubble) =>{
            if(this.isBubbleOffScreen(bubble)){
                const index = this.bubble.indexOf(bubble);
                this.bubble.splice(index, 1);
            }
             bubble.draw(ctx) 
            }); 
    }
    isBubbleOffScreen(bubble) {
        return bubble.x >= PARAMS.CANVAS_WIDTH ;//bubble.width;
    }
}

class Bubbles{
    constructor( game, x,y, speed, damage , delay) {
        Object.assign(this, {game, x, y,speed, damage , delay});
        //import bubble animation here 
        this.x = x; 
        this.y = y;
        this.speed = speed; 
        this.damage = damage; 

        this.width =7; 
        this.height = 5; 
        this.color = "red";

    }
    update() {
    };
    draw(ctx){
        ctx.fillStyle = this.color; 
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.x = this.speed + this.x; 
    };
};

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