var $a66a7e8662952b9c$exports = {};
const $a66a7e8662952b9c$var$line = (scene, x1, y1, x2, y2, color)=>{
    scene.beginPath();
    scene.strokeStyle = color;
    scene.moveTo(x1, y1);
    scene.lineTo(x2, y2);
    scene.stroke();
};
const $a66a7e8662952b9c$var$grid = (scene, canvasWidth, canvasHeight, gap, color = '#e2e2e2')=>{
    // columns
    let x = gap;
    for(let i = 1; i < Math.round(canvasWidth / gap); i += 1)$a66a7e8662952b9c$var$line(scene, x * i, 0, x * i, canvasHeight, 1, color);
    // rows
    let y = gap;
    for(let i = 1; i < Math.round(canvasHeight / gap); i += 1)$a66a7e8662952b9c$var$line(scene, 0, y * i, canvasWidth, y * i, 1, color);
};
const $a66a7e8662952b9c$var$canvas = document.getElementById('canvas');
const $a66a7e8662952b9c$var$scene = $a66a7e8662952b9c$var$canvas.getContext('2d');
function $a66a7e8662952b9c$var$draw() {
    requestAnimationFrame($a66a7e8662952b9c$var$draw);
    $a66a7e8662952b9c$var$grid($a66a7e8662952b9c$var$scene, $a66a7e8662952b9c$var$canvas.width, $a66a7e8662952b9c$var$canvas.height, 10, '#e2e2e2');
    $a66a7e8662952b9c$var$line($a66a7e8662952b9c$var$scene, 0, 10, 390, 10, 1, 'blue');
}
$a66a7e8662952b9c$var$draw();


//# sourceMappingURL=02-grid.687b42c8.js.map
