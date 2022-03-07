var YUBABA = {
    SPEED: 50, 
    WAIT_TIME: 10, 
    ATTACK_TIME: 20
};

class Yubaba {
    constructor(game, x, y, inc){
        // sprite stuff
        Object.assign(this, { game, x, y, inc}); 
        this.path = ASSET_MANAGER.getAsset("./GameEngine/sprites/yubaba.png");
        this.width = 278;
        this.height = 230;
        this.frameCount = 14;
        this.frameDuration = 0.15; 
        this.scale = 0.7; 

        //
        this.new = true;
        this.show = false;
        this.removeFromWorld = false;

        this.loadAnimations();

        // speed 
        this.speed = YUBABA.SPEED;

        // for crows
        this.elapsedTime = 0;
        this.fireRate = 5;

        // connect Chihiro and Yubaba
        this.target = this.game.camera.chihiro;
        this.target.yubaba = this; //give access to Yubaba to player

        //battle scene
        this.battle = false;
        this.reset = false;
        this.hitpoints = 30; // make larger? talk to Hana about this

        // death animation
        this.deathAnimation = false;
        this.hasChihiro = false;
    };

    loadAnimations(){
         /* right = 0, left = 1*/
        this.dir = 1;
        this.animations = [];
        this.animations[0] = new Animator(this.path, this.x, this.y, this.width, 
                this.height, this.frameCount, this.frameDuration, 0, false, true);
        this.animations[1] = new Animator(this.path, this.x, this.y+this.height, this.width, 
                this.height, this.frameCount, this.frameDuration, 0, false, true);
        this.animator = this.animations[0];
    }

    update(){
        //Update animation
        this.animator = this.animations[this.dir];

         //Yuababa off screen
        if(this.y < -this.height*this.scale){
            console.log("off screen");
            if(this.target.x > this.inc[3]){
                this.battle = true;
            }
            if(this.battle){ // successful reset
                console.log("successful reset");
                this.reset = true;
                this.new = true;
                this.elapsedTime = 0;
            }else{
                console.log("remove");
                this.removeFromWorld = true;
            }
        }

        if(this.deathAnimation){ //Chihiro died, end of game
            this.entrance(false);
            this.chihiroDeath();
        } else{
            /* 
            this.inc[0]: Yubaba enter
            this.inc[1]: drop crows
            this.inc[2]: heat seeking crows          
            this.inc[3]: Yubaba battle scene
            */

            // Yubaba enters
            if(this.target.x > this.inc[0]){
                this.show = true;
                this.entrance(false);
            }

            // // Yubaba exit
            /* REMOVED: this.inc[3]: Yubaba exit */
            // if(this.target.x > this.inc[3]){
            //     this.y -= Math.abs(this.speed * this.game.clockTick);
            // }

            if(this.show){ 
                if(this.target.x > this.inc[3]){ //battlescene
                    this.battleScene();
                    if(this.hitpoints <= 0) { //Yubaba lost, battle over
                        this.battle = false;
                    }
                }else{
                    this.move();
                    this.throwCrows();
                }

                this.updateBB();
           }
        }

    };

    updateBB() {
        if(this.battle){ // seperate from Chihiro, x val relative to game camera now
            this.BB_x = this.x+this.width*3/8*this.scale;
        }else{
            this.BB_x = this.x+this.width*3/8*this.scale +this.game.camera.x;
        }
        this.BB_y =  this.y+this.height*1/8*this.scale;
        this.BB_w =  this.width*3/8*this.scale;
        this.BB_h = this.height*3/4*this.scale;
        this.BB = new BoundingBox(this.BB_x, this.BB_y, this.BB_w, this.BB_h);
        this.leftBB = new BoundingBox(this.BB_x - this.BBThickness, this.BB_y, this.BBThickness, this.BB_h);
        this.rightBB = new BoundingBox(this.BB_x + this.BB_w, this.BB_y, this.BBThickness, this.BB_h);
        this.topRBB = new BoundingBox(this.BB_x + this.BB_w / 2, this.BB_y, this.BB_w / 2, this.BBThickness);
        this.topLBB = new BoundingBox(this.BB_x, this.BB_y, this.BB_w / 2, this.BBThickness);

        this.bottomRBB = new BoundingBox(this.BB_x + this.BB_w / 2, this.BB_y + this.BB_h, this.BB_w / 2, this.BBThickness);
        this.bottomLBB = new BoundingBox(this.BB_x, this.BB_y + this.BB_h, this.BB_w / 2, this.BBThickness);


        // if(this.dir == 1){
        //     // adjust bounding box for reverse direction?        /* need to account for camera so Yubaba's BB x value lines up with Chihiros*/
        //     this.BB = new BoundingBox(this.x+this.width*3/8*this.scale +this.game.camera.x, this.y+this.height*1/8*this.scale, this.width*3/8*this.scale, this.height*3/4*this.scale);
        // }else{
        //     this.BB = new BoundingBox(this.x+this.width*3/8 *this.scale +this.game.camera.x, this.y+this.height*1/8*this.scale, this.width*3/8*this.scale, this.height*3/4*this.scale);
        // } 
    };

    /*
    *  param: context that we want to draw to 
    */
    draw(ctx){
        if(this.show || this.deathAnimation){ // show Yubaba
            ctx.shadowColor = '#ff2121';
            ctx.shadowBlur = 10; // change this to make the aura more spread out
            if(this.battle && !this.new){ //seperate from Chihiro
                this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale);
            }else
                this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
            ctx.shadowColor = "transparent"; // remove shadow !

            if(this.BB != null){
                if (PARAMS.DEBUG) {
                    ctx.strokeStyle = 'Red';
                    ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
                    ctx.strokeStyle = 'Yellow';
                    ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y, this.leftBB.width, this.leftBB.height);
                    ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y, this.rightBB.width, this.rightBB.height);
                    ctx.strokeRect(this.topRBB.x - this.game.camera.x, this.topRBB.y, this.topRBB.width, this.topRBB.height);
                    ctx.strokeRect(this.bottomRBB.x - this.game.camera.x, this.bottomRBB.y, this.bottomRBB.width, this.bottomRBB.height);
                    ctx.strokeStyle = 'Blue';
                    ctx.strokeRect(this.topLBB.x - this.game.camera.x, this.topLBB.y, this.topLBB.width, this.topLBB.height);
                    ctx.strokeRect(this.bottomLBB.x - this.game.camera.x, this.bottomLBB.y, this.bottomLBB.width, this.bottomLBB.height);
                }
            }else{
                this.updateBB();
            }
        }
    };

    throwCrows(){
         // throw crows
         if(this.target.x > this.inc[1]){ 
            if(this.target.x < this.inc[2]){ // drop regular crows
                this.elapsedTime += this.game.clockTick;
                if (this.elapsedTime > this.fireRate) { 
                    this.elapsedTime = 0;
                    this.game.addEntity(new Crow(this.game, this.BB.x, this.BB.y, this.target, false));
                }

            }else{ //drop heat seeking crows
                this.elapsedTime += this.game.clockTick;
                if (this.elapsedTime > this.fireRate) { 
                    this.elapsedTime = 0;
                    this.game.addEntity(new Crow(this.game, this.BB.x, this.BB.y, this.target, true));
                }

            }

        }
    };

    chihiroDeath(){
        //speed up
        this.speed = 250;
        this.frameDuration = 0.5; 

        // move y to match Chihiro
        if(this.target.getY() + 50 > this.BB.y + this.height * this.scale  && !this.hasChihiro){
            this.y += this.speed * this.game.clockTick;
        }else if (this.hasChihiro){ // if has Chihiro, fly away
            this.y -= this.speed * this.game.clockTick;

           var newY = this.target.getY() - this.speed * this.game.clockTick;
           this.target.setY(newY)
        }

        //move x to match Chihiro 
        if(this.target.getX() + this.target.getWidth()/2 > this.BB.x + this.width * this.scale / 2 + 100){ // +- some margin of error
            this.x += this.speed * this.game.clockTick;
        }else if(this.target.getX() + this.target.getWidth()/2  < this.BB.x + this.width * this.scale / 2 - 100){
            this.x -= this.speed * this.game.clockTick;
        }else{
            this.x = this.target.getX() + this.target.getWidth()/2 - this.game.camera.x - 75; //center on Chihiro
            // if centered on Chihiro for x & y
            if(this.target.getY() + 50 <= this.BB.y + this.height * this.scale ){
                this.hasChihiro = true;
             }
        }

        this.updateBB();
    };

    move(){
           if(this.x + this.width *this.scale >= PARAMS.CANVAS_WIDTH){  // too far right
            if(this.x > PARAMS.CANVAS_WIDTH + 5){ // if outside of frame, place on the edge of frame
                this.x = PARAMS.CANVAS_WIDTH;
            }

            this.speed = -Math.abs(this.speed); 
            this.dir = 1;
           }else if(this.x <= 0){ //too far left
                if(this.x < -this.width * this.scale - 5){ //outside of frame
                    this.x = - this.width *this.scale;
                }

                this.speed = Math.abs(this.speed);  
                this.dir = 0;   
           }

           this.x += this.speed * this.game.clockTick;
           this.x += (this.target.velocity.x * this.game.clockTick)*-2;
    };
            /* parameter not working?*/
    entrance(midScreen){
        if(this.new){ //entrance
            this.new = false;
            if(this.battle /* midScreen */){
                this.x = this.inc[3] + PARAMS.CANVAS_WIDTH;
                this.y = PARAMS.CANVAS_HEIGHT / 2 - this.height *this.scale;
            }else{
                this.x = PARAMS.CANVAS_WIDTH;
            }
            this.dir = 1;
        }
    };

    battleScene(){
        if(this.reset && this.battle){
            this.scale = 1.2; // enlarge
            this.entrance(true);
            //fly on screen and wait
            this.elapsedTime += this.game.clockTick;
            if (this.elapsedTime < YUBABA.WAIT_TIME) { 
                 // seperate from Chihiro, x val relative to game camera now
                if(this.x >= this.inc[3] + PARAMS.CANVAS_WIDTH - this.width *this.scale){  // too far right
                    this.x -= Math.abs(this.speed * this.game.clockTick); 
                    this.dir = 1;
                 }
                 console.log("wait");
            }else if(this.elapsedTime < YUBABA.WAIT_TIME + YUBABA.ATTACK_TIME){
                this.attack();
                console.log("attack");
            }else{
                this.reset = false;
            }  
        }else{  // reset: fly off screen 
            console.log("reset");
            this.y -= Math.abs(this.speed * this.game.clockTick);
            if(!this.battle){
                this.move();
            }
        }
    };

    // does some attack between 1 - 3
    attack(){


    };

    toString(){
        return "Yubaba: x-" + this.x + " y-" + this.y;
    };
}

class Crow{
    constructor(game, x, y, target, heatseeking){
        // sprite stuff
        Object.assign(this, { game, x, y, target, heatseeking});
        this.path = ASSET_MANAGER.getAsset("./GameEngine/sprites/yubaba.png");
        this.width = 278;
        this.height = 230;
        this.frameCount = 14;
        this.frameDuration = 0.15; 
        this.scale = 0.2; 

        this.loadAnimations();

        //bounding box
        this.BB = new BoundingBox(this.x+this.width*3/8 *this.scale, this.y+this.height*1/8*this.scale, 
            this.width*3/8*this.scale, this.height*3/4*this.scale);

        // speed stuff
        this.speed = 50;
        this.speedX = 0;
        this.speedY = this.speed;

        this.removeFromWorld = false;

    };

    loadAnimations(){
        /* right = 0, left = 1*/
       this.dir = 0;
       this.animations = [];
       this.animations[0] = new Animator(this.path, 0, 0, this.width, 
               this.height, this.frameCount, this.frameDuration, 0, false, true);
       this.animations[1] = new Animator(this.path, 0, 0+this.height, this.width, 
               this.height, this.frameCount, this.frameDuration, 0, false, true);
       this.animator = this.animations[0];
   }

    update(){
        if(this.heatseeking){
            
            if(this.y  >= this.target.y + 5 ){ // once at same y-level as Chihiro 
                this.speedY = 0;
            }else{
                this.speedY = this.speed; //jumping wont 
                this.speedX = 0; // how to make sure can still crouch? 
                                          // how else to adjust motion? 
            }
    
            if(this.speedY == 0 && this.speedX == 0){ 
                // if this x is to the right of Chihiro
                // go left
                if(this.x > this.target.x && this.x < this.target.x + this.target.width*this.target.scale - this.width*this.scale){
                    this.speedY = this.speed;
                }else if(this.x + this.width/2*this.scale > this.target.x){ // go left towards chihiro 
                    this.animator = this.animations[1];
                    this.speedX = -this.speed;
    
                }else{ //else go right
                    this.speedX = this.speed;
                    this.animator = this.animations[0];
                }
            }
        }

        this.y += this.speedY * this.game.clockTick;
        this.x += this.speedX * this.game.clockTick;
        this.BB = new BoundingBox(this.x+this.width*3/8*this.scale, this.y+this.height*1/8*this.scale, this.width*3/8*this.scale, this.height*3/4*this.scale);
        
        //moved off screen? Delete entity 
        if(this.y > PARAMS.CANVAS_HEIGHT * 1.5){
            this.removeFromWorld = true;
        }
        if(this.x < this.target.x - PARAMS.CANVAS_WIDTH|| this.x > this.target.x + PARAMS.CANVAS_WIDTH){ 
            this.removeFromWorld = true;
        }
    };

    /*
    *  param: context that we want to draw to 
    */
    draw(ctx){ 
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale);

        ctx.shadowColor = '#fdd834';
        ctx.shadowBlur = 10; // change this to make the aura more spread out
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale);
        ctx.shadowColor = "transparent"; // remove shadow !

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x-this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);           
        }
    };

    toString(){
        return "Crow: x-" + this.x + " y-" + this.y;
    }

}