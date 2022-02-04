// TODO: move this when we create a level.js
/**
 * THIS IS WHERE WE PUT THE ENTITIES IN THE CANVAS
 */
var LEVEL = {
    music: "./audio/OneSummersDay.mp3",
    START_CANVAS: {X: -900, Y: 0},
    END_CANVAS: {X: 940}, // change this later when we figure out the exact ending canvas measurement
    FRAME_COUNT: 5, // This is the factor that determine how wide the actual game is.
    // add a platform length: short, medium, long.
    PLATFORM_LOCATION: [{X: 75, Y: 800}, {X: 500, Y: 0}, {X: 850, Y: 0}, {X: 1200, Y:0}, {X: 1600, Y: 0}],
    CLOUD_PLATFORM_LOCATION: [{X: 200, Y: 550}, {X: 500, Y: 0}, {X: 750, Y:0}, {X: 1100, Y: 0}, {X: 1500, Y: 0}],
    STONE_LAMP_LOCATION: {X: 1000, Y: 700},
    LAMP_LOCATION: {X:500, Y: 700},
    RAILING_LOCATION: {X: 500, Y: 795},
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
        const chickLocation = {x: 80, y: 850, minX:85, maxX:300}; // minX & maxX determine the x range the chick paces

        this.clearEntities();

        // chihiro falling from the sky and land on the ground
        this.chihiro = new Player(this.game, CHIHIRO.TITLE_POSITION.X, CHIHIRO.TITLE_POSITION.Y);

        // x , y , w
        this.ground = new Ground(this.game, LEVEL.START_CANVAS.X, PARAMS.CANVAS_HEIGHT - BACKGROUND.GROUND.SIZE * BACKGROUND.GROUND.SCALE, PARAMS.CANVAS_WIDTH * LEVEL.FRAME_COUNT,
            BACKGROUND.GROUND.SCALE * BACKGROUND.GROUND.SIZE);
        this.background = new BackGround(this.game, LEVEL.START_CANVAS.X,  LEVEL.START_CANVAS.Y);

        if(!this.title){
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
            this.haku = new Haku(this.game, HAKU.INITIAL_POSITION.X, PARAMS.CANVAS_WIDTH - HAKU.SIZE * HAKU.SCALE - BACKGROUND.GROUND.SIZE * BACKGROUND.GROUND.SCALE);
            this.noface = new NoFace(this.game, nofacelocation.x, nofacelocation.y);
            this.yubaba = new Yubaba(this.game, 0, 0);
            this.chick = new Chick(this.game, chickLocation.x, chickLocation.y, chickLocation.minX, chickLocation.maxX);

            // TODO: put the Coins's (x, y) in LEVEL once we finalized the coordinates
            this.coin1 = new Coins(this.game, 200, 300);
            this.coin2 = new Coins(this.game, 300, 300);
            this.coin3 = new Coins(this.game, 340, 110);
            this.coin4 = new Coins(this.game, 100, 60);


            // Background stuff
            this.stonelamp = new StoneLamp(this.game, LEVEL.STONE_LAMP_LOCATION.X, LEVEL.STONE_LAMP_LOCATION.Y, BACKGROUND.STONE_LAMP.SIZE * BACKGROUND.STONE_LAMP.SCALE);
            this.lamp = new Lamp(this.game, LEVEL.LAMP_LOCATION.X, LEVEL.LAMP_LOCATION.Y, BACKGROUND.LAMP.SIZE * BACKGROUND.LAMP.SCALE);
            this.railing = new Railing(this.game, LEVEL.RAILING_LOCATION.X, LEVEL.RAILING_LOCATION.Y, PARAMS.CANVAS_WIDTH * LEVEL.FRAME_COUNT,
                BACKGROUND.GROUND.SCALE * BACKGROUND.GROUND.SIZE);

            // initialization of the breath bar and counter
            this.coinCounter = new CoinCounter(this.game, CHIHIRO.COIN_COUNTER.X, CHIHIRO.COIN_COUNTER.Y);
            this.breathbar = new BreathBar(this.game, CHIHIRO.BREATH_BAR.X, CHIHIRO.BREATH_BAR.Y, this.breathwidth,
                CHIHIRO.BREATH_BAR.HEIGHT * PARAMS.SCALE, CHIHIRO.BREATH_BAR.MAX);
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

            this.game.addEntity(this.railing);
            this.game.addEntity(this.chihiro);
            this.game.addEntity(this.ground);

            for (var i = 0; i < LEVEL.PLATFORM_LOCATION.length; i++) {
                let platform = LEVEL.PLATFORM_LOCATION[i];
                this.game.addEntity(new Platform(this.game, platform.X, platform.Y, BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE));
            }

            for (var i = 0; i < LEVEL.CLOUD_PLATFORM_LOCATION.length; i++) {
                let cloudPlatform = LEVEL.CLOUD_PLATFORM_LOCATION[i];
                this.game.addEntity(new CloudPlatform(this.game, cloudPlatform.X, cloudPlatform.Y, BACKGROUND.CLOUD_PLATFORM.SIZE * BACKGROUND.CLOUD_PLATFORM.SCALE));
            }


            this.game.addEntity(this.stonelamp);
            this.game.addEntity(this.lamp);


            for(let i = 0; i < this.Num_Soots; i++) {
                this.game.addEntity(this.soot[i]);
            }
            this.game.addEntity(this.noface);
            this.game.addEntity(this.haku);
            this.game.addEntity(this.yubaba);
            // this.game.addEntity(this.chick);
            this.game.addEntity(this.coin1);
            this.game.addEntity(this.coin2);
            this.game.addEntity(this.coin3);
            this.game.addEntity(this.coin4);
            this.game.addEntity(this.breathbar);
            this.game.addEntity(this.coinCounter);
        }
    };

    changeBreath() {
        this.breathbar.width = this.breathwidth;
    };

    update() {
        this.updateAudio();
        // canvas width = 400
        // blockwidth = 32 * 1 = 32
        // 200 -16 = 164
        if (this.title && this.game.click) {
            if (this.game.click && this.game.click.y > 572 && this.game.click.y < 597) {
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

        let midPoint = PARAMS.CANVAS_WIDTH / 2 - CHIHIRO.SIZE * CHIHIRO.SCALE;

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
            this.gameOver = false;
        }

        PARAMS.DEBUG = document.getElementById("debug").checked;
    };

    draw(ctx) {
        ctx.font = PARAMS.BLOCKWIDTH / 2 + 'px "Press Start 2P"';

        if (this.title || this.chihiro.dead && this.chihiro.removeFromWorld) {
            var width = 176;
            var height = 88;

            ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/title.png"), PARAMS.CANVAS_WIDTH / 2 - width * PARAMS.SCALE / 2 , PARAMS.CANVAS_HEIGHT / 2 - height * PARAMS.SCALE, width * PARAMS.SCALE, height * PARAMS.SCALE);
            ctx.fillStyle = this.game.mouse && this.game.mouse.y > 564 && this.game.mouse.y < 598 ? "LightCoral" : "Black";
            ctx.fillText("Start", PARAMS.CANVAS_WIDTH / PARAMS.SCALE - 40, PARAMS.CANVAS_HEIGHT /  PARAMS.SCALE + 50); //280
            ctx.fillStyle = this.game.mouse && this.game.mouse.y > 614 && this.game.mouse.y < 649 ? "LightCoral" : "Black";
            ctx.fillText("Instructions", PARAMS.CANVAS_WIDTH /  PARAMS.SCALE - 80, PARAMS.CANVAS_HEIGHT/  PARAMS.SCALE + 100); //300
        }

        if (PARAMS.DEBUG && !this.title) {
            ctx.strokeStyle = "Black";
            ctx.fillStyle = ctx.strokeStyle;
            // the only to access objects throughout the game implementation is by including this.game and adding the chihiro in this class
            // capturing the velocity displaying useful variables
            let xV = "xV=" + Math.floor(this.game.chihiro.velocity.x);
            let yV = "yV=" + Math.floor(this.game.chihiro.velocity.y);
            ctx.fillText(xV, 10 * PARAMS.SCALE, 15 * PARAMS.SCALE);
            ctx.fillText(yV, 10 * PARAMS.SCALE, 30 * PARAMS.SCALE);

            // x and y position of the sprite
            let xP = "xP=" + Math.floor(this.game.chihiro.x);
            let yP = "yP=" + Math.floor(this.game.chihiro.y);
            ctx.fillText(xP, 100 * PARAMS.SCALE, 15 * PARAMS.SCALE);
            ctx.fillText(yP, 100 * PARAMS.SCALE, 30 * PARAMS.SCALE);

            // bounding box
            let bX ="xB=" + Math.floor(this.game.chihiro.BB.left);
            let bY ="yB=" + Math.floor(this.game.chihiro.BB.top);
            ctx.fillText(bX, 160 * PARAMS.SCALE, 15 * PARAMS.SCALE);
            ctx.fillText(bY, 160 * PARAMS.SCALE, 30 * PARAMS.SCALE);

            // walk left
            ctx.strokeStyle = "Red";
            ctx.lineWidth = 1;
            ctx.strokeStyle = this.game.left ? "Red" : "Black";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(35 * PARAMS.SCALE, 47 * PARAMS.SCALE, 20 * PARAMS.SCALE, 20 * PARAMS.SCALE);
            ctx.fillText("L", 42 * PARAMS.SCALE, 60 * PARAMS.SCALE);

            // walk right
            ctx.strokeStyle = this.game.right ? "Red" : "Black";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(95 * PARAMS.SCALE, 47 * PARAMS.SCALE, 20 * PARAMS.SCALE, 20 * PARAMS.SCALE);
            ctx.fillText("R", 102 * PARAMS.SCALE, 60 * PARAMS.SCALE);

            // jump
            ctx.strokeStyle = this.game.up ? "Red" : "Black";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(68 * PARAMS.SCALE, 16 * PARAMS.SCALE, 20 * PARAMS.SCALE, 20 * PARAMS.SCALE);
            ctx.fillText("U", 75 * PARAMS.SCALE, 30 * PARAMS.SCALE);

            // crouch
            ctx.strokeStyle = this.game.crouch ? "Red" : "Black";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(68 * PARAMS.SCALE, 76 * PARAMS.SCALE, 20 * PARAMS.SCALE, 20 * PARAMS.SCALE);
            ctx.fillText("C", 75 * PARAMS.SCALE, 90 * PARAMS.SCALE);

            // run
            ctx.strokeStyle = this.game.run ? "Red" : "Black";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(7 * PARAMS.SCALE, 47 * PARAMS.SCALE, 20 * PARAMS.SCALE, 20 * PARAMS.SCALE);
            ctx.fillText("S", 13 * PARAMS.SCALE, 60 * PARAMS.SCALE);
        }


    };

}

