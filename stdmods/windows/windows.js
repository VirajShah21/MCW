function ContentBlock(options = {}) {
  const node = document.createElement('div');
  BindBasics(node, options);
  return node;
}

function ClickButton(options = {}) {
  const node = document.createElement('button');
  BindBasics(node, options);
  return node;
}

function TextInput(options = {}) {
  const node = document.createElement('input');
  BindBasics(node, options);
  node.placeholder = options.placeholder || '';
  return node;
}

function H1Label(options = {}) {
  const node = document.createElement('h1');
  BindBasics(node, options);
  return node;
}

function H2Label(options = {}) {
  const node = document.createElement('h2');
  BindBasics(node, options);
  return node;
}

function TextLabel(options) {
  const node = document.createElement('span');
  BindBasics(node, options);
  return node;
}

function BindBasics(node, options) {
  if (!options) return;
  if (options.id) node.id = options.id;
  if (options.classes) node.className = options.classes.join(' ');
  if (options.value) node.value = options.value;
  if (options.text) node.innerText = options.text;
  if (options.styles)
    for (let style in options.styles) node.style[style] = options.styles[style];
  if (options.children)
    options.children.forEach((child) => {
      node.appendChild(child);
    });
  if (options.events) BindEvents(node, options.events);
}

function BindEvents(node, eventListeners) {
  if (eventListeners.click)
    node.addEventListener('click', eventListeners.click);
  if (eventListeners.mousedown)
    node.addEventListener('mousedown', eventListeners.mousedown);
  if (eventListeners.mouseup)
    node.addEventListener('mouseup', eventListeners.mouseup);
}

const WindowInstances = [];
class WindowFrame {
  constructor(
    options = {
      width: undefined,
      height: undefined,
      title: 'Untitled Window',
      resize: 'hv',
    }
  ) {
    this.width = options.width;
    this.height = options.height;
    this.content = options.content || null;
    this.id = options.id || Math.floor(Math.random() * 1000000);
    this.title = options.title || 'Untitled Window';
    this.resize = options.resize ? options.resize.toLowerCase() : 'hv';
    this.dom = null;
    this.windowContainer = null;
    WindowInstances.push(this);
  }

  makeHandlebarButtons() {
    const wrapper = document.createElement('div');

    wrapper.className = 'handlebar-btn-wrapper';

    const exitBtn = document.createElement('button');
    const minBtn = document.createElement('button');
    const maxBtn = document.createElement('button');

    [exitBtn, minBtn, maxBtn].forEach((btn) => {
      btn.className = 'handlebar-btn';
      btn.setAttribute('data-window', `${this.id}`);
    });

    exitBtn.style.background = 'rgb(255, 69, 81)';
    minBtn.style.background = 'rgb(255, 189, 0)';
    maxBtn.style.background = 'rgb(0, 213, 32)';

    exitBtn.addEventListener('click', (ev) => {
      this.exit(ev);
    });
    maxBtn.addEventListener('click', (ev) => {
      this.maximize(ev);
    });

    wrapper.appendChild(exitBtn);
    wrapper.appendChild(minBtn);
    wrapper.appendChild(maxBtn);

    return wrapper;
  }

  makeHandlebar() {
    const handleBar = document.createElement('div');
    handleBar.innerHTML = this.title;
    handleBar.className = 'window-frame-handlebar';
    handleBar.id = `window-frame-${this.id}-handlebar`;

    handleBar.appendChild(this.makeHandlebarButtons());

    return handleBar;
  }

  makeFrame() {
    const frame = document.createElement('div');
    this.windowContainer = document.createElement('div');

    frame.className = 'window-frame';
    frame.id = `window-frame-${this.id}`;

    if (this.width) frame.style.width = `${this.width}px`;
    if (this.height) frame.style.height = `${this.height}px`;

    frame.appendChild(this.makeHandlebar());
    frame.appendChild(this.windowContainer);
    if (this.content) frame.appendChild(this.content);
    return frame;
  }

  show() {
    const frame = this.makeFrame();

    frame.addEventListener('mousedown', () => {
      this.focus();
    });

    if (this.resize.indexOf('h') >= 0 && this.resize.indexOf('v') >= 0) {
      frame.style.resize = 'both';
    } else if (this.resize == 'h') {
      frame.style.resize = 'horizontal';
    } else if (this.resize == 'v') {
      frame.style.resize = 'vertical';
    }

    this.dom = frame;
    document.body.appendChild(frame);
    dragWindowFrame(frame);
  }

  unfocus() {
    this.dom.style.zIndex = `${+this.dom.style.zIndex - 1}`;
  }

  focus() {
    WindowInstances.forEach((frame) => {
      frame.unfocus();
    });
    this.dom.style.zIndex = '1000';
  }

  exit(event) {
    this.dom.remove();
    WindowInstances.splice(WindowInstances.indexOf(this), 1);
  }

  maximize(event) {
    this.height = innerHeight;
    this.width = innerWidth;
    this.dom.style.width = `${this.width}px`;
    this.dom.style.height = `${this.height}px`;
    this.dom.style.top = '0';
    this.dom.style.left = '0';
  }
}

class WindowPopup {
  constructor(
    options = {
      width: undefined,
      height: undefined,
      resize: 'hv',
    }
  ) {
    this.width = options.width;
    this.height = options.height;
    this.content = options.content || null;
    this.id = options.id || Math.floor(Math.random() * 1000000);
    this.resize = options.resize ? options.resize.toLowerCase() : 'hv';
    this.dom = null;
    this.windowContainer = null;
    WindowInstances.push(this);
  }

  makeHandlebar() {
    const handleBar = document.createElement('div');
    handleBar.className = 'popup-window-handlebar';
    handleBar.id = `popup-window-${this.id}-handlebar`;
    this.windowContainer = handleBar;

    return handleBar;
  }

  makeFrame() {
    const frame = document.createElement('div');

    this.windowContainer = document.createElement('div');

    frame.className = 'window-frame popup-window';
    frame.id = `window-frame-${this.id}`;

    if (this.width) frame.style.width = `${this.width}px`;
    if (this.height) frame.style.height = `${this.height}px`;

    frame.appendChild(this.makeHandlebar());
    if (this.content) frame.appendChild(this.content);
    return frame;
  }

  show() {
    const frame = this.makeFrame();

    frame.addEventListener('mousedown', () => {
      this.focus();
    });

    if (this.resize.indexOf('h') >= 0 && this.resize.indexOf('v') >= 0) {
      frame.style.resize = 'both';
    } else if (this.resize == 'h') {
      frame.style.resize = 'horizontal';
    } else if (this.resize == 'v') {
      frame.style.resize = 'vertical';
    }

    this.dom = frame;
    document.body.appendChild(frame);
    dragWindowFrame(frame);
  }

  unfocus() {
    this.dom.style.zIndex = `${+this.dom.style.zIndex - 1}`;
  }

  focus() {
    WindowInstances.forEach((frame) => {
      frame.unfocus();
    });
    this.dom.style.zIndex = '1000';
  }

  exit(event) {
    this.dom.remove();
    WindowInstances.splice(WindowInstances.indexOf(this), 1);
  }

  maximize(event) {
    this.height = innerHeight;
    this.width = innerWidth;
    this.dom.style.width = `${this.width}px`;
    this.dom.style.height = `${this.height}px`;
    this.dom.style.top = '0';
    this.dom.style.left = '0';
  }

  resizeTo(width, height) {
    this.width = width;
    this.height = height;
    this.dom.style.width = `${width}px`;
    this.dom.style.height = `${height}px`;
  }
}

// @ts-ignore
style('/windows/windows.css');

// ! Dragability from: https://www.w3schools.com/howto/howto_js_draggable.asp
function dragWindowFrame(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + '-handlebar')) {
    document.getElementById(elmnt.id + '-handlebar').onmousedown =
      dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
    elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
