class Yubaba {
    constructor(game, x, y, inc){
        // sprite stuff
        Object.assign(this, { game, x, y, inc}); 
        this.path = ASSET_MANAGER.getAsset("./GameEngine/sprites/yubaba.png");
        this.width = 278;
        this.height = 230;
        this.frameCount = 14;
        this.frameDuration = 0.15;
        this.elapsedTime = 0;
        this.fireRate = 3;          // smaller number will be faster every blank seconds she throws a crow
        this.scale = 0.7;
        this.new = true;
        this.show = false;
        this.removeFromWorld = false;

        this.loadAnimations();

        // speed stuff
        this.speed = 50;
        this.target = this.game.camera.chihiro;
        this.target.yubaba = this; //give access to Yubaba to player
        this.hitpoints = 30;
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

        if(this.target.x > this.inc[0]){                                        // If Chihiro passes an x value, introduce Yubaba
            this.show = true;
            this.entrance();
        }


        //Update animation
        this.animator = this.animations[this.dir];                              // adjust the direction the yubaba flies based on this.dir

        //Yuababa off screen - remove
        if( this.y < ( -this.height * this.scale - this.target.getHeight() ) *2){   // Remove yubabas if her y value is less than her height plus chihiro's height?
            this.removeFromWorld = true;
        }

        if(this.deathAnimation){                                                    //Chihiro died, end of game

            this.entrance();                                                        // Yubaba enters
            this.chihiroDeath();                                                    // Chihiro death animation is called

        } else {                                                                    // If Chihiro not dead, then Yubaba moves like this.
            /*
            this.inc[0]: Yubaba enter
            this.inc[1]: drop crows
            this.inc[2]: heat seeking crows
            this.inc[3]: Yubaba exit           //swap these? / get rid of them?
            this.inc[4]: Yubaba battle scene
            */
            // Yubaba enters
            // if(this.target.x > this.inc[0]){                                        // why is this being done twice?
            //     this.show = true;
            //     this.entrance();
            // }

            // Yubaba exit
            if(this.target.x > this.inc[3]){                                            // If Chihiro hits a certain x-value, then Yubaba leaves.
                this.y -= Math.abs(this.speed * this.game.clockTick);
            }

            if(this.show){                                                              // if show is marked as true,
                this.move();                                                            // go to the move()
                this.throwCrows();                                                      // go to throwCrows()

                // if(this.target.x > inc[4]){ //battlescene
                //     if(this.hitpoints <= 0 ) {this.removeFromWorld = true;}
                // }

                this.updateBB();
           }
        }

    };

    updateBB(){
        if(this.dir == 1){
            // adjust bounding box for reverse direction?        /* need to account for camera so Yubaba's BB x value lines up with Chihiros*/
            this.BB = new BoundingBox(this.x+this.width*3/8*this.scale +this.game.camera.x, this.y+this.height*1/8*this.scale, this.width*3/8*this.scale, this.height*3/4*this.scale);
        }else{
            this.BB = new BoundingBox(this.x+this.width*3/8 *this.scale +this.game.camera.x, this.y+this.height*1/8*this.scale, this.width*3/8*this.scale, this.height*3/4*this.scale);
        } 
    };

    /*
    *  param: context that we want to draw to 
    */
    draw(ctx){
        if(this.show || this.deathAnimation){ // show Yubaba
            ctx.shadowColor = '#ff2121';
            ctx.shadowBlur = 10; // change this to make the aura more spread out
            this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);
            ctx.shadowColor = "transparent"; // remove shadow !

            if(this.BB != null){
                if (PARAMS.DEBUG) {
                    ctx.strokeStyle = 'Red';
                     /* need to remove account for camera so drawn with Chihiro*/
                    ctx.strokeRect(this.BB.x - this.game.camera.x,  this.BB.y, this.BB.width, this.BB.height);
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
        let belowYubabaY = 100;

        // move y to match Chihiro
        if(this.target.getY() + 50 > this.BB.y + this.height * this.scale  && !this.hasChihiro){ // yubaba doesn't have chihiro and
                                                                                                 // her bottom is at least 50 greater than Chihiro's y then...

            this.y += this.speed * this.game.clockTick;                                          // move yubaba to this y with every clock tick

        } else if (this.hasChihiro){                                                             // if yubaba has Chihiro, then ...
            this.y -= this.speed * this.game.clockTick;                                          // move yubaba to this y with every clock tick

           var newY = this.y + belowYubabaY;                                                     // move chihiro to this y with every clock tick
           this.target.setY(newY)
        }

        //move x to match Chihiro
        if(this.target.getX() + this.target.getWidth()/2 > this.BB.x + this.width * this.scale / 2 + 100){  // move yubaba right to find chihiro
                                                                                                            // +- some margin of error
            this.x += this.speed * this.game.clockTick;
        }else if(this.target.getX() + this.target.getWidth()/2  < this.BB.x + this.width * this.scale / 2 - 100){ // move yubaba left to find chihiro
            this.x -= this.speed * this.game.clockTick;
        } else {                                                                                                  // Yubaba is right above chihiro
            this.x = this.target.getX() + this.target.getWidth()/2 - this.game.camera.x - 75;                     //center on Chihiro

            // if centered on Chihiro for x & y
            if(this.target.getY() + 50 <= this.BB.y + this.height * this.scale ){                                 // if Yubaba is within 50 of Chihiro's y
                this.hasChihiro = true;                                                                           // set hasChihiro to true
             }
        }

        this.updateBB();
    };

    move(){                                                                 // this determines Yubaba's movements

        if( this.x + this.width * this.scale >= PARAMS.CANVAS_WIDTH ){      // If Yubaba off the current canvas on the right-hand side

            if(this.x > PARAMS.CANVAS_WIDTH + 5){                           // if outside of frame, place on the edge of frame
                this.x = PARAMS.CANVAS_WIDTH;
            }

            this.speed = -Math.abs(this.speed);                             // set the speed so she's going to the left
            this.dir = 1;                                                   // set the direction to left

        } else if (this.x <= 0){                                              // If Yubaba off the current canvas on the left-hand side
            if( this.x < -this.width * this.scale - 5){                     //outside of frame
                this.x = - this.width *this.scale;
            }

            this.speed = Math.abs(this.speed);                              // set her speed so she's going to the right
            this.dir = 0;                                                   // set direction to the right
        }

        this.x += this.speed * this.game.clockTick;
        this.x += (this.target.velocity.x * this.game.clockTick) * -4;      // the constant (was -2) must change depending on the speed of the game
            

    };

    entrance(){
        if(this.new){ //entrance
            this.new = false;
            this.x = PARAMS.CANVAS_WIDTH;
            this.dir = 1;
        }
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

            if( this.y  >= this.target.y + 5  ) { // once at same y-level as Chihiro
                this.speedY = 0;
            }else{
                this.speedY = this.speed; //jumping wont
                this.speedX = 0; // how to make sure can still crouch?
                                          // how else to adjust motion?
            }

            if ( this.speedY == 0 && this.speedX == 0 ) {
                // if this x is to the right of Chihiro
                // go left
                if(this.x > this.target.x && this.x < this.target.x + this.target.width*this.target.scale - this.width*this.scale){
                    this.speedY = this.speed;
                }else if(this.x + this.width/2*this.scale > this.target.x){  // go left towards chihiro
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