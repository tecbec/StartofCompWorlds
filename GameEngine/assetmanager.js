class AssetManager {
    constructor() {
        this.successCount = 0;
        this.errorCount = 0;
        this.cache = [];
        this.downloadQueue = [];
    };

    queueDownload(path) {
        console.log("Queueing " + path);
        this.downloadQueue.push(path);
    };

    isDone() {
        return this.downloadQueue.length === this.successCount + this.errorCount;
    };

    downloadAll(callback) {
        if (this.downloadQueue.length === 0) setTimeout(callback, 10);
        for (let i = 0; i < this.downloadQueue.length; i++) {
            var that = this; 
            var path = this.downloadQueue[i];

            var ext = path.substring(path.length - 3); // the extensions 
            switch(ext){
                case 'png':
                    const img = new Image();

                    img.addEventListener("load", () => {
                        console.log("Loaded " + img.src);
                        this.successCount++;
                        if (this.isDone()) callback();
                    });

                    img.addEventListener("error", () => {
                        console.log("Error loading " + img.src);
                        this.errorCount++;
                        if (this.isDone()) callback();
                    });

                    img.src = path;
                    this.cache[path] = img;
                    break;
                case 'wav':
                case 'mp4':
                case 'mp3':
                    var aud = new Audio(); //audio tag 
                    //load event listener to see if it is loaded enough to start the sound 
                    // and begin the game 
                    aud.addEventListener("loadeddata", function () {
                        console.log("Loaded " + this.src);
                        that.successCount++; //increment success count 
                        if (that.isDone()) callback();
                    });

                    aud.addEventListener("error", function () {
                        console.log("Error loading " + this.src);
                        that.errorCount++;
                        if (that.isDone()) callback(); //
                    });

                    // playing the audio and the audio eneded
                    aud.addEventListener("ended", function () {
                        aud.pause(); // pause the audio when ended 
                        aud.currentTime = 0; // reset the time of the audio to zero

                    });

                    aud.src = path;
                    aud.load();
                    this.cache[path] = aud;
                    break; 
            }
        }
    };

    getAsset(path) {
        return this.cache[path];
    };
        // reset back to zero if we are not at the end 
    //this is important for a sound effect like jump, or duck 
    playAsset(path) {
        let audio = this.cache[path];
        audio.currentTime = 0;
        audio.play();
    };

    //used in scene manager 
    muteAudio(mute) {
        // grabs the keys in the cache
        for (var key in this.cache) {
            let asset = this.cache[key];
            if (asset instanceof Audio) {
                asset.muted = mute;
            }
        }
    };

    adjustVolume(volume) {
        for (var key in this.cache) {
            let asset = this.cache[key];
            if (asset instanceof Audio) {
                asset.volume = volume;
            }
        }
    };

    pauseBackgroundMusic() {
        for (var key in this.cache) {
            let asset = this.cache[key];
            if (asset instanceof Audio) {
                asset.pause();
                asset.currentTime = 0;
            }
        }
    };

    // if you call on any of the assets then it will auto repeate 
    autoRepeat(path) {
        var aud = this.cache[path];
        aud.addEventListener("ended", function () {
            aud.play(); //second listener to call play again 
        });
    };
};

