class BubblesController{
    constructor(game, x, y, direction) {
    Object.assign(this, {game,x, y, direction });
    this.velocity = {x: 200  , y: 40  };
    this.elapsedTime =0;

    this.scaleBubble = 1.5;
    
    this.heightofBubble = 20;
    this.widthofBubble = 20;
    this.frameCount = 5;
     const framDuration = .5 ;
     this.animation = new Animator (ASSET_MANAGER.getAsset("./GameEngine/sprites/bubble.png"), 0, 0, this.widthofBubble, this.heightofBubble
        , this.frameCount, framDuration, 0, false, true );

     this.BB = new BoundingBox(this.x, this.y, 
         this.widthofBubble*PARAMS.SCALE *this.scaleBubble, this.heightofBubble*PARAMS.SCALE *this.scaleBubble);
    };
    update() {
        if(this.direction == 1) { 
            this.x -= ( this.velocity.x )* this.game.clockTick;
        } else  {
            this.x += this.velocity.x * this.game.clockTick;
        }
        this.y += this.velocity.y * this.game.clockTick; //makes bubble flow down 

         var that = this; 
         this.game.entities.forEach(function (entity) { 
            if (( entity instanceof Chick  || entity instanceof Yubaba || entity instanceof Crow || entity instanceof Radish) && entity.BB && that.BB.collide(entity.BB) ) {
                        entity.hitpoints -= 30; 
                        that.removeFromWorld = true;
             }
         });
         //add a helper function
        this.BB = new BoundingBox(this.x , this.y
            , this.widthofBubble*PARAMS.SCALE *this.scaleBubble, this.heightofBubble*PARAMS.SCALE *this.scaleBubble);    

        if(this.animation.currentFrame() == 4){
            this.removeFromWorld = true;
        }
    };
    draw(ctx){
        if(this.direction === 1) {//going left
            this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x , this.y, PARAMS.SCALE * this.scaleBubble );
        } else {
            this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x , this.y, PARAMS.SCALE * this.scaleBubble )
        }
        

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x , this.BB.y, this.BB.width, this.BB.height);
        }
    };
};

class Portal {
    constructor( game, x, y) {
        Object.assign(this, { game, x, y});
        this.height = 30; 
        this.width = 29; 
        this.animation = new Animator (ASSET_MANAGER.getAsset("./GameEngine/sprites/portal.png"), 0, 0, this.width, this.height, 4, .3, 1, false, true);
        this.BB = new BoundingBox(this.x + this.width , this.y + this.height, this.height *2, this.width*2 );

    }

    update(){

    };
    
    draw(ctx){
        const scale = 2;
        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE *scale);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
        ctx.imageSmoothingEnabled = false;
    }

}
class BubbleCounter {
    constructor( game, x, y) {
        Object.assign(this, { game, x, y});
        this.scaleBubble = 1.5;
    
        this.heightofBubble = 20;
        this.widthofBubble = 20;
        this.frameCount = 5;
         const framDuration = .5 ;
         this.animation = new Animator (ASSET_MANAGER.getAsset("./GameEngine/sprites/bubble.png"), 0, 0, this.widthofBubble, this.heightofBubble
            , this.frameCount, framDuration, 0, false, true );

        this.bubbleCount = 0;
    }

    update(){

    };

    draw(ctx){
        if (!this.game.camera.chihiro.winGame) {
            this.animation.drawFrame(this.game.clockTick, ctx,
                this.x, this.y, PARAMS.SCALE * .75);
            ctx.fillStyle = "Pink";
            ctx.fillText(": "+ this.bubbleCount,  this.x + 19 * PARAMS.SCALE, this.y + 13 * PARAMS.SCALE);
        }
    };
};

class Coins {
    constructor( game, x, y) {
        Object.assign(this, { game, x, y});

        //constant for animation
        const heightofCoins = 14;
        const widthofCoins = 14;
        const frameCount = 4;
        this.scaleCoins = 1.5;
        this.animation = new Animator (ASSET_MANAGER.getAsset("./GameEngine/sprites/coins.png"),
                                        0, 0, heightofCoins, widthofCoins, frameCount, .1, 0, false, true );
        this.BB = new BoundingBox(this.x, this.y, heightofCoins* PARAMS.SCALE *this.scaleCoins,widthofCoins*PARAMS.SCALE *this.scaleCoins);
    }

    update(){};
    
    draw(ctx){
        var blurValues = [12,16,14,15,13];
        ctx.shadowColor = '#fdd834';
        ctx.shadowBlur = blurValues[getRandomInt(5)] ;   

        this.animation.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, PARAMS.SCALE *this.scaleCoins);
        
        ctx.shadowColor = "transparent"; // remove shadow !
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        }
        ctx.imageSmoothingEnabled = false;
    };
};
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
class CoinCounter {
    constructor( game, x, y) {
        Object.assign(this, { game, x, y});
        this.animation = new Animator (
            ASSET_MANAGER.getAsset("./GameEngine/sprites/coins.png"), 0, 0, 14, 14, 4, 0.1, 0, false, true );

        this.coinCount = 0;
    }

    update(){

    };

    draw(ctx){
        if (!this.game.camera.chihiro.winGame) {
            this.animation.drawFrame(this.game.clockTick, ctx,
                this.x, this.y, PARAMS.SCALE * 1);
            ctx.fillStyle = "Pink";
            ctx.fillText(": " +this.coinCount,  this.x + 19 * PARAMS.SCALE, this.y + 13 * PARAMS.SCALE);
        }
    };
};