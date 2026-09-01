const $4eb7820403880044$export$4062b72ad7d84352 = (objectA, objectB)=>{
    const top = objectB.y > objectA.y + objectA.height;
    const bottom = objectB.y + objectB.height < objectA.y;
    const right = objectB.x + objectB.width < objectA.x;
    const left = objectB.x > objectA.x + objectA.width;
    // if any of (top, right, bottom, left) is true, then there is no collision because
    // one edge is far away from the other
    return !(top || right || bottom || left);
};
const $4eb7820403880044$export$9f17032d917177de = (player, target)=>{
    return {
        top: player.y - (target.y + target.height),
        right: target.x - (player.x + player.width),
        bottom: target.y - (player.y + player.height),
        left: player.x - (target.x + target.width)
    };
};


describe('checkAABB', ()=>{
    describe('top collision', ()=>{
        it('no collision', ()=>{
            const player = {
                x: 100,
                y: 101,
                width: 100,
                height: 100
            };
            const object = {
                x: 0,
                y: 0,
                width: 100,
                height: 100
            };
            expect((0, $4eb7820403880044$export$4062b72ad7d84352)(player, object)).toEqual(false);
        });
        it('collision', ()=>{
            const player = {
                x: 100,
                y: 100,
                width: 100,
                height: 100
            };
            const object = {
                x: 0,
                y: 50,
                width: 100,
                height: 100
            };
            expect((0, $4eb7820403880044$export$4062b72ad7d84352)(player, object)).toEqual(true);
        });
        it('overlap by one pixel', ()=>{
            const player = {
                x: 100,
                y: 100,
                width: 100,
                height: 100
            };
            const object = {
                x: 0,
                y: 0,
                width: 100,
                height: 100
            };
            expect((0, $4eb7820403880044$export$4062b72ad7d84352)(player, object)).toEqual(true);
        });
    });
});


//# sourceMappingURL=15-2d-collision-tests-example.e3a326d7.js.map
