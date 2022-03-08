// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Context dimensions
        this.surfaceWidth = null;
        this.surfaceHeight = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];
        // Entities to be added at the end of each update
        this.entitiesToAdd = [];
        this.crouch = false;
        this.jump = false;
        this.left = false;
        this.right = false;
        this.up = false;
        this.mouse = false;
        this.click = false;

        this.deactivate = false;    // use for pausing the key press

        // Options and the Details
        this.options = options || {
            prevent: {
                contextMenu: true,
                scrolling: true,
            },
            debugging: false,
        };

    };

    init(ctx) {
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            if (this.running) {
                requestAnimFrame(gameLoop, this.ctx.canvas);
            }
        };
        gameLoop();
    };

    startInput() {
        var that = this; 
 
        // From Mario Bros
        var getXandY = function (e) {
            var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
            var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;
            return { x: x, y: y, radius: 0 };
        }

        // From Mario Bros
        this.ctx.canvas.addEventListener("mousemove", function (e) {
            that.mouse = getXandY(e);
        }, false);

        // From Mario Bros
        this.ctx.canvas.addEventListener("click", function (e) {
            that.click = getXandY(e);
            console.log(that.click);       // USED FOR TROUBLESHOOTING THE PLACEMENT OF THE PLATFORMS
        }, false);

        // Key pressed 
        this.ctx.canvas.addEventListener("keydown", function (e) {

            switch(e.code) {
                case "ArrowLeft":
                    that.left = true;
                    break;
                case "ArrowRight":
                    that.right = true;
                    break;
                case "ArrowUp":
                    that.up = true;
                    break;
                case "ShiftLeft": //run 
                    that.run = true;
                    break;
                case "ArrowDown": //crouching 
                    that.crouch = true; 
                    break;
                case "Space": //shoot would be cool to have the player change the arrow direction with the mouse
                    that.shoot = true; 
                    break;
                case "Escape":
                    that.close = true;
                    break;
                case "Enter":
                    that.entered = true;
                    break;
            }
        }, false);
        // Key released
        this.ctx.canvas.addEventListener("keyup", function (e) {
            that.deactivate = false;
            switch(e.code) {
                case "ArrowLeft":
                    that.left = false;
                    break;
                case "ArrowRight":
                    that.right = false;
                    break;
                case "ArrowUp":
                    that.up = false;
                    break;
                case "ShiftLeft":
                    that.run = false;
                    break;
                case "ArrowDown":
                    that.crouch = false; 
                    break;
                case "Space": //shoot 
                    that.shoot = false; 
                    break;
                case "Escape":
                    that.close = false;
                    break;
                case "Enter":
                    that.entered = false;
                    break;
            }
        }, false);

    };

    
    addEntity(entity) {
        this.entitiesToAdd.push(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx);
        }

        // draw chihiro here. 
        this.camera.draw(this.ctx);

        // Need this to update when the camera is deleted from the work when a new level is entered.
        this.camera.draw(this.ctx);

        //can draw chihiro twice 
    };

    update() {
        
        // Update Entities
        this.entities.forEach(entity => entity.update(this));

        // Remove dead things
        this.entities = this.entities.filter(entity => !entity.removeFromWorld);

        // Need this so camera will move with change in levels.
        this.camera.update();

        // Add new things
        this.entities = this.entities.concat(this.entitiesToAdd);
        this.entitiesToAdd = [];

        let chihiroX = 0;
        //Player radius updates only
        for (let i = this.entities.length - 1; i >= 0; i--) {
            if (this.entities[i] instanceof Player){
                chihiroX = this.entities[i].x;
            }
        }

        let updatedThisTic = this.clockTick;

        //Player radius updates only

        for (let i = this.entities.length - 1; i >= 0; i--) {
            if (  !(this.entities[i] instanceof Player) && (getDistance(this.entities[i], this.player) < 700 ||
                                // this.entities[i] instanceof Water || this.entities[i] instanceof Spike ||
                                 this.entities[i] instanceof SceneManager) ) {
    
                //if the player exists update things close to the player
                let entity = this.entities[i];
                 if ((entity instanceof Yubaba)){
                    break;
                } else if (!entity.removeFromWorld ) {
                    entity.update();
                    updatedThisTic++;
                }
            } 
             if ((!this.player) ) {
                //if no player update everythign so we dont crash
                let entity = this.entities[i];
                if ((entity instanceof Yubaba)){
                    break;
                } else if (!entity.removeFromWorld) {
                    entity.update();
                    updatedThisTic++;
                }
            } 
            else if (this.entities[i] instanceof Ground) {
                if (
                //Ground is a large tile so we need to make sure it is fully out of frame
                    //before wse stop updating it
                    getDistance(this.entities[i], this.player) <
                    Math.max(
                    this.entities[i].horizontal * 64,
                    this.entities[i].vertical * 64
                    ) +
                    this.cullingOffset
                ) {
                    let entity = this.entities[i];
                     if ((entity instanceof Yubaba)){
                        entity.update();
                        updatedThisTic++;
                    }
                    else if (!entity.removeFromWorld) {
                        entity.update();
                        updatedThisTic++;
                    }
                }
            }
        
        }
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();

    };

    get["deltaTime"]() { return this.clockTick; }
};
