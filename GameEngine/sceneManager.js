// TODO: move this when we create a level.js
/**
 * THIS IS WHERE WE PUT THE ENTITIES IN THE CANVAS
 */
 var LEVEL = {
    music: "./GameEngine/audio/OneSummersDay.mp3",
    START_MUTE:         false,               // you can must the music in each level
    START_CANVAS:       {X: -851, Y: 0},
    END_CANVAS:         {X: 13000},         // change this later when we figure out the exact ending canvas measurement
    END_TITLE_CANVAS:   {X: 500},           // This will end the title canvas so it won't keep going.
    END_GAME:           {X: 11515, Y: 813},
    FRAME_COUNT: 8,                         // This is the factor that determine how wide the actual game is
    // Type 0: has left,middle,right piece can be adjusted to be longer
    // Type 1: is short (just middle piece)
    TREE:[{X: 567, Y: 276, TYPE:3}, {X: 2538, Y: 0, TYPE:1}, {X: 3231, Y: 276, TYPE:2}, {X: 5543, Y: 0, TYPE:1}, {X: 6527, Y: 276, TYPE:2}, {X: 7816, Y: 276, TYPE:0}, {X: 8274, Y: 276, TYPE:3}],
    END_SCREEN: {X: 250, Y: 100},
    BATHHOUSE: {X: 11608, Y: - 1200},
    PLATFORM_LOCATION:       [{X: 790,  Y: 550, TYPE: 0}, {X: 1100, Y: 375, TYPE: 0}, {X: 1400, Y: 500, TYPE: 0}, {X: 1900, Y: 390, TYPE: 0}, {X: 2200, Y: 590, TYPE: 0},    // scene 1
                              {X: 2600, Y: 590, TYPE: 0}, {X: 2750, Y: 450, TYPE: 0}, {X: 3300, Y: 575, TYPE: 0}, {X: 3500, Y: 400, TYPE: 0}, {X: 4000, Y: 600, TYPE: 0},    // scene 2
                              {X: 5775 + 50, Y: 120, TYPE: 1}, {X: 5602, Y: 525, TYPE: 0}, {X: 5919, Y: 525, TYPE: 0},                                                                                        // scene 3
                              {X: 6500, Y: 525, TYPE: 0}, {X: 6700, Y: 425, TYPE: 0}, {X: 7000, Y: 300, TYPE: 0}, {X: 7100, Y: 600, TYPE: 0}, {X: 7400, Y: 400, TYPE: 0}, {X: 7900, Y: 700, TYPE: 0}, // scene 4
                              {X: 8340, Y: 525, TYPE: 1}, {X: 8480, Y: 390, TYPE: 1}, {X: 8620, Y: 525, TYPE: 1}, {X: 8760, Y: 390, TYPE: 1}, {X: 8900, Y: 525, TYPE: 1}, {X: 9040, Y: 390, TYPE: 1},  // Scene 5
                              {X: 9180, Y: 525, TYPE: 1}, {X: 9320, Y: 390, TYPE: 1}, {X: 9460, Y: 525, TYPE: 1}, {X: 9600, Y: 390, TYPE: 1}, {X: 9740, Y: 525, TYPE: 0},
                             ],

    CLOUD_PLATFORM_LOCATION: [{X: 2800, Y: 250, SIZE:3}, {X: 3200, Y: 300, SIZE:3}, {X: 3400, Y: 150, SIZE:3}, {X: 3750, Y: 250, SIZE:3}, {X: 4000, Y: 200, SIZE:3}, 
                              {X: 4354, Y: 120, SIZE:1}, {X: 4780, Y: 270, SIZE:0}, /*{X: 5255, Y: 100 + 5, SIZE:3}, {X: 5315, Y: 300, SIZE:3},*/ 
                              {X: 5225 + 30, Y: 500 - 20, SIZE:4, MIN: 100 + 5 +100, MAX: 500 - 20 +100, V:true}, {X: 5632, Y: 280, SIZE:1}, /*{X: 5775, Y: 120, SIZE:2},*/ {X: 6166, Y: 270, SIZE:3, MIN:5983, MAX:6447, V: false},
                              {X: 6650, Y: 200, SIZE:3}, {X: 6950, Y: 100, SIZE:3}, {X: 7250, Y: 200, SIZE:3}, {X: 7750, Y: 250, SIZE:3} ],                                                                 // Scene 4                     

    STONE_LAMP_LOCATION: [{X: 1000, Y: 600}, {X: 1800, Y: 600}, {X: 2902, Y: 600}, {X: 3702, Y: 600}, {X: 5255, Y: 600},
                          {X: 6706, Y: 600}, {X: 7506, Y: 600}, // Scene 4 - 800 px between each stone lamp, 500 px between first lamp and stone lamp
                          {X: 9059, Y: 600}],                   // Scene 5


    /* Start of Frame:     1                   2                 3                 4                 5                   6                   7*/
    LAMP_LOCATION: [{X:500, Y: 650},   {X:2402,  Y: 650}, {X:4304, Y: 650}, {X:6206, Y: 650}, {X:8108, Y: 650}, {X:10010, Y: 650},],// {X:11912, Y: 650}
                    //{X:13814, Y: 650}, {X:15716, Y: 650},],

    RAILING_LOCATION: {X: 500, Y: 820},

    SOOT_LOCATION: [{X: 1100, Y: 335}, {X: 1500, Y: 920}, {X: 3350, Y: 540}, {X: 3350, Y: 920}, {X: 5622, Y: 500}, {X: 5939, Y: 500}, {X: 4500, Y: 920}, {X: 5500, Y: 920},
                    {X: 7000, Y: 790}, {X: 6750, Y: 395},  // scene 4
                    {X: 8482, Y: 925}, {X: 9500, Y: 925}], // scene 5

    SOOT_AREA: [{W: 100, H: 40},   {W: 200, H: 30},  // scene 1
                {W: 100, H: 30},   {W: 200, H: 30}, {W: 110, H: 30}, {W: 110, H: 30}, {W: 500, H: 30}, {W: 500, H: 30},
                {W: 500, H: 30},   {W: 100, H: 30},  // scene 4
                {W: 500, H: 1305}, {W: 500, H: 30}], // Scene 5

    SOOT_NUM:  [2, 3,   // scene 1
                2, 3, 2, 2, 2, 2,
                4, 2,   // scene 4
                3, 4],  // Scene 5

    COIN_LOCATION: [{X: 100,  Y: 895},{X: 125,  Y: 895}, {X: 150,  Y: 895}, {X: 175, Y: 895},  {X: 200,  Y: 895}, {X: 225,  Y: 895},
                    {X: 250,  Y: 895},{X: 275,  Y: 895}, {X: 300,  Y: 895}, {X: 325,  Y: 895},                                          // scene 0
                    {X: 900,  Y: 500},{X: 1200, Y: 295}, {X: 1500, Y: 450}, {X: 2000, Y: 340}, {X: 2300, Y: 540}, {X: 1100, Y: 650},
                    {X: 1900, Y: 650},{X: 1400, Y: 900}, {X: 1550, Y: 900}, {X: 1700, Y: 900}, {X: 2100, Y: 900},                      // scene 1
                    {X: 2675, Y: 525},{X: 2800, Y: 390}, {X: 3400, Y: 520}, {X: 3600, Y: 330}, {X: 4050, Y: 540}, {X: 3800, Y: 650},
                    {X: 3000, Y: 650},{X: 3350, Y: 900}, {X: 3400, Y: 900}, {X: 3450, Y: 900}, {X: 4100, Y: 900},                      // scene 2
                    {X: 4360, Y: 60}, {X: 4772, Y: 215}, {X: 5305, Y: 50},  {X: 5810, Y: 70},  {X: 5255, Y: 650}, {X: 5440, Y: 650},
                    {X: 4621, Y: 895},{X: 4938, Y: 895}, {X: 4719, Y: 37},  {X: 5059, Y: 138},                                         // scene 3
                    {X: 6550, Y: 475},{X: 6750, Y: 150}, {X: 7075, Y: 240}, {X: 7175, Y: 550}, {X: 7475, Y: 350}, {X: 7975, Y: 640},
                    {X: 6500, Y: 895},{X: 7000, Y: 895}, {X: 7100, Y: 895}, {X: 7200, Y: 895},                                         // scene 4
                    {X: 8340, Y: 420},{X: 8480, Y: 285}, {X: 8620, Y: 420}, {X: 8760, Y: 285}, {X: 8900, Y: 420}, {X: 9040, Y: 285},   // Scene 5
                    {X: 9180, Y: 420},{X: 9320, Y: 285}, {X: 9460, Y: 420}, {X: 9600, Y: 285},
                    {X: 10610,Y: 895},{X: 10710,Y: 895}, {X: 10810,Y: 895}, {X: 10910,Y: 895}, {X: 11010,Y: 895}, {X: 11110,Y: 895},   // scene 6
                    {X: 11210,Y: 895},{X: 11310,Y: 895}, {X: 11410,Y: 895}, {X: 11510,Y: 895}
                ],

    NOFACE_SCALE: 0.5,
    NOFACE_LOCATION: [{X: 3200, Y: 100},  // scene 2
                      {X: 7000, Y: 0}, ], // scene 4

    RADISH_LOCATION: [{X: 840,  Y: 690}], //scene

    CHICK_LOCATION: [{X: 2402, Y: 785, MIN: 500,  MAX: 2402, SPEED: 2,  DIR:0},               // scene 1
                     {X: 2900, Y: 785, MIN: 2402, MAX: 4304,  SPEED: 0, DIR:0}, {X: 3800, Y: 785, MIN: 2402, MAX: 4304, SPEED: 0, DIR:0},               // scene 2
                     {X: 4780, Y: 785, MIN: 4304, MAX: 5255,  SPEED: 0, DIR:1}, {X: 5730, Y: 785, MIN: 5305, MAX: 6206, SPEED: 0, DIR:0},               // scene 3
                     {X: 6750, Y: 785, MIN: 6750, MAX: 7900,  SPEED: 0, DIR:0}, {X: 7500, Y: 785, MIN: 6750, MAX: 7900,  SPEED: 0, DIR:1},               // Scene 4
                     {X: 6250, Y: 785, MIN: 6250, MAX: 8100,  SPEED: 2, DIR:0}, {X: 8000, Y: 785, MIN: 6250, MAX: 8100,  SPEED: 2, DIR:1},
                     {X: 8900, Y: 785, DIR:1}, {X: 9912, Y: 785, MIN: 8400, MAX: 10000, SPEED: 0, DIR:1},               // Scene 5
                     {X: 9400, Y: 785, MIN: 9100, MAX: 10000, SPEED: 0, DIR:0}],

    /*    enter: frame 3,   crow drop: frame 4,       heat seeking crows:  frame 5*/
    YUBABA_INC: [4304, 6206, 8108, 10010], // x vals that trigger: entrance, crow drop, heat seeking crows, yubaba exit

    /*    frame:            1             3              */
    HAKU_LOCATION: [{X:500, Y:850, TEXT: 1},{X:5305, Y:575, TEXT: 2}, {X: 10056, Y:820, TEXT: 3}]
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


        this.loadLevelCount = -1;
        // sound
        this.mute = true;
        this.volume = 0.1;

        //Breath
        this.breathwidth = 100;
        this.loadLevel(this.level, this.title);

    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    updateAudio() {
        ASSET_MANAGER.muteAudio(this.mute);
        ASSET_MANAGER.adjustVolume(this.volume);
    };

    // create all entities for the Title Screen
    titleScreen() {

        let chickPlace = {x: 1200, y: 775, xneg: 500, xpos: 1200};
        let hakuPlace = {x: -750, y: 825};

        // Title Chihiro
        this.titlePlaque = new TitlePlaque(this.game);
        this.chihiro = new Player(this.game, CHIHIRO.TITLE_POSITION.X, CHIHIRO.TITLE_POSITION.Y);
        this.ground = new Ground(this.game, LEVEL.START_CANVAS.X, PARAMS.CANVAS_HEIGHT - BACKGROUND.GROUND.SIZE * BACKGROUND.GROUND.SCALE,
                                            PARAMS.CANVAS_WIDTH * LEVEL.FRAME_COUNT, BACKGROUND.GROUND.SCALE * BACKGROUND.GROUND.SIZE);
        this.background = new BackGround(this.game, LEVEL.START_CANVAS.X,  LEVEL.START_CANVAS.Y);
        this.railing = new Railing(this.game, LEVEL.RAILING_LOCATION.X, LEVEL.RAILING_LOCATION.Y, PARAMS.CANVAS_WIDTH * (LEVEL.FRAME_COUNT - 3),
                                    BACKGROUND.RAILING.SCALE * BACKGROUND.RAILING.SIZE);
        this.chick = new Chick(this.game, chickPlace.x, chickPlace.y, chickPlace.xneg, chickPlace.xpos);
        this.lamp = new Lamp(this.game, -950, 620, BACKGROUND.LAMP.SIZE * BACKGROUND.LAMP.SCALE.W);
        this.haku = new Haku(this.game, hakuPlace.x, hakuPlace.y);
        this.buttons = new TitleButtons(this.game);

        this.buttons.mute = true;
        this.mute = true;
        this.updateAudio();
    }

    loadLevel(level, title){
        this.title = title;
        this.level = level;

        this.clearEntities();
        this.titleScreen();

        if(!this.title){
            this.buttons.mute = LEVEL.START_MUTE;
            this.mute = LEVEL.START_MUTE;

            // Falling chihiro for game play
            this.chihiro = new Player(this.game, CHIHIRO.INITIAL_POSITION.X, CHIHIRO.INITIAL_POSITION.Y);

            // Background stuff
            //this.stonelamp = new StoneLamp(this.game, LEVEL.STONE_LAMP_LOCATION.X, LEVEL.STONE_LAMP_LOCATION.Y, BACKGROUND.STONE_LAMP.SIZE * BACKGROUND.STONE_LAMP.SCALE);
            this.railing = new Railing(this.game, LEVEL.RAILING_LOCATION.X, LEVEL.RAILING_LOCATION.Y, PARAMS.CANVAS_WIDTH * (LEVEL.FRAME_COUNT - 3),
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
            this.game.addEntity(this.railing);
            this.game.addEntity(this.ground);
            this.game.addEntity(this.titlePlaque);
            this.game.addEntity(this.buttons);
            this.game.addEntity(new Fireworks(this.game));
            this.game.addEntity(this.lamp);
            this.game.addEntity(this.chihiro);
            //this.game.addEntity(this.chick);
            // this.game.addEntity(this.haku);
        } else {
            this.bathhouse = new Bathhouse(this.game, LEVEL.BATHHOUSE.X,  LEVEL.BATHHOUSE.Y);
            this.game.addEntity(this.background);

            for (var i = 0; i < LEVEL.TREE.length; i++) {
                let tree = LEVEL.TREE[i];
                this.game.addEntity(new Tree(this.game, tree.X, tree.Y, tree.TYPE));
            }
            this.game.addEntity(this.railing);
            this.game.addEntity(this.bathhouse);
            this.game.addEntity(this.ground);

            for (var i = 0; i < LEVEL.PLATFORM_LOCATION.length; i++) {
                let platform = LEVEL.PLATFORM_LOCATION[i];
                this.game.addEntity(new Platform(this.game, platform.X, platform.Y, BACKGROUND.PLATFORM.SIZE * BACKGROUND.PLATFORM.SCALE, platform.TYPE));
            }

            for (var i = 0; i < LEVEL.CLOUD_PLATFORM_LOCATION.length; i++) {
                let cloud = LEVEL.CLOUD_PLATFORM_LOCATION[i];
                if(cloud.MIN != null && cloud.MAX != null && cloud.V != null){
                    this.game.addEntity(new CloudPlatform(this.game, cloud.X, cloud.Y, cloud.SIZE, cloud.MIN, cloud.MAX, cloud.V));
                }else
                    this.game.addEntity(new CloudPlatform(this.game, cloud.X, cloud.Y, cloud.SIZE));
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
                let start_dir = getRandomInteger(0,1);
                let sootArea= new Soot(gameEngine, LEVEL.SOOT_LOCATION[i].X, LEVEL.SOOT_LOCATION[i].Y, start_dir, LEVEL.SOOT_AREA[i].W, LEVEL.SOOT_AREA[i].H, LEVEL.SOOT_NUM[i]);
                this.game.addEntity(sootArea);
            }

            this.game.addEntity(new Yubaba(this.game, 0, 0, LEVEL.YUBABA_INC));

            for(var i=0; i < LEVEL.NOFACE_LOCATION.length; i++){
                let noFace = LEVEL.NOFACE_LOCATION[i];
                this.game.addEntity(new NoFace(this.game, noFace.X, noFace.Y, LEVEL.NOFACE_SCALE) );
            }

            for (var i = 0; i < LEVEL.COIN_LOCATION.length; i++) {
                let coin = LEVEL.COIN_LOCATION[i];
                this.game.addEntity(new Coins(this.game, coin.X, coin.Y));
            }

            for (var i = 0; i < LEVEL.CHICK_LOCATION.length; i++) {
                let chick = LEVEL.CHICK_LOCATION[i];
                if(chick.MIN == null || chick.MAX == null || chick.SPEED == null || chick.DIR == null){
                    if(chick.DIR == null){
                        this.game.addEntity(new Chick(this.game, chick.X, chick.Y));
                    }else{
                        this.game.addEntity(new Chick(this.game, chick.X, chick.Y, chick.DIR));
                    }
                }else{
                    this.game.addEntity(new Chick(this.game, chick.X, chick.Y, chick.DIR, chick.MIN, chick.MAX, chick.SPEED));
                }
            }

            for (var i = 0; i < LEVEL.RADISH_LOCATION.length; i++) {
                let radish = LEVEL.RADISH_LOCATION[i];
                this.game.addEntity(new Radish(this.game, radish.X, radish.Y));
            }

            this.game.addEntity(this.chihiro);

            for (var i = 0; i < LEVEL.HAKU_LOCATION.length; i++) {
                let haku = LEVEL.HAKU_LOCATION[i];
                this.game.addEntity(new Haku(this.game, haku.X, haku.Y, haku.TEXT));
            }

            this.game.addEntity(this.breathbar);
            this.game.addEntity(this.coinCounter);
            this.game.addEntity(new Fireworks(this.game));
            this.game.addEntity(new EndScreen(this.game, this.level, LEVEL.END_SCREEN.X, LEVEL.END_SCREEN.Y));
         
            this.game.addEntity(this.buttons);
        }
    };

    changeBreath() {
        this.breathbar.width = this.breathwidth;
    };

    update() {
/*maybe remove this?
        PARAMS.DEBUG = true;
        this.mute = true;
*/
        this.updateAudio();
        // canvas width = 400
        // blockwidth = 32 * 1 = 32
        // 200 -16 = 164
        if (this.title){
            if (this.chihiro.x > LEVEL.END_TITLE_CANVAS.X) {
                if(this.chihiro.x > LEVEL.END_TITLE_CANVAS.X) {
                    this.chihiro.x = LEVEL.END_TITLE_CANVAS.X;
                }
            }
        }

        if (this.title && this.game.click) {  // start button
            if (this.game.click && this.game.click.y > 700 && this.game.click.y < 750 && this.game.click.x > 815  && this.game.click.x < 1003) {
                this.title = false;
                this.loadLevel(1, this.title);
                this.loadLevelCount = this.loadLevelCount + 1;
                this.game.click = false;
            }
        }

        if (this.game.click) {
            // Debug
            if(this.game.click.y > 1040         && this.game.click.y < 1070     && this.game.mouse.x < 200 && this.game.mouse.x > 100 && PARAMS.DEBUG) {
                PARAMS.DEBUG = false;
                this.game.click = false;
            } else if (this.game.click.y > 1040 && this.game.click.y < 1070     && this.game.mouse.x < 200 && this.game.mouse.x > 100 && !PARAMS.DEBUG) {
                PARAMS.DEBUG = true;
                this.game.click = false;
            }
            // Mute
            if (this.game.click.y > 1040        && this.game.click.y < 1070     && this.game.mouse.x < 350 && this.game.mouse.x > 250 && this.buttons.mute) {
                this.buttons.mute = false;
                this.mute = true;
                this.updateAudio();
                this.game.click = false;
            } else if (this.game.click.y > 1040 && this.game.click.y < 1070     && this.game.mouse.x < 350 && this.game.mouse.x > 250 && !this.buttons.mute) {
                this.buttons.mute = true;
                this.mute=false;
                this.updateAudio();
                this.game.click = false;
            }

            // Volume
            if (this.game.click.y > 1000 && this.game.click.y < 1032 && this.game.mouse.x > 475  && this.game.mouse.x < 510) {
                if (this.volume <= 0.95){
                    this.volume += 0.05;
                }
                this.updateAudio();
                this.buttons.up = false;
                this.game.click = false;
            } else if (this.game.click.y > 1040 && this.game.click.y < 1072 && this.game.mouse.x > 475  && this.game.mouse.x < 510) {
                if (this.volume >= 0.05){
                    this.volume -= 0.05;
                }
                this.updateAudio();
                this.buttons.down = false;
                this.game.click = false;
            }
        }


        // if (!this.title && this.chihiro.dead && this.chihiro.removeFromWorld) {
        if (!this.title && this.chihiro.dead) {
            this.gameOver = true;
        } else {

        }

        let midPoint = PARAMS.CANVAS_WIDTH / 2 - CHIHIRO.SIZE * CHIHIRO.SCALE;



        // stop camera from moving (reach dead end on the left and right)
        if (this.chihiro.x < 0) {
            if (this.chihiro.x < LEVEL.START_CANVAS.X) {
                this.chihiro.x = LEVEL.START_CANVAS.X;
            }
        } else if (this.chihiro.x > LEVEL.END_CANVAS.X - midPoint - CHIHIRO.SIZE * CHIHIRO.SCALE - CHIHIRO.PADDING.X) {
            if (this.chihiro.x > LEVEL.END_CANVAS.X) {
                this.chihiro.x = LEVEL.END_CANVAS.X;
            }
        } else if (this.chihiro.winGame) {
            if (this.chihiro.x > LEVEL.END_CANVAS.X) {
                this.chihiro.x = LEVEL.END_CANVAS.X;
            }
        }else {
            this.x = this.chihiro.x - midPoint; // force centering
        }

        if (this.gameOver) {
            this.gameOver = false;
        }
        
        // PARAMS.DEBUG = document.getElementById("debug").checked;
    };

    draw(ctx) {
        ctx.font = PARAMS.BLOCKWIDTH / 2 + 'px "Press Start 2P"';

        if (PARAMS.DEBUG && !this.title && !this.chihiro.winGame) {
            ctx.strokeStyle = "White";
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
            ctx.fillText(bX, 170 * PARAMS.SCALE, 15 * PARAMS.SCALE);
            ctx.fillText(bY, 170 * PARAMS.SCALE, 30 * PARAMS.SCALE);

            // walk left
            ctx.strokeStyle = "Red";
            ctx.lineWidth = 1;
            ctx.strokeStyle = this.game.left ? "Red" : "White";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(35 * PARAMS.SCALE, 47 * PARAMS.SCALE, 20 * PARAMS.SCALE, 20 * PARAMS.SCALE);
            ctx.fillText("L", 42 * PARAMS.SCALE, 60 * PARAMS.SCALE);

            // walk right
            ctx.strokeStyle = this.game.right ? "Red" : "White";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(95 * PARAMS.SCALE, 47 * PARAMS.SCALE, 20 * PARAMS.SCALE, 20 * PARAMS.SCALE);
            ctx.fillText("R", 102 * PARAMS.SCALE, 60 * PARAMS.SCALE);

            // jump
            ctx.strokeStyle = this.game.up ? "Red" : "White";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(68 * PARAMS.SCALE, 16 * PARAMS.SCALE, 20 * PARAMS.SCALE, 20 * PARAMS.SCALE);
            ctx.fillText("U", 75 * PARAMS.SCALE, 30 * PARAMS.SCALE);

            // crouch
            ctx.strokeStyle = this.game.crouch ? "Red" : "White";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(68 * PARAMS.SCALE, 76 * PARAMS.SCALE, 20 * PARAMS.SCALE, 20 * PARAMS.SCALE);
            ctx.fillText("C", 75 * PARAMS.SCALE, 90 * PARAMS.SCALE);

            // run
            ctx.strokeStyle = this.game.run ? "Red" : "White";
            ctx.fillStyle = ctx.strokeStyle;
            ctx.strokeRect(7 * PARAMS.SCALE, 47 * PARAMS.SCALE, 20 * PARAMS.SCALE, 20 * PARAMS.SCALE);
            ctx.fillText("S", 13 * PARAMS.SCALE, 60 * PARAMS.SCALE);

            
        }


    };

}

