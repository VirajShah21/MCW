function UINode(element, options) {
  const node = document.createElement(element);
  BindBasics(node, options);
  return node;
}

function ContentBlock(options = {}) {
  return UINode('div', options);
}

function ClickButton(options = {}) {
  return UINode('button', options);
}

function TextInput(options = {}) {
  const node = UINode('input', options);
  node.placeholder = options.placeholder || '';
  return node;
}

function H1Label(options = {}) {
  return UINode('h1', options);
}

function H2Label(options = {}) {
  return UINode('h2', options);
}

function TextLabel(options = {}) {
  return UINode('span', options);
}

function SquareIcon(options = {}) {
  const node = UINode('img', options);
  node.src = options.src;
  node.style.width = `${options.size || 25}px`;
  node.style.height = `${options.size || 25}px`;
  return node;
}

function HorizontalDivider(options = {}) {
  const node = UINode('hr', options);
  node.style.border = options.styles.border || 'none';
  node.style.background =
    options.styles.background ||
    options.styles.backgroundColor ||
    options.styles.backgroundImage ||
    'linear-gradient(to bottom, gray, silver)';
  node.style.height = options.styles.height || '3px';
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
  if (eventListeners.focus)
    node.addEventListener('focus', eventListeners.focus);
  if (eventListeners.unfocus)
    node.addEventListener('focusout', eventListeners.unfocus);
}
