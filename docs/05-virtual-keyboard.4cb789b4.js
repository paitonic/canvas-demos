
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

const $7a6bae5c11d70fb7$export$cfdd767f5a513509 = ()=>{
    const keyPressedState = {};
    const keyEventHandler = (event, isPressed)=>{
        // if you press Shift+D and release the Shift before D, then D will be still in pressed state.
        // this is erases the state when Shift released.
        if (event.type === 'keyup' && event.key === 'Shift') Object.keys(keyPressedState).forEach((key)=>{
            delete keyPressedState[key];
        });
        keyPressedState[event.key] = isPressed;
    };
    const handleKeyDownPress = (event)=>{
        // log(`handleKeyDownPress: ${event.key}`);
        keyEventHandler(event, true);
    };
    const handleKeyUpPress = (event)=>{
        // log(`handleKeyUpPress: ${event.key}`);
        keyEventHandler(event, false);
    };
    document.addEventListener('keydown', handleKeyDownPress);
    document.addEventListener('keyup', handleKeyUpPress);
    return keyPressedState;
} // usage:
 // const keyPressed = keyboard();
 // if (keyPressed['ArrowLeft']) { ... }
;



var $dgXvC = parcelRequire("dgXvC");
class $f84b79194830f7ac$export$b1b9ad9a81f76fc7 {
    constructor(canvas, fontSize, fontColor){
        this.canvas = canvas;
        this.x = 0;
        this.y = 0;
        this.fontColor = fontColor;
        this.fontSize = fontSize;
        this.listener = this.listen.bind(this);
        this.canvas.addEventListener('mousemove', this.listener);
    }
    draw(scene) {
        scene.fillStyle = this.fontColor;
        scene.font = `${this.fontSize}px monospace`;
        scene.fillText(`(${this.x}, ${this.y})`, this.x, this.y);
    }
    listen(event) {
        this.x = event.offsetX;
        this.y = event.offsetY;
    }
    destroy() {
        this.canvas.removeEventListener('mousemove', this.listener);
    }
}
class $f84b79194830f7ac$export$72a4dbfaa588abb2 {
    constructor(mouseX, mouseY, width, color){
        this.x1 = mouseX;
        this.y1 = mouseY;
        this.x2 = 0;
        this.y2 = 0;
        this.color = color;
        this.width = width;
    }
    draw(scene) {
        (0, $dgXvC.line)(scene, this.x1, this.y1, this.x2, this.y2, this.width, this.color);
    }
}
class $f84b79194830f7ac$export$7bf59defd2f3e851 extends $f84b79194830f7ac$export$72a4dbfaa588abb2 {
    constructor(mouseX, mouseY, width, color){
        super(mouseX, mouseY, width, color);
        this.update(mouseX, mouseY);
    }
    update(mouseX, mouseY) {
        this.x1 = 0;
        this.y1 = mouseY;
        this.x2 = mouseX;
        this.y2 = mouseY;
    }
}
class $f84b79194830f7ac$export$fcd59f9313b2d545 extends $f84b79194830f7ac$export$72a4dbfaa588abb2 {
    constructor(mouseX, mouseY, width, color){
        super(mouseX, mouseY, width, color);
        this.update(mouseX, mouseY);
    }
    update(mouseX, mouseY) {
        this.x1 = mouseX;
        this.y1 = 0;
        this.x2 = mouseX;
        this.y2 = mouseY;
    }
} // const positionReporter = new MousePositionReporter(canvas, 10, '#000000');
 // positionReporter.initialize();
 //
 // function draw() {
 //     requestAnimationFrame(draw);
 //
 //     clearScene(scene, canvas);
 //     positionReporter.draw(scene);
 // }
 //
 // draw();



var $5eMSG = parcelRequire("5eMSG");
// TODO: Mouse interaction
// TODO: Add option to use strokeRect
// note that, the border adds to the dimensions extra px
// TODO: it would be cool if I could play with the config in live
// TODO: last row is being cut (should be 38px instead of 33px)
const $d2c64cbd57e4bcd1$var$config = {
    canvas: {
        background: '#ffffff'
    },
    font: {
        family: 'monospace',
        size: '8px',
        color: '#ffffff',
        height: 8
    },
    oneCmInPixels: 25,
    keyboard: {
        size: 8,
        button: {
            background: '#000000',
            backgroundPressed: '#00C853'
        }
    },
    // in cm
    physicalKeyboardModel: {
        gap: 0.3,
        width: 30.3,
        height: 10.5,
        button: {
            width: {
                size1: 1.6,
                size2: 2.3,
                size3: 3,
                size4: 3.6,
                size5: 4.2,
                size6: 11.1
            },
            height: {
                size1: 1,
                size2: 1.5
            }
        }
    }
};
function $d2c64cbd57e4bcd1$var$newCanvas(width, height, background) {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    canvas.style.background = background;
    document.body.appendChild(canvas);
    return canvas;
}
// calculate dimensions in pixels
function $d2c64cbd57e4bcd1$var$calcDimensions(config) {
    const physical = config.physicalKeyboardModel;
    // gap is the smallest possible unit. ratio's are calculated based on the gap.
    const toPixels = (physicalSizeInCm)=>physicalSizeInCm / physical.gap * config.keyboard.size;
    return {
        gap: toPixels(physical.gap),
        width: toPixels(physical.width),
        height: toPixels(physical.height),
        button: {
            width: {
                size1: toPixels(physical.button.width.size1),
                size2: toPixels(physical.button.width.size2),
                size3: toPixels(physical.button.width.size3),
                size4: toPixels(physical.button.width.size4),
                size5: toPixels(physical.button.width.size5),
                size6: toPixels(physical.button.width.size6)
            },
            height: {
                size1: toPixels(physical.button.height.size1),
                size2: toPixels(physical.button.height.size2)
            }
        }
    };
}
function $d2c64cbd57e4bcd1$var$button(key, box, backgroundColor) {
    return {
        ...key,
        ...box,
        backgroundColor: backgroundColor
    };
}
function $d2c64cbd57e4bcd1$var$getKeyRepresentation(key, isShiftPressed) {
    if (isShiftPressed) return key.altKey && key.altKeyDisplay ? key.altKeyDisplay : key.altKey || key.display || key.key;
    return key.display ? key.display : key.key;
}
function $d2c64cbd57e4bcd1$var$isKeyPressed(currentPressedKey, key) {
    return currentPressedKey[key.key] || currentPressedKey[key.altKey];
}
function $d2c64cbd57e4bcd1$var$placeText(scene, box, font, text) {
    scene.font = `${font.size} ${font.family}`;
    scene.fillStyle = font.color;
    const metrics = scene.measureText(text);
    // center tex inside the box
    scene.fillText(text, (box.x + box.x2) / 2 - metrics.width / 2, (box.y + box.y4) / 2 + font.height / 2);
}
function $d2c64cbd57e4bcd1$var$drawKeyboard(scene, config, canvasWidth, canvasHeight, keys) {
    // calculate total gap used by each row
    const gapByRow = keys.map((row)=>{
        return $d2c64cbd57e4bcd1$var$dimensions.gap * (row.length - 1);
    });
    // calculate available width per row
    const availableWidthByRow = gapByRow.map((gap)=>{
        return $d2c64cbd57e4bcd1$var$canvas.width - gap;
    });
    const boxesWithWidth = keys.map((row, index)=>{
        const countRatio = row.reduce((sum, box)=>{
            return sum + box.widthRatio;
        }, 0);
        const oneRatioCostInPixels = availableWidthByRow[index] / countRatio;
        return row.map((box)=>{
            return {
                ...box,
                width: box.widthRatio * oneRatioCostInPixels
            };
        });
    });
    for(let i = 0; i < boxesWithWidth.length; i += 1){
        let x = 0;
        let y = i * $d2c64cbd57e4bcd1$var$dimensions.button.height.size2 + $d2c64cbd57e4bcd1$var$dimensions.gap * i;
        for(let j = 0; j < boxesWithWidth[i].length; j += 1){
            scene.fillStyle = $d2c64cbd57e4bcd1$var$isKeyPressed($d2c64cbd57e4bcd1$var$keyPressedStatus, boxesWithWidth[i][j]) ? config.keyboard.button.backgroundPressed : config.keyboard.button.background;
            scene.fillRect(x, y, boxesWithWidth[i][j].width, $d2c64cbd57e4bcd1$var$dimensions.button.height.size2);
            const symbol = $d2c64cbd57e4bcd1$var$getKeyRepresentation(boxesWithWidth[i][j], $d2c64cbd57e4bcd1$var$keyPressedStatus['Shift']);
            const box = {
                x: x,
                y: y,
                x2: x + boxesWithWidth[i][j].width,
                y2: y,
                x3: x,
                y3: y + $d2c64cbd57e4bcd1$var$dimensions.button.height.size2,
                x4: x + boxesWithWidth[i][j].width,
                y4: y + $d2c64cbd57e4bcd1$var$dimensions.button.height.size2 // bottom-right
            };
            $d2c64cbd57e4bcd1$var$placeText(scene, box, config.font, symbol);
            x = x + boxesWithWidth[i][j].width + $d2c64cbd57e4bcd1$var$dimensions.gap;
        }
    }
}
const $d2c64cbd57e4bcd1$var$dimensions = $d2c64cbd57e4bcd1$var$calcDimensions($d2c64cbd57e4bcd1$var$config);
const $d2c64cbd57e4bcd1$var$canvas = $d2c64cbd57e4bcd1$var$newCanvas($d2c64cbd57e4bcd1$var$dimensions.width, $d2c64cbd57e4bcd1$var$dimensions.height, $d2c64cbd57e4bcd1$var$config.canvas.background);
const $d2c64cbd57e4bcd1$var$scene = $d2c64cbd57e4bcd1$var$canvas.getContext('2d');
const $d2c64cbd57e4bcd1$var$keyPressedStatus = (0, $7a6bae5c11d70fb7$export$cfdd767f5a513509)();
const $d2c64cbd57e4bcd1$var$keys = [
    [
        $d2c64cbd57e4bcd1$var$button({
            key: 'ESC'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size2
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'F1'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'F2'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'F3'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'F4'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'F5'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'F6'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'F7'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'F8'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'F9'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'F10'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'F11'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'F12'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'Delete'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size2
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: "\u29BF"
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        })
    ],
    [
        $d2c64cbd57e4bcd1$var$button({
            key: '`',
            altKey: '~'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: '1',
            altKey: '!'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: '2',
            altKey: '@'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: '3',
            altKey: '#'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: '4',
            altKey: '$'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: '5',
            altKey: '%'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: '6',
            altKey: '^'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: '7',
            altKey: '&'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: '8',
            altKey: '*'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: '9',
            altKey: '('
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: '0',
            altKey: ')'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: '-',
            altKey: '_'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: '=',
            altKey: '+'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'Backspace'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size3
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'Home'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        })
    ],
    [
        $d2c64cbd57e4bcd1$var$button({
            key: 'Tab'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size2
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'q',
            altKey: 'Q'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'w',
            altKey: 'W'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'e',
            altKey: 'E'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'r',
            altKey: 'R'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 't',
            altKey: 'T'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'y',
            altKey: 'Y'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'u',
            altKey: 'U'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'i',
            altKey: 'I'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'o',
            altKey: 'O'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'p',
            altKey: 'P'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: '[',
            altKey: '{'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: ']',
            altKey: '}'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: '\\',
            altKey: '|'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size2
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'End'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        })
    ],
    [
        $d2c64cbd57e4bcd1$var$button({
            key: 'Caps lock'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size3
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'a',
            altKey: 'A'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 's',
            altKey: 'S'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'd',
            altKey: 'D'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'f',
            altKey: 'F'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'g',
            altKey: 'G'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'h',
            altKey: 'H'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'j',
            altKey: 'J'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'k',
            altKey: 'K'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'l',
            altKey: 'L'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: ';',
            altKey: ':'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: '\'',
            altKey: '"'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'Enter'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size4
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'PageUp',
            display: 'PgUp'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        })
    ],
    [
        $d2c64cbd57e4bcd1$var$button({
            key: 'Shift'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size5
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'z',
            altKey: 'Z'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'x',
            altKey: 'X'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'c',
            altKey: 'C'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'v',
            altKey: 'V'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'b',
            altKey: 'B'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'n',
            altKey: 'N'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'm',
            altKey: 'M'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: ',',
            altKey: '<'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: '.',
            altKey: '>'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: '/',
            altKey: '?'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'Shift'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size2
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'ArrowUp',
            display: "\u25B2"
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'PageDown',
            display: 'PgDn'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        })
    ],
    [
        $d2c64cbd57e4bcd1$var$button({
            key: 'Control',
            display: 'Ctrl'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size2
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'Fn'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'Win'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'Alt'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: ' ',
            display: 'Spacebar'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size6
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'Alt'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'Control',
            display: 'Ctrl'
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size2
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'ArrowLeft',
            display: "\u25C0"
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'ArrowDown',
            display: "\u25BC"
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        }),
        $d2c64cbd57e4bcd1$var$button({
            key: 'ArrowRight',
            display: "\u25B6"
        }, {
            widthRatio: $d2c64cbd57e4bcd1$var$dimensions.button.width.size1
        })
    ]
];
const $d2c64cbd57e4bcd1$var$mousePositionReporter = new (0, $f84b79194830f7ac$export$b1b9ad9a81f76fc7)($d2c64cbd57e4bcd1$var$canvas, 10, 'red');
const $d2c64cbd57e4bcd1$var$rulers = [
    new (0, $f84b79194830f7ac$export$7bf59defd2f3e851)(0, 0, 1, 'red'),
    new (0, $f84b79194830f7ac$export$fcd59f9313b2d545)(0, 0, 1, 'green')
];
function $d2c64cbd57e4bcd1$var$draw() {
    requestAnimationFrame($d2c64cbd57e4bcd1$var$draw);
    (0, $5eMSG.clearScene)($d2c64cbd57e4bcd1$var$scene, $d2c64cbd57e4bcd1$var$canvas);
    $d2c64cbd57e4bcd1$var$drawKeyboard($d2c64cbd57e4bcd1$var$scene, $d2c64cbd57e4bcd1$var$config, $d2c64cbd57e4bcd1$var$canvas.width, $d2c64cbd57e4bcd1$var$canvas.height, $d2c64cbd57e4bcd1$var$keys);
    $d2c64cbd57e4bcd1$var$mousePositionReporter.draw($d2c64cbd57e4bcd1$var$scene);
    for (const ruler of $d2c64cbd57e4bcd1$var$rulers){
        ruler.update($d2c64cbd57e4bcd1$var$mousePositionReporter.x, $d2c64cbd57e4bcd1$var$mousePositionReporter.y);
        ruler.draw($d2c64cbd57e4bcd1$var$scene);
    }
}
$d2c64cbd57e4bcd1$var$draw();


//# sourceMappingURL=05-virtual-keyboard.4cb789b4.js.map
