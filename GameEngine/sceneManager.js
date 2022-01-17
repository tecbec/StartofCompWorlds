class SceneManager {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.chihiro = new Player(this.game, 0, 178);
        this.ground = new Ground(gameEngine, 0, 242, 320);
        this.background = new BackGround(gameEngine, 0, 0, 0);
        this.water = new Water(gameEngine, 0, 165, 0);
        this.loadGame();
    };
    
    loadGame() {
        this.game.addEntity(this.background);
        this.game.addEntity(this.water);
        this.game.addEntity(this.chihiro);
        this.game.addEntity(this.ground);
        
    }

    update() {

    }

    draw(ctx) {

    }
}