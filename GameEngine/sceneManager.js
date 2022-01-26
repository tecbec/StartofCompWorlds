


class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this; // focusing camera on chihiro
        // chihiro falling from the sky and land on the ground
        this.chihiro = new Player(this.game, 0, 0);
        //this.chihiro = this;

        this.title = true;
        this.level = null;

        // entity locations on the screen
        const nofacelocation = {x: 110, y: 225};
        const sootlocation = {x: 150, y: 190};

        // x, y, w
        // TODO: fix these measurements
        this.ground = new Ground(gameEngine, -200, PARAMS.CANVAS_WIDTH - 64, PARAMS.CANVAS_WIDTH * 3);
        this.background = new BackGround(gameEngine, -200, 0);

        // when y is too close to the ground it falls off ? when jumping right below ; not sure why
        this.platform = new Platform(gameEngine, 140, 240, 32);
        this.platform1 = new Platform(gameEngine, 300, 150, 32);
        this.platform2 = new Platform(gameEngine, 90, 100, 32);

        // set the number of soots to create
        this.Num_Soots = 10;
        this.soot = [];
        for(let i = 0; i < this.Num_Soots; i++) {
            let dir = getRandomInteger(0,1);
            this.soot[i] = new Soot(gameEngine, sootlocation.x, sootlocation.y, dir);
        }

        this.noface = new NoFace(gameEngine, nofacelocation.x, nofacelocation.y);
        this.haku = new Haku(gameEngine, -85, PARAMS.CANVAS_WIDTH - 69 - 64);
        this.yubaba = new Yubaba(gameEngine, 0, 0);

        this.coin1 = new Coins(gameEngine, 200, 300);
        this.coin2 = new Coins(gameEngine, 300, 300);
        this.coin3 = new Coins(gameEngine, 340, 110);
        this.coin4 = new Coins(gameEngine, 100, 60);
        //this.healthbar = new BreathBar()
        this.loadGame();
        this.midpoint = 0;
    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    loadLevel(level, title){
        this.title = title;
        this.level = level;

        // don't play music unless it's not the title page
        if (level.music && !this.title) {
            // ASSET_MANAGER.pauseBackgroundMusic();
            // ASSET_MANAGER.playAsset(level.music);
        }

    }

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
        this.game.addEntity(this.yubaba);
        this.game.addEntity(this.coin1);
        this.game.addEntity(this.coin2);
        this.game.addEntity(this.coin3);
        this.game.addEntity(this.coin4);
        //this.game.addEntity(new BreathBar(gameEngine, this.totalBreath));
    }

    update(){
        // canvas width = 400
        // blockwidth = 32 *1 = 32
        // 200 -16 = 164
        let midpoint = PARAMS.CANVAS_WIDTH / 2 - PARAMS.BLOCKWIDTH / 2;
        // stop camera from moving (reach dead end on the left)
        if (this.chihiro.x < 0) {
            if (this.chihiro.x < -200) {
                this.chihiro.x = -200;
            }
        } else if (this.chihiro.x > 780) {
            if (this.chihiro.x > 940) {
                this.chihiro.x = 940;
            }
        } else {
            this.x = this.chihiro.x - midpoint; // force centering
        }
        PARAMS.DEBUG = document.getElementById("debug").checked;
    };

    draw(ctx){
       // this.breathbar.draw(ctx);
        ctx.font = PARAMS.BLOCKWIDTH / 2 + 'px "Press Start 2P"';

        if (this.title) {
            var width = 176;
            var height = 88;
            ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/title.png"), 2.5 * PARAMS.BLOCKWIDTH, 2 * PARAMS.BLOCKWIDTH, width * PARAMS.SCALE, height * PARAMS.SCALE);
            ctx.fillStyle = this.game.mouse && this.game.mouse.y > 9 * PARAMS.BLOCKWIDTH && this.game.mouse.y < 9.5 * PARAMS.BLOCKWIDTH ? "Grey" : "White";
            ctx.fillText("MARIO", 6.75 * PARAMS.BLOCKWIDTH, 9.5 * PARAMS.BLOCKWIDTH);
            ctx.fillStyle = this.game.mouse && this.game.mouse.y > 10 * PARAMS.BLOCKWIDTH && this.game.mouse.y < 10.5 * PARAMS.BLOCKWIDTH ? "Grey" : "White";
            ctx.fillText("LUIGI", 6.75 * PARAMS.BLOCKWIDTH, 10.5 * PARAMS.BLOCKWIDTH);
        }


        if (PARAMS.DEBUG){
            ctx.strokeStyle = "Black";
            ctx.fillStyle = ctx.strokeStyle;
            // the only to access objects throughout the game implementation is by including this.game and adding the
            // chihiro is this class
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