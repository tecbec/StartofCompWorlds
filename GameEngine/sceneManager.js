class SceneManager {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.chihiro = new Player(this.game, 0, 0);
        // x, y, w
        this.ground = new Ground(gameEngine, 0, 242, 320);
        this.background = new BackGround(gameEngine, 0, 0);
        this.water = new Water(gameEngine, 0, 165);
        this.platform = new Platform(gameEngine, 100, 140, 32);
        this.platform2 = new Platform(gameEngine, 200, 50, 32);
        //this.soots = new Soot(gameEngine, 0, 0);
        this.noface = new NoFace(gameEngine, 0, 0);
        this.loadGame();
    };

    loadGame() {
        this.game.addEntity(this.background);
        this.game.addEntity(this.water);
        this.game.addEntity(this.chihiro);
        this.game.addEntity(this.ground);
        this.game.addEntity(this.platform);
        this.game.addEntity(this.platform2);
        //this.game.addEntity(this.soots);
        this.game.addEntity(this.noface);
    }

    update() {

    }

    draw(ctx) {

    }
}