class Chick {
    constructor(game, x, y, minX, maxX){
        // sprite stuff
        Object.assign(this, { game, x, y, minX, maxX});
        this.path = ASSET_MANAGER.getAsset("./sprites/chick.png");
        this.width = 75;
        this.height = 100;
        this.frameCount = 6;
        this.frameDuration = 0.25; 
        this.scale = 2.0; 
        this.BBThickness = 5;

        this.loadAnimations();

        //bounding box
        this.updateBB()

        // speed stuff
        this.speed = 18;
    };

    loadAnimations(){
         /* right = 0, left = 1*/
        this.dir = 0;
        this.animations = [];
        this.animations[0] = new Animator(this.path, 0, 0, this.width, 
                this.height, this.frameCount, this.frameDuration, 0, false, true);
        this.animations[1] = new Animator(this.path, 0, this.height, this.width, 
                this.height, this.frameCount, this.frameDuration, 0, false, true);
        this.animator = this.animations[0];
    }

    update(){
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
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.width*this.scale, this.height*this.scale);
        this.leftBB = new BoundingBox(this.x + this.width*this.scale - this.BBThickness, this.y, this.BBThickness, this.height*this.scale);
        this.rightBB = new BoundingBox(this.x, this.y, this.BBThickness, this.height*this.scale);
        this.topBB = new BoundingBox(this.x, this.y, this.width*this.scale, this.BBThickness);
    };

    /*
    *  param: context that we want to draw to 
    */
    draw(ctx){ 
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
            ctx.strokeStyle = 'Yellow';
            ctx.strokeRect(this.leftBB.x - this.game.camera.x, this.leftBB.y, this.leftBB.width, this.leftBB.height);
            ctx.strokeRect(this.rightBB.x - this.game.camera.x, this.rightBB.y, this.rightBB.width, this.rightBB.height);
            ctx.strokeRect(this.topBB.x - this.game.camera.x, this.topBB.y, this.topBB.width, this.topBB.height);
        }
    };
}