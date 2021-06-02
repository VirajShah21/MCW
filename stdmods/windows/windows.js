// @ts-nocheck

/** An array of windows */
const WindowInstances = [];

class BaseWindow {
  constructor(options = {}) {
    this.width = options.width;
    this.height = options.height;
    this.content = options.content || null;
    this.id = options.id || Math.floor(Math.random() * 1000000);
    this.title = options.title || 'Untitled Window';
    this.resize = options.resize ? options.resize.toLowerCase() : 'hv';
    this.dom = null;
    this.windowContainer = null;
    this.isMinimized = false;
    WindowInstances.push(this);
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

    frame.style.top = '50%';
    frame.style.left = '50%';
    frame.style.transform = 'translate(-50%, -50%)';

    this.dom = frame;
    document.body.appendChild(frame);
    dragWindowFrame(frame);
    this.focus();
  }

  /**
   * Exits the `WindowFrame` process.
   *
   * @param {any} event The event invoking the exit function
   *
   * @memberOf WindowFrame
   */
  exit(event) {
    this.resizeTo(0, 0);
    setTimeout(() => {
      this.dom.remove();
      WindowInstances.splice(WindowInstances.indexOf(this), 1);
    }, 500);
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
    this.dom.style.transform = 'none';
  }

  minimize(event) {
    const width = this.dom.clientWidth;
    const height = this.dom.clientHeight;
    this.resizeTo(0, 0);
    this.isMinimized = true;
    this.width = width;
    this.height = height;
  }

  unminimize(event) {
    this.resizeTo(this.width, this.height);
    this.focus();
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
 * The WindowFrame class is responsible for displaying windows
 *
 * @class WindowFrame
 */
class WindowFrame extends BaseWindow {
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
    minBtn.addEventListener('click', (ev) => {
      this.minimize();
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
}

/**
 * The WindowPopup class displays a frameless popup window
 *
 * @class WindowPopup
 */
class WindowPopup extends BaseWindow {
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

    frame.style.top = '50%';
    frame.style.left = '50%';
    frame.style.transform = 'translate(-50%, -50%)';

    this.dom = frame;

    document.body.appendChild(frame);
    dragWindowFrame(frame);
    this.focus();
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

class PromptWindow extends WindowFrame {
  constructor(title, message, callback) {
    super({
      title: title || 'Prompt',
    });
    this.message = message;
    this.callback = callback;
  }

  show() {
    super.show();
    this.windowContainer.style.background = 'rgba(255, 255, 255, 0.8)';
    this.windowContainer.appendChild(
      ContentBlock({
        children: [
          TextLabel({
            text: this.message,
            styles: {
              display: 'block',
              padding: '10px',
            },
          }),
          TextInput({
            classes: ['prompt-input'],
            styles: {
              display: 'block',
              width: '300px',
              marginBottom: '25px',
            },
          }),
          ContentBlock({
            children: [
              ClickButton({
                text: 'Cancel',
                events: {
                  click: (ev) => {
                    this.callback(null);
                    this.exit(ev);
                  },
                },
              }),
              ClickButton({
                text: 'Ok',
                events: {
                  click: (ev) => {
                    this.callback(
                      this.windowContainer.querySelector('.prompt-input')
                        .value || ''
                    );
                    this.exit(ev);
                  },
                },
              }),
            ],
            styles: {
              textAlign: 'right',
            },
          }),
        ],
        styles: {
          padding: '20px',
        },
      })
    );
  }
}

class ConfirmWindow extends WindowFrame {
  constructor(title, message, callback) {
    super({
      title: title || 'Prompt',
    });
    this.message = message;
    this.callback = callback;
  }

  show() {
    super.show();
    this.windowContainer.style.background = 'rgba(255, 255, 255, 0.8)';
    this.windowContainer.appendChild(
      ContentBlock({
        children: [
          TextLabel({
            text: this.message,
            styles: {
              display: 'block',
              padding: '10px',
              marginBottom: '25px',
            },
          }),
          ContentBlock({
            children: [
              ClickButton({
                text: 'Cancel',
                events: {
                  click: (ev) => {
                    this.callback(false);
                    this.exit(ev);
                  },
                },
              }),
              ClickButton({
                text: 'Ok',
                events: {
                  click: (ev) => {
                    this.callback(true);
                    this.exit(ev);
                  },
                },
              }),
            ],
            styles: {
              textAlign: 'right',
            },
          }),
        ],
        styles: {
          padding: '20px',
        },
      })
    );
  }
}

class AlertWindow extends WindowFrame {
  constructor(title, message, callback) {
    super({
      title: title || 'Alert',
    });
    this.message = message;
    this.callback = callback;
  }

  show() {
    super.show();
    this.windowContainer.style.background = 'rgba(255, 255, 255, 0.8)';
    this.windowContainer.appendChild(
      ContentBlock({
        children: [
          TextLabel({
            text: this.message,
            styles: {
              display: 'block',
              padding: '10px',
              marginBottom: '25px',
            },
          }),
          ContentBlock({
            children: [
              ClickButton({
                text: 'Cancel',
                events: {
                  click: (ev) => {
                    this.callback();
                    this.exit(ev);
                  },
                },
              }),
              ClickButton({
                text: 'Ok',
                events: {
                  click: (ev) => {
                    this.callback();
                    this.exit(ev);
                  },
                },
              }),
            ],
            styles: {
              textAlign: 'right',
            },
          }),
        ],
        styles: {
          padding: '20px',
          minWidth: '300px',
        },
      })
    );
  }
}

const browserPrompt = prompt;
prompt = async function (message, title = 'Prompt') {
  return new Promise((resolve, reject) => {
    new PromptWindow(title, message, (value) => {
      if (value) resolve(value);
      else reject();
    }).show();
  });
};

const browserAlert = alert;
alert = async function (message, title = 'Alert') {
  return new Promise((resolve) => {
    new AlertWindow(title, message, () => {
      resolve();
    }).show();
  });
};

const browserConfirm = confirm;
confirm = async function (message, title = 'Confirm') {
  return new Promise((resolve) => {
    new ConfirmWindow(title, message, (response) => {
      resolve(response);
    }).show();
  });
};
