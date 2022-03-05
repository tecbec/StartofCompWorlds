class Instruction {
    constructor(game,x, y) {
        Object.assign(this, {game, x, y});
        this.game.instructions = this;
        this.leftPressed = false;
        this.leftHover = false;
        this.leftAvailable = false;
        this.removeFromWorld = false;
        this.rightPressed = false;
        this.rightHover = false;
        this.rightAvailable = true;
        this.isGrounded = true;
        this.leftbutton  = {x1: 756, x2: 772, y1: 825, y2: 865};
        this.rightbutton = {x1: 791, x2: 812, y1: 825, y2: 865}; 
        this.jumpstate = 0;
        this.elapsedChickTime = 0;

        this.closebutton = {x1: 1861, x2: 1904, y1: 17, y2: 56};
        this.closePressed = false;
        this.closeHover = false;
        this.xjump= 250;
        this.yjump = 750;
        this.yvel = 0;
        this.xvel = 0;

        this.xwalk2 = 500;
        this.ywalk2 = 600;
        this.xwalkvel2 = 0;
        this.ywalkvel2 = 0;
        this.walkDemoState = 0;

        this.xwalk3 = 300;
        this.ywalk3 = 500;
        this.xwalkvel3 = 0;
        this.ywalkvel3 = 0;
        this.healingTimer = 0;

        this.xbubble = 610;
        this.ybubble = 420;
        this.xbubvel = 0;
        this.ybubvel = 0;

        this.xbubble1 = 700;
        this.ybubble1 = 420;
        this.xbubvel1 = 0;
        this.ybubvel1 = 0;

        this.xbubble2 = 440;
        this.ybubble2 = 575;
        this.xbubvel2 = 0;
        this.ybubvel2 = 0;

        this.xwalk = 256;
        this.xwalkvel = 0;
        this.walkstate = 0;

        this.xwalk1 = 256;
        this.xwalkvel1 = 0;
        this.walkstate1 = 0;

        this.xcrow = 300;
        this.ycrow = 400;
        this.xcrowvel = 0;
        this.ycrowvel = 0;
        this.crowstate = 0;
        
        this.jumpAnim = [];
        this.walkAnim = []; 
        this.crowAnim = [];
        
        this.loadAnim();
        this.buttonspritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/buttonUI.png");
        this.bubblespritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/bubble.png");
        this.portalspritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/portal.png");
        this.flagspritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/flag.png");
        this.flagAnim = new Animator (this.flagspritesheet,BACKGROUND.FLAG.X, BACKGROUND.FLAG.Y,  BACKGROUND.FLAG.W,  BACKGROUND.FLAG.H, BACKGROUND.FLAG.COUNT, 0.1, 0, false, true );
        this.blurValues = 50;
        this.blurVelocity = 0;
        this.introbar = new BreathBar(this.game, 370, 651, 50, 10);
        this.breathbardrawn = false;
        this.loadPortalFeatureAnim();
        this.loadButton();
        // 0 is story line
        this.count = 1;
        this.maxCount = 7;
    }

    update() {
        var BLUR_SPEED = 100;
        var BLUR_MAX = 50;
        if (this.blurValues >= 49) {
            this.blurVelocity += BLUR_SPEED;
            if (this.blurVelocity > BLUR_MAX)
                this.blurVelocity = BLUR_MAX;
        } else if (this.blurValues <= 10) {    
            this.blurVelocity -=  BLUR_SPEED;
            if (this.blurVelocity < -BLUR_MAX)   
                this.blurVelocity = -BLUR_MAX;
        } 
       
        this.blurValues -= this.blurVelocity * this.game.clockTick;
        if (this.count == 4 && !this.breathbardrawn) {
            this.game.addEntity(this.introbar);
            this.breathbardrawn = true;
        } else if (this.count != 4) {
            this.breathbardrawn = false;      
        }
        if (!this.removeFromWorld && this.closePressed) {
            this.game.camera.onInstructions = false;
            this.removeFromWorld = true;
            ASSET_MANAGER.pauseBackgroundMusic();
            this.game.introbar.removeFromWorld = true;
        }
        if (this.count >= 2) {
            this.leftAvailable = true;
        } else {
            this.leftAvailable = false;
        }
        if (this.count >= this.maxCount) {
            this.rightAvailable = false;
        } else {
            this.rightAvailable = true;
        }

        if (this.game.mouse && this.game.mouse.x > this.closebutton.x1 && this.game.mouse.x < this.closebutton.x2 && this.game.mouse.y > this.closebutton.y1 && this.game.mouse.y < this.closebutton.y2 || this.game.close) {
            if (this.game.click && this.game.click.x > this.closebutton.x1 && this.game.click.x < this.closebutton.x2 && this.game.click.y > this.closebutton.y1 && this.game.click.y < this.closebutton.y2 
                && !this.closePressed || (this.game.close && !this.game.deactivate && !this.closePressed)) {    
                this.game.deactivate = true;
                this.closePressed = true;
            } else {   
                this.closePressed = false;
                this.game.click = false;
            }
            this.closeHover = true;
        } else {
            this.closeHover = false;
            
        }

        if (this.game.mouse && this.game.mouse.x > this.leftbutton.x1 && this.game.mouse.x < this.leftbutton.x2 && this.game.mouse.y > this.leftbutton.y1 && this.game.mouse.y < this.leftbutton.y2 || this.game.left) {
            if (this.game.click && this.game.click.x > this.leftbutton.x1 && this.game.click.x < this.leftbutton.x2 && this.game.click.y > this.leftbutton.y1 && this.game.click.y < this.leftbutton.y2 
                && this.leftAvailable && !this.leftPressed || (this.game.left && !this.game.deactivate && this.leftAvailable && !this.leftPressed)) {    
                this.game.deactivate = true;
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

        if (this.game.mouse && this.game.mouse.x > this.rightbutton.x1 && this.game.mouse.x < this.rightbutton.x2 && this.game.mouse.y > this.rightbutton.y1 && this.game.mouse.y < this.rightbutton.y2 || this.game.right) {
            if (this.game.click && this.game.click.x > this.rightbutton.x1 && this.game.click.x < this.rightbutton.x2 && this.game.click.y > this.rightbutton.y1 && this.game.click.y < this.rightbutton.y2
                && this.rightAvailable && !this.rightPressed || (this.game.right && !this.game.deactivate && this.rightAvailable && !this.rightPressed)) {
                this.game.deactivate = true;
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

    drawLamps(ctx) {
        this.stonelampspritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/stonelamp.png");
        this.lampspritesheet = this.spritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/lamp.png");
        this.firespritesheet =  ASSET_MANAGER.getAsset("./GameEngine/sprites/flame.png");
       
      
        ctx.shadowColor = '#f57c00';
        ctx.shadowBlur = 8;
        ctx.drawImage(this.firespritesheet,0,0, 107,188, 0, 910, 107, 188);
        ctx.drawImage(this.firespritesheet,0,0, 107,188, 455, 910, 107, 188);
        ctx.shadowColor = "transparent"; // remove shadow !
        ctx.drawImage(this.stonelampspritesheet, 0, 0, 45, 142, 773, 910, 45*2, 142*2);
        ctx.drawImage(this.lampspritesheet,0,0, 107,188, 0, 910, 107, 188);
        ctx.drawImage(this.lampspritesheet,0,188, 107,188, 530, 910, 107, 188);
  
    }
    drawButton(ctx) {
        if (this.closeHover) {
            ctx.drawImage(this.buttonspritesheet,
                96, 0, 32,  32,
                1854, 5,
                32 * 2, 32 * 2);
        } else {
            ctx.drawImage(this.buttonspritesheet,
                64, 0, 32,  32,
                1854, 5,
                32 * 2, 32 * 2);
        }

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
        this.flagAnim.drawFrame(this.game.clockTick, ctx, 800, 0, 2);
       
        this.drawHouse(ctx);
        this.drawRailing(ctx);
        this.drawButton(ctx);
        this.drawLamps(ctx);
       
        ctx.font = "24px Minecraft";
        ctx.strokeStyle = '#bdb4a4';
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fillText(this.count + "/" + this.maxCount, 760, 900); 
      
        if (this.count == 1) {
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

        if (this.count == 2) {
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

        if (this.count == 3) {
            ctx.font = "64px Minecraft";
            ctx.strokeStyle = '#b30000';
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fillText("Controls", 50, 305); 
            ctx.strokeStyle = '#f2f0ed';
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fillText("Controls", 50, 300); 
            ctx.font = "32px Minecraft";
        
            this.idleRightAnim.drawFrame(this.game.clockTick, ctx, 44, 350, 2);
            this.idleLeftAnim.drawFrame(this.game.clockTick, ctx, 150, 350, 2);
            ctx.drawImage(this.buttonspritesheet, 68, 80, 17, 16, 100, 500, 17 * 2, 16 * 2);
            ctx.drawImage(this.buttonspritesheet, 68, 64, 17, 16, 200, 500, 17 * 2, 16 * 2);

            this.walkRightAnim.drawFrame(this.game.clockTick, ctx, 256, 350, 2);
            this.walkLeftAnim.drawFrame(this.game.clockTick, ctx, 362, 350, 2);

            this.leftButtonAnim.drawFrame(this.game.clockTick, ctx, 410, 500, 2);
            this.rightButtonAnim.drawFrame(this.game.clockTick, ctx, 310, 500, 2);
         
            this.crouchIdleRightAnim.drawFrame(this.game.clockTick, ctx, 44, 500, 2);
            this.crouchIdleLeftAnim.drawFrame(this.game.clockTick, ctx, 150, 500, 2);
            ctx.drawImage(this.buttonspritesheet, 68, 48, 17, 16, 80, 650, 17 * 2, 16 * 2);
            ctx.drawImage(this.buttonspritesheet, 68, 48, 17, 16, 185, 650, 17 * 2, 16 * 2);
            ctx.drawImage(this.buttonspritesheet, 68, 80, 17, 16, 115, 650, 17 * 2, 16 * 2);
            ctx.drawImage(this.buttonspritesheet, 68, 64, 17, 16, 220, 650, 17 * 2, 16 * 2);

            this.crouchRightAnim.drawFrame(this.game.clockTick, ctx, 256, 500, 2);
            this.crouchLeftAnim.drawFrame(this.game.clockTick, ctx, 362, 500, 2);

    
            this.downButtonAnim.drawFrame(this.game.clockTick, ctx, 290, 650, 2);
            this.rightButtonAnim.drawFrame(this.game.clockTick, ctx, 325, 650, 2);
            this.leftButtonAnim.drawFrame(this.game.clockTick, ctx, 395, 650, 2);
            this.downButtonAnim.drawFrame(this.game.clockTick, ctx, 430, 650, 2);

            // running

            this.walkAnim[0][this.walkDemoState].drawFrame(this.game.clockTick, ctx, this.xwalk2, this.ywalk2, 2);
            var MAX_RIGHT = 150;
            var MAX_LEFT = 150;
            var TICK = 2 * this.game.clockTick;
            if (this.xwalk2 <= 500) { // stops here
                this.xwalkvel2 -= MAX_LEFT;
                if (this.xwalkvel2 < -MAX_LEFT) {
                    this.xwalkvel2 = -MAX_LEFT;
                }
            } else if (this.xwalk2 >= 700) {
                this.xwalkvel2 += MAX_RIGHT;
                if (this.xwalkvel2 > MAX_RIGHT) {
                    this.xwalkvel2 = MAX_RIGHT ;
                }
            }
            if (this.xwalkvel2 > 0) {
                this.walkDemoState = 1;
            } else {
                this.walkDemoState = 0;
            }
            this.xwalk2 -= this.xwalkvel2 * TICK;
            this.rightButtonAnim.drawFrame(this.game.clockTick, ctx, 660, 750, 2);
            this.leftButtonAnim.drawFrame(this.game.clockTick, ctx, 700, 750, 2);
            this.shiftAnim.drawFrame(this.game.clockTick,ctx, 600, 750, 2);
            // falling and jumping
     
            this.jumpAnim[0][0].drawFrame(this.game.clockTick, ctx, 44, this.yjump, 2);
            this.jumpAnim[0][1].drawFrame(this.game.clockTick, ctx, 150, this.yjump, 2);

            var MAX_FALL = 250;
            var MAX_JUMP = 200;
            if (this.yjump > 750) { // stops here
                this.yvel -= MAX_JUMP * 2;
                if (this.yvel < -MAX_JUMP) {
                    this.yvel = -MAX_JUMP;
                }
            } else { 
                this.yvel += MAX_FALL * 2 * this.game.clockTick;
                if (this.yvel > MAX_FALL) {
                    this.yvel = MAX_FALL;
                }
            }
            this.yjump += this.yvel * this.game.clockTick * 2;
            this.upButtonAnim.drawFrame(this.game.clockTick,ctx, 80,900,2);
            this.upButtonAnim.drawFrame(this.game.clockTick,ctx, 180,900,2);
            ctx.drawImage(this.buttonspritesheet, 68, 80, 17, 16, 115, 900, 17 * 2, 16 * 2);
            ctx.drawImage(this.buttonspritesheet, 68, 64, 17, 16, 220, 900, 17 * 2, 16 * 2);



            this.jumpAnim[0][this.jumpstate].drawFrame(this.game.clockTick, ctx, this.xjump, this.yjump, 2);
            var MAX_RIGHT = 100;
            var MAX_LEFT = 150;
            if (this.xjump <= 250) { // stops here
                this.xvel -= MAX_RIGHT * 2;
                if (this.xvel < -MAX_RIGHT) {
                    this.xvel = -MAX_RIGHT;
                }
            } else if (this.xjump >= 350) {
                this.xvel += MAX_LEFT * 2 * this.game.clockTick;
                if (this.xvel > MAX_LEFT) {
                    this.xvel = MAX_LEFT;
                 
                }
            }
            if (this.xvel > 0) {
                this.jumpstate = 1;
            } else {
                this.jumpstate = 0;
            }
            this.xjump -= this.xvel * this.game.clockTick * 2;
            this.upButtonAnim.drawFrame(this.game.clockTick,ctx, 320,900,2);
            this.rightButtonAnim.drawFrame(this.game.clockTick, ctx, 360, 900, 2);
            this.leftButtonAnim.drawFrame(this.game.clockTick, ctx, 400, 900, 2);
            this.spaceBarAnim.drawFrame(this.game.clockTick, ctx, 545, 500, 2);
            ctx.drawImage(this.buttonspritesheet, 68, 80, 17, 16, 505, 500, 17 * 2, 16 * 2);
            this.bubbleAnim.drawFrame(this.game.clockTick, ctx, this.xbubble, this.ybubble ,1.5);
            var MAX_BUBFALL = 13.5;
            if (this.xbubble <= 700 && this.ybubble >= 380) {
                this.xbubvel -= MAX_RIGHT * 2;
                this.ybubvel += MAX_BUBFALL * 2;
                if (this.xbubvel < -MAX_RIGHT) {
                    this.xbubvel = -MAX_RIGHT;
                }
                if (this.ybubvel > MAX_BUBFALL) {
                    this.ybubvel = MAX_BUBFALL;
                }
            } else {
                this.xbubble = 610;
                this.ybubble = 420;
            }

            this.ybubble += this.ybubvel * this.game.clockTick * 2;
            this.xbubble -= this.xbubvel * this.game.clockTick * 2;
            this.idleRightAnim.drawFrame(this.game.clockTick, ctx, 500, 350, 2);


            this.spaceBarAnim.drawFrame(this.game.clockTick, ctx, 750, 500, 2);
            ctx.drawImage(this.buttonspritesheet, 68, 64, 17, 16, 710, 500, 17 * 2, 16 * 2);
            this.bubbleAnim.drawFrame(this.game.clockTick, ctx, this.xbubble1, this.ybubble1 ,1.5);

            if (this.xbubble1 >= 600 && this.ybubble1 >= 380) {
                this.xbubvel1 -= MAX_RIGHT * 2;
                this.ybubvel1 += MAX_BUBFALL * 2;
                if (this.xbubvel1 < MAX_RIGHT) {
                    this.xbubvel1 = MAX_RIGHT;
                }
                if (this.ybubvel1 > MAX_BUBFALL) {
                    this.ybubvel1 = MAX_BUBFALL;
                }
            } else {
                this.xbubble1 = 700;
                this.ybubble1 = 420;
            }
            this.ybubble1 += this.ybubvel1 * this.game.clockTick * 2;
            this.xbubble1 -= this.xbubvel1 * this.game.clockTick * 2;
            this.idleLeftAnim.drawFrame(this.game.clockTick, ctx, 700, 350, 2);
        }

        if (this.count == 4) {
         
            ctx.font = "64px Minecraft";
            ctx.strokeStyle = '#b30000';
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fillText("Features", 50, 355); 
            ctx.strokeStyle = '#f2f0ed';
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fillText("Features", 50, 350); 
            ctx.font = "32px Minecraft";

            ctx.fillText("Breath bar system", 270, 750);
            ctx.fillText("(decreases as Chihiro moves)", 185, 800);
            ctx.fillText("Chihiro will die if her breath reaches 0", 130, 850);  
          
            if (this.game.introbar.introWidth <= 0) {
                this.deadAnim.drawFrame(this.game.clockTick, ctx, 350, 500, 2);
            } else {
                this.walkAnim[0][this.walkstate].drawFrame(this.game.clockTick, ctx, this.xwalk, 500, 2);
                var MAX_RIGHT = 100;
                var MAX_LEFT = 100;
                var TICK = 2 * this.game.clockTick;
                if (this.xwalk <= 256) { // stops here
                    this.xwalkvel -= MAX_LEFT;
                    if (this.xwalkvel < -MAX_LEFT) {
                        this.xwalkvel = -MAX_LEFT;
                    }
                } else if (this.xwalk >= 400) {
                    this.xwalkvel += MAX_RIGHT;
                    if (this.xwalkvel > MAX_RIGHT) {
                        this.xwalkvel = MAX_RIGHT ;
                    }
                }
                if (this.xwalkvel > 0) {
                    this.walkstate = 1;
                } else {
                    this.walkstate = 0;
                }
                this.xwalk -= this.xwalkvel * TICK;
    
            }
        }

        if (this.count == 5) {
            ctx.font = "64px Minecraft";
            ctx.strokeStyle = '#b30000';
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fillText("Features", 50, 355); 
            ctx.strokeStyle = '#f2f0ed';
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fillText("Features", 50, 350); 
            ctx.font = "32px Minecraft";

            ctx.fillText("Walk through portals to receive a power up", 100, 750);
            ctx.fillText("(space bar to utilize)", 280, 800);  
            var MAX_LEFT = 80;
            var MAX_RIGHT = 100;
            if (this.xwalk1 <= 380) {
                this.portalAnim.drawFrame(this.game.clockTick, ctx, 392, 520, 3);
            }
            if (this.xwalk1 <= 450) {
                this.walkAnim[0][this.walkstate1].drawFrame(this.game.clockTick, ctx, this.xwalk1, 500, 2);
            } else {
                this.elapsedChickTime += this.game.clockTick;
                if (this.elapsedChickTime < 2) {
                    this.idleLeftAnim.drawFrame(this.game.clockTick, ctx, 430, 500, 2);
                    this.chickAnim.drawFrame(this.game.clockTick, ctx, 200, 450, 2);
                    var MAX_BUBFALL = 13.5;
                    this.bubbleAnim.drawFrame(this.game.clockTick, ctx, this.xbubble2, this.ybubble2, 1.5);
    
                    if (this.xbubble2 >= 300 && this.ybubble2 >= 480) {
                        this.xbubvel2 -= MAX_RIGHT * 2 * this.game.clockTick;
                        this.ybubvel2 += MAX_BUBFALL * 2  * this.game.clockTick;
                        if (this.xbubvel2 < MAX_RIGHT) {
                            this.xbubvel2 = MAX_RIGHT;
                        }
                        if (this.ybubvel2 > MAX_BUBFALL) {
                            this.ybubvel2 = MAX_BUBFALL;
                        }
                    } else {
                        this.xbubble2 = 440;
                        this.ybubble2 = 575;
                    }
                    this.ybubble2 += this.ybubvel2 * this.game.clockTick * 2;
                    this.xbubble2 -= this.xbubvel2 * this.game.clockTick * 2;
               } else {
                    this.victoryAnim.drawFrame(this.game.clockTick, ctx, 430, 500, 2);
               }
            }
            
            if (this.xwalk1 <= 256) { // stops here
                this.xwalkvel1 -= MAX_LEFT * 2;
                if (this.xwalkvel1 < -MAX_LEFT) {
                    this.xwalkvel1 = -MAX_LEFT;
                }
            } else if (this.xwalk1 >= 450) {
                this.xwalkvel1 = 0;
            }
            this.xwalk1 -= this.xwalkvel1 * this.game.clockTick * 2;

            // ctx.fillText("Aura's colors can distinguish evil and friendly spirits", 50, 650);
        } else {
            this.elapsedChickTime = 0;
            this.xwalk1 = 256;
            this.xwalkvel1 = 0;
        }

        if (this.count == 6) {
            ctx.font = "64px Minecraft";
            ctx.strokeStyle = '#b30000';
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fillText("Features", 50, 355); 
            ctx.strokeStyle = '#f2f0ed';
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fillText("Features", 50, 350); 
            ctx.font = "32px Minecraft";
            ctx.fillText("Crouch to dodge Yubaba's crow", 240, 750);
            ctx.fillText("(hold down arrow to utilize)", 280, 800);  
            this.crouchIdleRightAnim.drawFrame(this.game.clockTick, ctx, 400, 500, 2);
            this.crowAnim[0][this.crowstate].drawFrame(this.game.clockTick, ctx, this.xcrow, this.ycrow, 0.2);
            var MAX_RIGHT = 100;
            var MAX_LEFT = 100;
            var MAX_FALL = 200;
            var MAX_JUMP = 200;
            var TICK = 2 * this.game.clockTick;

            if (this.ycrow >= 440) { // stops here
                this.ycrowvel -= MAX_JUMP * TICK;
                if (this.ycrowvel < -MAX_JUMP) {
                    this.ycrowvel = -MAX_JUMP;
                }
            } else { 
                this.ycrowvel += MAX_FALL * TICK;
                if (this.ycrowvel > MAX_FALL) {
                    this.ycrowvel = MAX_FALL;
                }
            } 
        
            if (this.xcrow <= 400) { // stops here
                this.xcrowvel -= MAX_RIGHT * TICK;
                if (this.xcrowvel < -MAX_RIGHT) {
                    this.xcrowvel = -MAX_RIGHT;
                }
            } else if (this.xcrow >= 500) {
                this.xcrowvel += MAX_LEFT * TICK;
                if (this.xcrowvel > MAX_LEFT) {
                    this.xcrowvel = MAX_LEFT;
                 
                }
            } else {
                //this.xcrow = 300;
            }
            if (this.xcrowvel > 0) {
                this.crowstate = 1;
            } else {
                this.crowstate = 0;
            }
            this.ycrow += this.ycrowvel * this.game.clockTick * 2;
            this.xcrow -= this.xcrowvel * this.game.clockTick * 2;
        }
        if (this.count == 7) {
            ctx.font = "64px Minecraft";
            ctx.strokeStyle = '#b30000';
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fillText("Features", 50, 355); 
            ctx.strokeStyle = '#f2f0ed';
            ctx.fillStyle = ctx.strokeStyle;
            ctx.fillText("Features", 50, 350); 
            ctx.font = "32px Minecraft";
            ctx.fillText("Seek guidance and help from Haku", 240, 750);
            var MAX_LEFT = 80;
            var MAX_RIGHT = 100;
            if (this.xwalk3 <= 500) {
                this.walkRightAnim.drawFrame(this.game.clockTick, ctx, this.xwalk3, 500, 2);  
            } else {  
                this.healingTimer += this.game.clockTick;
                if (this.healingTimer < 2) {
                    var blurValues = 10;
                    ctx.shadowColor = '#e8eeaa';
                    ctx.shadowBlur = blurValues;
                    this.healAnim1.drawFrame(this.game.clockTick, ctx, 500 ,500 + 10, 2);
                
                    ctx.shadowBlur = blurValues;
                    this.idleLeftAnim.drawFrame(this.game.clockTick, ctx, 500, 500, 2);
                    ctx.shadowColor = "transparent"; // remove shadow !
            
                    ctx.shadowColor = '#e8eeaa';
                    ctx.shadowBlur = blurValues;
                    this.healAnim2.drawFrame(this.game.clockTick, ctx, 500, 500, 2);
                    this.healAnim3.drawFrame(this.game.clockTick, ctx, 500, 500, 2);
                    ctx.shadowColor = "transparent"; // remove shadow !
                    ctx.shadowColor = '#c0d470';
                    ctx.shadowBlur = 20;
                    this.healAnim4.drawFrame(this.game.clockTick, ctx, 500, 500,2);
                    ctx.shadowColor = "transparent";
                }
                this.idleLeftAnim.drawFrame(this.game.clockTick, ctx, 500, 500, 2);
            }
          
            if (this.xwalk3 <= 500) { // stops here
                this.xwalkvel3 -= MAX_LEFT * 2;
                if (this.xwalkvel3 < -MAX_LEFT) {
                    this.xwalkvel3 = -MAX_LEFT;
                }
            } else if (this.xwalk3 >= 500) {
                this.xwalkvel3 = 0;
            }
            this.xwalk3 -= this.xwalkvel3 * this.game.clockTick * 2; 


            this.hakuAnim.drawFrame(this.game.clockTick, ctx, 400, 500, 2);
        } else {
            this.healingTimer = 0;
            this.xwalk3 = 300;
            this.xwalkvel3 = 0;
        }
      
    };

    loadPortalFeatureAnim() {
        this.portalAnim = new Animator(this.portalspritesheet, 0, 0, 29, 30, 4, .1, 1, false, true);
    }

    loadButton() {
        this.upButtonAnim = new Animator(this.buttonspritesheet, 68, 32, 17, 16, 3, 0.5, 0, false, true);
        this.downButtonAnim = new Animator(this.buttonspritesheet, 68, 48, 17, 16, 3, 0.5, 0, false, true);
        this.leftButtonAnim =  new Animator(this.buttonspritesheet, 68, 64, 17, 16, 3, 0.5, 0, false, true);
        this.rightButtonAnim = new Animator(this.buttonspritesheet, 68, 80, 17, 16, 3, 0.5, 0, false, true);
        this.spaceBarAnim = new Animator(this.buttonspritesheet, 138, 16, 46, 16, 3, 0.5, 0, false, true);
        this.bubbleAnim = new Animator(this.bubblespritesheet, 0, 0, 20, 20, 5, 0.5, 0, false, true);
        this.shiftAnim = new Animator(this.buttonspritesheet, 135, 48, 27, 16, 3, 0.5, 0, false, true);
    }

    loadAnim() {
        this.chihirospritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/Chihiro_spritesheet.png");
        this.chickspritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/chick.png")
        this.crowspritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/yubaba.png");
        this.hakuspritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/haku_spritesheet.png");
        this.auraspritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/healing.png");
        for (var i = 0; i < 1; i++) {
            this.jumpAnim.push([]);
            for (var j = 0; j < 2; j++) {
                this.jumpAnim[i].push([]);
            }
        }
        for (var i = 0; i < 1; i++) {
            this.walkAnim.push([]);
            for (var j = 0; j < 2; j++) {
                this.walkAnim[i].push([]);
            }
        }

        for (var i = 0; i < 1; i++) {
            this.crowAnim.push([]);
            for (var j = 0; j < 2; j++) {
                this.crowAnim[i].push([]);
            }
        }
        this.healAnim1 = new Animator (this.auraspritesheet, CHIHIRO.HEALING.LAYER1.X, CHIHIRO.HEALING.LAYER1.Y,
            CHIHIRO.HEALING.W, CHIHIRO.HEALING.H,
            CHIHIRO.HEALING.FRAME, CHIHIRO.HEALING.SPEED,
            CHIHIRO.HEALING.PADDING, CHIHIRO.HEALING.REVERSE, CHIHIRO.HEALING.LOOP);

        this.healAnim2 = new Animator (this.auraspritesheet, CHIHIRO.HEALING.LAYER2.X, CHIHIRO.HEALING.LAYER2.Y,
            CHIHIRO.HEALING.W, CHIHIRO.HEALING.H,
            CHIHIRO.HEALING.FRAME, CHIHIRO.HEALING.SPEED,
            CHIHIRO.HEALING.PADDING, CHIHIRO.HEALING.REVERSE, CHIHIRO.HEALING.LOOP);

         this.healAnim3 = new Animator (this.auraspritesheet, CHIHIRO.HEALING.LAYER3.X, CHIHIRO.HEALING.LAYER3.Y,
            CHIHIRO.HEALING.W, CHIHIRO.HEALING.H,
            CHIHIRO.HEALING.FRAME, CHIHIRO.HEALING.SPEED,
            CHIHIRO.HEALING.PADDING, CHIHIRO.HEALING.REVERSE, CHIHIRO.HEALING.LOOP);

        this.healAnim4 = new Animator (this.auraspritesheet, CHIHIRO.HEALING.LAYER4.X, CHIHIRO.HEALING.LAYER4.Y,
            CHIHIRO.HEALING.W, CHIHIRO.HEALING.H,
            CHIHIRO.HEALING.FRAME, CHIHIRO.HEALING.SPEED,
            CHIHIRO.HEALING.PADDING, CHIHIRO.HEALING.REVERSE, CHIHIRO.HEALING.LOOP);

        this.hakuAnim = new Animator(this.hakuspritesheet, HAKU.IDLE.RIGHT.X, HAKU.IDLE.RIGHT.Y,
            HAKU.SIZE, HAKU.SIZE,
            HAKU.IDLE.FRAME, HAKU.IDLE.SPEED,
            HAKU.IDLE.PADDING, HAKU.IDLE.REVERSE, HAKU.IDLE.LOOP);
        this.crowAnim[0][0] = new Animator (this.crowspritesheet, 0, 0, 278, 230, 14, 0.15, 0, false, true);
        this.crowAnim[0][1] = new Animator (this.crowspritesheet, 0, 230, 278, 230, 14, 0.15, 0, false, true);
        this.chickAnim = new Animator(this.chickspritesheet, 
            0, 0, 
            75, 100, 
            6, 0.2, 
            0, false, true);


        this.victoryAnim = new Animator (this.chihirospritesheet, CHIHIRO.VICTORY_DANCE.LEFT.X, CHIHIRO.VICTORY_DANCE.LEFT.Y,
            CHIHIRO.SIZE, CHIHIRO.SIZE,
            CHIHIRO.VICTORY_DANCE.FRAME, CHIHIRO.VICTORY_DANCE.SPEED,
            CHIHIRO.VICTORY_DANCE.PADDING, CHIHIRO.VICTORY_DANCE.REVERSE, CHIHIRO.VICTORY_DANCE.LOOP);
        // dead -> right
        this.deadAnim= new Animator(this.chihirospritesheet, CHIHIRO.DEAD.RIGHT.X, CHIHIRO.DEAD.RIGHT.Y,
            CHIHIRO.SIZE, CHIHIRO.SIZE,
            CHIHIRO.DEAD.FRAME, 0.5,
            CHIHIRO.DEAD.PADDING, CHIHIRO.DEAD.REVERSE, true);

        this.idleRightAnim = new Animator(this.chihirospritesheet, CHIHIRO.IDLE.RIGHT.X, CHIHIRO.IDLE.RIGHT.Y,
            CHIHIRO.SIZE, CHIHIRO.SIZE,
            CHIHIRO.IDLE.FRAME, CHIHIRO.IDLE.SPEED,
            CHIHIRO.IDLE.PADDING, CHIHIRO.IDLE.REVERSE, CHIHIRO.IDLE.LOOP);

        this.idleLeftAnim = new Animator(this.chihirospritesheet,  CHIHIRO.IDLE.LEFT.X, CHIHIRO.IDLE.LEFT.Y,
            CHIHIRO.SIZE, CHIHIRO.SIZE,
            CHIHIRO.IDLE.FRAME, CHIHIRO.IDLE.SPEED,
            CHIHIRO.IDLE.PADDING, CHIHIRO.IDLE.REVERSE, CHIHIRO.IDLE.LOOP);
    
        this.walkRightAnim = new Animator (this.chihirospritesheet, CHIHIRO.WALK.RIGHT.X, CHIHIRO.WALK.RIGHT.Y,
            CHIHIRO.SIZE, CHIHIRO.SIZE,
            CHIHIRO.WALK.FRAME, CHIHIRO.WALK.SPEED,
            CHIHIRO.WALK.PADDING, CHIHIRO.WALK.REVERSE, CHIHIRO.WALK.LOOP);

        this.walkLeftAnim = new Animator (this.chihirospritesheet, CHIHIRO.WALK.LEFT.X, CHIHIRO.WALK.LEFT.Y,
            CHIHIRO.SIZE, CHIHIRO.SIZE,
            CHIHIRO.WALK.FRAME, CHIHIRO.WALK.SPEED,
            CHIHIRO.WALK.PADDING, CHIHIRO.WALK.REVERSE, CHIHIRO.WALK.LOOP);

        this.walkAnim[0][1] = new Animator (this.chihirospritesheet, CHIHIRO.WALK.LEFT.X, CHIHIRO.WALK.LEFT.Y,
            CHIHIRO.SIZE, CHIHIRO.SIZE,
            CHIHIRO.WALK.FRAME, CHIHIRO.WALK.SPEED,
            CHIHIRO.WALK.PADDING, CHIHIRO.WALK.REVERSE, CHIHIRO.WALK.LOOP);

        this.walkAnim[0][0] = new Animator (this.chihirospritesheet, CHIHIRO.WALK.RIGHT.X, CHIHIRO.WALK.RIGHT.Y,
            CHIHIRO.SIZE, CHIHIRO.SIZE,
            CHIHIRO.WALK.FRAME, CHIHIRO.WALK.SPEED,
            CHIHIRO.WALK.PADDING, CHIHIRO.WALK.REVERSE, CHIHIRO.WALK.LOOP);

        this.jumpAnim[0][1] = new Animator (this.chihirospritesheet, CHIHIRO.JUMP.LEFT.X, CHIHIRO.JUMP.LEFT.Y,
            CHIHIRO.SIZE, CHIHIRO.SIZE,
            CHIHIRO.JUMP.FRAME, CHIHIRO.JUMP.SPEED,
            CHIHIRO.JUMP.PADDING, CHIHIRO.JUMP.REVERSE, CHIHIRO.JUMP.LOOP);

        this.jumpAnim[0][0] = new Animator (this.chihirospritesheet, CHIHIRO.JUMP.RIGHT.X, CHIHIRO.JUMP.RIGHT.Y,
            CHIHIRO.SIZE, CHIHIRO.SIZE,
            CHIHIRO.JUMP.FRAME, CHIHIRO.JUMP.SPEED,
            CHIHIRO.JUMP.PADDING, CHIHIRO.JUMP.REVERSE, CHIHIRO.JUMP.LOOP); 

        this.crouchIdleLeftAnim =  new Animator (this.chihirospritesheet, CHIHIRO.CROUCH.LEFT.X, CHIHIRO.CROUCH.LEFT.Y,
            CHIHIRO.SIZE, CHIHIRO.SIZE,
            CHIHIRO.CROUCH.FRAME, CHIHIRO.CROUCH.SPEED,
            CHIHIRO.CROUCH.PADDING, CHIHIRO.CROUCH.REVERSE, CHIHIRO.CROUCH.LOOP);

        this.crouchIdleRightAnim =  new Animator (this.chihirospritesheet, CHIHIRO.CROUCH.RIGHT.X, CHIHIRO.CROUCH.RIGHT.Y,
            CHIHIRO.SIZE, CHIHIRO.SIZE,
            CHIHIRO.CROUCH.FRAME, CHIHIRO.CROUCH.SPEED,
            CHIHIRO.CROUCH.PADDING, CHIHIRO.CROUCH.REVERSE, CHIHIRO.CROUCH.LOOP);

        this.crouchLeftAnim = new Animator (this.chihirospritesheet, CHIHIRO.CROUCH_WALK.LEFT.X, CHIHIRO.CROUCH_WALK.LEFT.Y,
            CHIHIRO.SIZE, CHIHIRO.SIZE,
            CHIHIRO.CROUCH_WALK.FRAME, CHIHIRO.CROUCH_WALK.SPEED,
            CHIHIRO.CROUCH_WALK.PADDING, CHIHIRO.CROUCH_WALK.REVERSE, CHIHIRO.CROUCH_WALK.LOOP);
            
        this.crouchRightAnim = new Animator (this.chihirospritesheet, CHIHIRO.CROUCH_WALK.RIGHT.X, CHIHIRO.CROUCH_WALK.RIGHT.Y,
            CHIHIRO.SIZE, CHIHIRO.SIZE,
            CHIHIRO.CROUCH_WALK.FRAME, CHIHIRO.CROUCH_WALK.SPEED,
            CHIHIRO.CROUCH_WALK.PADDING, CHIHIRO.CROUCH_WALK.REVERSE, CHIHIRO.CROUCH_WALK.LOOP);

    }
    
    drawHouse(ctx) {
        this.housespritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/Bathhouse.png");
        this.treespritesheet = ASSET_MANAGER.getAsset("./GameEngine/sprites/tree-sheet.png");
        // house and trees
        ctx.drawImage(this.treespritesheet,
            512, 0, 158,  268,
            this.x - 70 + 1000, 490 + 77,
            158 * 2, 268 * 2);


        ctx.shadowColor = '#fee781';
        ctx.shadowBlur = this.blurValues 
           
        ctx.drawImage(this.housespritesheet,
            BACKGROUND.BATHHOUSE.X, BACKGROUND.BATHHOUSE.Y,  BACKGROUND.BATHHOUSE.W,  BACKGROUND.BATHHOUSE.H,
            this.x + 1000, -40,
            BACKGROUND.BATHHOUSE.W, BACKGROUND.BATHHOUSE.H );
            ctx.shadowColor = "transparent"; // remove shadow !
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