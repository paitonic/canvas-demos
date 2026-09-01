
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

      var $parcel$global = globalThis;
    
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire02ee"];

if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire02ee"] = parcelRequire;
}

var parcelRegister = parcelRequire.register;
parcelRegister("5eMSG", function(module, exports) {

$parcel$export(module.exports, "newCanvas", () => $3d042d4e6f86daf3$export$a8ffe33bf0cbbbe8);
$parcel$export(module.exports, "clearScene", () => $3d042d4e6f86daf3$export$1a4ed0f652e876f1);
$parcel$export(module.exports, "renderLoop", () => $3d042d4e6f86daf3$export$ef810d0ad05662bc);
function $3d042d4e6f86daf3$export$a8ffe33bf0cbbbe8(width, height, background, target = document.body) {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    canvas.style.background = background;
    target.appendChild(canvas);
    return {
        canvas: canvas,
        scene: canvas.getContext('2d')
    };
}
function $3d042d4e6f86daf3$export$1a4ed0f652e876f1(scene, canvas) {
    scene.clearRect(0, 0, canvas.width, canvas.height);
}
function $3d042d4e6f86daf3$export$ef810d0ad05662bc(fn, delay) {
    let start = performance.now();
    let elapsed = 0;
    const draw = ()=>{
        requestAnimationFrame(draw);
        elapsed = elapsed + (performance.now() - start);
        start = performance.now();
        if (elapsed >= delay) {
            fn();
            elapsed = 0;
        }
    };
    draw();
}

});


var $5eMSG = parcelRequire("5eMSG");
const $17929b28ebd9f2a2$var$CELL_SIZE = 5;
const $17929b28ebd9f2a2$var$WORLD_SIZE = 128;
const $17929b28ebd9f2a2$var$REDRAW_EVERY_MS = 100;
const $17929b28ebd9f2a2$var$STATUS = {
    DEAD: 0,
    ALIVE: 1
};
const $17929b28ebd9f2a2$var$getRandomStatus = ()=>{
    return Math.floor(Math.random() * 2) === 0 ? $17929b28ebd9f2a2$var$STATUS.DEAD : $17929b28ebd9f2a2$var$STATUS.ALIVE;
};
class $17929b28ebd9f2a2$var$Cell {
    constructor(status, row, column){
        this.width = $17929b28ebd9f2a2$var$CELL_SIZE;
        this.height = $17929b28ebd9f2a2$var$CELL_SIZE;
        this.row = row;
        this.column = column;
        this.status = status;
    }
    isAlive() {
        return this.status === $17929b28ebd9f2a2$var$STATUS.ALIVE;
    }
    isDead() {
        return this.status === $17929b28ebd9f2a2$var$STATUS.DEAD;
    }
    die() {
        this.status = $17929b28ebd9f2a2$var$STATUS.DEAD;
    }
    live() {
        this.status = $17929b28ebd9f2a2$var$STATUS.ALIVE;
    }
    getNeighbors(world) {
        const positionOffset = [
            // top
            {
                row: -1,
                column: 0
            },
            // right
            {
                row: 0,
                column: 1
            },
            // bottom
            {
                row: 1,
                column: 0
            },
            // left
            {
                row: 0,
                column: -1
            },
            // top-left
            {
                row: -1,
                column: -1
            },
            // top-right
            {
                row: -1,
                column: 1
            },
            // bottom-left
            {
                row: 1,
                column: -1
            },
            // bottom-right
            {
                row: 1,
                column: 1
            }
        ];
        return positionOffset.map((offset)=>{
            return world?.[this.row + offset.row]?.[this.column + offset.column];
        }).filter((neighbor)=>neighbor !== undefined);
    }
    clone() {
        return new $17929b28ebd9f2a2$var$Cell(this.status, this.row, this.column);
    }
    draw(scene, x, y) {
        scene.fillStyle = this.isAlive() ? '#000' : '#fff';
        scene.fillRect(x, y, this.width, this.height);
    }
}
class $17929b28ebd9f2a2$var$Game {
    constructor(size, cell){
        this.generation = 0;
        this.size = size;
        this.cell = cell;
        this.world = this._create();
    }
    _create() {
        const world = [];
        for(let i = 0; i < this.size; i += 1){
            const group = [];
            for(let j = 0; j < this.size; j += 1)group.push(new this.cell($17929b28ebd9f2a2$var$getRandomStatus(), i, j));
            world.push(group);
        }
        return world;
    }
    play() {
        this.world = this.world.map((row)=>{
            return row.map((cell)=>{
                const neighbors = cell.getNeighbors(this.world).filter((neighbor)=>neighbor.isAlive());
                const aliveNeighborsCount = neighbors.length;
                const clone = cell.clone();
                if (cell.isAlive() && (aliveNeighborsCount === 2 || aliveNeighborsCount === 3)) ;
                else if (cell.isDead() && aliveNeighborsCount === 3) clone.live();
                else clone.die();
                return clone;
            });
        });
        this.generation += 1;
    }
    draw(scene) {
        for(let y = 0; y < this.size; y += 1)for(let x = 0; x < this.size; x += 1){
            const cell = this.world[x][y];
            cell.draw(scene, x * cell.width, y * cell.height);
        }
    }
}
const { scene: $17929b28ebd9f2a2$var$scene } = (0, $5eMSG.newCanvas)($17929b28ebd9f2a2$var$WORLD_SIZE * $17929b28ebd9f2a2$var$CELL_SIZE, $17929b28ebd9f2a2$var$WORLD_SIZE * $17929b28ebd9f2a2$var$CELL_SIZE, '#fff');
const $17929b28ebd9f2a2$var$game = new $17929b28ebd9f2a2$var$Game($17929b28ebd9f2a2$var$WORLD_SIZE, $17929b28ebd9f2a2$var$Cell);
const $17929b28ebd9f2a2$var$render = ()=>{
    $17929b28ebd9f2a2$var$game.play();
    $17929b28ebd9f2a2$var$game.draw($17929b28ebd9f2a2$var$scene);
};
// generation=0
$17929b28ebd9f2a2$var$game.draw($17929b28ebd9f2a2$var$scene);
let $17929b28ebd9f2a2$var$start = performance.now();
let $17929b28ebd9f2a2$var$elapsed = 0;
const $17929b28ebd9f2a2$var$draw = ()=>{
    requestAnimationFrame($17929b28ebd9f2a2$var$draw);
    // time elapsed between renders
    $17929b28ebd9f2a2$var$elapsed = $17929b28ebd9f2a2$var$elapsed + (performance.now() - $17929b28ebd9f2a2$var$start);
    $17929b28ebd9f2a2$var$start = performance.now();
    if ($17929b28ebd9f2a2$var$elapsed >= $17929b28ebd9f2a2$var$REDRAW_EVERY_MS) {
        console.log(`elapsed=${$17929b28ebd9f2a2$var$elapsed}ms`);
        $17929b28ebd9f2a2$var$render();
        $17929b28ebd9f2a2$var$elapsed = 0;
    }
};
$17929b28ebd9f2a2$var$draw();


//# sourceMappingURL=08-game-of-life.661094af.js.map
