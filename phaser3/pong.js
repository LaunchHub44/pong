var config = {
    type: Phaser.AUTO,
    width: 200,
    height: 200,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    fps: {
        target: 1,
        forceSetTimeOut: true
    }
};
var game = new Phaser.Game(config);

function preload() {
    console.log("Hello, I'm preload function.")
}

function create() {
    console.log("Hello, I'm create function.")
}

function update() {
    console.log("Hello, I'm update function.")
}