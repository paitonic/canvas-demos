
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
const $a952c3f787e78003$var$CANVAS_SIZE = 512;
const { canvas: $a952c3f787e78003$var$canvas, scene: $a952c3f787e78003$var$scene } = (0, $5eMSG.newCanvas)($a952c3f787e78003$var$CANVAS_SIZE, $a952c3f787e78003$var$CANVAS_SIZE, '#fff');
const $a952c3f787e78003$var$getMousePosition = (event)=>{
    const { x: canvasX, y: canvasY } = $a952c3f787e78003$var$canvas.getBoundingClientRect();
    return {
        x: event.clientX - canvasX,
        y: event.clientY - canvasY
    };
};
let $a952c3f787e78003$var$mouseX = 0;
let $a952c3f787e78003$var$mouseY = 0;
$a952c3f787e78003$var$canvas.addEventListener('mousemove', (event)=>{
    const position = $a952c3f787e78003$var$getMousePosition(event);
    $a952c3f787e78003$var$mouseX = position.x;
    $a952c3f787e78003$var$mouseY = position.y;
});
const $a952c3f787e78003$var$draw = ()=>{
    (0, $5eMSG.clearScene)($a952c3f787e78003$var$scene, $a952c3f787e78003$var$canvas);
    (0, $dgXvC.line)($a952c3f787e78003$var$scene, $a952c3f787e78003$var$CANVAS_SIZE / 2, $a952c3f787e78003$var$CANVAS_SIZE / 2, $a952c3f787e78003$var$mouseX, $a952c3f787e78003$var$mouseY, 1, '#000');
};
(0, $5eMSG.renderLoop)($a952c3f787e78003$var$draw, 0);


//# sourceMappingURL=10-just-a-line.1a7dfecd.js.map
