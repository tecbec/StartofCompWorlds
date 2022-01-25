// TODO: move this when we create a level.js
var LEVEL = {
    START_CANVAS: {X: -200, Y: 0},
    END_CANVAS: {X: 940}
}
class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this; // camera focus on chihiro
        this.midpoint = 0;
        // chihiro falling from the sky and land on the ground
        this.chihiro = new Player(this.game, CHIHIRO.INITIAL_POSITION.X, CHIHIRO.INITIAL_POSITION.Y);
        this.ground = new Ground(gameEngine, LEVEL.START_CANVAS.X, PARAMS.CANVAS_WIDTH - CHIHIRO.SIZE * CHIHIRO.SCALE, PARAMS.CANVAS_WIDTH * BACKGROUND.CANVAS_SCALE);
        this.background = new BackGround(gameEngine, LEVEL.START_CANVAS.X,  LEVEL.START_CANVAS.Y);

        // TODO: put the Platform's (x, y) in LEVEL once we finalized the coordinates
        this.platform = new Platform(gameEngine, 140, 240, BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE);
        this.platform1 = new Platform(gameEngine, 300, 150, BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE);
        this.platform2 = new Platform(gameEngine, 90, 100, BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE);

        // set the number of soots to create
        this.Num_Soots = 10;
        this.soot = [];
        for(let i = 0; i < this.Num_Soots; i++) {
            let dir = getRandomInteger(0,1);
            this.soot[i] = new Soot(gameEngine, 150, 190, dir);
        }
        // TODO: fix no face position
        this.noface = new NoFace(gameEngine, 325, PARAMS.CANVAS_WIDTH - 75 - BACKGROUND.GROUND.SIZE * BACKGROUND.GROUND.SCALE);
        this.haku = new Haku(gameEngine, HAKU.INITIAL_POSITION.X, PARAMS.CANVAS_WIDTH - HAKU.SIZE * HAKU.SCALE - BACKGROUND.GROUND.SIZE * BACKGROUND.GROUND.SCALE);

         // TODO: put the Coins's (x, y) in LEVEL once we finalized the coordinates
        this.coin1 = new Coins(gameEngine, 200, 300);
        this.coin2 = new Coins(gameEngine, 300, 300);
        this.coin3 = new Coins(gameEngine, 340, 110);
        this.coin4 = new Coins(gameEngine, 100, 60);

        this.loadGame();
    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    loadGame() {
        this.game.addEntity(this.background);
        this.game.addEntity(this.chihiro);
        this.game.addEntity(this.ground);
        this.game.addEntity(this.platform);
        this.game.addEntity(this.platform1);
        this.game.addEntity(this.platform2);
        for(let i = 0; i < this.Num_Soots; i++) {
            this.game.addEntity(this.soot[i]);
        }
        this.game.addEntity(this.noface);
        this.game.addEntity(this.haku);
        this.game.addEntity(this.coin1);
        this.game.addEntity(this.coin2);
        this.game.addEntity(this.coin3);
        this.game.addEntity(this.coin4);
    }

    update(){
        // canvas width = 400
        // blockwidth = 32 * 1 = 32
        // 200 -16 = 164
        let midPoint = PARAMS.CANVAS_WIDTH / 2 - CHIHIRO.SIZE;

        // stop camera from moving (reach dead end on the left)
        if (this.chihiro.x < 0) {
            if (this.chihiro.x < LEVEL.START_CANVAS.X) {
                this.chihiro.x =  LEVEL.START_CANVAS.X;
            }
        } else if (this.chihiro.x > LEVEL.END_CANVAS.X - midPoint) {
            if (this.chihiro.x > LEVEL.END_CANVAS.X) {
                this.chihiro.x = LEVEL.END_CANVAS.X;
            }
        } else {
            this.x = this.chihiro.x - midPoint; // force centering
        }
        PARAMS.DEBUG = document.getElementById("debug").checked;
    };

    draw(ctx){
        ctx.font = PARAMS.BLOCKWIDTH / 2 + 'px "Press Start 2P"';
        if (PARAMS.DEBUG){
            ctx.strokeStyle = "Black";
            ctx.fillStyle = ctx.strokeStyle;
            // the only to access objects throughout the game implementation is by including this.game and adding the chihiro in this class
            // capturing the velocity displaying useful variables
            let xV = "xV=" + Math.floor(this.game.chihiro.velocity.x);
            let yV = "yV=" + Math.floor(this.game.chihiro.velocity.y);
            ctx.fillText(xV, 10, 15);
            ctx.fillText(yV, 10, 30);

            // x and y position of the sprite
            let xP = "xP=" + Math.floor(this.game.chihiro.x);
            let yP = "yP=" + Math.floor(this.game.chihiro.y);
            ctx.fillText(xP, 100, 15);
            ctx.fillText(yP, 100, 30);

            // bounding box 
            let bX ="xB=" + Math.floor(this.game.chihiro.BB.left);
            let bY ="yB=" + Math.floor(this.game.chihiro.BB.top);
            ctx.fillText(bX, 160, 15);
            ctx.fillText(bY, 160, 30);

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

