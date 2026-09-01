var $8729daf67f9af4ce$exports = {};
/**
    actualBoundingBoxAscent: 30
    actualBoundingBoxDescent: 9
    actualBoundingBoxLeft: 23.08203125
    actualBoundingBoxRight: 23
    width: 48.1640625
 */ const $8729daf67f9af4ce$var$canvas = document.getElementById('canvas');
const $8729daf67f9af4ce$var$scene = $8729daf67f9af4ce$var$canvas.getContext('2d');
const $8729daf67f9af4ce$var$keyboard = ()=>{
    const keyPressedState = {
        right: false,
        left: false,
        up: false,
        down: false,
        spacebar: false
    };
    const keyEventHandler = (event, isPressed)=>{
        switch(event.key){
            case 'Right':
            case 'ArrowRight':
                keyPressedState.right = isPressed;
                break;
            case 'Left':
            case 'ArrowLeft':
                keyPressedState.left = isPressed;
                break;
            case 'Up':
            case 'ArrowUp':
                keyPressedState.up = isPressed;
                break;
            case 'Down':
            case 'ArrowDown':
                keyPressedState.down = isPressed;
                break;
            case ' ':
            case 'Spacebar':
                keyPressedState.spacebar = isPressed;
                break;
            default:
                break;
        }
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
};
const $8729daf67f9af4ce$var$keyPressed = $8729daf67f9af4ce$var$keyboard();
function $8729daf67f9af4ce$var$draw() {
    requestAnimationFrame($8729daf67f9af4ce$var$draw);
    const fontSize = 32;
    const defaultColor = '#9E9E9E';
    const keyPressedColor = '#9C27B0';
    $8729daf67f9af4ce$var$scene.font = `${fontSize}px Arial`;
    $8729daf67f9af4ce$var$scene.fillStyle = $8729daf67f9af4ce$var$keyPressed.up ? keyPressedColor : defaultColor;
    $8729daf67f9af4ce$var$scene.fillText('Up', 0, fontSize);
    $8729daf67f9af4ce$var$scene.fillStyle = $8729daf67f9af4ce$var$keyPressed.right ? keyPressedColor : defaultColor;
    $8729daf67f9af4ce$var$scene.fillText('Right', 0, fontSize * 2);
    $8729daf67f9af4ce$var$scene.fillStyle = $8729daf67f9af4ce$var$keyPressed.down ? keyPressedColor : defaultColor;
    $8729daf67f9af4ce$var$scene.fillText('Down', 0, fontSize * 3);
    $8729daf67f9af4ce$var$scene.fillStyle = $8729daf67f9af4ce$var$keyPressed.left ? keyPressedColor : defaultColor;
    $8729daf67f9af4ce$var$scene.fillText('Left', 0, fontSize * 4);
    $8729daf67f9af4ce$var$scene.fillStyle = $8729daf67f9af4ce$var$keyPressed.spacebar ? keyPressedColor : defaultColor;
    $8729daf67f9af4ce$var$scene.fillText('Space', 0, fontSize * 5);
}
$8729daf67f9af4ce$var$draw();


//# sourceMappingURL=04-print-pressed-key.c1637aa9.js.map
