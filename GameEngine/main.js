const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

// Queue spritesheets here 
// ASSET_MANAGER.queueDownload("./name.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);
	// add entity here to the gameengine
	// gameEngine.addEntity(new Character(gameEngine, 50, 50, ASSET_MANAGER.getAsset("./spritesheetbear.png")));
	gameEngine.start();
});
