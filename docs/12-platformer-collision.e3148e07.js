var $0992982e2f0aaa53$exports = {};
/** Pallete
#fcf0c0
#ef8f4f
#f8d803
#8dc267
#66dcfe
#49a0e1
#b399c9
*/ const $0992982e2f0aaa53$var$sum = (arr)=>{
    return arr.reduce((total, x)=>total + x, 0);
};
const $0992982e2f0aaa53$var$keyboard = {
    left: false,
    right: false,
    up: false,
    down: false,
    space: false
};
function $0992982e2f0aaa53$var$createJumpAnimation(height) {
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
    return {
        step: ()=>{
            const velocity = height * movement[frame];
            frame += 1;
            return velocity;
        },
        next: ()=>{
            const velocity = height * movement[frame];
            frame += 1;
            return velocity;
        },
        previous: ()=>{
            frame = frame - 1 >= 0 ? frame - 1 : 0;
            return height * movement[frame];
        },
        start: ()=>{
            isRunning = true;
        },
        stop: ()=>{
            frame = 0;
            isRunning = false;
        },
        isRunning: ()=>{
            return isRunning;
        },
        isLastFrame: ()=>{
            return frame >= movement.length;
        }
    };
}
class $0992982e2f0aaa53$var$Player {
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.baseXVelocity = 8;
        this.baseYVelocity = this.baseXVelocity;
        this.xVelocity = this.baseXVelocity;
        this.yVelocity = this.baseYVelocity;
        this.isJumping = false;
        this.jumpAnimation = $0992982e2f0aaa53$var$createJumpAnimation(this.height * 5);
        this.gravity = 1;
        this.lastLog = {};
    }
    log(...args) {
        const serialized = JSON.stringify(...args);
        if (serialized !== this.lastLog) {
            this.lastLog = serialized;
            console.log(...args);
        }
    }
    moveLeft(velocity) {
        this.x -= velocity;
    }
    moveRight(velocity) {
        this.x += velocity;
    }
    moveUp(velocity) {
        this.y -= velocity;
    }
    moveDown(velocity) {
        this.y += velocity;
    }
    // returns closest object to player
    closest(player, objects) {
        return objects.reduce((closest, object)=>{
            const { top: closestTop, right: closestRight, bottom: closestBottom, left: closestLeft } = closest.distance(player);
            const { top: top, right: right, bottom: bottom, left: left } = object.distance(player);
            const closestMin = $0992982e2f0aaa53$var$sum([
                closestTop,
                closestRight,
                closestBottom,
                closestLeft
            ].filter((x)=>x >= 0));
            const objectMin = $0992982e2f0aaa53$var$sum([
                top,
                right,
                bottom,
                left
            ].filter((x)=>x >= 0));
            if (objectMin < closestMin) return object;
            return closest;
        }, objects[0]);
    }
    update(scene, objects) {
        const closestObject = this.closest(this, objects);
        const distance = closestObject.distance(this);
        const velocity = {
            top: this.baseXVelocity,
            bottom: this.baseXVelocity
        };
        const isTopOrBottomCollision = distance.top - 1 <= 0 && distance.bottom - 1 <= 0;
        const isLeftOrRightCollision = distance.left - 1 <= 0 && distance.right - 1 <= 0;
        if (distance.right - 1 >= 0 && isTopOrBottomCollision) velocity.right = Math.min(this.baseXVelocity, distance.right - 1);
        else velocity.right = this.baseXVelocity;
        // console.log(distance.top, distance.right, distance.bottom, distance.left)
        if (distance.left - 1 >= 0 && isTopOrBottomCollision) // can not pass below or above
        velocity.left = Math.min(this.baseXVelocity, distance.left - 1);
        else velocity.left = this.baseXVelocity;
        if (distance.top - 1 >= 0 && isLeftOrRightCollision) velocity.top = Math.min(this.baseYVelocity, distance.top - 1);
        else velocity.top = this.baseYVelocity;
        if (distance.bottom - 1 >= 0 && isLeftOrRightCollision) velocity.bottom = Math.min(this.baseYVelocity, distance.bottom - 1);
        else velocity.bottom = this.baseYVelocity;
        // movement
        if ($0992982e2f0aaa53$var$keyboard.right) this.moveRight(velocity.right);
        if ($0992982e2f0aaa53$var$keyboard.left) this.moveLeft(velocity.left);
        if ($0992982e2f0aaa53$var$keyboard.up) this.moveUp(velocity.top);
        if ($0992982e2f0aaa53$var$keyboard.down) this.moveDown(velocity.bottom);
        // scene boundaries
        // top boundary
        if (this.y < 0) this.y = 0;
        // right boundary
        if (this.x + this.width > scene.canvas.width) this.x = scene.canvas.width - this.width;
        // left boundary
        if (this.x < 0) this.x = 0;
        // bottom boundary
        if (this.height + this.y > scene.canvas.height) this.y = scene.canvas.height - this.height;
    }
    render(scene) {
        scene.fillStyle = this.color;
        scene.fillRect(this.x, this.y, this.width, this.height);
        scene.fillStyle = 'rgba(0, 0, 0, 1)';
        scene.font = '12px monospace';
        scene.fillText(`${this.x},${this.y}`, this.x, this.y);
    }
}
class $0992982e2f0aaa53$var$Thing {
    constructor(name, x, y, width, height, color){
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    update() {}
    render(scene) {
        scene.fillStyle = this.color;
        scene.fillRect(this.x, this.y, this.width, this.height);
        scene.fillStyle = 'rgba(0, 0, 0, 1)';
        scene.font = '12px monospace';
        scene.fillText(this.name, this.x, this.y);
    }
    isInside = (n, min, max)=>{
        // TODO: or > and <?
        return n > min && n < max;
    };
    // AABB - axis aligned bounding boxes
    checkCollision(object) {
        let collision = {
            top: false,
            right: false,
            bottom: false,
            left: false
        };
        const topOverlap = this.isInside(object.y, this.y, this.y + this.height);
        const leftOverlap = this.isInside(object.x, this.x, this.x + this.width);
        const bottomOverlap = this.isInside(object.y + object.height, this.y, this.y + this.height);
        const rightOverlap = this.isInside(object.x + object.width, this.x, this.x + this.width);
        const leftOrRightOverlap = leftOverlap || rightOverlap;
        const topOrBottomOverlap = topOverlap || bottomOverlap;
        if (topOverlap && leftOrRightOverlap) collision = {
            ...collision,
            top: true
        };
        if (bottomOverlap && leftOrRightOverlap) collision = {
            ...collision,
            bottom: true
        };
        if (leftOverlap && topOrBottomOverlap) collision = {
            ...collision,
            left: true
        };
        if (rightOverlap && topOrBottomOverlap) collision = {
            ...collision,
            right: true
        };
        return {
            ...collision,
            target: {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height
            }
        };
    }
    checkAABB(object) {
        // my way
        const top = object.y > this.y + this.height;
        const bottom = object.y + object.height < this.y;
        const right = object.x + object.width < this.x;
        const left = object.x > this.x + this.width;
        // if any of (top, right, bottom, left) is true, then there is no collision because
        // one edge is far away from the other
        return !(top || right || bottom || left);
    // const left = object.y
    // if any of (top, right, bottom, left) is true, then there is no collision because
    // one edge is far away from the other
    // return ;
    }
    checkAABB2(player) {
        return player.y < this.y + this.height && player.y + player.height > this.y && player.x < this.x + this.width && player.x + player.width > this.x;
    }
    distance(object) {
        // return {
        //     top: object.y - (this.y + this.height),
        //     bottom: this.y - (object.y + object.height),
        //     right: this.x - (object.x + object.width),
        //     left: object.x - (this.x + this.width)
        // }
        return {
            top: object.y - (this.y + this.height),
            bottom: this.y - (object.y + object.height),
            right: this.x - (object.x + object.width),
            left: object.x - (this.x + this.width)
        };
    }
}
const $0992982e2f0aaa53$var$canvas = document.getElementById("canvas");
const $0992982e2f0aaa53$var$scene = $0992982e2f0aaa53$var$canvas.getContext("2d");
// const ground = new Thing('ground', 0, canvas.height - 80, canvas.width, 80, '#b399c9');
const $0992982e2f0aaa53$var$player = new $0992982e2f0aaa53$var$Player($0992982e2f0aaa53$var$canvas.width / 2, $0992982e2f0aaa53$var$canvas.height - 20, 20, 20, '#8dc267');
const $0992982e2f0aaa53$var$box = new $0992982e2f0aaa53$var$Thing('box', $0992982e2f0aaa53$var$canvas.width / 2 + 120, $0992982e2f0aaa53$var$canvas.height - 40, 40, 40, '#ef8f4f');
const $0992982e2f0aaa53$var$box2 = new $0992982e2f0aaa53$var$Thing('box-2', $0992982e2f0aaa53$var$canvas.width / 2 - 120, $0992982e2f0aaa53$var$canvas.height - 120, 40, 40, '#ef8f4f');
const $0992982e2f0aaa53$var$box3 = new $0992982e2f0aaa53$var$Thing('box-3', 200, $0992982e2f0aaa53$var$canvas.height - 220, 40, 40, '#ef8f4f');
const $0992982e2f0aaa53$var$box4 = new $0992982e2f0aaa53$var$Thing('box-4', 240, $0992982e2f0aaa53$var$canvas.height - 220, 40, 40, '#b399c9');
const $0992982e2f0aaa53$var$box5 = new $0992982e2f0aaa53$var$Thing('box-5', 300, $0992982e2f0aaa53$var$canvas.height - 260, 40, 40, '#ef8f4f');
const $0992982e2f0aaa53$var$box6 = new $0992982e2f0aaa53$var$Thing('box-6', 340, $0992982e2f0aaa53$var$canvas.height - 270, 40, 40, '#b399c9');
const $0992982e2f0aaa53$var$box7 = new $0992982e2f0aaa53$var$Thing('box-7', 240, $0992982e2f0aaa53$var$canvas.height - 350, 40, 40, '#b399c9');
const $0992982e2f0aaa53$var$box8 = new $0992982e2f0aaa53$var$Thing('box-8', 0, $0992982e2f0aaa53$var$canvas.height - 40, 40, 40, '#ef8f4f');
const $0992982e2f0aaa53$var$box9 = new $0992982e2f0aaa53$var$Thing('box-9', 0, $0992982e2f0aaa53$var$canvas.height - 80, 40, 40, '#b399c9');
const $0992982e2f0aaa53$var$box10 = new $0992982e2f0aaa53$var$Thing('box-10', 40, $0992982e2f0aaa53$var$canvas.height - 40, 40, 40, '#b399c9');
const $0992982e2f0aaa53$var$box11 = new $0992982e2f0aaa53$var$Thing('box-11', 80, $0992982e2f0aaa53$var$canvas.height - 140, 40, 40, '#ef8f4f');
const $0992982e2f0aaa53$var$box12 = new $0992982e2f0aaa53$var$Thing('box-12', 40, $0992982e2f0aaa53$var$canvas.height - 140, 40, 40, '#b399c9');
const $0992982e2f0aaa53$var$box13 = new $0992982e2f0aaa53$var$Thing('box-13', 80, $0992982e2f0aaa53$var$canvas.height - 100, 40, 40, '#b399c9');
const $0992982e2f0aaa53$var$box14 = new $0992982e2f0aaa53$var$Thing('box-14', 40, 40, 40, 40, '#b399c9');
const $0992982e2f0aaa53$var$box15 = new $0992982e2f0aaa53$var$Thing('box-15', 80, 40, 40, 40, '#ef8f4f');
const $0992982e2f0aaa53$var$box16 = new $0992982e2f0aaa53$var$Thing('box-16', 120, 40, 40, 40, '#b399c9');
const $0992982e2f0aaa53$var$box17 = new $0992982e2f0aaa53$var$Thing('box-17', 40, 120, 40, 40, '#ef8f4f');
const $0992982e2f0aaa53$var$box18 = new $0992982e2f0aaa53$var$Thing('box-18', 80, 120, 40, 40, '#b399c9');
const $0992982e2f0aaa53$var$box19 = new $0992982e2f0aaa53$var$Thing('box-19', 120, 120, 40, 40, '#ef8f4f');
const $0992982e2f0aaa53$var$box20 = new $0992982e2f0aaa53$var$Thing('box-20', $0992982e2f0aaa53$var$canvas.width - 80, 40, 40, 40, '#ef8f4f');
const $0992982e2f0aaa53$var$box21 = new $0992982e2f0aaa53$var$Thing('box-21', $0992982e2f0aaa53$var$canvas.width - 80, 80, 40, 40, '#b399c9');
const $0992982e2f0aaa53$var$box22 = new $0992982e2f0aaa53$var$Thing('box-22', $0992982e2f0aaa53$var$canvas.width - 80, 120, 40, 40, '#ef8f4f');
const $0992982e2f0aaa53$var$box23 = new $0992982e2f0aaa53$var$Thing('box-23', $0992982e2f0aaa53$var$canvas.width - 160, 40, 40, 40, '#ef8f4f');
const $0992982e2f0aaa53$var$box24 = new $0992982e2f0aaa53$var$Thing('box-24', $0992982e2f0aaa53$var$canvas.width - 160, 80, 40, 40, '#b399c9');
const $0992982e2f0aaa53$var$box25 = new $0992982e2f0aaa53$var$Thing('box-25', $0992982e2f0aaa53$var$canvas.width - 160, 120, 40, 40, '#ef8f4f');
const $0992982e2f0aaa53$var$box26 = new $0992982e2f0aaa53$var$Thing('box-26', $0992982e2f0aaa53$var$canvas.width - 200, 200, 40, 40, '#b399c9');
const $0992982e2f0aaa53$var$box27 = new $0992982e2f0aaa53$var$Thing('box-27', $0992982e2f0aaa53$var$canvas.width - 160, 200, 40, 40, '#ef8f4f');
const $0992982e2f0aaa53$var$box28 = new $0992982e2f0aaa53$var$Thing('box-28', $0992982e2f0aaa53$var$canvas.width - 120, 200, 40, 40, '#b399c9');
const $0992982e2f0aaa53$var$box29 = new $0992982e2f0aaa53$var$Thing('box-29', $0992982e2f0aaa53$var$canvas.width - 80, 200, 40, 40, '#ef8f4f');
const $0992982e2f0aaa53$var$platform1 = new $0992982e2f0aaa53$var$Thing('platform1', 50, $0992982e2f0aaa53$var$canvas.height - 60, 150, 10, '#fff');
const $0992982e2f0aaa53$var$platform2 = new $0992982e2f0aaa53$var$Thing('platform2', 250, $0992982e2f0aaa53$var$canvas.height - 120, 150, 10, '#fff');
const $0992982e2f0aaa53$var$objects = [
    // ground,
    $0992982e2f0aaa53$var$box,
    $0992982e2f0aaa53$var$box2,
    $0992982e2f0aaa53$var$box3,
    $0992982e2f0aaa53$var$box4,
    $0992982e2f0aaa53$var$box5,
    $0992982e2f0aaa53$var$box6,
    $0992982e2f0aaa53$var$box7,
    $0992982e2f0aaa53$var$box8,
    $0992982e2f0aaa53$var$box9,
    $0992982e2f0aaa53$var$box10,
    $0992982e2f0aaa53$var$box11,
    $0992982e2f0aaa53$var$box12,
    $0992982e2f0aaa53$var$box13,
    $0992982e2f0aaa53$var$box14,
    $0992982e2f0aaa53$var$box15,
    $0992982e2f0aaa53$var$box16,
    $0992982e2f0aaa53$var$box17,
    $0992982e2f0aaa53$var$box18,
    $0992982e2f0aaa53$var$box19,
    $0992982e2f0aaa53$var$box20,
    $0992982e2f0aaa53$var$box21,
    $0992982e2f0aaa53$var$box22,
    $0992982e2f0aaa53$var$box23,
    $0992982e2f0aaa53$var$box24,
    $0992982e2f0aaa53$var$box25,
    $0992982e2f0aaa53$var$box26,
    $0992982e2f0aaa53$var$box27,
    $0992982e2f0aaa53$var$box28,
    $0992982e2f0aaa53$var$box29,
    $0992982e2f0aaa53$var$player
];
const $0992982e2f0aaa53$var$handleKeyDownPress = (event)=>{
    switch(event.key){
        case 'ArrowUp':
            $0992982e2f0aaa53$var$keyboard.up = true;
            break;
        case 'ArrowLeft':
            $0992982e2f0aaa53$var$keyboard.left = true;
            break;
        case 'ArrowDown':
            $0992982e2f0aaa53$var$keyboard.down = true;
            break;
        case 'ArrowRight':
            $0992982e2f0aaa53$var$keyboard.right = true;
            break;
        case ' ':
            if (!$0992982e2f0aaa53$var$keyboard.space) $0992982e2f0aaa53$var$keyboard.space = true;
            break;
        default:
            break;
    }
};
const $0992982e2f0aaa53$var$handleKeyUpPress = (event)=>{
    switch(event.key){
        case 'ArrowUp':
            $0992982e2f0aaa53$var$keyboard.up = false;
            break;
        case 'ArrowLeft':
            $0992982e2f0aaa53$var$keyboard.left = false;
            break;
        case 'ArrowDown':
            $0992982e2f0aaa53$var$keyboard.down = false;
            break;
        case 'ArrowRight':
            $0992982e2f0aaa53$var$keyboard.right = false;
            break;
        case ' ':
            $0992982e2f0aaa53$var$keyboard.space = false;
            break;
        default:
            break;
    }
};
document.addEventListener('keydown', $0992982e2f0aaa53$var$handleKeyDownPress);
document.addEventListener('keyup', $0992982e2f0aaa53$var$handleKeyUpPress);
function $0992982e2f0aaa53$var$draw() {
    requestAnimationFrame($0992982e2f0aaa53$var$draw);
    $0992982e2f0aaa53$var$scene.clearRect(0, 0, $0992982e2f0aaa53$var$canvas.width, $0992982e2f0aaa53$var$canvas.height);
    for (const object of $0992982e2f0aaa53$var$objects){
        object.update($0992982e2f0aaa53$var$scene, $0992982e2f0aaa53$var$objects.filter((current)=>current !== object));
        object.render($0992982e2f0aaa53$var$scene);
    }
}
$0992982e2f0aaa53$var$draw();


//# sourceMappingURL=12-platformer-collision.e3148e07.js.map
