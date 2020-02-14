function downloadURI (arg) {
    var filename = arg.filename || 'grid_' + new Date(),
        mimeType = arg.mimeType || 'image/png',
        quality = arg.quality / 10 || 1,
        pixelRatio = arg.pixelRatio || 1,
        x = arg.x || (w / 2) - (canvasW / 2),
        y = arg.y || (h / 2) - (canvasH / 2),
        width = arg.w || canvasW,
        height = arg.h || canvasH;

    var currentStatus = {
        scale: canvasLayer.scaleX(),
        stageX: stage.x(),
        stageY: stage.y(),
        draw: false,
    };

    var resetStatus = {
        scale: 1,
        stageX: 0,
        stageY: 0,
        draw: false,
    };

    canvasScale(resetStatus);

    filename = filename + '.' + mimeType.split('/')[1];
    var dataURL = canvasLayer.toDataURL({
        'x': x,
        'y': y,
        'width': width,
        'height': height,
        'mimeType': mimeType,
        'quality': quality,
        'pixelRatio': pixelRatio,
    });

    dataURL = dataURL.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
    dataURL = dataURL.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=' + filename);

    var link = document.createElement('a');
    link.download = filename;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;

    canvasScale(currentStatus);
}

function stageScale (scaleSize, noDraw) {
    stage.scale({
        x: scaleSize,
        y: scaleSize
    });
    stage.width(w * scaleSize);
    stage.height(h * scaleSize);
    stage.x(0);
    stage.y(0);
    if (!noDraw) {
        stage.draw();
    }
}

/**
 *
 * @param {
        scale: 1,
        stageX: 0,
        stageY: 0,
        draw: false,
    } arg
 */
function canvasScale (arg) {
    var scaleSize = (arg.scale != undefined) ? arg.scale : 1,
        stageX = (arg.stageX != undefined) ? arg.stageX : stage.x(),
        stageY = (arg.stageY != undefined) ? arg.stageY : stage.y(),
        draw = (arg.draw != undefined) ? arg.draw : true;

    console.log(scaleSize);
    canvasLayer.scale({
        x: scaleSize,
        y: scaleSize
    });
    console.log(scaleSize);
    canvasLayer.x((w / 2) - ((canvasW * scaleSize) / 2));
    canvasLayer.y((h / 2) - ((canvasH * scaleSize) / 2));
    stageLayer.scale({
        x: scaleSize,
        y: scaleSize
    });
    stageLayer.x((w / 2) - ((canvasW * scaleSize) / 2));
    stageLayer.y((h / 2) - ((canvasH * scaleSize) / 2));

    stage.x(stageX);
    stage.y(stageY);

    if (draw) {
        canvasLayer.draw();
        stageLayer.draw();
    }
}

function parseForm (formDom) {
    var obj = {};
    var el = formDom.elements;
    for (var i = 0; i < el.length; i++) {
        obj[el[i].name] = el[i].value;
    }
    return obj;
}
