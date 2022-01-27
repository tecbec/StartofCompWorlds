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

        this.left = false;
        this.right = false;
        this.up = false;
        this.mouse = false;
        this.click = false;

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
            }
        }, false);
        // Key released
        this.ctx.canvas.addEventListener("keyup", function (e) {
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
            }
        }, false);

    };

    addEntity(entity) {
        this.entitiesToAdd.push(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        //this.ctx.fillStyle = 'red';
        //this.ctx.fillRect(0,0,20,20);
        // Draw latest things first
        this.ctx.save();
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx);
        }

        // Need this to update when the camera is deleted from the work when a new level is entered.
        this.camera.draw(this.ctx);
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
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
        // if want one input to only trigger once 
        // this.up = false;

        // this.click = null;
    };

    get["deltaTime"]() { return this.clockTick; }
};

// KV Le was here :)