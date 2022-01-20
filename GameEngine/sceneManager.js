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
        this.platform = new Platform(gameEngine, 100, 240, 32); 
        this.platform1 = new Platform(gameEngine, 200, 150, 32); 
        this.soots = new Soot(gameEngine, 0, 0);
        this.loadGame();
    };
    
    loadGame() {
        this.game.addEntity(this.background);
        this.game.addEntity(this.chihiro);
        this.game.addEntity(this.ground);
        this.game.addEntity(this.platform);
        this.game.addEntity(this.platform1);
        // this.game.addEntity(this.soots);
    }

    update() {

    }

    draw(ctx) {

    }
}