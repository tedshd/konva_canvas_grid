function initImage (arg) {
    var path = arg.path,
        x = arg.x || 0,
        y = arg.y || 0,
        w = arg.w,
        h = arg.h,
        layer = arg.layer;

    if (path == undefined) {
        console.error('initLayer: not set path');
        return;
    }
    if (x == undefined) {
        console.error('initLayer: not set x');
        return;
    }
    if (y == undefined) {
        console.error('initLayer: not set y');
        return;
    }
    if (w == undefined) {
        console.error('initLayer: not set w');
        return;
    }
    if (h == undefined) {
        console.error('initLayer: not set h');
        return;
    }
    if (layer == undefined) {
        console.error('initLayer: not set layer');
        return;
    }

    var imageObj = new Image();

    imageObj.src = path;

    imageObj.onload = function () {
        var draggable = true;
        var img = new Konva.Image({
            x: x,
            y: y,
            image: imageObj,
            width: imageObj.width,
            height: imageObj.height,
            name: 'images',
            draggable: draggable
        });
        if (draggable) {
            img.on('mouseenter', function () {
                document.body.style.cursor = 'grab';
            });
            img.on('mouseleave', function () {
                document.body.style.cursor = 'default';
            });
        }
        layer.add(img);
        img.zIndex(++objectZindex);

        layer.batchDraw();
    };
}
