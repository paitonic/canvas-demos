
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

parcelRegister("dgXvC", function(module, exports) {

$parcel$export(module.exports, "line", () => $9a9aee354f1c7041$export$53f1d5ea8de3d7c);
function $9a9aee354f1c7041$export$53f1d5ea8de3d7c(scene, x1, y1, x2, y2, width, color) {
    scene.beginPath();
    scene.lineWidth = width;
    scene.strokeStyle = color;
    scene.moveTo(x1, y1);
    scene.lineTo(x2, y2);
    scene.stroke();
}

});


var $5eMSG = parcelRequire("5eMSG");

var $dgXvC = parcelRequire("dgXvC");
const $f8e72f014a9039cf$var$CUBE_SIZE = 128;
const $f8e72f014a9039cf$var$CUBE_COLOR = '#000';
const $f8e72f014a9039cf$var$CUBE_THICKNESS = 1;
const $f8e72f014a9039cf$var$CANVAS_SIZE = 512;
const $f8e72f014a9039cf$var$cubes = [];
const { canvas: $f8e72f014a9039cf$var$canvas, scene: $f8e72f014a9039cf$var$scene } = (0, $5eMSG.newCanvas)($f8e72f014a9039cf$var$CANVAS_SIZE, $f8e72f014a9039cf$var$CANVAS_SIZE, '#fff');
const $f8e72f014a9039cf$var$getCubePosition = (event)=>{
    const { x: canvasX, y: canvasY } = $f8e72f014a9039cf$var$canvas.getBoundingClientRect();
    return {
        x: event.clientX - canvasX - $f8e72f014a9039cf$var$CUBE_SIZE / 2,
        y: event.clientY - canvasY - $f8e72f014a9039cf$var$CUBE_SIZE / 2
    };
};
let $f8e72f014a9039cf$var$floatingCubeX = 200;
let $f8e72f014a9039cf$var$floatingCubeY = 150;
$f8e72f014a9039cf$var$canvas.addEventListener('mousemove', (event)=>{
    const position = $f8e72f014a9039cf$var$getCubePosition(event);
    $f8e72f014a9039cf$var$floatingCubeX = position.x;
    $f8e72f014a9039cf$var$floatingCubeY = position.y;
});
$f8e72f014a9039cf$var$canvas.addEventListener('click', (event)=>{
    $f8e72f014a9039cf$var$cubes.push($f8e72f014a9039cf$var$getCubePosition(event));
});
const $f8e72f014a9039cf$var$drawCube = (scene, size, x, y, width, color)=>{
    (0, $dgXvC.line)(scene, x, y, x + size, y, width, color);
    (0, $dgXvC.line)(scene, x, y, x - size / 2, y + size / 2, width, color);
    (0, $dgXvC.line)(scene, x + size, y, x + size / 2, y + size / 2, width, color);
    (0, $dgXvC.line)(scene, x - size / 2, y + size / 2, x + size / 2, y + size / 2, width, color);
    (0, $dgXvC.line)(scene, x, y, x, y + size, width, color);
    (0, $dgXvC.line)(scene, x + size, y, x + size, y + size, width, color);
    (0, $dgXvC.line)(scene, x - size / 2, y + size / 2, x - size / 2, y + size / 2 + size, width, color);
    (0, $dgXvC.line)(scene, x + size / 2, y + size / 2, x + size / 2, y + size / 2 + size, width, color);
    (0, $dgXvC.line)(scene, x, y + size, x + size, y + size, width, color);
    (0, $dgXvC.line)(scene, x, y + size, x - size / 2, y + size * 2 - size / 2, width, color);
    (0, $dgXvC.line)(scene, x + size, y + size, x + size - size / 2, y + size * 2 - size / 2, width, color);
    (0, $dgXvC.line)(scene, x - size / 2, y + size * 2 - size / 2, x + size - size / 2, y + size * 2 - size / 2, width, color);
};
const $f8e72f014a9039cf$var$draw = ()=>{
    (0, $5eMSG.clearScene)($f8e72f014a9039cf$var$scene, $f8e72f014a9039cf$var$canvas);
    $f8e72f014a9039cf$var$drawCube($f8e72f014a9039cf$var$scene, $f8e72f014a9039cf$var$CUBE_SIZE, $f8e72f014a9039cf$var$floatingCubeX, $f8e72f014a9039cf$var$floatingCubeY, $f8e72f014a9039cf$var$CUBE_THICKNESS, $f8e72f014a9039cf$var$CUBE_COLOR);
    for (const cube of $f8e72f014a9039cf$var$cubes){
        const { x: x, y: y } = cube;
        $f8e72f014a9039cf$var$drawCube($f8e72f014a9039cf$var$scene, $f8e72f014a9039cf$var$CUBE_SIZE, x, y, $f8e72f014a9039cf$var$CUBE_THICKNESS, $f8e72f014a9039cf$var$CUBE_COLOR);
    }
};
(0, $5eMSG.renderLoop)($f8e72f014a9039cf$var$draw, 0);


//# sourceMappingURL=09-cube-2d.83ef51a3.js.map
