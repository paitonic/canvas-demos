
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
const { canvas: $ebaa3175265c5305$var$canvas, scene: $ebaa3175265c5305$var$scene } = (0, $5eMSG.newCanvas)(500, 380, '#e2e2e2');
let $ebaa3175265c5305$var$horizontalRuler, $ebaa3175265c5305$var$verticalRuler;
$ebaa3175265c5305$var$canvas.addEventListener('mousemove', (event)=>{
    $ebaa3175265c5305$var$horizontalRuler = $ebaa3175265c5305$var$createHorizontalRuler(event.offsetX, event.offsetY, 'orange');
    $ebaa3175265c5305$var$verticalRuler = $ebaa3175265c5305$var$createVerticalRuler(event.offsetX, event.offsetY, 'orange');
});
function $ebaa3175265c5305$var$createHorizontalRuler(mouseX, mouseY, color) {
    return {
        x1: 0,
        y1: mouseY,
        x2: mouseX,
        y2: mouseY,
        color: color
    };
}
function $ebaa3175265c5305$var$createVerticalRuler(mouseX, mouseY, color) {
    return {
        x1: mouseX,
        y1: 0,
        x2: mouseX,
        y2: mouseY,
        color: color
    };
}
function $ebaa3175265c5305$var$drawRuler(scene, ruler) {
    (0, $dgXvC.line)(scene, ruler.x1, ruler.y1, ruler.x2, ruler.y2, 1, ruler.color);
}
function $ebaa3175265c5305$var$drawLabel(scene, ruler, color, fontSize, position) {
    scene.fillStyle = color;
    scene.font = `${fontSize}x monospace`;
    scene.fillText(`(${ruler.x2}, ${ruler.y2})`, ruler.x2, ruler.y2);
}
function $ebaa3175265c5305$var$draw() {
    requestAnimationFrame($ebaa3175265c5305$var$draw);
    (0, $5eMSG.clearScene)($ebaa3175265c5305$var$scene, $ebaa3175265c5305$var$canvas);
    if ($ebaa3175265c5305$var$horizontalRuler) $ebaa3175265c5305$var$drawRuler($ebaa3175265c5305$var$scene, $ebaa3175265c5305$var$horizontalRuler);
    if ($ebaa3175265c5305$var$verticalRuler) {
        $ebaa3175265c5305$var$drawRuler($ebaa3175265c5305$var$scene, $ebaa3175265c5305$var$verticalRuler);
        $ebaa3175265c5305$var$drawLabel($ebaa3175265c5305$var$scene, $ebaa3175265c5305$var$verticalRuler, '#000000');
    }
}
$ebaa3175265c5305$var$draw(); // class Ruler {
 //     constructor(offsetX, offsetY, color, isHorizontal) {
 //         this.x1 = isHorizontal ? 0 : offsetX;
 //         this.y1 = isHorizontal ? offsetY : 0;
 //         this.x2 = offsetX;
 //         this.y2 = offsetY;
 //         this.color = color;
 //     }
 //
 //     draw(scene) {
 //         line(scene, this.x1, this.y1, this.x2, this.y2, this.color);
 //     }
 // }


//# sourceMappingURL=07-mouse-ruler.99f53a2e.js.map
