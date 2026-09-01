var $d65e33c7a5038617$exports = {};
const $d65e33c7a5038617$var$canvas = document.getElementById('canvas');
const $d65e33c7a5038617$var$scene = $d65e33c7a5038617$var$canvas.getContext('2d');
window.canvasWidth = $d65e33c7a5038617$var$canvas.width;
window.canvasHeight = $d65e33c7a5038617$var$canvas.height;
window.scene = $d65e33c7a5038617$var$scene;
function* $d65e33c7a5038617$var$pixels(imageData) {
    for(let i = 0; i < imageData.data.length; i += 4)yield {
        red: imageData.data[i],
        green: imageData.data[i + 1],
        blue: imageData.data[i + 2],
        alpha: imageData.data[i + 3]
    };
}
function $d65e33c7a5038617$var$take(iter, n) {
    let i = 0;
    const items = [];
    while(i < n){
        items.push(iter.next());
        i += 1;
    }
    return items;
}
function* $d65e33c7a5038617$var$lines(scene, width, height) {
    const imageData = scene.getImageData(0, 0, width, height);
    const iterator = $d65e33c7a5038617$var$pixels(imageData);
    for(let i = 0; i < width * height; i += width)yield $d65e33c7a5038617$var$take(iterator, width).map((pixel)=>pixel.value);
}
function $d65e33c7a5038617$var$readNthPixel(imageData, nth) {
    return {
        red: imageData.data[nth * 4],
        green: imageData.data[nth * 4 + 1],
        blue: imageData.data[nth * 4 + 2],
        alpha: imageData.data[nth * 4 + 3]
    };
}
function $d65e33c7a5038617$var$isSamePixel(pixel1, pixel2) {
    return Object.keys(pixel1).every((color)=>pixel1[color] === pixel2[color]);
}
// read pixels line by line
// calculate top by finding pixels matching the text color
// calculate bottom by finding the pixels matching the background color
function $d65e33c7a5038617$var$calcTextBounds(scene, canvasWidth, canvasHeight, textColor = {
    red: 0,
    green: 0,
    blue: 0,
    alpha: 255
}, backgroundColor = {
    red: 255,
    green: 255,
    blue: 255,
    alpha: 255
}) {
    const iterator = $d65e33c7a5038617$var$lines(scene, canvasWidth, canvasHeight);
    let line = iterator.next();
    let top = 0;
    while(!line.done){
        if (line.value.some((pixel)=>$d65e33c7a5038617$var$isSamePixel(pixel, textColor))) break;
        line = iterator.next();
        top += 1;
    }
    line = iterator.next();
    let bottom = top + 1;
    while(!line.done){
        if (line.value.every((pixel)=>$d65e33c7a5038617$var$isSamePixel(pixel, backgroundColor))) break;
        line = iterator.next();
        bottom += 1;
    }
    return {
        top: top,
        bottom: bottom
    };
}
function $d65e33c7a5038617$var$draw() {
    // background
    $d65e33c7a5038617$var$scene.fillStyle = 'rgba(255, 255, 255, 1)';
    $d65e33c7a5038617$var$scene.fillRect(0, 0, $d65e33c7a5038617$var$canvas.width, $d65e33c7a5038617$var$canvas.height);
    // text
    $d65e33c7a5038617$var$scene.fillStyle = 'rgba(0, 0, 0, 1)';
    $d65e33c7a5038617$var$scene.font = '16px monospace';
    const text = 'abcdefghijklmnopqrstuvwxyz';
    const metrics = $d65e33c7a5038617$var$scene.measureText(text);
    $d65e33c7a5038617$var$scene.fillText(text, ($d65e33c7a5038617$var$canvas.width - metrics.width) / 2, $d65e33c7a5038617$var$canvas.height / 2);
    const rect = $d65e33c7a5038617$var$calcTextBounds($d65e33c7a5038617$var$scene, $d65e33c7a5038617$var$canvas.width, $d65e33c7a5038617$var$canvas.height);
    console.log(rect, rect.bottom - rect.top);
    $d65e33c7a5038617$var$scene.beginPath();
    $d65e33c7a5038617$var$scene.strokeStyle = 'green';
    $d65e33c7a5038617$var$scene.moveTo(10, rect.top);
    $d65e33c7a5038617$var$scene.lineTo(10, rect.bottom);
    $d65e33c7a5038617$var$scene.stroke();
}
$d65e33c7a5038617$var$draw();


//# sourceMappingURL=06-measure-text-height.321fdd6d.js.map
