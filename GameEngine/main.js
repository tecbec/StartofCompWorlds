const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

// Queue spritesheets here
ASSET_MANAGER.queueDownload("./sprites/soot-jump-long_aura.png");
ASSET_MANAGER.queueDownload("./sprites/soot-jump-long_aura2_bidir.png");
ASSET_MANAGER.queueDownload("./sprites/spritesheet.png");
ASSET_MANAGER.queueDownload("./sprites/platform_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/background.png");
ASSET_MANAGER.queueDownload("./sprites/water.png");
ASSET_MANAGER.queueDownload("./sprites/noface-spritesheet-fade.png");
ASSET_MANAGER.queueDownload("./sprites/spritesheet_test.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	//may need to change bitwidth or scale in Util
	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;
	gameEngine.init(ctx);
	gameEngine.addEntity(new SceneManager(gameEngine));
	gameEngine.start();
});
