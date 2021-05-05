const P1_X = 20
const P2_X = 380

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

gameState = {
   
}
ballState = {
    x: 200,
    y: 150,
    xSpeed: 100,
    ySpeed: 0
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
    gameState.player1 = this.physics.add.sprite(P1_X, 150, 'paddle')
    gameState.player2 = this.physics.add.sprite(P2_X, 150, 'paddle')

    gameState.ball = this.physics.add.sprite(ballState.x, ballState.y, 'ball')
    for (var y = 0; y < 300; y += 20) {
        this.add.rectangle(200, y, 9, 9, '0x333333')
    }

    // collision setup
    gameState.player1.setCollideWorldBounds(true)
    gameState.player2.setCollideWorldBounds(true)
    this.physics.add.collider(gameState.ball, gameState.player1, function () {
        gameState.player1.setVelocityX(0)
        ballState.xSpeed = -ballState.xSpeed;
    }) 
    this.physics.add.collider(gameState.ball, gameState.player2, function () {
        gameState.player2.setVelocityX(0)
        ballState.xSpeed = -ballState.xSpeed;
    })
}

function update() {
    gameState.ball.setVelocityX(ballState.xSpeed)
    gameState.player1.x = P1_X
    gameState.player2.x = P2_X
}