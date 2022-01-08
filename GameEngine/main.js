const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

// Queue spritesheets here 
ASSET_MANAGER.queueDownload("./sprites/spritesheet_test.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);
	// add entity here to the gameengine
	// default x and y -> 50 50
	gameEngine.addEntity(new Player(gameEngine, 0, 178, ASSET_MANAGER.getAsset("./sprites/spritesheet_test.png")));
	gameEngine.start();
});
