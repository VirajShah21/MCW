const WindowInstances = [];

class WindowFrame {
    constructor(
        options = {
            width: 300,
            height: 300,
            title: 'Untitled Window',
        }
    ) {
        this.width = options.width || 300;
        this.height = options.height || 300;
        this.content = options.content || null;
        this.id = options.id || Math.floor(Math.random() * 1000000);
        this.title = options.title || 'Untitled Window';
        this.dom = null;
        WindowInstances.push(this);
    }

    makeHandlebarButtons() {
        const wrapper = document.createElement('div');

        wrapper.className = 'handlebar-btn-wrapper';

        const exitBtn = document.createElement('button');
        const minBtn = document.createElement('button');
        const maxBtn = document.createElement('button');

        exitBtn.style.background = 'rgb(255, 69, 81)';
        minBtn.style.background = 'rgb(255, 189, 0)';
        maxBtn.style.background = 'rgb(0, 213, 32)';

        [exitBtn, minBtn, maxBtn].forEach((btn) => {
            btn.className = 'handlebar-btn';
        });

        wrapper.appendChild(exitBtn);
        wrapper.appendChild(minBtn);
        wrapper.appendChild(maxBtn);

        return wrapper;
    }

    makeHandlebar() {
        const handleBar = document.createElement('div');
        handleBar.innerHTML = 'Hi';
        handleBar.className = 'window-frame-handlebar';
        handleBar.id = `window-frame-${this.id}-handlebar`;

        handleBar.appendChild(this.makeHandlebarButtons());

        return handleBar;
    }

    makeFrame() {
        const frame = document.createElement('div');

        frame.className = 'window-frame';
        frame.id = `window-frame-${this.id}`;

        frame.style.width = `${this.width}px`;
        frame.style.height = `${this.height}px`;

        frame.appendChild(this.makeHandlebar());
        if (this.content) frame.appendChild(this.content);
        return frame;
    }

    render() {
        const frame = this.makeFrame();

        document.body.appendChild(frame);

        frame.addEventListener('mousedown', () => {
            this.focus();
        });

        this.dom = frame;
        dragElement(frame);
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
}

// @ts-ignore
style('/windows.css');

// ! Dragability from: https://www.w3schools.com/howto/howto_js_draggable.asp
function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(elmnt.id + '-handlebar')) {
        document.getElementById(elmnt.id + '-handlebar').onmousedown = dragMouseDown;
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

// @ts-ignore
wallpaper(
    'https://images.unsplash.com/photo-1622405632300-cebc3abedbb9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
);

for (let i = 0; i < 10; i++) {
    new WindowFrame().render();
}
