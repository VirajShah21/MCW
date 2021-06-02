/** An array of windows */
const WindowInstances = [];

/**
 * The WindowFrame class is responsible for displaying windows
 *
 * @class WindowFrame
 */
class WindowFrame {
  /**
   * Creates an instance of WindowFrame.
   * @param {any} [options={}] Accepts options for width, height, content,
   * id, title, and resize.
   *
   * @memberOf WindowFrame
   */
  constructor(options = {}) {
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

  /**
   * Makes the three window control buttons for the `WindowFrame`
   *
   * @returns A div wrapper for the handlebar buttons
   *
   * @memberOf WindowFrame
   */
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

  /**
   * Makes the handlebar for the `WindowFrame`
   *
   * @returns A div wrapper for the handlebar
   *
   * @memberOf WindowFrame
   */
  makeHandlebar() {
    const handleBar = document.createElement('div');
    handleBar.innerHTML = this.title;
    handleBar.className = 'window-frame-handlebar';
    handleBar.id = `window-frame-${this.id}-handlebar`;

    handleBar.appendChild(this.makeHandlebarButtons());

    return handleBar;
  }

  /**
   * Makes the window frame.
   *
   * @returns The div wrapper of the window frame
   *
   * @memberOf WindowFrame
   */
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

  /**
   * Shows the `WindowFrame`.
   *
   *
   * @memberOf WindowFrame
   */
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

  /**
   * Unfocuses the `WindowFrame`.
   *
   *
   * @memberOf WindowFrame
   */
  unfocus() {
    this.dom.style.zIndex = `${+this.dom.style.zIndex - 1}`;
  }

  /**
   * Focuses the `WindowFrame`.
   *
   *
   * @memberOf WindowFrame
   */
  focus() {
    WindowInstances.forEach((frame) => {
      frame.unfocus();
    });
    this.dom.style.zIndex = '1000';
  }

  /**
   * Exits the `WindowFrame` process.
   *
   * @param {any} event The event invoking the exit function
   *
   * @memberOf WindowFrame
   */
  exit(event) {
    this.dom.remove();
    WindowInstances.splice(WindowInstances.indexOf(this), 1);
  }

  /**
   * Maximizes the `WindowFrame`.
   *
   * @param {any} event The event invoking the maximize function
   *
   * @memberOf WindowFrame
   */
  maximize(event) {
    this.height = innerHeight;
    this.width = innerWidth;
    this.resizeTo(this.width, this.height);
    this.dom.style.top = '0';
    this.dom.style.left = '0';
  }

  /**
   * Resizes the WindowFrame to a specific size.
   *
   * @param {any} width The window width
   * @param {any} height The window height
   *
   * @memberOf WindowFrame
   */
  resizeTo(width, height) {
    this.width = width;
    this.height = height;
    this.dom.style.width = `${width}px`;
    this.dom.style.height = `${height}px`;
  }
}

/**
 * The WindowPopup class displays a frameless popup window
 *
 * @class WindowPopup
 */
class WindowPopup {
  /**
   * Creates an instance of WindowPopup.
   * @param {any} [options={}] Takes width, height, content, id,
   * and resize as options.
   *
   * @memberOf WindowPopup
   */
  constructor(options = {}) {
    this.width = options.width;
    this.height = options.height;
    this.content = options.content || null;
    this.id = options.id || Math.floor(Math.random() * 1000000);
    this.resize = options.resize ? options.resize.toLowerCase() : 'hv';
    this.dom = null;
    this.windowContainer = null;
    WindowInstances.push(this);
  }

  /**
   * Makes the handlebar (which spans the entire window)
   *
   * @returns The div wrapper for the handlebar (window overlay)
   *
   * @memberOf WindowPopup
   */
  makeHandlebar() {
    const handleBar = document.createElement('div');
    handleBar.className = 'popup-window-handlebar';
    handleBar.id = `popup-window-${this.id}-handlebar`;
    this.windowContainer = handleBar;

    return handleBar;
  }

  /**
   * Makes the frame
   *
   * @returns The div wrapper for the window frame
   *
   * @memberOf WindowPopup
   */
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

  /**
   * Shows the popup window.
   *
   *
   * @memberOf WindowPopup
   */
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

  /**
   * Unfocuses the popup window.
   *
   *
   * @memberOf WindowPopup
   */
  unfocus() {
    this.dom.style.zIndex = `${+this.dom.style.zIndex - 1}`;
  }

  /**
   * Focuses the popup window.
   *
   *
   * @memberOf WindowPopup
   */
  focus() {
    WindowInstances.forEach((frame) => {
      frame.unfocus();
    });
    this.dom.style.zIndex = '1000';
  }

  /**
   * Exits the popup window.
   *
   * @param {any} event The event causing the exit
   *
   * @memberOf WindowPopup
   */
  exit(event) {
    this.dom.remove();
    WindowInstances.splice(WindowInstances.indexOf(this), 1);
  }

  /**
   * Maximizes the popup window.
   *
   * @param {any} event The event causing the maximize
   *
   * @memberOf WindowPopup
   */
  maximize(event) {
    this.height = innerHeight;
    this.width = innerWidth;
    this.dom.style.width = `${this.width}px`;
    this.dom.style.height = `${this.height}px`;
    this.dom.style.top = '0';
    this.dom.style.left = '0';
  }

  /**
   * Resizes the popup window to a specific size.
   *
   * @param {any} width The window width
   * @param {any} height The window height
   *
   * @memberOf WindowPopup
   */
  resizeTo(width, height) {
    this.width = width;
    this.height = height;
    this.dom.style.width = `${width}px`;
    this.dom.style.height = `${height}px`;
  }
}

// @ts-ignore
style('/windows/windows.css');

/**
 * Makes an window with a handlebar draggable
 *
 * ! Dragability from: https://www.w3schools.com/howto/howto_js_draggable.asp
 *
 * @param {any} elmnt
 */
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

  /**
   * Callback for drag mousedown event.
   *
   * @param {any} e Mousedown event
   */
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  /**
   * Drag event handler.
   *
   * @param {any} e Drag event.
   */
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

  /**
   * Ends the drag event.
   *
   */
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
