var $3aa4b8938ff6a40c$exports = {};
const $3aa4b8938ff6a40c$var$COLORS = {
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
    SOFT_BLUE: '#c0ccfc'
};
const $3aa4b8938ff6a40c$var$DIRECTION = {
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
};
const $3aa4b8938ff6a40c$var$DIRECTION_HORIZONTAL = [
    $3aa4b8938ff6a40c$var$DIRECTION.LEFT,
    $3aa4b8938ff6a40c$var$DIRECTION.RIGHT
];
const $3aa4b8938ff6a40c$var$DIRECTION_VERTICAL = [
    $3aa4b8938ff6a40c$var$DIRECTION.TOP,
    $3aa4b8938ff6a40c$var$DIRECTION.BOTTOM
];
const $3aa4b8938ff6a40c$var$sum = (arr)=>{
    return arr.reduce((total, x)=>total + x, 0);
};
const $3aa4b8938ff6a40c$var$keyboard = {
    left: false,
    right: false,
    up: false,
    down: false,
    space: false
};
const $3aa4b8938ff6a40c$var$checkAABB = (objectA, objectB)=>{
    const top = objectB.y > objectA.y + objectA.height;
    const bottom = objectB.y + objectB.height < objectA.y;
    const right = objectB.x + objectB.width < objectA.x;
    const left = objectB.x > objectA.x + objectA.width;
    // if any of (top, right, bottom, left) is true, then there is no collision because
    // one edge is far away from the other
    return !(top || right || bottom || left);
};
const $3aa4b8938ff6a40c$var$distance = (player, target)=>{
    return {
        top: player.y - (target.y + target.height),
        right: target.x - (player.x + player.width),
        bottom: target.y - (player.y + player.height),
        left: player.x - (target.x + target.width)
    };
};
const $3aa4b8938ff6a40c$var$getObjectDimensions = ({ x: x, y: y, width: width, height: height, xVelocity: xVelocity, yVelocity: yVelocity })=>{
    return {
        x: x - xVelocity,
        y: y - yVelocity,
        width: xVelocity + width + xVelocity,
        height: yVelocity + height + yVelocity
    };
};
const $3aa4b8938ff6a40c$var$findNearbyObjects = (player, objects)=>{
    const playerDimensions = $3aa4b8938ff6a40c$var$getObjectDimensions(player);
    return objects.filter((object)=>{
        return $3aa4b8938ff6a40c$var$checkAABB(playerDimensions, object);
    });
};
const $3aa4b8938ff6a40c$var$getCollisionDirection = (offset)=>{
    let side = $3aa4b8938ff6a40c$var$DIRECTION.TOP, value = offset.top;
    [
        $3aa4b8938ff6a40c$var$DIRECTION.RIGHT,
        $3aa4b8938ff6a40c$var$DIRECTION.BOTTOM,
        $3aa4b8938ff6a40c$var$DIRECTION.LEFT
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
const $3aa4b8938ff6a40c$var$groupClosestObjectsByLocation = (player, objects)=>{
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
        const offset = $3aa4b8938ff6a40c$var$distance(player, object);
        // TODO
        // collision is triggered on the same object twice
        // when checking top-bottom and when checking left-right
        // insertIfCloser(object, offset, 'top');
        // insertIfCloser(object, offset, 'right');
        // insertIfCloser(object, offset, 'bottom');
        // insertIfCloser(object, offset, 'left');
        // if (offset.top >= 0 || offset.bottom >= 0) {
        //     insertIfCloser(object, offset, 'top');
        //     insertIfCloser(object, offset, 'bottom');
        // } else if (offset.left >= 0 || offset.right >= 0) {
        //     insertIfCloser(object, offset, 'right');
        //     insertIfCloser(object, offset, 'left');
        // }
        // if (offset.top >= 0) {
        //     insertIfCloser(object, offset, 'top');
        // } else if (offset.right >= 0) {
        //     insertIfCloser(object, offset, 'right');
        // } else if (offset.bottom >= 0) {
        //     insertIfCloser(object, offset, 'bottom');
        // } else if (offset.left >= 0) {
        //     insertIfCloser(object, offset, 'left');
        // }
        // determine WHERE the collision occurs:
        // is it horizontal collision?
        // is it left or right?
        // is it vertical collision?
        // is it top or down?
        const collision = $3aa4b8938ff6a40c$var$getCollisionDirection(offset);
        if ($3aa4b8938ff6a40c$var$DIRECTION_HORIZONTAL.includes(collision.direction)) {
            insertIfCloser(object, offset, 'left');
            insertIfCloser(object, offset, 'right');
        } else if ($3aa4b8938ff6a40c$var$DIRECTION_VERTICAL.includes(collision.direction)) {
            insertIfCloser(object, offset, 'top');
            insertIfCloser(object, offset, 'bottom');
        }
    });
    return map;
};
const $3aa4b8938ff6a40c$var$closest = (scene, player, objects)=>{
    // const { vertical: verticalRay, horizontal: horizontalRay } = raycast(scene, player);
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
        const offset = $3aa4b8938ff6a40c$var$distance(player, object);
        if ($3aa4b8938ff6a40c$var$checkAABB(player.raycast.horizontal, object)) {
            insertIfCloser(object, offset, $3aa4b8938ff6a40c$var$DIRECTION.LEFT);
            insertIfCloser(object, offset, $3aa4b8938ff6a40c$var$DIRECTION.RIGHT);
        } else if ($3aa4b8938ff6a40c$var$checkAABB(player.raycast.vertical, object)) {
            insertIfCloser(object, offset, $3aa4b8938ff6a40c$var$DIRECTION.TOP);
            insertIfCloser(object, offset, $3aa4b8938ff6a40c$var$DIRECTION.BOTTOM);
        }
    });
    return map;
};
class $3aa4b8938ff6a40c$var$Beam {
    constructor(){
        this.horizontal = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            color: '#000000'
        };
        this.vertical = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            color: '#000000'
        };
    }
    canvasBeam(scene, target) {
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
    velocityBeam(scene, target) {
        // actually its maxXVelocity, maxYVelocity instead of xVlocity and yVelocity
        this.horizontal = {
            ...this.horizontal,
            x: target.x - target.xVelocity,
            y: target.y,
            width: target.xVelocity + target.width + target.xVelocity,
            height: target.height
        };
        this.vertical = {
            ...this.vertical,
            x: target.x,
            y: target.y - target.yVelocity,
            width: target.width,
            height: target.yVelocity + target.height + target.yVelocity
        };
    }
    update(scene, target) {
        this.canvasBeam(scene, target);
    // this.velocityBeam(scene, target)
    }
    render(scene) {
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
class $3aa4b8938ff6a40c$var$Raycast {
    constructor(){
        this.horizontal = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            color: '#000000'
        };
        this.vertical = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            color: '#000000'
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
const $3aa4b8938ff6a40c$var$raycast = (scene, object)=>{
    const common = {
        color: '#000000'
    };
    return {
        horizontal: {
            ...common,
            x: 0,
            y: object.y,
            width: scene.canvas.width,
            height: object.height
        },
        vertical: {
            ...common,
            x: object.x,
            y: 0,
            width: object.width,
            height: scene.canvas.height
        }
    };
};
class $3aa4b8938ff6a40c$var$Player {
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
        this.lastLog = {};
        this.raycast = new $3aa4b8938ff6a40c$var$Raycast();
        this.direction = null;
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
        this.direction = $3aa4b8938ff6a40c$var$DIRECTION.LEFT;
    }
    moveRight(velocity) {
        this.x += velocity;
        this.direction = $3aa4b8938ff6a40c$var$DIRECTION.RIGHT;
    }
    moveUp(velocity) {
        this.y -= velocity;
        this.direction = $3aa4b8938ff6a40c$var$DIRECTION.TOP;
    }
    moveDown(velocity) {
        this.y += velocity;
        this.direction = $3aa4b8938ff6a40c$var$DIRECTION.BOTTOM;
    }
    // returns closest objects to player
    closest(scene, player, objects) {
        // scene.canvas.width, scene.canvas.height
        // const [top, right, bottom, left] = [0, 0, 0, 0];
        const closestObjects = {
            top: {
                objects: [],
                distance: {}
            },
            right: {
                objects: [],
                distance: []
            },
            bottom: {
                objects: [],
                distance: []
            },
            left: {
                objects: [],
                distance: {}
            }
        };
        objects.forEach((object)=>{
            if ($3aa4b8938ff6a40c$var$checkAABB(this.beam.horizontal, object)) {
                const offset = $3aa4b8938ff6a40c$var$distance(this, object);
                if (offset.left >= 0) {
                    if (offset.left === closestObjects.left.distance.left) closestObjects.left.objects.push(object);
                    else if (!closestObjects.left.distance.left || offset.left < closestObjects.left.distance.left) {
                        closestObjects.left.objects = [
                            object
                        ];
                        closestObjects.left.distance = offset;
                    }
                } else if (offset.right >= 0) {
                    if (offset.right === closestObjects.right.distance.right) closestObjects.right.objects.push(object);
                    else if (!closestObjects.right.distance.right || offset.right < closestObjects.right.distance.right) {
                        closestObjects.right.objects = [
                            object
                        ];
                        closestObjects.right.distance = offset;
                    }
                }
            } else if ($3aa4b8938ff6a40c$var$checkAABB(this.beam.vertical, object)) {
                const offset = $3aa4b8938ff6a40c$var$distance(this, object);
                if (offset.top >= 0) {
                    if (offset.top === closestObjects.top.distance.top) closestObjects.top.objects.push(object);
                    else if (!closestObjects.top.distance.top || offset.top < closestObjects.top.distance.top) {
                        closestObjects.top.objects = [
                            object
                        ];
                        closestObjects.top.distance = offset;
                    }
                } else if (offset.bottom >= 0) {
                    if (offset.bottom === closestObjects.bottom.distance.bottom) closestObjects.bottom.objects.push(object);
                    else if (!closestObjects.bottom.distance.bottom || offset.bottom < closestObjects.bottom.distance.bottom) {
                        closestObjects.bottom.objects = [
                            object
                        ];
                        closestObjects.bottom.distance = offset;
                    }
                }
            }
        });
        return closestObjects;
    }
    mark(objects) {
        for (const object of objects)object.markAsClosest();
    }
    update(scene, objects) {
        // TODO
        // calculate closest top, right, bottom and left objects
        // player can be close to multiple top objects
        /////////////// mark
        // const nearby = findNearbyObjects(this, objects);
        // this.log(nearby)
        // const closestObjects = groupClosestObjectsByLocation(this, nearby);
        // const closestObjects = this.closest(scene, this, objects);
        // this.log(closestObjects)
        const closestObjects = $3aa4b8938ff6a40c$var$closest(scene, this, objects);
        for (const object of objects)object.unMarkAsClosest();
        this.mark(closestObjects.top.objects);
        this.mark(closestObjects.right.objects);
        this.mark(closestObjects.bottom.objects);
        this.mark(closestObjects.left.objects);
        ///////////////
        const velocity = {
            top: closestObjects.top.distance.top === undefined ? this.baseYVelocity : Math.min(this.baseYVelocity, closestObjects.top.distance.top - 1),
            right: closestObjects.right.distance.right === undefined ? this.baseXVelocity : Math.min(this.baseXVelocity, closestObjects.right.distance.right - 1),
            bottom: closestObjects.bottom.distance.bottom === undefined ? this.baseYVelocity : Math.min(this.baseYVelocity, closestObjects.bottom.distance.bottom - 1),
            left: closestObjects.left.distance.left === undefined ? this.baseXVelocity : Math.min(this.baseXVelocity, closestObjects.left.distance.left - 1)
        };
        // const velocity = {
        //     top: closestObjects.top.distance.top === undefined ? this.baseYVelocity : Math.min(this.baseYVelocity, closestObjects.top.distance.top),
        //     right: closestObjects.right.distance.right === undefined ? this.baseXVelocity : Math.min(this.baseXVelocity, closestObjects.right.distance.right),
        //     bottom: closestObjects.bottom.distance.bottom === undefined ? this.baseYVelocity : Math.min(this.baseYVelocity, closestObjects.bottom.distance.bottom),
        //     left: closestObjects.left.distance.left === undefined ? this.baseXVelocity : Math.min(this.baseXVelocity, closestObjects.left.distance.left)
        // }
        //////////////////////////////////////// movement
        if ($3aa4b8938ff6a40c$var$keyboard.right) this.moveRight(velocity.right);
        if ($3aa4b8938ff6a40c$var$keyboard.left) this.moveLeft(velocity.left);
        if ($3aa4b8938ff6a40c$var$keyboard.up) this.moveUp(velocity.top);
        if ($3aa4b8938ff6a40c$var$keyboard.down) this.moveDown(velocity.bottom);
        /////////////////////////////////////// scene boundaries
        // top boundary
        if (this.y < 0) this.y = 0;
        // right boundary
        if (this.x + this.width > scene.canvas.width) this.x = scene.canvas.width - this.width;
        // left boundary
        if (this.x < 0) this.x = 0;
        // bottom boundary
        if (this.height + this.y > scene.canvas.height) this.y = scene.canvas.height - this.height;
        // TODO: Update raycast so that the ray not penetrating the closest objects
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
class $3aa4b8938ff6a40c$var$Thing {
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
    markAsClosest() {
        this.color = $3aa4b8938ff6a40c$var$COLORS.YELLOW;
    }
    unMarkAsClosest() {
        this.color = this.originalColor;
    }
}
const $3aa4b8938ff6a40c$var$canvas = document.getElementById("canvas");
const $3aa4b8938ff6a40c$var$scene = $3aa4b8938ff6a40c$var$canvas.getContext("2d");
// const ground = new Thing('ground', 0, canvas.height - 80, canvas.width, 80, '#b399c9');
const $3aa4b8938ff6a40c$var$player = new $3aa4b8938ff6a40c$var$Player($3aa4b8938ff6a40c$var$canvas.width / 2, $3aa4b8938ff6a40c$var$canvas.height - 20, 20, 20, '#8dc267');
const $3aa4b8938ff6a40c$var$box = new $3aa4b8938ff6a40c$var$Thing('box', 500, $3aa4b8938ff6a40c$var$canvas.height - 40, 40, 40, '#ef8f4f');
const $3aa4b8938ff6a40c$var$box2 = new $3aa4b8938ff6a40c$var$Thing('box-2', $3aa4b8938ff6a40c$var$canvas.width / 2 - 120, $3aa4b8938ff6a40c$var$canvas.height - 120, 40, 40, '#ef8f4f');
const $3aa4b8938ff6a40c$var$box3 = new $3aa4b8938ff6a40c$var$Thing('box-3', 200, $3aa4b8938ff6a40c$var$canvas.height - 220, 40, 40, '#ef8f4f');
const $3aa4b8938ff6a40c$var$box4 = new $3aa4b8938ff6a40c$var$Thing('box-4', 240, $3aa4b8938ff6a40c$var$canvas.height - 220, 40, 40, '#b399c9');
const $3aa4b8938ff6a40c$var$box5 = new $3aa4b8938ff6a40c$var$Thing('box-5', 300, $3aa4b8938ff6a40c$var$canvas.height - 260, 40, 40, '#ef8f4f');
const $3aa4b8938ff6a40c$var$box6 = new $3aa4b8938ff6a40c$var$Thing('box-6', 340, $3aa4b8938ff6a40c$var$canvas.height - 270, 40, 40, '#b399c9');
const $3aa4b8938ff6a40c$var$box7 = new $3aa4b8938ff6a40c$var$Thing('box-7', 240, $3aa4b8938ff6a40c$var$canvas.height - 350, 40, 40, '#b399c9');
const $3aa4b8938ff6a40c$var$box8 = new $3aa4b8938ff6a40c$var$Thing('box-8', 0, $3aa4b8938ff6a40c$var$canvas.height - 40, 40, 40, '#ef8f4f');
const $3aa4b8938ff6a40c$var$box9 = new $3aa4b8938ff6a40c$var$Thing('box-9', 0, $3aa4b8938ff6a40c$var$canvas.height - 80, 40, 40, '#b399c9');
const $3aa4b8938ff6a40c$var$box10 = new $3aa4b8938ff6a40c$var$Thing('box-10', 40, $3aa4b8938ff6a40c$var$canvas.height - 40, 40, 40, '#b399c9');
const $3aa4b8938ff6a40c$var$box11 = new $3aa4b8938ff6a40c$var$Thing('box-11', 80, $3aa4b8938ff6a40c$var$canvas.height - 140, 40, 40, '#ef8f4f');
const $3aa4b8938ff6a40c$var$box12 = new $3aa4b8938ff6a40c$var$Thing('box-12', 40, $3aa4b8938ff6a40c$var$canvas.height - 140, 40, 40, '#b399c9');
const $3aa4b8938ff6a40c$var$box13 = new $3aa4b8938ff6a40c$var$Thing('box-13', 80, $3aa4b8938ff6a40c$var$canvas.height - 100, 40, 40, '#b399c9');
const $3aa4b8938ff6a40c$var$box14 = new $3aa4b8938ff6a40c$var$Thing('box-14', 40, 40, 40, 40, '#b399c9');
const $3aa4b8938ff6a40c$var$box15 = new $3aa4b8938ff6a40c$var$Thing('box-15', 80, 40, 40, 40, '#ef8f4f');
const $3aa4b8938ff6a40c$var$box16 = new $3aa4b8938ff6a40c$var$Thing('box-16', 120, 40, 40, 40, '#b399c9');
const $3aa4b8938ff6a40c$var$box17 = new $3aa4b8938ff6a40c$var$Thing('box-17', 40, 120, 40, 40, '#ef8f4f');
const $3aa4b8938ff6a40c$var$box18 = new $3aa4b8938ff6a40c$var$Thing('box-18', 80, 120, 40, 40, '#b399c9');
const $3aa4b8938ff6a40c$var$box19 = new $3aa4b8938ff6a40c$var$Thing('box-19', 120, 120, 40, 40, '#ef8f4f');
const $3aa4b8938ff6a40c$var$box20 = new $3aa4b8938ff6a40c$var$Thing('box-20', $3aa4b8938ff6a40c$var$canvas.width - 80, 40, 40, 40, '#ef8f4f');
const $3aa4b8938ff6a40c$var$box21 = new $3aa4b8938ff6a40c$var$Thing('box-21', $3aa4b8938ff6a40c$var$canvas.width - 80, 80, 40, 40, '#b399c9');
const $3aa4b8938ff6a40c$var$box22 = new $3aa4b8938ff6a40c$var$Thing('box-22', $3aa4b8938ff6a40c$var$canvas.width - 80, 120, 40, 40, '#ef8f4f');
const $3aa4b8938ff6a40c$var$box23 = new $3aa4b8938ff6a40c$var$Thing('box-23', $3aa4b8938ff6a40c$var$canvas.width - 160, 40, 40, 40, '#ef8f4f');
const $3aa4b8938ff6a40c$var$box24 = new $3aa4b8938ff6a40c$var$Thing('box-24', $3aa4b8938ff6a40c$var$canvas.width - 160, 80, 40, 40, '#b399c9');
const $3aa4b8938ff6a40c$var$box25 = new $3aa4b8938ff6a40c$var$Thing('box-25', $3aa4b8938ff6a40c$var$canvas.width - 160, 120, 40, 40, '#ef8f4f');
const $3aa4b8938ff6a40c$var$box26 = new $3aa4b8938ff6a40c$var$Thing('box-26', $3aa4b8938ff6a40c$var$canvas.width - 200, 200, 40, 40, '#b399c9');
const $3aa4b8938ff6a40c$var$box27 = new $3aa4b8938ff6a40c$var$Thing('box-27', $3aa4b8938ff6a40c$var$canvas.width - 160, 200, 40, 40, '#ef8f4f');
const $3aa4b8938ff6a40c$var$box28 = new $3aa4b8938ff6a40c$var$Thing('box-28', $3aa4b8938ff6a40c$var$canvas.width - 120, 200, 40, 40, '#b399c9');
const $3aa4b8938ff6a40c$var$box29 = new $3aa4b8938ff6a40c$var$Thing('box-29', $3aa4b8938ff6a40c$var$canvas.width - 80, 200, 40, 40, '#ef8f4f');
const $3aa4b8938ff6a40c$var$box30 = new $3aa4b8938ff6a40c$var$Thing('box-30', 400, 300, 40, 40, '#ef8f4f');
const $3aa4b8938ff6a40c$var$box31 = new $3aa4b8938ff6a40c$var$Thing('box-31', 360, 340, 40, 40, '#b399c9');
const $3aa4b8938ff6a40c$var$box32 = new $3aa4b8938ff6a40c$var$Thing('box-32', 400, 340, 40, 40, '#b399c9');
const $3aa4b8938ff6a40c$var$box33 = new $3aa4b8938ff6a40c$var$Thing('box-33', 400, 380, 40, 40, '#ef8f4f');
const $3aa4b8938ff6a40c$var$box34 = new $3aa4b8938ff6a40c$var$Thing('box-34', 440, 340, 40, 40, '#b399c9');
const $3aa4b8938ff6a40c$var$box35 = new $3aa4b8938ff6a40c$var$Thing('box-35', 300, 380, 15, 15, '#ef8f4f');
const $3aa4b8938ff6a40c$var$box36 = new $3aa4b8938ff6a40c$var$Thing('box-36', 300, 420, 15, 15, '#ef8f4f');
const $3aa4b8938ff6a40c$var$box37 = new $3aa4b8938ff6a40c$var$Thing('box-37', 80, 200, 10, 10, '#ef8f4f');
const $3aa4b8938ff6a40c$var$box38 = new $3aa4b8938ff6a40c$var$Thing('box-38', 80, 210, 10, 10, '#b399c9');
const $3aa4b8938ff6a40c$var$platform1 = new $3aa4b8938ff6a40c$var$Thing('platform1', 50, 480, 150, 10, '#fff');
const $3aa4b8938ff6a40c$var$platform2 = new $3aa4b8938ff6a40c$var$Thing('platform2', 250, 500, 150, 10, '#fff');
// const beam = new Beam();
// const rayTop = new Thing('ray-top', 0, 0, 0, 0, '#49a0e1');
// const rayRight = new Thing('ray-right', 0, 0, 0, 0, '#49a0e1');
// const rayBottom = new Thing('ray-bottom', 0, 0, 0 , 0, '#49a0e1');
// const rayLeft = new Thing('ray-left', 0, 0, 0, 0, '#49a0e1');
const $3aa4b8938ff6a40c$var$objects = [
    // ground,
    $3aa4b8938ff6a40c$var$box,
    $3aa4b8938ff6a40c$var$box2,
    $3aa4b8938ff6a40c$var$box3,
    $3aa4b8938ff6a40c$var$box4,
    $3aa4b8938ff6a40c$var$box5,
    $3aa4b8938ff6a40c$var$box6,
    $3aa4b8938ff6a40c$var$box7,
    $3aa4b8938ff6a40c$var$box8,
    $3aa4b8938ff6a40c$var$box9,
    $3aa4b8938ff6a40c$var$box10,
    $3aa4b8938ff6a40c$var$box11,
    $3aa4b8938ff6a40c$var$box12,
    $3aa4b8938ff6a40c$var$box13,
    $3aa4b8938ff6a40c$var$box14,
    $3aa4b8938ff6a40c$var$box15,
    $3aa4b8938ff6a40c$var$box16,
    $3aa4b8938ff6a40c$var$box17,
    $3aa4b8938ff6a40c$var$box18,
    $3aa4b8938ff6a40c$var$box19,
    $3aa4b8938ff6a40c$var$box20,
    $3aa4b8938ff6a40c$var$box21,
    $3aa4b8938ff6a40c$var$box22,
    $3aa4b8938ff6a40c$var$box23,
    $3aa4b8938ff6a40c$var$box24,
    $3aa4b8938ff6a40c$var$box25,
    $3aa4b8938ff6a40c$var$box26,
    $3aa4b8938ff6a40c$var$box27,
    $3aa4b8938ff6a40c$var$box28,
    $3aa4b8938ff6a40c$var$box29,
    $3aa4b8938ff6a40c$var$box30,
    $3aa4b8938ff6a40c$var$box31,
    $3aa4b8938ff6a40c$var$box32,
    $3aa4b8938ff6a40c$var$box33,
    $3aa4b8938ff6a40c$var$box34,
    $3aa4b8938ff6a40c$var$box35,
    $3aa4b8938ff6a40c$var$box36,
    $3aa4b8938ff6a40c$var$box37,
    $3aa4b8938ff6a40c$var$box38,
    $3aa4b8938ff6a40c$var$player
];
const $3aa4b8938ff6a40c$var$handleKeyDownPress = (event)=>{
    switch(event.key){
        case 'ArrowUp':
            $3aa4b8938ff6a40c$var$keyboard.up = true;
            break;
        case 'ArrowLeft':
            $3aa4b8938ff6a40c$var$keyboard.left = true;
            break;
        case 'ArrowDown':
            $3aa4b8938ff6a40c$var$keyboard.down = true;
            break;
        case 'ArrowRight':
            $3aa4b8938ff6a40c$var$keyboard.right = true;
            break;
        case ' ':
            if (!$3aa4b8938ff6a40c$var$keyboard.space) $3aa4b8938ff6a40c$var$keyboard.space = true;
            break;
        default:
            break;
    }
};
const $3aa4b8938ff6a40c$var$handleKeyUpPress = (event)=>{
    switch(event.key){
        case 'ArrowUp':
            $3aa4b8938ff6a40c$var$keyboard.up = false;
            break;
        case 'ArrowLeft':
            $3aa4b8938ff6a40c$var$keyboard.left = false;
            break;
        case 'ArrowDown':
            $3aa4b8938ff6a40c$var$keyboard.down = false;
            break;
        case 'ArrowRight':
            $3aa4b8938ff6a40c$var$keyboard.right = false;
            break;
        case ' ':
            $3aa4b8938ff6a40c$var$keyboard.space = false;
            break;
        default:
            break;
    }
};
document.addEventListener('keydown', $3aa4b8938ff6a40c$var$handleKeyDownPress);
document.addEventListener('keyup', $3aa4b8938ff6a40c$var$handleKeyUpPress);
function $3aa4b8938ff6a40c$var$draw() {
    requestAnimationFrame($3aa4b8938ff6a40c$var$draw);
    $3aa4b8938ff6a40c$var$scene.clearRect(0, 0, $3aa4b8938ff6a40c$var$canvas.width, $3aa4b8938ff6a40c$var$canvas.height);
    for (const object of $3aa4b8938ff6a40c$var$objects){
        object.update($3aa4b8938ff6a40c$var$scene, $3aa4b8938ff6a40c$var$objects.filter((current)=>current !== object));
        object.render($3aa4b8938ff6a40c$var$scene);
    }
}
$3aa4b8938ff6a40c$var$draw();


//# sourceMappingURL=13-platformer-closest-objects.654ebaba.js.map
