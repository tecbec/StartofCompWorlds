// TODO: move this when we create a level.js
var LEVEL = {
    music: "./audio/OneSummersDay.mp3",
    START_CANVAS: {X: -600, Y: 0},
    END_CANVAS: {X: 940}, // change this later when we figure out the exact ending canvas measurement
    FRAME_COUNT: 5, // This is the factor that determine how wide the actual game is. 

    PLATFORM_LOCATION: [{X: 339, Y: 560}, {X: 449, Y: 460}, {X: 559, Y: 490}, {X: 670, Y: 390}, {X: 800, Y: 490}] 
}
class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this; // focusing camera on chihiro
        // this.midPoint = 0;
        this.gameOver = false;
        this.title = true;
        this.level = 1;
        this.gameOverCounter  = 0;

        //Breath
        this.breathwidth = 100;
        
        // chihiro falling from the sky and land on the ground
        // this.chihiro = new Player(this.game, CHIHIRO.TITLE_POSITION.X, CHIHIRO.TITLE_POSITION.Y);

        this.loadLevel(this.level, this.title);

    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    updateAudio() {
        var mute = document.getElementById("mute").checked;
        var volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);

    };

    loadLevel(level, title){

        this.title = title;
        this.level = level;

        this.clearEntities();
        // chihiro falling from the sky and land on the ground
        this.chihiro = new Player(this.game, CHIHIRO.TITLE_POSITION.X, CHIHIRO.TITLE_POSITION.Y);
        // x , y , w
        this.ground = new Ground(gameEngine, LEVEL.START_CANVAS.X, PARAMS.CANVAS_HEIGHT - BACKGROUND.GROUND.SIZE * BACKGROUND.GROUND.SCALE, PARAMS.CANVAS_WIDTH * LEVEL.FRAME_COUNT, BACKGROUND.GROUND.SCALE * BACKGROUND.GROUND.SIZE);
        this.background = new BackGround(gameEngine, LEVEL.START_CANVAS.X,  LEVEL.START_CANVAS.Y);

        if(!this.title){
            // this.game.player = this.chihiro;
            // entity locations on the screen
            const nofacelocation = {x: 300, y: 50};
            const sootlocation = {x: 150, y: 190};
            
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
        if (LEVEL.music && !this.title) {
             ASSET_MANAGER.pauseBackgroundMusic();
             ASSET_MANAGER.playAsset(LEVEL.music);
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

            for (var i = 0; i < LEVEL.PLATFORM_LOCATION.length; i++) {
                let platform = LEVEL.PLATFORM_LOCATION[i];
                this.game.addEntity(new Platform(this.game, platform.X, platform.Y, BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE));
            }

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

    changeBreath() {
        this.breathbar.updateOnFly(this.breathwidth);
    };

    update() {

        this.updateAudio();

        // canvas width = 400
        // blockwidth = 32 * 1 = 32
        // 200 -16 = 164
        if (this.title && this.game.click) {
            if (this.game.click && this.game.click.y > 412 && this.game.click.y < 425) {
                this.title = false;
                this.loadLevel(1, this.title);
                this.game.click = false;
            }
        }

        // if (!this.title && this.chihiro.dead && this.chihiro.removeFromWorld) {
        if (!this.title && this.chihiro.dead) {
            this.gameOver = true;
        } else {

        }

        let midPoint = PARAMS.CANVAS_WIDTH / 2 - CHIHIRO.SIZE;

        // // stop camera from moving (reach dead end on the left)
        // if (this.chihiro.x < 0) {
        //     if (this.chihiro.x < LEVEL.START_CANVAS.X) {
        //         this.chihiro.x =  LEVEL.START_CANVAS.X;
        //     }
        // } else if (this.chihiro.x > LEVEL.END_CANVAS.X - midPoint) {
        //     if (this.chihiro.x > LEVEL.END_CANVAS.X) {
        //         this.chihiro.x = LEVEL.END_CANVAS.X;
        //     }
        // } else {
           
        // }

        this.x = this.chihiro.x - midPoint; // force centering
        if (this.gameOver) {
            this.gameOverCounter += this.game.clockTick;
            if (this.gameOverCounter > 1) {
                this.title = true;
                this.breathwidth = 100;
                this.gameOver = false;
                this.gameOverCounter = 0;
                this.loadLevel(1, this.title);
            }
        }

        PARAMS.DEBUG = document.getElementById("debug").checked;
    };

    draw(ctx) {
        ctx.font = PARAMS.BLOCKWIDTH / 2 + 'px "Press Start 2P"';

        if (this.title || this.chihiro.dead && this.chihiro.removeFromWorld) {
            var width = 176;
            var height = 88;
            // fix the tile location to be middle of the screen 
            // fix these nums later 
            ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/title.png"), PARAMS.CANVAS_WIDTH / 2 - width * PARAMS.SCALE / 2 , PARAMS.CANVAS_HEIGHT / 2 - height * PARAMS.SCALE, width * PARAMS.SCALE, height * PARAMS.SCALE);
            ctx.fillStyle = this.game.mouse && this.game.mouse.y > 405 && this.game.mouse.y < 430 ? "LightCoral" : "Black";
            ctx.fillText("Start", 615,424); //280
            ctx.fillStyle = this.game.mouse && this.game.mouse.y > 440 && this.game.mouse.y < 460 ? "LightCoral" : "Black";
            ctx.fillText("Instructions", 595,450); //300
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

