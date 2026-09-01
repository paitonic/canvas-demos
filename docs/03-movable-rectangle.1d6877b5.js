var $a05eb1d65a9389b8$exports = {};
const $a05eb1d65a9389b8$var$log = (...args)=>{
    console.log(...args);
};
const $a05eb1d65a9389b8$var$rectangle = (x, y, width, height, color)=>{
    const speed = 2;
    return {
        x: x,
        y: y,
        width: width,
        height: height,
        color: color,
        move (x, y) {
            this.x = x;
            this.y = y;
        },
        moveLeft () {
            this.x -= speed;
        },
        moveRight () {
            this.x += speed;
        },
        draw (scene) {
            scene.fillStyle = this.color;
            scene.fillRect(this.x, this.y, this.width, this.height);
        }
    };
};
const $a05eb1d65a9389b8$var$canvas = document.getElementById("canvas");
const $a05eb1d65a9389b8$var$scene = $a05eb1d65a9389b8$var$canvas.getContext("2d");
const $a05eb1d65a9389b8$var$debug = (f)=>{
    return (...args)=>{
        console.log(`${f.name}()`);
        f(...args);
    };
};
const $a05eb1d65a9389b8$var$player = $a05eb1d65a9389b8$var$rectangle(0, $a05eb1d65a9389b8$var$canvas.height - 100, 100, 100, 'magenta');
let $a05eb1d65a9389b8$var$isRightKeyPressed = false;
let $a05eb1d65a9389b8$var$isLeftKeyPressed = false;
const $a05eb1d65a9389b8$var$handleKeyDownPress = (event)=>{
    $a05eb1d65a9389b8$var$log(`handleKeyDownPress: ${event.key}`);
    switch(event.key){
        case 'Right':
        case 'ArrowRight':
            $a05eb1d65a9389b8$var$isRightKeyPressed = true;
            break;
        case 'Left':
        case 'ArrowLeft':
            $a05eb1d65a9389b8$var$isLeftKeyPressed = true;
            break;
        default:
            break;
    }
};
const $a05eb1d65a9389b8$var$handleKeyUpPress = (event)=>{
    $a05eb1d65a9389b8$var$log(`handleKeyUpPress: ${event.key}`);
    switch(event.key){
        case 'Right':
        case 'ArrowRight':
            $a05eb1d65a9389b8$var$isRightKeyPressed = false;
            break;
        case 'Left':
        case 'ArrowLeft':
            $a05eb1d65a9389b8$var$isLeftKeyPressed = false;
            break;
        default:
            break;
    }
};
document.addEventListener('keydown', $a05eb1d65a9389b8$var$handleKeyDownPress);
document.addEventListener('keyup', $a05eb1d65a9389b8$var$handleKeyUpPress);
function $a05eb1d65a9389b8$var$draw() {
    requestAnimationFrame($a05eb1d65a9389b8$var$draw);
    $a05eb1d65a9389b8$var$scene.clearRect(0, 0, $a05eb1d65a9389b8$var$canvas.width, $a05eb1d65a9389b8$var$canvas.height);
    $a05eb1d65a9389b8$var$player.draw($a05eb1d65a9389b8$var$scene);
    if ($a05eb1d65a9389b8$var$isRightKeyPressed) $a05eb1d65a9389b8$var$player.moveRight();
    if ($a05eb1d65a9389b8$var$isLeftKeyPressed) $a05eb1d65a9389b8$var$player.moveLeft();
}
$a05eb1d65a9389b8$var$draw();


//# sourceMappingURL=03-movable-rectangle.1d6877b5.js.map
