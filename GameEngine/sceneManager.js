class SceneManager {
    constructor(game) {
        this.game = game;
        this.x = 0;
        // chihiro falling from the sky and land on the ground
        this.chihiro = new Player(this.game, 0, 0);
        // x, y, w
        this.ground = new Ground(gameEngine, 0, PARAMS.CANVAS_WIDTH - 64, PARAMS.CANVAS_WIDTH);
        this.background = new BackGround(gameEngine, 0, 0);
        // when y is too close to the ground it falls off ? when jumping right below ; not sure why 
        this.platform = new Platform(gameEngine, 150, 240, 32); 
        this.platform1 = new Platform(gameEngine, 280, 150, 32); 
        this.platform2 = new Platform(gameEngine, 64, 80, 32); 
        this.soots = new Soot(gameEngine, 0, 0);
        this.loadGame();
    };
    
    loadGame() {
        this.game.addEntity(this.background);
        this.game.addEntity(this.chihiro);
        this.game.addEntity(this.ground);
        this.game.addEntity(this.platform);
        this.game.addEntity(this.platform1);
        this.game.addEntity(this.platform2);
        
        //this.game.addEntity(this.soots);
    }


    update(){
         PARAMS.DEBUG = document.getElementById("debug").checked;
    };

    draw(ctx){
        ctx.font = PARAMS.BLOCKWIDTH / 2 + 'px "Press Start 2P"';
       
        if (PARAMS.DEBUG){
            //capturing the velocity displaying useful variables   
            // let xV = "xV=" + Math.floor(this.game.velocity.x); 
            // let yV = "yV=" + Math.floor(this.game.velocity.y);
            // ctx.fillText(xV, 1.5 * PARAMS.BLOCKWIDTH, 2.5 * PARAMS.BLOCKWIDTH);
             //ctx.translate(0, 10);
             ctx.strokeStyle = "Red"; //walk left
             ctx.lineWidth = 2; 
             ctx.strokeStyle = this.game.left ? "Red" : "Black";
             ctx.fillStyle = ctx.strokeStyle;
             ctx.strokeRect(100, 100, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
             ctx.fillText("L", 42, 60);

            //  ctx.strokeStyle = "Red";//run left
            //  ctx.lineWidth = 2; 
            //  ctx.strokeStyle = this.game.runL ? "Red" : "Black";
            //  ctx.fillStyle = ctx.strokeStyle;
            //  ctx.strokeRect(10, 40, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
            //  ctx.fillText("r", 13, 60);

            //  ctx.strokeStyle = "Red";
            //  ctx.lineWidth = 2; 
            //  ctx.strokeStyle = this.game.right ? "Red" : "Black";
            //  ctx.fillStyle = ctx.strokeStyle;
            //  ctx.strokeRect(100, 40, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
            //  ctx.fillText("R", 102, 60);

            //  ctx.strokeStyle = "Red"; //run right
            //  ctx.lineWidth = 2; 
            //  ctx.strokeStyle = this.game.runR ? "Red" : "Black";
            //  ctx.fillStyle = ctx.strokeStyle;
            //  ctx.strokeRect(140, 40, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
            //  ctx.fillText("r", 142, 60);

            //  ctx.strokeStyle = "Red";
            //  ctx.lineWidth = 2; 
            //  ctx.strokeStyle = this.game.up ? "Red" : "Black";
            //  ctx.fillStyle = ctx.strokeStyle;
            //  ctx.strokeRect(70, 5, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
            //  ctx.fillText("U", 75, 30);

            //  ctx.strokeStyle = "Red";
            //  ctx.lineWidth = 2; 
            //  ctx.strokeStyle = this.game.crouch ? "Red" : "Black";
            //  ctx.fillStyle = ctx.strokeStyle;
            //  ctx.strokeRect(70, 70, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
            //  ctx.fillText("C", 75, 90);
        }
        
    };
}