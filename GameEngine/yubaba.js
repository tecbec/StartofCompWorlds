class Yubaba {
    constructor(game, x, y){
        //screen size stuff
        /* width="400" height="400" */

        // sprite stuff
        Object.assign(this, { game, x, y});
        this.path = ASSET_MANAGER.getAsset("./GameEngine/sprites/yubaba.png");
        this.width = 278;
        this.height = 230;
        this.frameCount = 14;
        this.frameDuration = 0.15; 
        this.scale = 0.3; 

        this.loadAnimations();

        //bounding box
        this.BB = new BoundingBox(this.x+this.width*3/8 *this.scale, this.y+this.height*1/8*this.scale, this.width*3/8*this.scale, this.height*3/4*this.scale);

        // speed stuff
        this.speed = 50;

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