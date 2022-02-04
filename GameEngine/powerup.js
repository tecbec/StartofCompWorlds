class BubblesController{
    //x, y are the x and y locations of the bubble
    //direction - facing param from the player class
    constructor(game, x, y, damage, direction) {
        Object.assign(this, {game,x, y, damage, direction });
        const maxSpeed = 1; // pixels per second   
        this.timeTillNextBubble =0;
        this.velocity = {x: 10, y: 0  };
     this.elapsedTime = 0;
    }
/*
    update( bubbleX, bubbleY, speed, damage, delay) {
        if(this.timeTillNextBubble <= 0){
            this.bubble.push(new Bubbles(this.game, bubbleX, bubbleY, speed, damage));
            this.timeTillNextBubble = delay; 
        }
        this.timeTillNextBubble--;
    };
*/
 update() {
    this.elapsedTime += this.game.clockTick;
     if(this.direction === 1) { 
        this.x -= ( this.velocity.x )* this.elapsedTime ; //maybe include the change in y??
     } else {
        this.x += this.velocity.x * this.elapsedTime ;
     }
        this.y += this.game.clockTick; 
    if(this.elapsedTime > 5) {
        this.elapsedTime ==0;
    }
}
    draw(ctx){
        //console.log("Bubble"); 
        const width = 2; 
        const height = 5; 
        const color = "blue";
        ctx.fillStyle = color; 
        var xOffset = 3;

        if(this.x <=PARAMS.CANVAS_WIDTH ) {
            console.log(this.x);
            if(this.direction === 1) {//going left
                ctx.fillRect(this.x -xOffset, this.y, width, height);
            } else {
                ctx.fillRect(this.x +xOffset, this.y, width, height);
            }
        } else{

        }
    }
}

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