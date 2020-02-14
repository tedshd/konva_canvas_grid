function destroyTransformer (layers) {
    stage.find('Transformer').destroy();
    for (var i = 0; i < layers.length; i++) {
        layers[i].draw();
    }
}

function initTransformer (target, layers) {
    stage.find('Transformer').destroy();

    for (var j = 0; j < layers.length; j++) {
        // create new transformer
        var tr = new Konva.Transformer();
        layers[j].add(tr);
        tr.attachTo(target);
        layers[j].draw();
    }
}
