const P1_X = 20
const P2_X = 380
const PADDLE_SPEED = 150

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
    p1Score: 0,        // HIGH-LEVEL: declare variable, with initial value of 0, defined (definition)
    p2Score: 0,
    player1: null,     // HIGH-LEVEL: declare variable (no init value)
    player2: null,
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
    gameState.cursors = this.input.keyboard.createCursorKeys()
    gameState.key_W = this.input.keyboard.addKey('W')
    gameState.key_S = this.input.keyboard.addKey('S')
}

function setBallAngle() {
    yspeed = Math.random() * 200 - 100
    ballState.ySpeed = yspeed
    console.log(`ball angle set to: ${yspeed}`)
}

function create() {
    gameState.player1 = this.physics.add.sprite(P1_X, 150, 'paddle')
    gameState.player2 = this.physics.add.sprite(P2_X, 150, 'paddle')

    gameState.p1ScoreText = this.add.text(100, 50, gameState.p1Score, { fontSize: '45px', fill: '#ffffff' });
    gameState.p2ScoreText = this.add.text(300, 50, gameState.p2Score, { fontSize: '45px', fill: '#ffffff' });

    gameState.ball = this.physics.add.sprite(ballState.x, ballState.y, 'ball')
    for (var y = 0; y < 300; y += 20) {
        this.add.rectangle(200, y, 9, 9, '0x333333')
    }

    paddleSound = this.sound.add('paddle-sound')
    wallSound = this.sound.add('wall-bounce-sound')
    scoreSound = this.sound.add('score-sound')

    // collision setup
    gameState.player1.setCollideWorldBounds(true)
    gameState.player2.setCollideWorldBounds(true)
    this.physics.add.collider(gameState.ball, gameState.player1, function () {
        gameState.player1.setVelocityX(0)
        paddleSound.play()
        ballState.xSpeed = -ballState.xSpeed;
        ballState.xSpeed += 10
        console.log(`ball xspeed: ${ballState.xSpeed}`)
        setBallAngle()
    }) 
    this.physics.add.collider(gameState.ball, gameState.player2, function () {
        gameState.player2.setVelocityX(0)
        paddleSound.play()
        ballState.xSpeed = -ballState.xSpeed;
        ballState.xSpeed -= 10
        console.log(`ball xspeed: ${ballState.xSpeed}`)
        setBallAngle()
    })
}

function ballReset() {
    gameState.ball.x = 200
    gameState.ball.y = 150
    ballState.xSpeed = 100
    ballState.ySpeed = 0
}

function update() {
    gameState.ball.setVelocityX(ballState.xSpeed)
    gameState.ball.setVelocityY(ballState.ySpeed)
    gameState.player1.x = P1_X
    gameState.player2.x = P2_X

    // Player 2 Controls
    if (gameState.cursors.up.isDown) {
        gameState.player2.setVelocityY(-PADDLE_SPEED)
    } else if (gameState.cursors.down.isDown) {
        gameState.player2.setVelocityY(PADDLE_SPEED)
    } else {
        gameState.player2.setVelocityY(0)
    }

    // Player 1 Controls
    if (gameState.key_W.isDown) {
        gameState.player1.setVelocityY(-PADDLE_SPEED)
    } else if (gameState.key_S.isDown) {
        gameState.player1.setVelocityY(PADDLE_SPEED)
    } else if (gameState.key_W.isUp || gameState.key_S.isUp) {
        gameState.player1.setVelocityY(0)
    }

    // Court Boundaries for Ball
    if (gameState.ball.y < 0) {
        gameState.ball.y = 0
        wallSound.play()
        ballState.ySpeed = -ballState.ySpeed
    } else if (gameState.ball.y > 300) {
        gameState.ball.y = 300
        wallSound.play()
        ballState.ySpeed = -ballState.ySpeed
    }

    // Score Condition
    if (gameState.ball.x < 0) {
        scoreSound.play()
        gameState.p2Score += 1
        ballReset();

        // Present Score
        gameState.p2ScoreText.setText(gameState.p2Score)
    }
    
    if (gameState.ball.x > 400) {
        scoreSound.play()
        gameState.p1Score += 1
        ballReset();

        // Present Score
        gameState.p1ScoreText.setText(gameState.p1Score)
    }

}