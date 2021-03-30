var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

var player1 = {
    x: 10,
    y: 100,
    height: 40,
    width: 8,
    speed: 0
}

var player2 = {
    x: 180,
    y: 100,
    height: 40,
    width: 8,
    speed: 0
}

var ball = {
    height: 10,
    width: 10,
    xSpeed: 3,
    ySpeed: -2,
    x: 100,
    y: 100
}

function drawPaddle(player) {
    ctx.fillRect(player.x, player.y - 20, player.width, player.height)
}

function drawBall(ball) {
    ctx.fillRect(ball.x, ball.y, ball.width, ball.height)
}
ctx.fillStyle = "white"


$("body").keydown(function(event) {
    // Up Arrow Event
    if (event.keyCode == 38) {
        player2.speed = -5
    }

    // Down Arrow Event
    if (event.keyCode == 40) {
        player2.speed = 5
    }

    // W Key Event
    if (event.keyCode == 87) {
        player1.speed = -5
    }

    // S Key Event
    if (event.keyCode == 83) {
        player1.speed = 5
    }
})

$("body").keyup(function(event) {
    // P1
    if (event.keyCode == 38 || event.keyCode == 40) {
        player2.speed = 0
    }

    // P2
    if (event.keyCode == 87 || event.keyCode == 83) {
        player1.speed = 0
    }
})


function draw() {
    // This function will draw everything on-screen.
    ctx.clearRect(0,0, 200,200)
    drawPaddle(player1)
    drawPaddle(player2)
    drawBall(ball)
}

function update() {
    // This function will tell the computer what's happening on-screen.
    player1.y += player1.speed
    player2.y += player2.speed
    ball.x += ball.xSpeed
    ball.y += ball.ySpeed

    if (ball.x < 0) {
        ball.xSpeed = 3
    } else if (ball.x + ball.width > 200) {
        ball.xSpeed = -3
    } else if (ball.y < 0) {
        ball.ySpeed = 2
    } else if (ball.y + ball.height > 200) {
        ball.ySpeed = -2
    } else {
        return
    }
}

setInterval(function() {
    update()
    draw()
}, 60)