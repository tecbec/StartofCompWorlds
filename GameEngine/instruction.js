class Instruction {
    constructor(game,x, y) {
        Object.assign(this, {game, x, y});

        this.leftPressed = false;
        this.leftHover = false;
        this.leftAvailable = false;

        this.rightPressed = false;
        this.rightHover = false;
        this.rightAvailable = true;

        this.leftbutton  = {x1: 756, x2: 772, y1: 825, y2: 865};
        this.rightbutton = {x1: 791, x2: 812, y1: 825, y2: 865}; 
        // 0 is story line
        this.count = 1;
    }

    update() {
        if (this.count >= 1) {
            this.leftAvailable = true;
        } else {
            this.leftAvailable = false;
        }

        if (this.game.mouse && this.game.mouse.x > this.leftbutton.x1 && this.game.mouse.x < this.leftbutton.x2 && this.game.mouse.y > this.leftbutton.y1 && this.game.mouse.y < this.leftbutton.y2) {
            if (this.game.click && this.game.click.x > this.leftbutton.x1 && this.game.click.x < this.leftbutton.x2 && this.game.click.y > this.leftbutton.y1 && this.game.click.y < this.leftbutton.y2 
                && this.leftAvailable && !this.leftPressed) {
                this.count -= 1;
                this.leftPressed = true;
            } else {
                this.leftPressed = false;
                this.game.click = false;
            }
            this.leftHover = true;
        } else {
            this.leftHover = false;
            
        }

        if (this.game.mouse && this.game.mouse.x > this.rightbutton.x1 && this.game.mouse.x < this.rightbutton.x2 && this.game.mouse.y > this.rightbutton.y1 && this.game.mouse.y < this.rightbutton.y2) {
            if (this.game.click && this.game.click.x > this.rightbutton.x1 && this.game.click.x < this.rightbutton.x2 && this.game.click.y > this.rightbutton.y1 && this.game.click.y < this.rightbutton.y2
                && this.rightAvailable && !this.rightPressed) {
                this.count += 1;
                this.rightPressed = true;
            } else {
                this.rightPressed = false;
                this.game.click = false;
            }
            this.rightHover = true;
        } else {
            this.rightHover = false;
        }

    };

    drawButton(ctx) {
        this.buttonspritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/buttonUI.png");
        if (this.leftAvailable && !this.leftHover) {
            ctx.drawImage(this.buttonspritesheet,
                0, 0, 32,  32,
                this.x - 70 + 800, this.leftbutton.y1 - 10,
                32 * 2, 32 * 2);
        } else if (!this.leftAvailable && (!this.leftHover || this.leftHover)) {
            ctx.drawImage(this.buttonspritesheet,
                0, 64, 32,  32,
                this.x - 70 + 800, this.leftbutton.y1 - 10,
                32 * 2, 32 * 2);
        } else if (this.leftAvailable && this.leftHover) {
            ctx.drawImage(this.buttonspritesheet,
                0, 32, 32,  32,
                this.x - 70 + 800, this.leftbutton.y1 - 10,
                32 * 2, 32 * 2);
        } 

        if (this.rightAvailable && !this.rightHover) {
            ctx.drawImage(this.buttonspritesheet,
                32, 0, 32,  32,
                this.x - 70 + 800 + 40, this.rightbutton.y1 - 10,
                32 * 2, 32 * 2);
        } else if (!this.rightAvailable && (!this.rightHover || this.rightHover)) {
            ctx.drawImage(this.buttonspritesheet,
                32, 64, 32,  32,
                this.x - 70 + 800 + 40, this.rightbutton.y1 - 10,
                32 * 2, 32 * 2);
        } else if (this.rightHover && this.rightAvailable) {
            ctx.drawImage(this.buttonspritesheet,
                32, 32, 32,  32,
                this.x - 70 + 800 + 40, this.rightbutton.y1 - 10,
                32 * 2, 32 * 2);
    }
        
        
}


    draw(ctx) {
        this.drawBackground(ctx);
        this.drawGround(ctx);
        this.drawRailing(ctx);
        this.drawHouse(ctx);
        this.drawButton(ctx);
       

        if (this.count == 0) {
            ctx.font = "64px Minecraft";
            ctx.strokeStyle = '#b30000';
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fillText("Description", 50, 405); 
            ctx.font = "64px Minecraft";
            ctx.strokeStyle = '#f2f0ed';
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fillText("Description", 50, 400); 
            ctx.font = "32px Minecraft";
            ctx.fillText("The game design is inspired by the movie \"Spirited Away\",", 50, 500); 
            ctx.fillText("written and directed by Hayao Miyazaki.", 50+10, 550);
            ctx.fillText("The user plays the role of Chihiro as she navigates through", 50, 600);
            ctx.fillText("the spiritual world.", 50+10, 650);
        }

        if (this.count == 1) {
            ctx.font = "64px Minecraft";
            ctx.strokeStyle = '#b30000';
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fillText("Objective", 50, 305); 
            ctx.font = "64px Minecraft";
            ctx.strokeStyle = '#f2f0ed';
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fillText("Objective", 50, 300); 
            ctx.font = "32px Minecraft";
            ctx.fillText("To win, Chihiro must cross the bridge and sneak into the", 50, 400); 
            ctx.fillText("spirit bathouse.", 50 + 10, 450); 
            ctx.fillText("To cross the bridge, Chihiro must hold her breath and", 50, 500);
            ctx.fillText("avoid the unfriendly spirits.", 50+10, 550);
            ctx.fillText("Any interaction with unfriendly spirits will cause her to", 50, 600);
            ctx.fillText("lose breath.", 50 + 10, 650);
            ctx.fillText("Chihiro will be caught by Yubaba if she run out of breath", 50, 700);
            ctx.fillText("and lose the game.", 50+10, 750);
        }
      
             
    };

    drawHouse(ctx) {
        this.housespritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/Bathhouse.png");
        this.treespritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/tree-sheet.png");
        // house and trees
        ctx.drawImage(this.treespritesheet,
            512, 0, 158,  268,
            this.x - 70 + 1000, 490 + 77,
            158 * 2, 268 * 2);

        ctx.drawImage(this.housespritesheet,
            BACKGROUND.BATHHOUSE.X, BACKGROUND.BATHHOUSE.Y,  BACKGROUND.BATHHOUSE.W,  BACKGROUND.BATHHOUSE.H,
            this.x + 1000, -40,
            BACKGROUND.BATHHOUSE.W, BACKGROUND.BATHHOUSE.H );

        ctx.drawImage(this.treespritesheet,
            BACKGROUND.TREE.X, BACKGROUND.TREE.Y,  BACKGROUND.TREE.W,  BACKGROUND.TREE.H,
            this.x + 400 + 1000, 650 + 88,
            BACKGROUND.TREE.W * 2, BACKGROUND.TREE.H * 2);

        ctx.drawImage(this.treespritesheet,
            1552, 0,  496,  160,
            this.x + 800 + 1000, 680 - 5,
            496 * 2, 160 * 2);
    }
    
    drawBackground(ctx) {
        this.bgspritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/background_nightsky.png");
        // background
        ctx.drawImage(this.bgspritesheet,
            BACKGROUND.X, BACKGROUND.Y,            
            BACKGROUND.SIZE.W, BACKGROUND.SIZE.H,   
            this.x, this.y, 
            PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);                     
        ctx.imageSmoothingEnabled = false;
    }

    drawGround(ctx) {
        this.bridgespritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/platform_sheet.png");
        // ground
        for (var i = 0; i < 30; i ++) {
            ctx.drawImage(this.bridgespritesheet, BACKGROUND.GROUND.X, BACKGROUND.GROUND.Y,
                BACKGROUND.GROUND.SIZE, BACKGROUND.GROUND.SIZE,
                this.x + BACKGROUND.GROUND.SIZE * BACKGROUND.GROUND.SCALE / PARAMS.SCALE * i, this.y + 1060,
                BACKGROUND.GROUND.SIZE * BACKGROUND.GROUND.SCALE / PARAMS.SCALE, BACKGROUND.GROUND.SIZE * 7 / PARAMS.SCALE);
        }
    }

    drawRailing(ctx) {
        this.railingspritesheet = this.spritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/railing.png");
        // railing
        for (var i = 0; i < 8; i++) {
            ctx.drawImage(this.spritesheet, BACKGROUND.RAILING.X, BACKGROUND.RAILING.Y,
                BACKGROUND.RAILING.SIZE, BACKGROUND.RAILING.SIZE,
                this.x + BACKGROUND.RAILING.SIZE * BACKGROUND.RAILING.SCALE / PARAMS.SCALE * i, this.y + 995,
                BACKGROUND.RAILING.SIZE * BACKGROUND.RAILING.SCALE / PARAMS.SCALE, BACKGROUND.RAILING.SIZE * BACKGROUND.RAILING.SCALE  / PARAMS.SCALE);
        }
    }

}