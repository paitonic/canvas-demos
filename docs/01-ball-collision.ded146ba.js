var $e0a0699de7f61ace$exports = {};
const $e0a0699de7f61ace$var$canvas = document.getElementById("canvas");
const $e0a0699de7f61ace$var$ctx = $e0a0699de7f61ace$var$canvas.getContext("2d");
const $e0a0699de7f61ace$var$colors = [
    '#f44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#03A9F4',
    '#00BCD4',
    '#009688',
    '#4CAF50',
    '#8BC34A',
    '#CDDC39',
    '#FFEB3B',
    '#FFC107',
    '#FF9800',
    '#FF5722',
    '#795548',
    '#9E9E9E',
    '#607D8B'
];
const $e0a0699de7f61ace$var$balls = new Array(20).fill(null).map((x, index)=>{
    return $e0a0699de7f61ace$var$createBall($e0a0699de7f61ace$var$randomBetween($e0a0699de7f61ace$var$canvas.width * 0.1, $e0a0699de7f61ace$var$canvas.width * 0.9), $e0a0699de7f61ace$var$randomBetween($e0a0699de7f61ace$var$canvas.height * 0.1, $e0a0699de7f61ace$var$canvas.height * 0.9), 10, // {x: randomBetween(-2, 2), y: randomBetween(-2, 2)},
    $e0a0699de7f61ace$var$randomItem([
        {
            x: 1,
            y: 1
        },
        {
            x: 2,
            y: 2
        },
        {
            x: 3,
            y: 3
        },
        {
            x: -1,
            y: -1
        },
        {
            x: -2,
            y: -2
        },
        {
            x: -3,
            y: -3
        }
    ]), $e0a0699de7f61ace$var$colors[$e0a0699de7f61ace$var$randomBetween(0, $e0a0699de7f61ace$var$colors.length - 1)]);
});
function $e0a0699de7f61ace$var$randomItem(items) {
    return items[$e0a0699de7f61ace$var$randomBetween(0, items.length - 1)];
}
function $e0a0699de7f61ace$var$createBall(x, y, radius, speed, color = "#0095DD") {
    return {
        x: x,
        y: y,
        radius: radius,
        speed: speed,
        color: color
    };
}
// random between min (inclusive) and max (inclusive)
function $e0a0699de7f61ace$var$randomBetween(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}
function $e0a0699de7f61ace$var$drawBall(ball) {
    $e0a0699de7f61ace$var$ctx.beginPath();
    $e0a0699de7f61ace$var$ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    $e0a0699de7f61ace$var$ctx.fillStyle = ball.color;
    $e0a0699de7f61ace$var$ctx.fill();
    $e0a0699de7f61ace$var$ctx.closePath();
}
function $e0a0699de7f61ace$var$detectWallCollision(ball) {
    const collision = {
        x: ball.speed.x,
        y: ball.speed.y
    };
    if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= $e0a0699de7f61ace$var$canvas.height) collision.y = -collision.y;
    // if collides with left wall or right wall
    if (ball.x + ball.radius >= $e0a0699de7f61ace$var$canvas.width || ball.x - ball.radius <= 0) collision.x = -collision.x;
    return collision;
}
function $e0a0699de7f61ace$var$applyCollision(ball, collision) {
    ball.speed = {
        ...ball.speed,
        ...collision
    };
    ball.x += ball.speed.x;
    ball.y += ball.speed.y;
}
function $e0a0699de7f61ace$var$detectBallCollision(first, second) {
    const collision = {
        first: {},
        second: {}
    };
    const distance = Math.sqrt((first.x - second.x) ** 2 + (first.y - second.y) ** 2);
    const isCollided = distance < first.radius + second.radius;
    if (!isCollided) return collision;
    // second hits first from left
    const isLeftCollision = second.x + second.radius >= first.x - first.radius;
    // second hits first from right
    const isRightCollision = second.x - second.radius <= first.x + first.radius;
    // second hits first from top
    const isTopCollision = second.y + second.radius >= first.y - first.radius;
    // second hits first from bottom
    const isBottomCollision = second.y - second.radius <= first.y + first.radius;
    if (isTopCollision || isBottomCollision) {
        collision.isCollision = true;
        collision.first.y = -first.speed.y;
        collision.second.y = -second.speed.y;
    }
    if (isRightCollision || isLeftCollision) {
        collision.isCollision = true;
        collision.first.x = -first.speed.x;
        collision.second.x = -second.speed.x;
    }
    return collision;
}
function $e0a0699de7f61ace$var$draw() {
    $e0a0699de7f61ace$var$ctx.clearRect(0, 0, $e0a0699de7f61ace$var$canvas.width, $e0a0699de7f61ace$var$canvas.height);
    for(let i = 0; i < $e0a0699de7f61ace$var$balls.length; i += 1){
        const ball = $e0a0699de7f61ace$var$balls[i];
        $e0a0699de7f61ace$var$drawBall(ball);
        $e0a0699de7f61ace$var$applyCollision(ball, $e0a0699de7f61ace$var$detectWallCollision(ball));
        for(let j = 0; j < $e0a0699de7f61ace$var$balls.length; j += 1)if (i !== j && j + 1 < $e0a0699de7f61ace$var$balls.length) {
            const nextBall = $e0a0699de7f61ace$var$balls[j];
            const ballCollision = $e0a0699de7f61ace$var$detectBallCollision(ball, nextBall);
            if (ballCollision.isCollision) {
                $e0a0699de7f61ace$var$applyCollision(ball, ballCollision.first);
                $e0a0699de7f61ace$var$applyCollision(nextBall, ballCollision.second);
            }
        }
    }
    // balls.forEach((ball) => {
    //     drawBall(ball);
    //     applyCollision(ball, detectWallCollision(ball));
    // });
    requestAnimationFrame($e0a0699de7f61ace$var$draw);
}
$e0a0699de7f61ace$var$draw();


//# sourceMappingURL=01-ball-collision.ded146ba.js.map
