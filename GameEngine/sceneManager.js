// TODO: move this when we create a level.js
var LEVEL = {
    START_CANVAS: {X: -200, Y: 0},
    END_CANVAS: {X: 940}
}
class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this; // camera focus on chihiro
        // this.midPoint = 0;
        this.gameOver = false;
        this.title = true;
        this.level = 1;

        //Breath
        this.breathwidth = 100;

        this.loadLevel(this.level, this.title);
    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    loadLevel(level, title){
        this.title = title;
        this.level = level;

        this.clearEntities();
        
        // chihiro falling from the sky and land on the ground
        this.chihiro = new Player(this.game, CHIHIRO.TITLE_POSITION.X, CHIHIRO.TITLE_POSITION.Y);
        this.ground = new Ground(gameEngine, LEVEL.START_CANVAS.X, PARAMS.CANVAS_WIDTH - CHIHIRO.SIZE * CHIHIRO.SCALE, PARAMS.CANVAS_WIDTH * BACKGROUND.CANVAS_SCALE);
        this.background = new BackGround(gameEngine, LEVEL.START_CANVAS.X,  LEVEL.START_CANVAS.Y);

        if(!this.title){
            // chihiro falling from the sky and land on the ground
            this.chihiro = new Player(this.game, CHIHIRO.INITIAL_POSITION.X, CHIHIRO.INITIAL_POSITION.Y);
            // entity locations on the screen
            const nofacelocation = {x: 300, y: 50};
            const sootlocation = {x: 150, y: 190};

            // TODO: put the Platform's (x, y) in LEVEL once we finalized the coordinates
            this.platform = new Platform(gameEngine, 140, 230, BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE);
            this.platform1 = new Platform(gameEngine, 300, 150, BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE);
            this.platform2 = new Platform(gameEngine, 90, 100, BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE);

            // set the number of soots to create
            this.Num_Soots = 10;
            this.soot = [];
            for(let i = 0; i < this.Num_Soots; i++) {
                let dir = getRandomInteger(0,1);
                this.soot[i] = new Soot(gameEngine, sootlocation.x, sootlocation.y, dir);
            }
            // TODO: fix no face position
            this.haku = new Haku(gameEngine, HAKU.INITIAL_POSITION.X, PARAMS.CANVAS_WIDTH - HAKU.SIZE * HAKU.SCALE - BACKGROUND.GROUND.SIZE * BACKGROUND.GROUND.SCALE);
            this.noface = new NoFace(gameEngine, nofacelocation.x, nofacelocation.y);
            this.yubaba = new Yubaba(gameEngine, 0, 0);

            // TODO: put the Coins's (x, y) in LEVEL once we finalized the coordinates
            this.coin1 = new Coins(gameEngine, 200, 300);
            this.coin2 = new Coins(gameEngine, 300, 300);
            this.coin3 = new Coins(gameEngine, 340, 110);
            this.coin4 = new Coins(gameEngine, 100, 60);

            // initialization of the breath bar and counter
            this.coinCounter = new CoinCounter(this.game, CHIHIRO.COIN_COUNTER.X, CHIHIRO.COIN_COUNTER.Y);
            this.breathbar = new BreathBar(this.game, CHIHIRO.BREATH_BAR.X, CHIHIRO.BREATH_BAR.Y, this.breathwidth,
                CHIHIRO.BREATH_BAR.HEIGHT, CHIHIRO.BREATH_BAR.MAX);

        }

        this.loadGame();

        // don't play music unless it's not the title page
        if (level.music && !this.title) {
            // ASSET_MANAGER.pauseBackgroundMusic();
            // ASSET_MANAGER.playAsset(level.music);
        }

    };

    loadGame() {
        if (this.title) {
            this.game.addEntity(this.background);
            this.game.addEntity(this.chihiro);
            this.game.addEntity(this.ground);
        } else {
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
            this.game.addEntity(this.yubaba);
            this.game.addEntity(this.coin1);
            this.game.addEntity(this.coin2);
            this.game.addEntity(this.coin3);
            this.game.addEntity(this.coin4);
            this.game.addEntity(this.breathbar);
            this.game.addEntity(this.coinCounter);
        }
    };

    changeBreath(breath) {
        // that.breathwidth += CHIHIRO.BREATH_BAR.MAX - breath;
        this.breathwidth += breath;
        if(this.breathwidth > 100) {
            this.breathbar.updateOnFly(100);
        } else {
            this.breathbar.updateOnFly(this.breathwidth);
        }
    };

    update() {
        if (this.title && this.game.click) {
            if (this.game.click && this.game.click.y > 220 && this.game.click.y < 245) {
                this.title = false;
                this.loadLevel(1, this.title);
                this.game.click = false;
            }
        }

        if (!this.title && this.chihiro.dead && this.chihiro.removeFromWorld) {
            this.gameOver = true;
            this.title = true;
            this.loadLevel(1, this.title);
        } else {

        }
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

    draw(ctx) {
        ctx.font = PARAMS.BLOCKWIDTH / 2 + 'px "Press Start 2P"';

        if (this.title || this.chihiro.dead && this.chihiro.removeFromWorld) {
            var width = 176;
            var height = 88;
            ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/title.png"), 2.5 * PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH, width * PARAMS.SCALE, height * PARAMS.SCALE);
            ctx.fillStyle = this.game.mouse && this.game.mouse.y > 220 && this.game.mouse.y < 255 ? "LightCoral" : "Black";
            ctx.fillText("Start", 170,240); //280
            ctx.fillStyle = this.game.mouse && this.game.mouse.y > 245 && this.game.mouse.y < 280 ? "LightCoral" : "Black";
            ctx.fillText("Instructions", 150,260); //300
        }

        if (PARAMS.DEBUG && !this.title) {
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

