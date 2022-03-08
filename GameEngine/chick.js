var SPIRIT = {
    SPEED: [18, 28, 38], //slow, med, fast
    F_DUR: [0.3, 0.2, 0.1],
    CHICK: {WIDTH: 75, HEIGHT: 100, F_COUNT: 6, F_DURATION: 0.3, SCALE: 2, BBTHICKNESS: 5}
    //CHICK_BB: {},
    //RADISH: {}
}

// class unfriendlySpirit {
//     constructor(game, x, y, type, minX, maxX, dir, speed){ //moving
//         // sprite stuff
//         Object.assign(this, { game, x, y, type, minX, maxX, dir, speed});
//         if(this.type == 0 ){ //new chick 
//             this = new Chick(this.game, this.x, this.y, this.minX, this.minY, this.dir, this.speed);  

//         }else if(this.type == 1){ //new radish
//             this = new Radish(this.game, this.x, this.y); 

//         } // ... new blob 
//           // ... new frog
//           // ... new robes   
//     };

//     update(){

//     };

//     /*
//     *  param: context that we want to draw to 
//     */
//     draw(ctx){ 

//     };
// } 


class Chick {
    constructor(game, x, y, dir = 0, minX = 0, maxX = 0, speed = 0){
        // sprite stuff
        Object.assign(this, {game, x, y, dir,  minX, maxX, speed});
        this.path = ASSET_MANAGER.getAsset("./GameEngine/sprites/chick.png");
        this.width = 75;
        this.height = 100;
        this.frameCount = 6;
        this.frameDuration = SPIRIT.F_DUR[this.speed]; 
        this.scale = 2.0; 
        this.BBThickness = 5;  
        this.static = ((this.maxX - this.minX) == 0);

        if(this.static){
            this.loadStaticAnimations();
            this.speed = 0;
        }else{
            this.loadMovingAnimations();
            this.speed = SPIRIT.SPEED[this.speed];
            if(this.dir == 1){ //facing left, walk left
                this.speed = -this.speed;
            }
            
        }
        this.animator = this.animations[this.dir];

        this.hitpoints = 90;
         //bounding box
         this.updateBB(); 

    };

    loadMovingAnimations(){
         /* right = 0, left = 1*/
        this.animations = [];
        this.animations[0] = new Animator(this.path, 0, 0, this.width, 
                this.height, this.frameCount, this.frameDuration, 0, false, true);
        this.animations[1] = new Animator(this.path, 0, this.height, this.width, 
                this.height, this.frameCount, this.frameDuration, 0, false, true);
    }

    loadStaticAnimations(){
        /* right = 0, left = 1*/
       this.animations = [];
       this.animations[0] = new Animator(this.path, 0, 0, this.width, 
               this.height, 1, this.frameDuration, 0, false, true);
       this.animations[1] = new Animator(this.path, 0, this.height, this.width, 
               this.height, 1, this.frameDuration, 0, false, true);
   }

    update(){
        if(!this.static){
            if(this.x + this.width *this.scale >= this.maxX){ 
                this.speed = -Math.abs(this.speed);
                this.animator = this.animations[1];
                this.dir = 1;
           }else if(this.x <= this.minX){
                this.speed = Math.abs(this.speed);   
                this.animator = this.animations[0];  
                this.dir = 0;     
           }
    
            this.x += this.speed * this.game.clockTick;
            this.updateBB();
        }

        if(this.hitpoints <= 0 ) {this.removeFromWorld = true;}
    };

    updateBB() {
        this.BB_x = this.x + this.width*this.scale *1/16;
        this.BB_y =  this.y + this.height*this.scale * 1/8;
        this.BB_w = this.width*this.scale *13/16;
        this.BB_h = this.height*this.scale * 3/4;
        this.BB = new BoundingBox(this.BB_x, this.BB_y, this.BB_w, this.BB_h);
        this.leftBB = new BoundingBox(this.BB_x - this.BBThickness, this.BB_y, this.BBThickness, this.BB_h);
        this.rightBB = new BoundingBox(this.BB_x + this.BB_w, this.BB_y, this.BBThickness, this.BB_h);
        this.topRBB = new BoundingBox(this.BB_x + this.BB_w / 2, this.BB_y, this.BB_w / 2, this.BBThickness);
        this.topLBB = new BoundingBox(this.BB_x, this.BB_y, this.BB_w / 2, this.BBThickness);
    };

    /*
    *  param: context that we want to draw to 
    */
    draw(ctx){ 
        ctx.shadowColor = '#ff2121';
        ctx.shadowBlur = 64;
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale);
        ctx.shadowColor = "transparent"; // remove shadow !

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
            ctx.strokeStyle = 'Yellow';
            ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y, this.leftBB.width, this.leftBB.height);
            ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y, this.rightBB.width, this.rightBB.height);
            ctx.strokeRect(this.topRBB.x - this.game.camera.x, this.topRBB.y, this.topRBB.width, this.topRBB.height);
            ctx.strokeStyle = 'Blue';
            ctx.strokeRect(this.topLBB.x - this.game.camera.x, this.topLBB.y, this.topLBB.width, this.topLBB.height);
        }
    };
}


class Radish {
    constructor(game, x, y){
        Object.assign(this, { game, x, y});
        this.width = 100; 
        this.height = 120;
        this.frameCount = 6; 
        this.frameDuration = 0.40; 
        this.scale = 2.5; 

        this.spritesheet = new Animator( ASSET_MANAGER.getAsset("./GameEngine/sprites/radish.png"), 0, 0, this.width, 
        this.height, this.frameCount, this.frameDuration, 0, false, true);
        this.BBThickness = 5; 
        this.hitpoints = 90; 
        this.updateBB();

    }

    updateBB(){
        this.widthBB = this.width / 2;
        this.heightBB = 100; 
        this.BB = new BoundingBox(this.x + this.widthBB, this.y + this.heightBB/2, this.widthBB*this.scale, this.heightBB*this.scale);
        this.rightBB = new BoundingBox(this.x + this.widthBB + this.widthBB*this.scale - this.BBThickness, this.y + this.heightBB/2, this.BBThickness, this.heightBB*this.scale);
        this.leftBB = new BoundingBox(this.x+ this.widthBB, this.y + this.heightBB/2, this.BBThickness, this.heightBB*this.scale);
        //this.topBB = new BoundingBox(this.x+ this.widthBB, this.y+ this.heightBB /2, this.widthBB*this.scale, this.BBThickness);
        
       this.topRBB = new BoundingBox(this.x + this.widthBB+ this.widthBB*this.scale /2, this.y + this.heightBB /2, this.widthBB*this.scale / 2, this.BBThickness);
       this.topLBB = new BoundingBox(this.x+ this.widthBB, this.y+ this.heightBB /2, this.widthBB*this.scale  / 2, this.BBThickness);

        // tried to increase the height of the radish on frame 6
        // if (this.spritesheet.currentFrame() == 6){
        //     this.BB = new BoundingBox(this.x + this.widthBB, this.y , this.widthBB*this.scale, this.height*this.scale);
        //     this.leftBB = new BoundingBox(this.x + this.widthBB + this.widthBB*this.scale - this.BBThickness, this.y, this.BBThickness, this.height*this.scale);
        //     this.rightBB = new BoundingBox(this.x+ this.widthBB, this.y,  this.BBThickness, this.height*this.scale);
        //     this.topBB = new BoundingBox(this.x+ this.widthBB, this.y, this.widthBB*this.scale, this.BBThickness);
        // }
    };

    update(){
        this.updateBB();
        var that = this; 

        if(this.hitpoints <= 0 ) {this.removeFromWorld = true;}
        this.game.entities.forEach(function (entity) { 
            if (entity instanceof BubblesController ) {
                        entity.hitpoints -= 30; 
             }
         });

    };
    draw(ctx){
        ctx.shadowColor = '#ff2121';
        ctx.shadowBlur = 64;
        this.spritesheet.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale);
        ctx.shadowColor = "transparent"; // remove shadow !

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
            ctx.strokeStyle = 'Yellow';
            ctx.strokeStyle = 'Blue';
            ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y, this.leftBB.width, this.leftBB.height);
            ctx.strokeStyle = 'Yellow';
            ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y, this.rightBB.width, this.rightBB.height);
            //ctx.strokeRect(this.topBB.x - this.game.camera.x, this.topBB.y, this.topBB.width, this.topBB.height);

            ctx.strokeRect(this.topRBB.x - this.game.camera.x, this.topRBB.y, this.topRBB.width, this.topRBB.height);
            ctx.strokeStyle = 'Blue';
            ctx.strokeRect(this.topLBB.x - this.game.camera.x, this.topLBB.y, this.topLBB.width, this.topLBB.height);
        }
    };
}
