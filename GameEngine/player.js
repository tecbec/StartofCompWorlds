/* The main character of the movie, Chihiro, will be the player of the game
*/
class Player {
    /* This constructor passes in the following paramters: 
    - game = game engine 
    - x, y = the location of the Player
    */
    constructor(game, x, y, spritesheet) {
        Object.assign(this, {game, x, y, spritesheet });

        this.game.player = this;     

        this.x = x;
        this.y = y;

        // Chihiro state variables
        this.facing = 0; // 0 = right; 1 = left
        this.state = 0; // 0 = idle, 1 = walking, 2 = jumping/falling, 

        // default values. 
        this.velocity = { x: 0, y: 0};
        this.fallAcc = 562.5;

        // NOTE: later on can be updated without the sprite sheet passed in the param. 
        this.updateBB();

        // Chihiro animations
        this.animations = [];
        this.loadAnimations();
        this.dead = false;
    };

    loadAnimations(spritesheet) {
        // initialize the arrays
        // array with [state] [face] of the same animator.
        for (var i = 0; i < 3; i++) {
            this.animations.push([]);
            for (var j = 0; j < 2; j++) {
                this.animations[i].push([]);
            }
        }

        // Create the Chihiro Animators
        // idle -> right, left
        this.animations[0][0] = new Animator (this.spritesheet, 0, 0, 32, 32, 4, 0.1, 0, false, true); 
        this.animations[0][1] = new Animator (this.spritesheet, 0, 32, 32, 32, 4, 0.1, 0, false, true); 
        
        // walk -> right, left
        this.animations[1][0] = new Animator (this.spritesheet, 0, 64, 32, 32, 6, 0.1, 0, false, true); 
        this.animations[1][1] = new Animator (this.spritesheet, 0, 96, 32, 32, 6, 0.1, 0, false, true); 

        // jump -> right, left 
        this.animations[2][0] = new Animator (this.spritesheet, 0, 128, 32, 32, 8, 0.1, 0, false, true); 
        this.animations[2][1] = new Animator (this.spritesheet, 0, 160, 32, 32, 8, 0.1, 0, false, true); 

    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
    };

    draw(ctx) {
        // draw with [state][face]   
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);

        // bounding box
        ctx.strokeStyle = 'Red';
        // ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
    };

    update() {
       /** Clock Tick variable */
        const TICK = this.game.clockTick;

        /** Velocity and acceleration constants  */
        const MIN_WALK = 200;
        const STOP_FALL = 1575;
        const STOP_FALL_A = 450;


        /**  */
        if (this.dead) {                        // if Chihiro is dead 

            // No code here yet.

        } else {                                // if Chihiro is NOT dead 

            if (this.state !== 2) { // when Chihiro not jumping 
                if (this.game.left && this.x > 0) {                     // when left key is pressed
                    this.velocity.x -= MIN_WALK * TICK; 
                } else if (this.game.right && this.x < 343) {           // when right key is pressed
                    this.velocity.x += MIN_WALK * TICK;        
                } else { 
                    this.velocity.x = 0;    
                }
                        
                this.velocity.y += this.velocity.y * TICK;
    
                if (this.game.up) { // jumping 
                    this.state = 2; 
                    // this.velocity.y = -240;
                    
                    this.velocity.y += this.fallAcc * TICK; // gravity

                    console.log(this.y);

                    /** THIS WILL GO AWAY AFTER WE ARE DONE WITH THE BOUNDING BOXES. */
                    if (this.y > 178) this.velocity.y = 0;   
                    if (this.y <= 170 && this.y > 160) this.velocity.y += (STOP_FALL - STOP_FALL_A) * TICK;
                }   
                // this.state = 0;
            } else {
                
            }

            console.log("*");

            this.updateBB();
            // update position
            this.x += this.velocity.x * TICK * 2; 
            this.y += this.velocity.y * TICK * 2;


            // update state
            if (this.state !== 2) {
                if (Math.abs(this.velocity.x) > 0) this.state = 1;  // walking
                else this.state = 0;                                // idle
            } else {
            
            }
             // update direction
             if (this.velocity.x < 0) this.facing = 1;
             if (this.velocity.x > 0) this.facing = 0;
        }

    };
};