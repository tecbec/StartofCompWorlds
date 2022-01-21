class SceneManager {
    constructor(game) {
        this.game = game;
        this.x = 0; //only scrolling to the left 
        this.game.camera = this; // focusing camera on mario 

        // chihiro falling from the sky and land on the ground
        this.chihiro = new Player(this.game, 0, 0);
        //this.chihiro = this;
        console.log(this.chihiro.x + this.chihiro.y)
        // x, y, w
        this.ground = new Ground(gameEngine, 0, PARAMS.CANVAS_WIDTH - 64, PARAMS.CANVAS_WIDTH);
        this.background = new BackGround(gameEngine, 0, 0);

        // when y is too close to the ground it falls off ? when jumping right below ; not sure why 
        this.platform = new Platform(gameEngine, 140, 240, 32); 
        this.platform1 = new Platform(gameEngine, 300, 150, 32); 
        this.platform2 = new Platform(gameEngine, 90, 100, 32); 
        this.soots = new Soot(gameEngine, 0, 0);
        this.noface = new NoFace(gameEngine, 325, PARAMS.CANVAS_WIDTH - 75 - 64);

        this.coin1 = new Coins(gameEngine, 200, 300);
        this.coin2 = new Coins(gameEngine, 300, 300);
        this.coin3 = new Coins(gameEngine, 340, 110);
        this.coin4 = new Coins(gameEngine, 100, 60);
        //this.healthbar = new BreathBar()
        this.loadGame();
    };

    loadGame() {
        this.game.addEntity(this.background);
        this.game.addEntity(this.chihiro);
        this.game.addEntity(this.ground);
        this.game.addEntity(this.platform);
        this.game.addEntity(this.platform1);
        this.game.addEntity(this.platform2);
        this.game.addEntity(this.soots);
        this.game.addEntity(this.noface);
        this.game.addEntity(this.coin1);
        this.game.addEntity(this.coin2);
        this.game.addEntity(this.coin3);
        this.game.addEntity(this.coin4);
        //this.game.addEntity(new BreathBar(gameEngine, this.totalBreath));
        //this.game.addEntity(this.soots);
    }

    update(){
        // canvas width = 400 
        // blockwidth = 32 *1 = 32 
        // 200 -16 = 164
        let midpoint = PARAMS.CANVAS_WIDTH /2 - PARAMS.BLOCKWIDTH/2;  
        console.log("this is the midpoint "  + midpoint);

              //if we take out the conditional then we would be updating all the time 
            // it would be force centering on mario and the user can move left or right freely 
            
        //want to update the camera if player is too far to the  
        //if(this.x < this.chihiro.x -midpoint) this.x = this.chihiro.x - midpoint;
        this.x = this.chihiro.x - midpoint; // force centering 
       // console.log("value x "  + this.x + " value of player x "  + this.chihiro.x);

        PARAMS.DEBUG = document.getElementById("debug").checked;
    };

    draw(ctx){
       // this.breathbar.draw(ctx);
        ctx.font = PARAMS.BLOCKWIDTH / 2 + 'px "Press Start 2P"';
       
        if (PARAMS.DEBUG){
           ctx.strokeStyle = "Black";
           ctx.fillStyle = ctx.strokeStyle;
            // the only to access objects throughout the game implementation is by including this.game and adding the 
            //chihiro is this class 
            //capturing the velocity displaying useful variables  
            let xV = "xV=" + Math.floor(this.game.chihiro.velocity.x); 
            //console.log(this.game.chihiro.x);
            let yV = "yV=" + Math.floor(this.game.chihiro.velocity.y);
            ctx.fillText(xV, 10, 15);
            ctx.fillText(yV, 10, 30);

            //ctx.translate(0, 10);
            // walk left
            ctx.strokeStyle = "Red"; 
            ctx.lineWidth = 1; 
            ctx.strokeStyle = this.game.left ? "Red" : "Black";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(35, 47, 20, 20);
            ctx.fillText("L", 42, 60);

            // walk right
            ctx.strokeStyle = this.game.right ? "Red" : "Black";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(95, 47, 20, 20);
            ctx.fillText("R", 102, 60);

            // jump
            ctx.strokeStyle = this.game.up ? "Red" : "Black";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(68, 16, 20, 20);
            ctx.fillText("U", 75, 30);
            
            // crouch
            ctx.strokeStyle = this.game.crouch ? "Red" : "Black";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(68, 76, 20, 20);
            ctx.fillText("C", 75, 90);

            // run
            ctx.strokeStyle = this.game.run ? "Red" : "Black";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(7, 47, 20, 20);
            ctx.fillText("S", 13, 60);
        }
        
    };
}