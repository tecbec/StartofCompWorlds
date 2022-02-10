class BubblesController{
    //x, y are the x and y locations of the bubble
    //direction - facing param from the player class
    constructor(game, x, y, direction) {
    Object.assign(this, {game,x, y, damage, direction });
    this.velocity = {x: 200, y: 50  };
    this.elapsedTime =0;

    this.fireRate = 1;
    
    const heightofBubble = 10;
     const widthofBubble = 14;
    this.frameCount =6;
     const framDuration = .5;
     this.animation = new Animator (ASSET_MANAGER.getAsset("./sprites/bubble.png"), 0, 0, widthofBubble,heightofBubble, this.frameCount, framDuration, 0, false, true );
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
     var count =0; 
     
        if(this.direction === 1) { 
            this.x -= ( this.velocity.x )* this.game.clockTick;
        } else  {
            this.x += this.velocity.x * this.game.clockTick;
        }
        this.y += this.velocity.y * this.game.clockTick; //makes bubble flow down 

        if(this.animation.currentFrame() === 5){
                this.removeFromWorld = true;
        }

     //   this.y += this.game.clockTick; 
        //if bubble makes collision with an entity update here
}
    draw(ctx){
        //console.log("Bubble"); 

        var scaleBubble = 3;
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, PARAMS.SCALE * scaleBubble );

        // if(this.x <= PARAMS.CANVAS_WIDTH ) {
        //     //console.log(this.x);
        //     if(this.direction === 1) {//going left
        //         console.log(this.x);
        //         //   ctx.fillRect(this.x -xOffset, this.y, width, height);
        //     } else {
        //         this.animation.drawFrame(this.game.clockTick, ctx,this.x +xOffset, this.y, PARAMS.SCALE * scaleBubble )
        //         // ctx.fillRect(this.x +xOffset, this.y, width, height);
        //     }
        // } else{

        // }
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
        ctx.fillText(this.coinCount,  this.x + 22 * PARAMS.SCALE, this.y + 13 * PARAMS.SCALE);

    };
};