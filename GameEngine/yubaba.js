// for all new JS files, must load them into index.html!
// all sprites/entities have update and draw

class Yubaba {
    constructor(game){
        //screen size stuff
        /* width="400" height="400" */
        const SCALE = 0.35; // how do these work?
        this.scale = 0.3;

        // sprite stuff
        this.path = ASSET_MANAGER.getAsset("./sprites/yubaba.png");
        this.x = 0
        this.y = 0; 
        this.width = 278;
        this.height = 230;
        this.frameCount = 14;
        this.frameDuration = 0.15; 
        /* right = 0, left = 1*/
        this.animations = [];
        this.animations[0] = new Animator(this.path, this.x, this.y, this.width, 
                this.height, this.frameCount, this.frameDuration, false);
        this.animations[1] = new Animator(this.path, this.x, this.y+this.height, this.width, 
                this.height, this.frameCount, this.frameDuration, false);
        this.animator = this.animations[0];
        this.game = game;

        //bounding box
        this.BB = new BoundingBox(this.x+this.width*3/8, this.y+this.height*1/8, this.width*3/8, this.height*3/4);

        // speed stuff
        this.speed = 50;

    };

    update(){
       this.x += this.speed * this.game.clockTick;

       this.BB = new BoundingBox(this.x+this.width*3/8, this.y+this.height*1/8, this.width*3/8, this.height*3/4);

       if(this.x + this.width /* *this.scale */ >= PARAMS.CANVAS_WIDTH){ 
            this.speed = -Math.abs(this.speed);
            this.animator = this.animations[1];
       }else if(this.x <= 0){
            this.speed = Math.abs(this.speed);   
            this.animator = this.animations[0];       
       }
    };

    /*
    *  param: context that we want to draw to 
    */
    draw(ctx){ 
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale);

        // change to only display on debug
        if(true){
           // this.animator.drawBoundingBox(ctx, this.BB);
        } 
    };
}