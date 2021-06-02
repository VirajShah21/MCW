// @ts-nocheck

/**
 * A register which maps application names to their entry callable
 */
const AppRegistrar = {};

/**
 * The AppLauncher window definition
 *
 * @class AppLauncher
 * @extends {WindowPopup}
 */
class AppLauncher extends WindowPopup {
    /**
     * Creates an instance of AppLauncher.
     * The default size is 500x500 and cannot be resized
     *
     * @memberOf AppLauncher
     */
    constructor() {
        super({ width: 500, height: 500, resize: 'none' });
        this.sideLength = 500;
    }

    /**
     * Register an application name and its callable with AppRegistrar.
     *
     * @static
     * @param {any} name The application name
     * @param {any} startCallback The entry function for the app
     *
     * @memberOf AppLauncher
     */
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
