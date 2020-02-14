function initControllerEditor (arg) {
    var section = document.createElement('section');
    section.setAttribute('id', 'controller_editor');
    section.classList.add('controller');
    section.classList.add('controller_' + arg.position);
    var ul = document.createElement('ul');
    for (var i = 0; i < arg.menu.length; i++) {
        if (!arg.menu[i]['status']) {
            continue;
        }
        var li = document.createElement('li');
        li.innerText = arg.menu[i]['name'];
        li.setAttribute('data-feature', arg.menu[i]['feature']);
        li.addEventListener('click', function (e) {
            e.stopPropagation();
            // TODO 優化
            destoryControllerSub('editor');
            // if (document.querySelector('#controller_sub')) {
            //   return;
            // }
            initControllerEditorCompoment(this.getAttribute('data-feature'));
        });
        ul.append(li);
    }
    section.append(ul);
    arg.dom.append(section);
}

function initControllerEditorCompoment (name) {
    switch (name) {
        case 'do':
            break;
        case 'undo':
            break;
        case 'text':
            break;
        case 'image':
            uploadImage();
            break;
        case 'paint':
            break;
        case 'shape':
            break;
        case 'delete':
            if (!stage.find('Transformer').length) {
                return;
            }
            deleteObject();
            break;
        case 'reflection':
            break;
        case 'opacity':
            if (!stage.find('Transformer').length) {
                return;
            }
            initOpacity();
            break;
        case 'brightness':
            if (!stage.find('Transformer').length) {
                return;
            }
            initBrightness();
            break;
        case 'contrast':
            if (!stage.find('Transformer').length) {
                return;
            }
            initContrast();
            break;
        case 'blur':
            if (!stage.find('Transformer').length) {
                return;
            }
            initBlur();
            break;
        case 'crop':
            break;
        case 'filter':
            break;
        case 'grid':
            break;
        default:
            console.error('initControllerEditorCompoment: not match function');
            break;
    }
}

function uploadImage () {
    var inputFile = document.createElement('input');
    inputFile.setAttribute('id', 'image_upload');
    inputFile.setAttribute('style', 'display:none;');
    inputFile.setAttribute('type', 'file');
    inputFile.setAttribute('name', 'image');
    inputFile.setAttribute('accept', 'image/*');
    inputFile.addEventListener('change', function () {
        var file = this.files;
        if (!file.length) {
            console.log('no select image');
        } else {
            console.log(file[0]);
            initImage({
                path: window.URL.createObjectURL(file[0]),
                x: 0,
                y: 0,
                w: w,
                h: h,
                layer: canvasLayer,
            });
            inputFile.outerHTML = '';
            delete inputFile;
        }
    });
    document.body.append(inputFile);
    inputFile.click();
}

function deleteObject () {
    destroyTransformer(layerArray);
    currentTarget.destroy();
    stage.draw();
    currentTarget = false;
}

function initOpacity () {
    var inputRange = document.createElement('input');
    inputRange.setAttribute('type', 'range');
    inputRange.setAttribute('name', 'opacity');
    inputRange.setAttribute('min', '0');
    inputRange.setAttribute('max', '100');
    inputRange.setAttribute('value', currentTarget.opacity() * 100);
    inputRange.addEventListener('change', function (e) {
        e.stopPropagation();
        console.log(this.value / 100);

        currentTarget.opacity(this.value / 100);
        currentTarget.getLayer().batchDraw();
    });
    initControllerEditorSub([inputRange]);
}

function initBrightness () {
    var inputRange = document.createElement('input');
    inputRange.setAttribute('type', 'range');
    inputRange.setAttribute('name', 'brightness');
    inputRange.setAttribute('min', '-100');
    inputRange.setAttribute('max', '100');
    inputRange.setAttribute('value', currentTarget.brightness() * 100);
    inputRange.addEventListener('change', function (e) {
        e.stopPropagation();
        console.log(this.value / 100);
        currentTarget.cache();
        currentTarget.filters([Konva.Filters.Brighten]);
        currentTarget.brightness(this.value / 100);
        currentTarget.getLayer().batchDraw();
    });
    initControllerEditorSub([inputRange]);
}

function initContrast () {
    var inputRange = document.createElement('input');
    inputRange.setAttribute('type', 'range');
    inputRange.setAttribute('name', 'blur');
    inputRange.setAttribute('min', '-100');
    inputRange.setAttribute('max', '100');
    inputRange.setAttribute('value', currentTarget.contrast());
    inputRange.addEventListener('change', function (e) {
        e.stopPropagation();
        console.log(this.value);
        currentTarget.cache();
        currentTarget.filters([Konva.Filters.Contrast]);
        currentTarget.contrast(parseInt(this.value, 10));
        currentTarget.getLayer().draw();
    });
    initControllerEditorSub([inputRange]);
}

function initBlur () {
    var inputRange = document.createElement('input');
    inputRange.setAttribute('type', 'range');
    inputRange.setAttribute('name', 'blur');
    inputRange.setAttribute('min', '0');
    inputRange.setAttribute('max', '100');
    inputRange.setAttribute('value', currentTarget.blurRadius());
    inputRange.addEventListener('change', function (e) {
        e.stopPropagation();
        console.log(this.value);
        currentTarget.cache();
        currentTarget.filters([Konva.Filters.Blur]);
        currentTarget.blurRadius(parseInt(this.value, 10));
        currentTarget.getLayer().batchDraw();
    });
    initControllerEditorSub([inputRange]);
}

function initControllerEditorSub (subDomArray) {
    var dom = document.querySelector('#controller_editor ul');
    var div = document.createElement('div');
    div.classList.add('controller_sub');
    for (let index = 0; index < subDomArray.length; index++) {
        div.append(subDomArray[index]);
    }
    dom.append(div);
    // dom.parentNode.insertBefore(div, dom);
}

function destoryControllerSub (type) {
    var dom = dom = document.querySelector('#controller_' + type + ' .controller_sub');
    if (!dom) {
        return;
    }
    dom.outerHTML = '';
    delete dom;
}

function controllerEditorDom (target) {
    if (target === document.querySelector('input[name=opacity]') ||
        target === document.querySelector('input[name=brightness]') ||
        target === document.querySelector('input[name=blur]') ||
        target === document.querySelector('input[name=contrast]')) {
        return true;
    }
    return false;
}
