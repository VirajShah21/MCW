// @ts-nocheck
const AppRegistrar = {};

class AppLauncher extends WindowPopup {
    constructor() {
        super({ width: 500, height: 500, resize: 'none' });
    }

    static register(name, startCallback) {
        AppRegistrar[name] = startCallback;
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
                        text: 'Hide',
                        events: {
                            click: (ev) => {
                                console.log(this);
                                console.log(ev);
                                this.resize(0, 0);
                            },
                        },
                    }),
                ],
            })
        );
        for (const appName in AppRegistrar) {
            this.windowContainer.appendChild(
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
                })
            );
        }
    }
}
