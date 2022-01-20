class Ground {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/platform_sheet.png");
        this.BB = new BoundingBox(this.x, this.y, this.w, 64);
        
    };

    update() {

    };

    draw(ctx) {
        // TODO:can refactor this code
        // start piece
        ctx.drawImage(this.spritesheet, 0, 0, 32, 32, this.x, this.y, 64, 64);
        // middle piece
        ctx.drawImage(this.spritesheet, 32, 0, 32, 32, this.x + 64, this.y, 64, 64);
        ctx.drawImage(this.spritesheet, 32, 0, 32, 32, this.x + 64 * 2, this.y, 64, 64);
        ctx.drawImage(this.spritesheet, 32, 0, 32, 32, this.x + 64 * 3, this.y, 64, 64);
        // end piece
        ctx.drawImage(this.spritesheet, 64, 0, 32, 32, this.x + 64 * 4, this.y, 64, 64);
    
        // TODO:fix the bounding box measures
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);  
        
        // y = 242
        // chihiro 178 + 64
    };

};

class BackGround {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/background.png");      
    }
    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, 288, 208, this.x, this.y, PARAMS.CANVAS_WIDTH, 242);

    }
}

class Water {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/water.png");      
    }
    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0, 32, 32, this.x, this.y, PARAMS.CANVAS_WIDTH, 242);
    }
}

class Platform {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w});
        this.spritesheet = this.spritesheet = ASSET_MANAGER.getAsset("./sprites/platform_sheet.png");
        this.BB = new BoundingBox(this.x, this.y, 32 * 3, 32);
        this.topBB = new BoundingBox(this.x, this.y, 32*3, 32/2);
        this.bottomBB = new BoundingBox(this.x, this.y + 32/2, 32*3, 32/2);
        this.leftBB = new BoundingBox(this.x, this.y, 5, 32);
        this.rightBB = new BoundingBox(this.BB.right - 5, this.y, 5, 32);
    }

    update() {

    };

    draw(ctx) {
        // TODO:refactor this code
        ctx.drawImage(this.spritesheet, 0, 32, 16, 16, this.x, this.y, 32, 32);
        ctx.drawImage(this.spritesheet, 16, 32, 16, 16, this.x + 32, this.y, 32, 32);
        ctx.drawImage(this.spritesheet, 32, 32, 16, 16, this.x + 64, this.y, 32, 32);
        ctx.strokeStyle = 'Red';
        // the entire platform bb
        ctx.strokeRect(this.BB.x, this.BB.y, 32 * 3, 32);    
        // the left bb
        ctx.strokeStyle = 'Orange';
        ctx.strokeRect(this.topBB.x, this.topBB.y, this.topBB.width, this.topBB.height);  
        ctx.strokeRect(this.bottomBB.x, this.bottomBB.y, this.bottomBB.width, this.bottomBB.height);  
        ctx.strokeRect(this.leftBB.x, this.leftBB.y, this.leftBB.width, this.leftBB.height);  
        ctx.strokeRect(this.rightBB.x, this.rightBB.y, this.rightBB.width, this.rightBB.height);  
    }
}