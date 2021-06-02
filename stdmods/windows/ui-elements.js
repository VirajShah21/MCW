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
