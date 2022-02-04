const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

// Queue spritesheets here
ASSET_MANAGER.queueDownload("./sprites/soot-jump-long_aura.png");
ASSET_MANAGER.queueDownload("./sprites/soot-jump-long_aura2_bidir.png");
ASSET_MANAGER.queueDownload("./sprites/spritesheet.png");
ASSET_MANAGER.queueDownload("./sprites/chihiro_spritesheet.png");
ASSET_MANAGER.queueDownload("./sprites/cloud.png");
ASSET_MANAGER.queueDownload("./sprites/stonelamp.png");
ASSET_MANAGER.queueDownload("./sprites/lamp.png");
ASSET_MANAGER.queueDownload("./sprites/railing.png");
ASSET_MANAGER.queueDownload("./sprites/platform_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/background.png");
// ASSET_MANAGER.queueDownload("./sprites/background-nightsky.png");
ASSET_MANAGER.queueDownload("./sprites/noface-spritesheet-fade-aura.png");
ASSET_MANAGER.queueDownload("./sprites/coins.png");
ASSET_MANAGER.queueDownload("./sprites/haku_spritesheet.png");
ASSET_MANAGER.queueDownload("./sprites/yubaba.png");
ASSET_MANAGER.queueDownload("./sprites/title.png");
ASSET_MANAGER.queueDownload("./sprites/chick.png");


// music
ASSET_MANAGER.queueDownload("./audio/OneSummersDay.mp3");

ASSET_MANAGER.downloadAll(() => {
	let canvas = document.getElementById("gameWorld");
	let ctx = canvas.getContext("2d");

	ASSET_MANAGER.autoRepeat("./audio/OneSummersDay.mp3");

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	//may need to change bitwidth or scale in Util
	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;
	gameEngine.init(ctx);
	gameEngine.addEntity(new SceneManager(gameEngine));
	gameEngine.start();
});
