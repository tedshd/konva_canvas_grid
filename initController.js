function initController(arg) {
  var section = document.createElement('section');
  section.setAttribute('id', 'controller');
  section.classList.add('controller_' + arg.position);
  var ul = document.createElement('ul');
  for (var i = 0; i < arg.menu.length; i++) {
    if (!arg.menu[i]['status']) {
      continue;
    }
    var li = document.createElement('li');
    li.innerText = arg.menu[i]['name'];
    li.setAttribute('data-feature', arg.menu[i]['feature']);
    li.addEventListener('click', function(e) {
      e.stopPropagation();
      // TODO 優化
      destoryControllerSub(true);
      // if (document.querySelector('#controller_sub')) {
      //   return;
      // }
      initControllerCompoment(this.getAttribute('data-feature'));
    });
    ul.append(li);
  }
  section.append(ul);
  arg.dom.append(section);
}

function initControllerCompoment(name) {
  switch (name) {
    case 'do':
      break;
    case 'undo':
      break;
    case 'text':
      break;
    case 'image':
      break;
    case 'paint':
      break;
    case 'shape':
      break;
    case 'delete':
      if (!currentTarget) {
        return;
      }
      deleteObject();
      break;
    case 'reflection':
      break;
    case 'opacity':
      if (!currentTarget) {
        return;
      }
      initOpacity();
      break;
    case 'brightness':
      if (!currentTarget) {
        return;
      }
      initBrightness();
      break;
    case 'contrast':
      if (!currentTarget) {
        return;
      }
      initContrast();
      break;
    case 'blur':
      if (!currentTarget) {
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
      console.error('initControllerCompoment: not match function');
      break;
  }
}

function deleteObject() {
  destroyTransformer(layersArray);
  currentTarget.destroy();
  stage.draw();
  currentTarget = false;
}

function initOpacity() {
  var inputRange = document.createElement('input');
  inputRange.setAttribute('type', 'range');
  inputRange.setAttribute('name', 'opacity');
  inputRange.setAttribute('min', '0');
  inputRange.setAttribute('max', '100');
  inputRange.setAttribute('value', currentTarget.opacity()*100);
  inputRange.addEventListener('change', function (e) {
    e.stopPropagation();
    console.log(this.value/100);

    currentTarget.opacity(this.value/100);
    currentTarget.getLayer().batchDraw();
  });
  initControllerSub(inputRange);
}

function initBrightness() {
  var inputRange = document.createElement('input');
  inputRange.setAttribute('type', 'range');
  inputRange.setAttribute('name', 'brightness');
  inputRange.setAttribute('min', '-100');
  inputRange.setAttribute('max', '100');
  inputRange.setAttribute('value', currentTarget.brightness()*100);
  inputRange.addEventListener('change', function (e) {
    e.stopPropagation();
    console.log(this.value/100);
    currentTarget.cache();
    currentTarget.filters([Konva.Filters.Brighten]);
    currentTarget.brightness(this.value/100);
    currentTarget.getLayer().batchDraw();
  });
  initControllerSub(inputRange);
}

function initContrast() {
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
  initControllerSub(inputRange);
}

function initBlur() {
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
  initControllerSub(inputRange);
}

function initControllerSub(subDom) {
  var dom = document.querySelector('#controller ul');
  var div = document.createElement('div');
  div.setAttribute('id', 'controller_sub');
  div.append(subDom);
  dom.parentNode.insertBefore(div, dom);
}

function destoryControllerSub(currentTargetNoReset) {
  var dom = document.querySelector('#controller_sub');
  if (!dom) {
    return;
  }
  dom.outerHTML = '';
  delete dom;
  if (!currentTargetNoReset) {
    currentTarget = false;
  }
}

function controllerDom(target) {
  if (target === document.querySelector('input[name=opacity]') ||
    target === document.querySelector('input[name=brightness]') ||
    target === document.querySelector('input[name=blur]') ||
    target === document.querySelector('input[name=contrast]')) {
    return true;
  }
  return false;
}