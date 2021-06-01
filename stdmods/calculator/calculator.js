// @ts-nocheck
class Calculator extends WindowFrame {
    constructor() {
        super({ width: 280, title: 'Calculator', resize: 'none' });
    }

    insert(str) {
        const target = this.windowContainer.querySelector('.calc-input');
        if (target.value.trim() == '0') target.value = '';
        target.value += str;
    }

    clearDisplay() {
        this.windowContainer.querySelector('.calc-input').value = '0';
    }

    calculate() {
        let target = this.windowContainer.querySelector('.calc-input');
        let exp = target.value;
        while (exp.indexOf('•') >= 0) exp = exp.replace('•', '*');
        while (exp.indexOf('÷') >= 0) exp = exp.replace('÷', '/');
        // jshint ignore:start
        target.value = eval(exp); // ! Not safe, but who cares, its a calculator
        // jshint ignore:end
    }

    show() {
        super.show();
        const handlebar = this.dom.querySelector('.window-frame-handlebar');
        handlebar.style.background = 'rgba(0, 0, 0, 0.9)';
        handlebar.style.color = 'gray';
        this.windowContainer.className = 'calculator-window';
        this.windowContainer.appendChild(
            ContentBlock({
                children: [
                    ContentBlock({
                        children: [
                            TextInput({
                                styles: {
                                    width: '100%',
                                    background: 'transparent',
                                    fontSize: '45px',
                                    color: 'white',
                                    textAlign: 'right',
                                    paddingTop: '30px',
                                    padding: '20px',
                                    paddingBottom: '10px',
                                    outline: 'none',
                                },
                                classes: ['calc-input'],
                                value: '0',
                            }),
                        ],
                    }),
                    ContentBlock({
                        children: [
                            ContentBlock({
                                children: [
                                    ClickButton({
                                        classes: ['calc-btn', 'calc-func-btn'],
                                        text: 'AC',
                                        events: {
                                            click: () => {
                                                this.clearDisplay();
                                            },
                                        },
                                    }),
                                    ClickButton({
                                        classes: ['calc-btn', 'calc-func-btn'],
                                        text: '+/-',
                                    }),
                                    ClickButton({
                                        classes: ['calc-btn', 'calc-func-btn'],
                                        text: '%',
                                        events: {
                                            click: () => {
                                                this.insert('÷100');
                                            },
                                        },
                                    }),
                                    ClickButton({
                                        classes: ['calc-btn', 'calc-op-btn'],
                                        text: '÷',
                                        events: {
                                            click: () => {
                                                this.insert('÷');
                                            },
                                        },
                                    }),
                                ],
                            }),
                            ContentBlock({
                                children: [
                                    ClickButton({
                                        classes: ['calc-btn'],
                                        text: '7',
                                        events: {
                                            click: () => {
                                                this.insert('7');
                                            },
                                        },
                                    }),
                                    ClickButton({
                                        classes: ['calc-btn'],
                                        text: '8',
                                        events: {
                                            click: () => {
                                                this.insert('8');
                                            },
                                        },
                                    }),
                                    ClickButton({
                                        classes: ['calc-btn'],
                                        text: '9',
                                        events: {
                                            click: () => {
                                                this.insert('9');
                                            },
                                        },
                                    }),
                                    ClickButton({
                                        classes: ['calc-btn', 'calc-op-btn'],
                                        text: '•',
                                        events: {
                                            click: () => {
                                                this.insert('•');
                                            },
                                        },
                                    }),
                                ],
                            }),
                            ContentBlock({
                                children: [
                                    ClickButton({
                                        classes: ['calc-btn'],
                                        text: '4',
                                        events: {
                                            click: () => {
                                                this.insert('4');
                                            },
                                        },
                                    }),
                                    ClickButton({
                                        classes: ['calc-btn'],
                                        text: '5',
                                        events: {
                                            click: () => {
                                                this.insert('5');
                                            },
                                        },
                                    }),
                                    ClickButton({
                                        classes: ['calc-btn'],
                                        text: '6',
                                        events: {
                                            click: () => {
                                                this.insert('6');
                                            },
                                        },
                                    }),
                                    ClickButton({
                                        classes: ['calc-btn', 'calc-op-btn'],
                                        text: '–',
                                        events: {
                                            click: () => {
                                                this.insert('-');
                                            },
                                        },
                                    }),
                                ],
                            }),
                            ContentBlock({
                                children: [
                                    ClickButton({
                                        classes: ['calc-btn'],
                                        text: '1',
                                        events: {
                                            click: () => {
                                                this.insert('1');
                                            },
                                        },
                                    }),
                                    ClickButton({
                                        classes: ['calc-btn'],
                                        text: '2',
                                        events: {
                                            click: () => {
                                                this.insert('2');
                                            },
                                        },
                                    }),
                                    ClickButton({
                                        classes: ['calc-btn'],
                                        text: '3',
                                        events: {
                                            click: () => {
                                                this.insert('3');
                                            },
                                        },
                                    }),
                                    ClickButton({
                                        classes: ['calc-btn', 'calc-op-btn'],
                                        text: '+',
                                        events: {
                                            click: () => {
                                                this.insert('+');
                                            },
                                        },
                                    }),
                                ],
                            }),
                            ContentBlock({
                                children: [
                                    ClickButton({
                                        classes: ['calc-btn'],
                                        text: '0',
                                        styles: {
                                            width: '120px',
                                            textAlign: 'left',
                                            paddingLeft: '20px',
                                        },
                                        events: {
                                            click: () => {
                                                this.insert('0');
                                            },
                                        },
                                    }),
                                    ClickButton({
                                        classes: ['calc-btn'],
                                        text: '.',
                                        events: {
                                            click: () => {
                                                this.insert('.');
                                            },
                                        },
                                    }),
                                    ClickButton({
                                        classes: ['calc-btn', 'calc-op-btn'],
                                        text: '=',
                                        events: {
                                            click: () => {
                                                this.calculate();
                                            },
                                        },
                                    }),
                                ],
                            }),
                        ],
                    }),
                    ContentBlock({
                        text: 'Designed by Viraj in Philadelphia',
                        classes: ['calc-credits'],
                    }),
                ],
            })
        );
    }
}

style('/calculator.css');
