const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

// Queue spritesheets here
//ASSET_MANAGER.queueDownload("./sprites/soot-jump-long_aura.png");
ASSET_MANAGER.queueDownload("./GameEngine/sprites/soot-jump-long_aura2_bidir.png");
ASSET_MANAGER.queueDownload("./GameEngine/sprites/spritesheet.png");
ASSET_MANAGER.queueDownload("./GameEngine/sprites/Chihiro_spritesheet.png");
ASSET_MANAGER.queueDownload("./GameEngine/sprites/cloud-Sheet.png");
ASSET_MANAGER.queueDownload("./GameEngine/sprites/tree-sheet.png");
ASSET_MANAGER.queueDownload("./GameEngine/sprites/stonelamp.png");
ASSET_MANAGER.queueDownload("./GameEngine/sprites/stonelampTop.png");
ASSET_MANAGER.queueDownload("./GameEngine/sprites/stonelampTop.png");
ASSET_MANAGER.queueDownload("./GameEngine/sprites/lamp.png");
ASSET_MANAGER.queueDownload("./GameEngine/sprites/flame.png");
ASSET_MANAGER.queueDownload("./GameEngine/sprites/railing.png");
ASSET_MANAGER.queueDownload("./GameEngine/sprites/platform_sheet.png");
ASSET_MANAGER.queueDownload("./GameEngine/sprites/Bathhouse.png");
ASSET_MANAGER.queueDownload("./GameEngine/sprites/background_nightsky.png");
ASSET_MANAGER.queueDownload("./GameEngine/sprites/noface-spritesheet-fade-aura.png");
ASSET_MANAGER.queueDownload("./GameEngine/sprites/Firework-animation.png");
ASSET_MANAGER.queueDownload("./GameEngine/sprites/coins.png");
ASSET_MANAGER.queueDownload("./GameEngine/sprites/portal.png");
ASSET_MANAGER.queueDownload("./GameEngine/sprites/haku_spritesheet.png");
ASSET_MANAGER.queueDownload("./GameEngine/sprites/yubaba.png");
ASSET_MANAGER.queueDownload("./GameEngine/sprites/title.png");
ASSET_MANAGER.queueDownload("./GameEngine/sprites/chick.png");
ASSET_MANAGER.queueDownload("./GameEngine/sprites/bubble.png");
ASSET_MANAGER.queueDownload("./GameEngine/sprites/haku_text.png");
ASSET_MANAGER.queueDownload("./GameEngine/sprites/youwin_text.png");
ASSET_MANAGER.queueDownload("./GameEngine/sprites/title-buttons.png");
ASSET_MANAGER.queueDownload("./GameEngine/sprites/volume.png");
ASSET_MANAGER.queueDownload("./GameEngine/sprites/frog.png");

// music
ASSET_MANAGER.queueDownload("./GameEngine/audio/OneSummersDay.mp3");

ASSET_MANAGER.downloadAll(() => {

	var canvas = document.getElementById("gameCanvas");
	var ctx = canvas.getContext("2d");
	ASSET_MANAGER.autoRepeat("./GameEngine/audio/OneSummersDay.mp3");

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

    //may need to change bitwidth or scale in Util
	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;
	gameEngine.init(ctx);
	gameEngine.addEntity(new SceneManager(gameEngine));
	gameEngine.start();
	// window.addEventListener('resize', resizeGame, false);
	// window.addEventListener('orientationchange', resizeGame, false);

});

// function resizeGame() {
//     var gameArea = document.getElementById('gameArea');
//     var widthToHeight = 16 / 9;
//     var newWidth = window.innerWidth;
//     var newHeight = window.innerHeight;
//     var newWidthToHeight = newWidth / newHeight;

//     if (newWidthToHeight > widthToHeight) {
//         newWidth = newHeight * widthToHeight;
//         gameArea.style.height = newHeight + 'px';
//         gameArea.style.width = newWidth + 'px';
//     } else {
//         newHeight = newWidth / widthToHeight;
//         gameArea.style.width = newWidth + 'px';
//         gameArea.style.height = newHeight + 'px';
//     }

// 	// gameArea.style.fontSize = (newWidth / 1920) + 'em';

//     gameArea.style.marginTop = (-newHeight / 2) + 'px';
//     gameArea.style.marginLeft = (-newWidth / 2) + 'px';

//     var gameCanvas = document.getElementById('gameCanvas');
//     gameCanvas.width = newWidth;
//     gameCanvas.height = newHeight;
// }

