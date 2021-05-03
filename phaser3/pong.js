var config = {
    type: Phaser.AUTO,
    width: 400,
    height: 300,
    backgroundColor: 0x000000,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            enableBody: true,
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },

    // fps: {
    //     target: 1,
    //     forceSetTimeOut: true
    // }

}

var game = new Phaser.Game(config);

function preload() {
    this.load.audio('paddle-sound', 'audio/paddle-bounce.mp3')
    this.load.audio('score-sound','audio/score.mp3')
    this.load.audio('wall-bounce-sound', 'audio/wall-bounce.mp3')
    this.load.image('paddle', 'image/paddle-white-10x60.png')
    this.load.image('ball', 'image/ball.png')
}

function create() {
    this.physics.add.sprite(20, 150, 'paddle')
    this.physics.add.sprite(380, 150, 'paddle')
    this.physics.add.sprite(200, 150, 'ball')
}


function update() {

}