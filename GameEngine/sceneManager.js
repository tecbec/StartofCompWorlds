// TODO: move this when we create a level.js
/**
 * THIS IS WHERE WE PUT THE ENTITIES IN THE CANVAS
 */
var LEVEL = {
    music: "./audio/OneSummersDay.mp3",
    START_CANVAS: {X: -900, Y: 0},
    END_CANVAS: {X: 940}, // change this later when we figure out the exact ending canvas measurement
    FRAME_COUNT: 7, // This is the factor that determine how wide the actual game is.
    // add a platform length: short, medium, long.
    PLATFORM_LOCATION:       [{X: 790, Y: 550}, {X: 1100, Y: 345}, {X: 1400, Y: 500}, {X: 1900, Y:390}, {X: 2200, Y: 590},     // scene 2
                              {X: 2600, Y: 590}, {X: 2750, Y: 450}, {X: 3300, Y: 575}, {X: 3500, Y: 400}, {X: 4000, Y: 600}],                 // scene 3
    CLOUD_PLATFORM_LOCATION: [{X: 2800, Y: 250}, {X: 3200, Y: 300}, {X: 3400, Y:150}, {X: 3750, Y: 250}, {X: 4000, Y: 300}],
    STONE_LAMP_LOCATION: [{X: 1000, Y: 700}, {X: 1800, Y: 700}, {X: 2902, Y: 700}, {X: 3702, Y: 700}],

    LAMP_LOCATION: [{X:500, Y: 650}, {X:2402, Y: 650}, {X:4304, Y: 650}, {X:6206, Y: 650}, {X:8108, Y: 650}, {X:10010, Y: 650},
                    {X:11912, Y: 650}, {X:13814, Y: 650}, {X:15716, Y: 650}],
    RAILING_LOCATION: {X: 500, Y: 820},
    SOOT_LOCATION: [{X: 1100, Y: 310}, {X: 1500, Y: 920}, {X: 3350, Y: 540}, {X: 3350, Y: 920}],
    SOOT_AREA: [{W: 100, H: 15}, {W: 200, H: 15}, {W: 100, H: 15}, {W: 200, H: 15}],
    SOOT_NUM: [10, 20, 10, 20],
    COIN_LOCATION: [{X: 0, Y: 0}, {X: 0, Y: 0}, {X: 0, Y: 0}, {X: 0, Y: 0}],
    NOFACE_LOCATION: {X: 1950, Y: 200},
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

            // TODO: fix no face position
            this.haku = new Haku(this.game, HAKU.INITIAL_POSITION.X, PARAMS.CANVAS_WIDTH - HAKU.SIZE * HAKU.SCALE - BACKGROUND.GROUND.SIZE * BACKGROUND.GROUND.SCALE);
            this.noface = new NoFace(this.game, LEVEL.NOFACE_LOCATION.X, LEVEL.NOFACE_LOCATION.Y);
            this.yubaba = new Yubaba(this.game, 0, 0);
            this.chick = new Chick(this.game, chickLocation.x, chickLocation.y, chickLocation.minX, chickLocation.maxX);

            // TODO: put the Coins's (x, y) in LEVEL once we finalized the coordinates
            this.coin1 = new Coins(this.game, 200, 300);
            this.coin2 = new Coins(this.game, 300, 300);
            this.coin3 = new Coins(this.game, 340, 110);
            this.coin4 = new Coins(this.game, 100, 60);


            // Background stuff
            //this.stonelamp = new StoneLamp(this.game, LEVEL.STONE_LAMP_LOCATION.X, LEVEL.STONE_LAMP_LOCATION.Y, BACKGROUND.STONE_LAMP.SIZE * BACKGROUND.STONE_LAMP.SCALE);
            this.railing = new Railing(this.game, LEVEL.RAILING_LOCATION.X, LEVEL.RAILING_LOCATION.Y, PARAMS.CANVAS_WIDTH * LEVEL.FRAME_COUNT,
                BACKGROUND.RAILING.SCALE * BACKGROUND.RAILING.SIZE);

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

            for(var i=0; i < LEVEL.LAMP_LOCATION.length; i++){
                let lamp = LEVEL.LAMP_LOCATION[i];
                this.game.addEntity(new Lamp(this.game, lamp.X, lamp.Y, BACKGROUND.LAMP.SIZE * BACKGROUND.LAMP.SCALE.W) );
            }


            for(var i=0; i < LEVEL.STONE_LAMP_LOCATION.length; i++){

                let stone_lamp = LEVEL.STONE_LAMP_LOCATION[i];
                this.game.addEntity(new StoneLamp(this.game, stone_lamp.X, stone_lamp.Y, BACKGROUND.STONE_LAMP.SIZE * BACKGROUND.STONE_LAMP.SCALE) );
            }

            for(var i=0; i < LEVEL.SOOT_LOCATION.length; i++){
                this.soot = [];
                for(let j = 0; j < LEVEL.SOOT_NUM[i]; j++) {
                    let dir = getRandomInteger(0,1);
                    this.soot[j] = new Soot(gameEngine, LEVEL.SOOT_LOCATION[i].X, LEVEL.SOOT_LOCATION[i].Y, dir, LEVEL.SOOT_AREA[i].W, LEVEL.SOOT_AREA[i].H);
                    this.game.addEntity(this.soot[j]);
                }
            }

            this.game.addEntity(this.noface);
            this.game.addEntity(this.haku);
            // this.game.addEntity(this.yubaba);
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

