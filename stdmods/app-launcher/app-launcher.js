// @ts-nocheck
const AppRegistrar = {};

class AppLauncher extends WindowPopup {
    constructor() {
        super({ width: 500, height: 500, resize: 'none' });
        this.sideLength = 500;
    }

    static register(name, startCallback) {
        AppRegistrar[name] = startCallback;
    }

    redraw() {
        const children = [];
        for (const appName in AppRegistrar) {
            children.push(
                ContentBlock({
                    styles: {
                        padding: '12.5px',
                    },
                    children: [
                        ClickButton({
                            styles: {
                                width: '100%',
                            },
                            text: appName,
                            events: {
                                click: () => {
                                    AppRegistrar[appName]();
                                },
                            },
                        }),
                    ],
                })
            );
        }
        let curr = this.windowContainer.querySelector('.applist');
        if (curr) curr.remove();
        this.windowContainer.appendChild(ContentBlock({ children, classes: ['applist'] }));
    }

    show() {
        super.show();
        this.windowContainer.innerHTML = '';
        this.windowContainer.appendChild(
            ContentBlock({
                style: {
                    textAlign: 'center',
                },
                children: [
                    ClickButton({
                        text: 'Toggle',
                        events: {
                            click: (ev) => {
                                if (this.sideLength == 500) {
                                    this.resizeTo(75, 75);
                                    this.sideLength = 75;
                                } else {
                                    this.resizeTo(500, 500);
                                    this.sideLength = 500;
                                    this.redraw();
                                }
                            },
                        },
                        styles: {
                            width: '50px',
                            height: '50px',
                            margin: '12.5px',
                        },
                    }),
                ],
            })
        );
        this.redraw();
    }
}

const launcher = new AppLauncher();
launcher.show();
