/*
    This class is used to animate.
*/
class Animator {
    /* This constructor passes in the following parameters:
       - spritesheet : the image sheet
       - xStart, yStart: the starting position x, y of the image on the image sheet
       - width, height: how tall/wide the image going to be e.g. 32x32 pixels
       - frameCount : how many frames there is to loop
       - frameDuration: how long is the rotation to each frame
       - framePadding: any extra padding to the image
       - reverse: if the animation needed to be reverse (true/false)
       - loop: if the animation needed to be looped (true/false)
    */
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, framePadding, reverse, loop) {
        Object.assign(this, { spritesheet, xStart, yStart, height, width, frameCount, frameDuration, framePadding, reverse, loop });

        this.elapsedTime = 0;
        this.totalTime = this.frameCount * this.frameDuration;

    };

    /* This method draw the image on the current frame.
    - tick - the time
    - ctx - the canvas
    - x,y = destination x and y
    - scaling for x and y.
    */
    drawFrame(tick, ctx, x, y, scale) {
        // use tick duration added to elapsed time to calculate what frame to draw
        this.elapsedTime += tick;

        if (this.isDone()) {
            if (this.loop) {
                // loop back to the beginning
                // this will put back the original frame
                this.elapsedTime -= this.totalTime;
            } else {
                return;
            }
        }

        let frame = this.currentFrame();

        // this is for reversing the image
        if (this.reverse) frame = this.frameCount - frame - 1;

        ctx.drawImage(this.spritesheet,
            this.xStart + frame * (this.width + this.framePadding), this.yStart,
            this.width, this.height,
            x, y,
            this.width * scale,
            this.height * scale);

    };

    /* This method calculate elapsed time / duration in order to determine the current frame. */
    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    /* If elapsed time is greater than total time. */
    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
};
