var $5dbc86b44aaf2259$exports = {};
const $5dbc86b44aaf2259$var$DEBUG = false;
const $5dbc86b44aaf2259$var$COLORS = {
    BEIGE: '#fcf0c0',
    ORANGE: '#ef8f4f',
    YELLOW: '#f8d803',
    GREEN: '#8dc267',
    LIGHT_BLUE: '#66dcfe',
    BLUE: '#49a0e1',
    PURPLE: '#b399c9',
    SOFT_RED: '#fcc0cc',
    SOFT_YELLOW: '#fcf0c0',
    SOFT_CYAN: '#c0fcf0',
    SOFT_BLUE: '#c0ccfc',
    WHITE: '#ffffff',
    BLACK: '#000000',
    SOFT_BLACK: '#333'
};
const $5dbc86b44aaf2259$var$DIRECTION = {
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
};
const $5dbc86b44aaf2259$var$DIRECTION_HORIZONTAL = [
    $5dbc86b44aaf2259$var$DIRECTION.LEFT,
    $5dbc86b44aaf2259$var$DIRECTION.RIGHT
];
const $5dbc86b44aaf2259$var$DIRECTION_VERTICAL = [
    $5dbc86b44aaf2259$var$DIRECTION.TOP,
    $5dbc86b44aaf2259$var$DIRECTION.BOTTOM
];
const $5dbc86b44aaf2259$var$keyboard = {
    left: false,
    right: false,
    up: false,
    down: false,
    space: false
};
const $5dbc86b44aaf2259$var$maxVelocity = (limit, ...args)=>{
    return args.reduce((highest, number)=>{
        if (number <= limit && number > highest) return number;
        return highest;
    }, args[0]);
};
const $5dbc86b44aaf2259$var$checkAABB = (objectA, objectB)=>{
    const top = objectB.y > objectA.y + objectA.height;
    const bottom = objectB.y + objectB.height < objectA.y;
    const right = objectB.x + objectB.width < objectA.x;
    const left = objectB.x > objectA.x + objectA.width;
    // if any of (top, right, bottom, left) is true, then there is no collision because
    // one edge is far away from the other
    return !(top || right || bottom || left);
};
const $5dbc86b44aaf2259$var$distance = (player, target)=>{
    return {
        top: player.y - (target.y + target.height),
        right: target.x - (player.x + player.width),
        bottom: target.y - (player.y + player.height),
        left: player.x - (target.x + target.width)
    };
};
const $5dbc86b44aaf2259$var$getObjectDimensions = ({ x: x, y: y, width: width, height: height, xVelocity: xVelocity, yVelocity: yVelocity })=>{
    return {
        x: x - xVelocity,
        y: y - yVelocity,
        width: xVelocity + width + xVelocity,
        height: yVelocity + height + yVelocity
    };
};
const $5dbc86b44aaf2259$var$findNearbyObjects = (player, objects)=>{
    const playerDimensions = $5dbc86b44aaf2259$var$getObjectDimensions(player);
    return objects.filter((object)=>{
        return $5dbc86b44aaf2259$var$checkAABB(playerDimensions, object);
    });
};
const $5dbc86b44aaf2259$var$getCollisionDirection = (offset)=>{
    let side = $5dbc86b44aaf2259$var$DIRECTION.TOP, value = offset.top;
    [
        $5dbc86b44aaf2259$var$DIRECTION.RIGHT,
        $5dbc86b44aaf2259$var$DIRECTION.BOTTOM,
        $5dbc86b44aaf2259$var$DIRECTION.LEFT
    ].forEach((direction)=>{
        if (offset[direction] < value) {
            value = offset[direction];
            side = direction;
        }
    });
    return {
        direction: side,
        value: value
    };
};
const $5dbc86b44aaf2259$var$closest = (scene, player, objects)=>{
    const map = {
        top: {
            objects: [],
            distance: {}
        },
        right: {
            objects: [],
            distance: {}
        },
        bottom: {
            objects: [],
            distance: {}
        },
        left: {
            objects: [],
            distance: {}
        }
    };
    const insertIfCloser = (object, offset, direction)=>{
        if (offset[direction] < 0) return;
        const closestDistance = map[direction].distance;
        // either current object's distance is same as the closest object found so far OR
        // the closest object does not exist in a list yet
        if (offset[direction] === closestDistance[direction] || !map[direction].objects.length) {
            map[direction].objects.push(object);
            map[direction].distance = offset;
        } else if (offset[direction] < closestDistance[direction]) {
            // found closer object
            map[direction].objects = [
                object
            ];
            map[direction].distance = offset;
        }
    };
    objects.forEach((object)=>{
        const offset = $5dbc86b44aaf2259$var$distance(player, object);
        if ($5dbc86b44aaf2259$var$checkAABB(player.raycast.horizontal, object)) {
            insertIfCloser(object, offset, $5dbc86b44aaf2259$var$DIRECTION.LEFT);
            insertIfCloser(object, offset, $5dbc86b44aaf2259$var$DIRECTION.RIGHT);
        } else if ($5dbc86b44aaf2259$var$checkAABB(player.raycast.vertical, object)) {
            insertIfCloser(object, offset, $5dbc86b44aaf2259$var$DIRECTION.TOP);
            insertIfCloser(object, offset, $5dbc86b44aaf2259$var$DIRECTION.BOTTOM);
        }
    });
    return map;
};
class $5dbc86b44aaf2259$var$Raycast {
    constructor(){
        this.color = $5dbc86b44aaf2259$var$COLORS.BLACK;
        this.horizontal = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            color: this.color
        };
        this.vertical = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            color: this.color
        };
    }
    update(scene, target) {
        this.horizontal = {
            ...this.horizontal,
            x: 0,
            y: target.y,
            width: scene.canvas.width,
            height: target.height
        };
        this.vertical = {
            ...this.vertical,
            x: target.x,
            y: 0,
            width: target.width,
            height: scene.canvas.height
        };
    }
    render(scene) {
        if (!$5dbc86b44aaf2259$var$DEBUG) return;
        for (const object of [
            this.horizontal,
            this.vertical
        ]){
            scene.lineWidth = "1";
            scene.strokeStyle = object.color;
            scene.strokeRect(object.x, object.y, object.width, object.height);
        }
    }
}
class $5dbc86b44aaf2259$var$Player {
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.baseXVelocity = 8;
        this.baseYVelocity = 20;
        this.xVelocity = this.baseXVelocity;
        this.yVelocity = this.baseYVelocity;
        this.lastLog = {};
        this.raycast = new $5dbc86b44aaf2259$var$Raycast();
        this.direction = null;
        // jump
        this.isJumping = false;
        this.gravity = 1;
        this.jumpPower = 12;
        this.isOnGround = true;
        this.jumpVelocity = 60;
        this.jumperSpeedY = 0;
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
        this.direction = $5dbc86b44aaf2259$var$DIRECTION.LEFT;
    }
    moveRight(velocity) {
        this.x += velocity;
        this.direction = $5dbc86b44aaf2259$var$DIRECTION.RIGHT;
    }
    moveUp(velocity) {
        this.y -= velocity;
        this.direction = $5dbc86b44aaf2259$var$DIRECTION.TOP;
    }
    moveDown(velocity) {
        this.y += velocity;
        this.direction = $5dbc86b44aaf2259$var$DIRECTION.BOTTOM;
    }
    update(scene, objects) {
        const closestObjects = $5dbc86b44aaf2259$var$closest(scene, this, objects);
        const velocity = {
            top: closestObjects.top.distance.top === undefined ? this.baseYVelocity : Math.min(this.baseYVelocity, closestObjects.top.distance.top - 1),
            right: closestObjects.right.distance.right === undefined ? this.baseXVelocity : Math.min(this.baseXVelocity, closestObjects.right.distance.right - 1),
            bottom: closestObjects.bottom.distance.bottom === undefined ? this.baseYVelocity : Math.min(this.baseYVelocity, closestObjects.bottom.distance.bottom - 1),
            left: closestObjects.left.distance.left === undefined ? this.baseXVelocity : Math.min(this.baseXVelocity, closestObjects.left.distance.left - 1)
        };
        this.log(velocity.top);
        //////////////////////////////////////// movement
        if ($5dbc86b44aaf2259$var$keyboard.right) this.moveRight(velocity.right);
        if ($5dbc86b44aaf2259$var$keyboard.left) this.moveLeft(velocity.left);
        if ($5dbc86b44aaf2259$var$keyboard.down) this.moveDown(velocity.bottom);
        // jump movement
        if (velocity.bottom > 0) this.isOnGround = false;
        if (velocity.bottom <= 0) {
            this.isOnGround = true;
            this.yVelocity = this.gravity;
        }
        // start jump movement
        if ($5dbc86b44aaf2259$var$keyboard.space && this.isOnGround) this.yVelocity = Math.max(-this.baseYVelocity, -velocity.top);
        // when off the ground, decrease yVelocity over time
        if (!this.isOnGround) {
            // this.yVelocity *= 0.9; // resistance
            // eventually yVelocity will become positive number because of applied gravity
            // which will cause player to move into opposite direction (down)
            this.yVelocity = this.yVelocity * 0.9 + this.gravity;
            // update player direction
            if (this.yVelocity > 0) this.direction = $5dbc86b44aaf2259$var$DIRECTION.BOTTOM;
            else if (this.yVelocity < 0) this.direction = $5dbc86b44aaf2259$var$DIRECTION.TOP;
        }
        // move player (top or down)
        // calculate player y position. respect max bottom and top velocity.
        if (this.direction !== $5dbc86b44aaf2259$var$DIRECTION.TOP) // moving down
        this.y += Math.min(this.yVelocity, velocity.bottom);
        else if (this.direction !== $5dbc86b44aaf2259$var$DIRECTION.BOTTOM) // moving up
        this.y += Math.max(this.yVelocity, -velocity.top);
        /////////////////////////////////////// scene boundaries
        // top boundary
        if (this.y < 0) this.y = 0;
        // right boundary
        if (this.x + this.width > scene.canvas.width) this.x = scene.canvas.width - this.width;
        // left boundary
        if (this.x < 0) this.x = 0;
        // bottom boundary
        if (this.height + this.y > scene.canvas.height) this.y = scene.canvas.height - this.height;
        this.raycast.update(scene, this);
    }
    render(scene) {
        scene.fillStyle = this.color;
        scene.fillRect(this.x, this.y, this.width, this.height);
        scene.fillStyle = 'rgba(0, 0, 0, 1)';
        scene.font = '12px monospace';
        scene.fillText(`${this.x},${this.y}`, this.x, this.y);
        this.raycast.render(scene);
    }
}
class $5dbc86b44aaf2259$var$Thing {
    constructor(name, x, y, width, height, color){
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.originalColor = color;
    }
    update() {}
    render(scene) {
        scene.fillStyle = this.color;
        scene.fillRect(this.x, this.y, this.width, this.height);
        scene.fillStyle = 'rgba(0, 0, 0, 1)';
        scene.font = '12px monospace';
        scene.fillText(this.name, this.x, this.y);
    }
}
const $5dbc86b44aaf2259$var$canvas = document.getElementById("canvas");
const $5dbc86b44aaf2259$var$scene = $5dbc86b44aaf2259$var$canvas.getContext("2d");
const $5dbc86b44aaf2259$var$objects = [
    // ground
    new $5dbc86b44aaf2259$var$Thing('ground', 0, $5dbc86b44aaf2259$var$canvas.height - 80, $5dbc86b44aaf2259$var$canvas.width, 80, $5dbc86b44aaf2259$var$COLORS.PURPLE),
    // obstacles
    new $5dbc86b44aaf2259$var$Thing('box', 500, $5dbc86b44aaf2259$var$canvas.height - 120, 40, 40, $5dbc86b44aaf2259$var$COLORS.ORANGE),
    new $5dbc86b44aaf2259$var$Thing('box-1', 100, $5dbc86b44aaf2259$var$canvas.height - 160, 40, 40, $5dbc86b44aaf2259$var$COLORS.ORANGE),
    new $5dbc86b44aaf2259$var$Thing('platform', 200, $5dbc86b44aaf2259$var$canvas.height - 160, 40, 10, $5dbc86b44aaf2259$var$COLORS.YELLOW),
    new $5dbc86b44aaf2259$var$Thing('box-2', 350, $5dbc86b44aaf2259$var$canvas.height - 200, 120, 40, $5dbc86b44aaf2259$var$COLORS.ORANGE),
    new $5dbc86b44aaf2259$var$Player($5dbc86b44aaf2259$var$canvas.width / 2, $5dbc86b44aaf2259$var$canvas.height - 180, 20, 20, $5dbc86b44aaf2259$var$COLORS.GREEN)
];
const $5dbc86b44aaf2259$var$handleKeyDownPress = (event)=>{
    switch(event.key){
        case 'ArrowUp':
            $5dbc86b44aaf2259$var$keyboard.up = true;
            break;
        case 'ArrowLeft':
            $5dbc86b44aaf2259$var$keyboard.left = true;
            break;
        case 'ArrowDown':
            $5dbc86b44aaf2259$var$keyboard.down = true;
            break;
        case 'ArrowRight':
            $5dbc86b44aaf2259$var$keyboard.right = true;
            break;
        case ' ':
            if (!$5dbc86b44aaf2259$var$keyboard.space) $5dbc86b44aaf2259$var$keyboard.space = true;
            break;
        default:
            break;
    }
};
const $5dbc86b44aaf2259$var$handleKeyUpPress = (event)=>{
    switch(event.key){
        case 'ArrowUp':
            $5dbc86b44aaf2259$var$keyboard.up = false;
            break;
        case 'ArrowLeft':
            $5dbc86b44aaf2259$var$keyboard.left = false;
            break;
        case 'ArrowDown':
            $5dbc86b44aaf2259$var$keyboard.down = false;
            break;
        case 'ArrowRight':
            $5dbc86b44aaf2259$var$keyboard.right = false;
            break;
        case ' ':
            $5dbc86b44aaf2259$var$keyboard.space = false;
            break;
        default:
            break;
    }
};
document.addEventListener('keydown', $5dbc86b44aaf2259$var$handleKeyDownPress);
document.addEventListener('keyup', $5dbc86b44aaf2259$var$handleKeyUpPress);
function $5dbc86b44aaf2259$var$draw() {
    requestAnimationFrame($5dbc86b44aaf2259$var$draw);
    $5dbc86b44aaf2259$var$scene.clearRect(0, 0, $5dbc86b44aaf2259$var$canvas.width, $5dbc86b44aaf2259$var$canvas.height);
    for (const object of $5dbc86b44aaf2259$var$objects){
        object.update($5dbc86b44aaf2259$var$scene, $5dbc86b44aaf2259$var$objects.filter((current)=>current !== object));
        object.render($5dbc86b44aaf2259$var$scene);
    }
}
$5dbc86b44aaf2259$var$draw();


//# sourceMappingURL=16-platform-movement-2.cd8bdf3a.js.map
