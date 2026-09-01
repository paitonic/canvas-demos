var $b409caa1ba5151aa$exports = {};
let $b409caa1ba5151aa$var$isRightKeyPressed = false;
let $b409caa1ba5151aa$var$isLeftKeyPressed = false;
let $b409caa1ba5151aa$var$isUpKeyPressed = false;
let $b409caa1ba5151aa$var$isDownKeyPressed = false;
let $b409caa1ba5151aa$var$isSpacebarKeyPressed = false;
function $b409caa1ba5151aa$var$createJumpAnimation(height) {
    let frame = 0;
    let isRunning = false;
    const movement = [
        // ascend
        -0.3,
        -0.1,
        -0.1,
        -0.1,
        -0.1,
        -0.1,
        -0.1,
        -0.1,
        // apex
        0,
        0,
        0,
        0,
        // descend
        0.1,
        0.1,
        0.1,
        0.1,
        0.1,
        0.1,
        0.1,
        0.3
    ];
    const animation = {
        step: ()=>{
            if (animation.isFinished()) return 0;
            const velocity = height * movement[frame];
            frame += 1;
            return velocity;
        },
        start: ()=>{
            isRunning = true;
        },
        reset: ()=>{
            frame = 0;
            isRunning = false;
        },
        isRunning: ()=>{
            return isRunning;
        },
        isFinished: ()=>{
            return frame >= movement.length;
        }
    };
    return animation;
}
class $b409caa1ba5151aa$var$Player {
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.baseXVelocity = 5;
        this.xVelocity = 5;
        this.isJumping = false;
        this.jumpAnimation = $b409caa1ba5151aa$var$createJumpAnimation(this.height * 5);
        this.gravity = 1;
    }
    moveLeft() {
        this.x -= this.xVelocity;
    }
    moveRight() {
        this.x += this.xVelocity;
    }
    render(scene) {
        if ($b409caa1ba5151aa$var$isRightKeyPressed) this.moveRight();
        if ($b409caa1ba5151aa$var$isLeftKeyPressed) this.moveLeft();
        if ($b409caa1ba5151aa$var$isSpacebarKeyPressed && !this.jumpAnimation.isRunning()) {
            this.jumpAnimation.start();
            this.xVelocity *= 2;
        }
        if (this.jumpAnimation.isRunning()) this.y += this.jumpAnimation.step();
        if (this.jumpAnimation.isFinished()) {
            this.jumpAnimation.reset();
            this.xVelocity = this.baseXVelocity;
        }
        this.y += this.gravity;
        // top boundary
        if (this.y < 0) {
            this.y = 0;
            this.isJumping = false;
        }
        // bottom boundary
        if (scene.canvas.height < this.height + this.y) {
            this.y = scene.canvas.height - this.height;
            this.isJumping = false;
            this.xVelocity = this.baseXVelocity;
        }
        scene.fillStyle = this.color;
        scene.fillRect(this.x, this.y, this.width, this.height);
    }
}
const $b409caa1ba5151aa$var$canvas = document.getElementById("canvas");
const $b409caa1ba5151aa$var$scene = $b409caa1ba5151aa$var$canvas.getContext("2d");
const $b409caa1ba5151aa$var$player = new $b409caa1ba5151aa$var$Player($b409caa1ba5151aa$var$canvas.width / 2, $b409caa1ba5151aa$var$canvas.height - 20, 20, 20, '#fff');
const $b409caa1ba5151aa$var$handleKeyDownPress = (event)=>{
    switch(event.key){
        case 'ArrowUp':
            $b409caa1ba5151aa$var$isUpKeyPressed = true;
            break;
        case 'ArrowLeft':
            $b409caa1ba5151aa$var$isLeftKeyPressed = true;
            break;
        case 'ArrowDown':
            $b409caa1ba5151aa$var$isDownKeyPressed = true;
            break;
        case 'ArrowRight':
            $b409caa1ba5151aa$var$isRightKeyPressed = true;
            break;
        case ' ':
            if (!$b409caa1ba5151aa$var$isSpacebarKeyPressed) $b409caa1ba5151aa$var$isSpacebarKeyPressed = true;
            break;
        default:
            break;
    }
};
const $b409caa1ba5151aa$var$handleKeyUpPress = (event)=>{
    switch(event.key){
        case 'ArrowUp':
            $b409caa1ba5151aa$var$isUpKeyPressed = false;
            break;
        case 'ArrowLeft':
            $b409caa1ba5151aa$var$isLeftKeyPressed = false;
            break;
        case 'ArrowDown':
            $b409caa1ba5151aa$var$isDownKeyPressed = false;
            break;
        case 'ArrowRight':
            $b409caa1ba5151aa$var$isRightKeyPressed = false;
            break;
        case ' ':
            $b409caa1ba5151aa$var$isSpacebarKeyPressed = false;
            break;
        default:
            break;
    }
};
document.addEventListener('keydown', $b409caa1ba5151aa$var$handleKeyDownPress);
document.addEventListener('keyup', $b409caa1ba5151aa$var$handleKeyUpPress);
function $b409caa1ba5151aa$var$draw() {
    requestAnimationFrame($b409caa1ba5151aa$var$draw);
    $b409caa1ba5151aa$var$scene.clearRect(0, 0, $b409caa1ba5151aa$var$canvas.width, $b409caa1ba5151aa$var$canvas.height);
    $b409caa1ba5151aa$var$player.render($b409caa1ba5151aa$var$scene);
}
$b409caa1ba5151aa$var$draw();


//# sourceMappingURL=11-platformer-movement.40d261de.js.map
