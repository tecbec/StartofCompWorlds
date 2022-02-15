class BubblesController{
    //x, y are the x and y locations of the bubble
    //direction - facing param from the player class
    constructor(game, x, y, direction) {
    Object.assign(this, {game,x, y, direction });
    this.velocity = {x: 200  , y: 40  };
    this.elapsedTime =0;

    this.scaleBubble = 1.5;
    
    this.heightofBubble = 20;
    this.widthofBubble = 20;
    this.frameCount = 5;
     const framDuration = .5 ;
     this.animation = new Animator (ASSET_MANAGER.getAsset("./sprites/bubble.png"), 0, 0, this.widthofBubble,this.heightofBubble
        , this.frameCount, framDuration, 0, false, true );
     this.BB = new BoundingBox(this.x , this.y, 
         this.widthofBubble*PARAMS.SCALE *this.scaleBubble, this.heightofBubble*PARAMS.SCALE *this.scaleBubble);
//        console.log("that",this.BB.x, this.BB.y, this.BB.width, this.BB.height)
    };
    update() {
        if(this.direction === 1) { 
            this.x -= ( this.velocity.x )* this.game.clockTick;
        } else  {
            this.x += this.velocity.x * this.game.clockTick;
        }
        this.y += this.velocity.y * this.game.clockTick; //makes bubble flow down 

      //  if bubble makes collision with an entity update here
         var that = this; 
         this.game.entities.forEach(function (entity) { 
            //console.log("bubble between idf statements", entity.BB, that.BB.collide(entity.BB)  , entity instanceof Chick);   
            if (entity.BB && that.BB.collide(entity.BB) &&  entity instanceof Chick) {
                     // is there an entity bb & check to see if they collide
                // if(entity instanceof Chick )   {
                        console.log("bubble"); 
                        //update firerate
                        //remove from world = true 
                //}
             }
         });

        this.BB = new BoundingBox(this.x, this.y
            , this.widthofBubble*PARAMS.SCALE *this.scaleBubble, this.heightofBubble*PARAMS.SCALE *this.scaleBubble);    

        if(this.animation.currentFrame() === 4){
            this.removeFromWorld = true;
        }
    };
    draw(ctx){
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, PARAMS.SCALE * this.scaleBubble );

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x , this.BB.y, this.BB.width, this.BB.height);
        }
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
        this.animation = new Animator (ASSET_MANAGER.getAsset("./sprites/coins.png"),
                                        0, 0, heightofCoins, widthofCoins, frameCount, .1, 0, false, true );
        this.BB = new BoundingBox(this.x, this.y, heightofCoins* PARAMS.SCALE *this.scaleCoins,widthofCoins*PARAMS.SCALE *this.scaleCoins);
        this.elapsedTime =0;
    }

    update(){

    };
    
    draw(ctx){
        var blurValues = [12,16,14,15,13];
        ctx.shadowColor = 'yellow';
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
            ASSET_MANAGER.getAsset("./sprites/coins.png"), 0, 33, 9, 9, 6, 0.1, 0, false, true );

        this.coinCount = 0;
    }

    update(){

    };

    draw(ctx){
        this.animation.drawFrame(this.game.clockTick, ctx,
            this.x, this.y, PARAMS.SCALE * 2);

        ctx.fillStyle = "Pink";
        ctx.fillText(this.coinCount,  this.x + 22 * PARAMS.SCALE, this.y + 13 * PARAMS.SCALE);

    };
};