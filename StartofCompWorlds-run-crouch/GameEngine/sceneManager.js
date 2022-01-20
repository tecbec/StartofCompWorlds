class SceneManager {
    constructor(game){
        this.game = game; 
        // ctx = ctx;
    };

    update(){
         PARAMS.DEBUG = document.getElementById("debug").checked;
    };

    draw(ctx){
         ctx.font = PARAMS.BLOCKWIDTH / 2 + 'px "Press Start 2P"';
        if(PARAMS.DEBUG){
            //capturing the velocity displaying useful variables   
           // let xV = "xV=" + Math.floor(this.game.velocity.x); 
           // let yV = "yV=" + Math.floor(this.game.velocity.y);
         // ctx.fillText(xV, 1.5 * PARAMS.BLOCKWIDTH, 2.5 * PARAMS.BLOCKWIDTH);
             //ctx.translate(0, 10);
             ctx.strokeStyle = "Red"; //walk left
             ctx.lineWidth = 2; 
             ctx.strokeStyle = this.game.left ? "Red" : "Black";
             ctx.fillStyle = ctx.strokeStyle;
             ctx.strokeRect(40, 40, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
             ctx.fillText("L", 42, 60);

             ctx.strokeStyle = "Red";//run left
             ctx.lineWidth = 2; 
             ctx.strokeStyle = this.game.runL ? "Red" : "Black";
             ctx.fillStyle = ctx.strokeStyle;
             ctx.strokeRect(10, 40, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
             ctx.fillText("r", 13, 60);

             ctx.strokeStyle = "Red";
             ctx.lineWidth = 2; 
             ctx.strokeStyle = this.game.right ? "Red" : "Black";
             ctx.fillStyle = ctx.strokeStyle;
             ctx.strokeRect(100, 40, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
             ctx.fillText("R", 102, 60);

             ctx.strokeStyle = "Red"; //run right
             ctx.lineWidth = 2; 
             ctx.strokeStyle = this.game.runR ? "Red" : "Black";
             ctx.fillStyle = ctx.strokeStyle;
             ctx.strokeRect(140, 40, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
             ctx.fillText("r", 142, 60);

             ctx.strokeStyle = "Red";
             ctx.lineWidth = 2; 
             ctx.strokeStyle = this.game.up ? "Red" : "Black";
             ctx.fillStyle = ctx.strokeStyle;
             ctx.strokeRect(70, 5, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
             ctx.fillText("U", 75, 30);

             ctx.strokeStyle = "Red";
             ctx.lineWidth = 2; 
             ctx.strokeStyle = this.game.crouch ? "Red" : "Black";
             ctx.fillStyle = ctx.strokeStyle;
             ctx.strokeRect(70, 70, 0.5 * PARAMS.BLOCKWIDTH + 2, 0.5 * PARAMS.BLOCKWIDTH + 2);
             ctx.fillText("C", 75, 90);


        }
        
    };
}