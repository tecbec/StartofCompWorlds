class Yubaba {
    constructor(game, x, y){
        // sprite stuff
        Object.assign(this, { game, x, y});
        this.path = ASSET_MANAGER.getAsset("./sprites/yubaba.png");
        this.width = 278;
        this.height = 230;
        this.frameCount = 14;
        this.frameDuration = 0.15; 
        this.elapsedTime = 0;
        this.fireRate = 3;
        this.scale = 0.3; 

        this.loadAnimations();

        //bounding box
        // magic numbers for bounding box may be adjusted, just to have the bounding box around the body of yubaba (not the wings and tail)
        this.BB = new BoundingBox(this.x+this.width*3/8 *this.scale, this.y+this.height*1/8*this.scale, this.width*3/8*this.scale, this.height*3/4*this.scale);

        // speed stuff
        this.speed = 50;

        // set up target ... more efficient way to do this than searching? 
        // console.log("Begin search for Chihiro");
        // for (var i = 0; i < this.game.entities.length; i++) {
        //     var ent = this.game.entities[i];  
        //     if(ent instanceof Player){
        //         console.log("Found Chihiro: " + ent.toString());  // ... never finds chihiro? 
        //         this.target = ent;
        //         break;
        //     }
        // }

        this.target = this.game.player;
    };

    loadAnimations(){
         /* right = 0, left = 1*/
        this.dir = 0;
        this.animations = [];
        this.animations[0] = new Animator(this.path, this.x, this.y, this.width, 
                this.height, this.frameCount, this.frameDuration, 0, false, true);
        this.animations[1] = new Animator(this.path, this.x, this.y+this.height, this.width, 
                this.height, this.frameCount, this.frameDuration, 0, false, true);
        this.animator = this.animations[0];
    }

    update(){
        if(this.x + this.width *this.scale >= PARAMS.CANVAS_WIDTH){ 
            this.speed = -Math.abs(this.speed);
            this.animator = this.animations[1];
            this.dir = 1;
       }else if(this.x <= 0){
            this.speed = Math.abs(this.speed);   
            this.animator = this.animations[0];  
            this.dir = 0;     
       }

        this.x += this.speed * this.game.clockTick;
       if(this.dir == 1){
        // adjust bounding box for reverse direction? 
        this.BB = new BoundingBox(this.x+this.width*3/8*this.scale, this.y+this.height*1/8*this.scale, this.width*3/8*this.scale, this.height*3/4*this.scale);

       }else{
        this.BB = new BoundingBox(this.x+this.width*3/8 *this.scale, this.y+this.height*1/8*this.scale, this.width*3/8*this.scale, this.height*3/4*this.scale);

        // throw crows
        this.elapsedTime += this.game.clockTick;
        if (this.elapsedTime > this.fireRate) { 
            this.elapsedTime = 0;
            this.game.addEntity(new Crow(this.game, this.x, this.y+this.height*this.scale, this.target));
        }
       }
    };

    /*
    *  param: context that we want to draw to 
    */
    draw(ctx){ 
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };
}

class Crow{
    constructor(game, x, y, target){
        // sprite stuff
        Object.assign(this, { game, x, y, target});
        this.path = ASSET_MANAGER.getAsset("./sprites/yubaba.png");
        this.width = 278;
        this.height = 230;
        this.frameCount = 14;
        this.frameDuration = 0.15; 
        this.scale = 0.1; 

        this.loadAnimations();

        //bounding box
        this.BB = new BoundingBox(this.x+this.width*3/8 *this.scale, this.y+this.height*1/8*this.scale, this.width*3/8*this.scale, this.height*3/4*this.scale);

        // speed stuff
        this.speed = 50;
        this.speedX = 0;
        this.speedY = this.speed;

    };

    loadAnimations(){
         /* right = 0, left = 1*/
        this.dir = 0;
        this.animations = [];
        this.animations[0] = new Animator(this.path, this.x, this.y, this.width, 
                this.height, this.frameCount, this.frameDuration, 0, false, true);
        this.animations[1] = new Animator(this.path, this.x, this.y+this.height, this.width, 
                this.height, this.frameCount, this.frameDuration, 0, false, true);
        this.animator = this.animations[0];
    }

    update(){
        // console.log(this.toString());
        // console.log(this.target.toString());

        console.log(this.target.y <= this.y);
        if(this.y + this.height/2*this.scale  >= this.target.y){ // once at same y-level as Chihiro 
            this.speedY = 0;
        }
        if(this.speedY == 0 && this.speedX == 0){ 
            // if this x is to the right of Chihiro
            if(this.x + this.width/2*this.scale > (this.target.x - this.game.camera.x)){ // go left towards chihiro 
                this.speedX = -this.speed;
            }else{ //else go right
                this.speedY = this.speed;
            }
        }

        this.y += this.speedY * this.game.clockTick;
        this.x += this.speedX * this.game.clockTick;
       // this.x += this.speedX * this.game.clockTick;
        this.BB = new BoundingBox(this.x+this.width*3/8*this.scale, this.y+this.height*1/8*this.scale, this.width*3/8*this.scale, this.height*3/4*this.scale);
        
        /*
        if(){ //moved off screen? Delete entity 

        }else if(){

        }*/
    };

    /*
    *  param: context that we want to draw to 
    */
    draw(ctx){ 
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
        // ctx.strokeStyle = "Black";
        // ctx.fillStyle = "Black";
        // ctx.arc(this.x, this.y, this.width*this.scale, 0, Math.PI*2);
        // ctx.fill();

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        }
    };

    toString(){
        return "Crow: x-" + this.x + " y-" + this.y;
    }

}