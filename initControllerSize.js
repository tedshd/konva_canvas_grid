function initControllerSize (arg) {
    var section = document.createElement('section');
    section.setAttribute('id', 'controller_size');
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

            destoryControllerSub('size', true);

            initControllerSizeCompoment(this.getAttribute('data-feature'));
        });
        ul.append(li);
    }
    section.append(ul);
    arg.dom.append(section);
}

function initControllerSizeCompoment (name) {
    switch (name) {
        case 'scale':
            initScale();
            break;
        case 'zoom':
            initZoom();
            break;
        case 'size':
            break;
        case 'download':
            initDownload();
            break;
        default:
            console.error('initControllerSizeCompoment: not match function');
            break;
    }
}

function initScale () {
    var inputRange = document.createElement('input');
    inputRange.setAttribute('type', 'range');
    inputRange.setAttribute('name', 'scale');
    inputRange.setAttribute('min', '1');
    inputRange.setAttribute('max', '50');
    inputRange.setAttribute('value', stage.scaleX() * 10);
    inputRange.addEventListener('change', function (e) {
        e.stopPropagation();
        console.log(this.value);
        console.log(stage.scale());
        var val = this.value / 10;
        stageScale(val);
    });

    // var inputBtn = document.createElement('input');
    // inputBtn.setAttribute('type', 'button');
    // inputBtn.setAttribute('name', 'reset');
    // inputBtn.setAttribute('value', '100%');
    // inputBtn.addEventListener('click', function (e) {
    //     e.preventDefault();
    //     var val = 1;
    //     stageScale(val);
    //     document.querySelector('input[name=scale]').value = stage.scaleX() * 10;
    // });
    // initControllerSizeSub([inputRange, inputBtn]);
    initControllerSizeSub([inputRange]);
}

function initZoom () {
    var inputRange = document.createElement('input');
    inputRange.setAttribute('type', 'range');
    inputRange.setAttribute('name', 'zoom');
    inputRange.setAttribute('min', '1');
    inputRange.setAttribute('max', '50');
    inputRange.setAttribute('value', canvasLayer.scaleX() * 10);
    inputRange.addEventListener('change', function (e) {
        e.stopPropagation();
        console.log(this.value);
        console.log(canvasLayer.scale());
        var val = this.value / 10;
        canvasScale({
            scale: val,
            stageX: stage.x(),
            stageY: stage.y(),
            draw: true,
        });
    });

    var inputBtn = document.createElement('input');
    inputBtn.setAttribute('type', 'button');
    inputBtn.setAttribute('name', 'reset');
    inputBtn.setAttribute('value', '100%');
    inputBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var val = 1;
        canvasScale({
            scale: val,
            stageX: stage.x(),
            stageY: stage.y(),
            draw: true,
        });
        document.querySelector('input[name=zoom]').value = canvasLayer.scaleX() * 10;
        stage.x(0);
        stage.y(0);
        stage.draw();
    });
    initControllerSizeSub([inputRange, inputBtn]);
}

function initDownload () {
    var downloadForm = document.createElement('form');
    downloadForm.setAttribute('id', 'download_form');
    var filename = document.createElement('input');
    filename.setAttribute('type', 'text');
    filename.setAttribute('name', 'filename');
    filename.setAttribute('value', 'grid');
    filename.setAttribute('placeholder', 'input file name here');

    var mimeTypeArray = ['image/png', 'image/jpeg'];
    var mimeType = document.createElement('select');
    mimeType.setAttribute('name', 'mimeType');
    for (let index = 0; index < mimeTypeArray.length; index++) {
        const element = mimeTypeArray[index];
        var option = document.createElement('option');
        option.innerText = element.split('/')[1];
        option.value = element;
        mimeType.append(option);
    }

    var inputRange = document.createElement('input');
    inputRange.setAttribute('type', 'range');
    inputRange.setAttribute('name', 'quality');
    inputRange.setAttribute('min', '0');
    inputRange.setAttribute('max', '10');
    inputRange.setAttribute('value', 10);
    inputRange.addEventListener('change', function (e) {
        e.stopPropagation();
        var val = this.value / 10;
        document.querySelector('#file_quality_value').innerHTML = val;
    });
    var span = document.createElement('span');
    span.setAttribute('id', 'file_quality_value');
    span.innerText = 1;

    var inputBtn = document.createElement('input');
    inputBtn.setAttribute('type', 'button');
    inputBtn.setAttribute('name', 'download');
    inputBtn.setAttribute('value', 'Download');
    inputBtn.addEventListener('click', function (e) {
        e.preventDefault();
        // console.log(parseForm(document.querySelector('#download_form')));
        downloadURI(parseForm(document.querySelector('#download_form')));
    });

    downloadForm.append(filename);
    downloadForm.append(mimeType);
    downloadForm.append(inputRange);
    downloadForm.append(span);
    downloadForm.append(inputBtn);
    initControllerSizeSub([downloadForm]);
}

function initControllerSizeSub (subDomArray) {
    var dom = document.querySelector('#controller_size ul');
    var div = document.createElement('div');
    div.classList.add('controller_sub');
    for (let index = 0; index < subDomArray.length; index++) {
        div.append(subDomArray[index]);
    }
    dom.parentNode.insertBefore(div, dom);
}

function controllerSizeDom (target) {
    if (target === document.querySelector('input[name=scale]') ||
        target === document.querySelector('input[name=reset]') ||
        target === document.querySelector('input[name=zoom]') ||
        target === document.querySelector('input[name=filename]') ||
        target === document.querySelector('select[name=mimeType]') ||
        target === document.querySelector('input[name=quality]') ||
        target === document.querySelector('input[name=download]') ||
        target === document.querySelector('input[name=size]')) {
        return true;
    }
    return false;
}
