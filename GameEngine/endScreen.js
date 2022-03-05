var END_SCREEN = {
    LOCATION: {X: 0, Y: 0, SIZE: 500, FRAME: 7, SPEED:0.2, PADDING:0, REVERSE: false, LOOP: true}
};

class EndScreen {
    constructor(game, level, x, y) {
        Object.assign(this, { game, level, x, y});
        this.elapsed = 0;
        this.fade = 1.5;

        this.elapsedTime = 0;
        this.elapsedStats = 0;
        this.minute = 0;
        this.stopTimer = false;

        this.font = new FontFace("Minecraft", 'url(./GameEngine/sprites/Minecraft.ttf) format("TrueType")');
        this.font.load().then(function(loadedFont) {
            document.fonts.add(loadedFont);
        }) 

        this.spritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/youwin_text.png");

        this.coin = new Animator (ASSET_MANAGER.getAsset("./GameEngine/sprites/coins.png"), 0, 0, 14, 14, 4, 0.2, 0, false, true );

        this.animator = new Animator(this.spritesheet, END_SCREEN.LOCATION.X, END_SCREEN.LOCATION.Y, END_SCREEN.LOCATION.SIZE, END_SCREEN.LOCATION.SIZE,
                                    END_SCREEN.LOCATION.FRAME, END_SCREEN.LOCATION.SPEED, END_SCREEN.LOCATION.PADDING, END_SCREEN.LOCATION.REVERSE, END_SCREEN.LOCATION.LOOP);
    };


    startTimer() {
        if (!this.stopTimer) {
            this.elapsedTime += this.game.clockTick; 
            if (Math.round(this.elapsedTime) == 60) {
                this.minute += this.elapsedTime / 60;
                this.elapsedTime = 0;
            }
        }
    }


    update() {
        if (this.game.camera.chihiro.endPosition && this.game.click && this.game.click.y < 800 && this.game.click.y > 700 && this.game.mouse.x > 300 && this.game.mouse.x < 600) {
            this.game.camera.loadLevel(1, this.game.camera.title);
            this.game.camera.loadLevelCount = 0;
            this.game.click = false;
        }
    };

    draw(ctx) { 
        ctx.font = "32px Minecraft";
        ctx.strokeStyle = '#f2f0ed';
        ctx.fillStyle = ctx.strokeStyle; 
        if (!this.game.camera.title && !this.game.camera.chihiro.winGame && this.game.camera.chihiro.x > 440) { // start timer 
            this.startTimer();
            if (Math.round(this.elapsedTime) < 10 && Math.round(this.minute) < 10) {
                ctx.fillText("0" + Math.round(this.minute) + ":" + "0" + Math.round(this.elapsedTime), PARAMS.CANVAS_WIDTH / 2 - 32, 32); //timer 
            } else if (Math.round(this.elapsedTime) >= 10 && Math.round(this.minute) < 10) {
                ctx.fillText("0" + Math.round(this.minute) + ":" + Math.round(this.elapsedTime), PARAMS.CANVAS_WIDTH / 2 - 32, 32); //timer 
            } else if (Math.round(this.elapsedTime) < 10 && Math.round(this.minute) >= 10) {
                ctx.fillText(Math.round(this.minute) + ":" + "0" +  Math.round(this.elapsedTime), PARAMS.CANVAS_WIDTH / 2 - 32, 32); //timer 
            } else if (Math.round(this.elapsedTime) >= 10 && Math.round(this.minute) >= 10) {
                ctx.fillText(Math.round(this.minute) + ":" + Math.round(this.elapsedTime), PARAMS.CANVAS_WIDTH / 2 - 32, 32); //timer 
            }
        } else {
            if (Math.round(this.elapsedTime) < 10 && Math.round(this.minute) < 10) {
                ctx.fillText("0" + Math.round(this.minute) + ":" + "0" + Math.round(this.elapsedTime), PARAMS.CANVAS_WIDTH / 2 - 32, 32); //timer 
            }
        }

        // display timer as stats

        if (this.game.camera.chihiro.winGame) { 
            this.stopTimer = true;   // stop timer
            this.elapsed += this.game.clockTick;
            this.fade -= this.game.clockTick;
            if (this.elapsed < 4) {
                ctx.fillStyle = "rgba(14,11,17," + this.fade + ")";
                ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT); 
            } 
            
            if (this.game.camera.chihiro.endPosition) {
                this.animator.drawFrame(this.game.clockTick, ctx, this.x - 60, this.y - 50, 1);

                ctx.font = "32px Minecraft";
                ctx.strokeStyle = '#bdb4a4';
                ctx.fillStyle = ctx.strokeStyle;

                
                // coin count 
                this.elapsedStats += this.game.clockTick;
                if (this.elapsedStats > 0.5) {
                       // death count 
                    ctx.fillText("Death: " + this.game.camera.loadLevelCount, 360, 490);  
                   
                }
                if (this.elapsedStats > 1) {
                    this.coin.drawFrame(this.game.clockTick, ctx, 395, 520, PARAMS.SCALE * 1);
                    ctx.fillText(": " + this.game.camera.coinCounter.coinCount, 447, 545); //timer 
                }
             
                if (this.elapsedStats > 1.5) {
                    if (Math.round(this.elapsedTime) < 10 && Math.round(this.minute) < 10) {
                        ctx.fillText("Time : " + "0" + Math.round(this.minute) + ":" + "0" + Math.round(this.elapsedTime), 360, 600); //timer 
                    } else if (Math.round(this.elapsedTime) >= 10 && Math.round(this.minute) < 10) {
                        ctx.fillText("Time : " +"0" + Math.round(this.minute) + ":" + Math.round(this.elapsedTime), 360, 600); //timer 
                    } else if (Math.round(this.elapsedTime) < 10 && Math.round(this.minute) >= 10) {
                        ctx.fillText("Time : " +Math.round(this.minute) + ":" + "0" +  Math.round(this.elapsedTime), 360, 600); //timer 
                    } else if (Math.round(this.elapsedTime) >= 10 && Math.round(this.minute) >= 10) {
                        ctx.fillText("Time : " +Math.round(this.minute) + ":" + Math.round(this.elapsedTime), 360, 600); //timer 
                    }
                }
                if (this.elapsedStats > 2) {
                    ctx.font = "48px Minecraft";
                    if (this.game.mouse && this.game.mouse.y < 800 && this.game.mouse.y > 700 && this.game.mouse.x > 300 && this.game.mouse.x < 600) {
                        // ctx.strokeStyle = '#bdb4a4';
                        // ctx.fillStyle = ctx.strokeStyle;
                        // ctx.fillText("Play again", 330, 805);
                    } else {
                        ctx.strokeStyle = '#470000';
                        ctx.fillStyle = ctx.strokeStyle;
                        ctx.fillText("Play again", 330, 805);
                    }
                 
                  
                    ctx.fillStyle = this.game.mouse && this.game.mouse.y < 800 && this.game.mouse.y > 700 && this.game.mouse.x > 300 && this.game.mouse.x < 600? "#ff7373" : "#bdb4a4";
                    ctx.fillText("Play again", 330, 800); 
    
                 
                }
              
                
            }
        }
    };
};


