// @ts-nocheck

class InstallerGUI extends WindowFrame {
    constructor() {
        super({
            title: 'Installer GUI',
            width: 700,
            height: 500,
        });
        this.oldWallpaper = wallpaper();
    }

    show() {
        super.show();
        this.dom.style.background = 'rgba(245, 245, 245, 0.8)';
        this.windowContainer.appendChild(
            ContentBlock({
                styles: {
                    textAlign: 'center',
                    color: 'rgb(50, 50, 50)',
                },
                children: [
                    TextLabel(),
                    H1Label({ text: 'Package Installer' }),
                    H2Label({ text: 'Name' }),
                    TextLabel({
                        styles: { display: 'block' },
                        text: 'Note: Certain packages may require a specific name.',
                    }),
                    TextInput({ placeholder: 'Package Named Alias', classes: ['pkgname'] }),
                    H2Label({ text: 'Source' }),
                    TextLabel({
                        styles: { display: 'block' },
                        text: 'Please enter the full path to the package/script. Drag/drop may work on certain devices.',
                    }),
                    TextInput({ placeholder: 'Full Path (Source)', classes: ['pkgsource'] }),
                    H2Label({ text: 'Entry File' }),
                    TextLabel({
                        styles: { display: 'block' },
                        text: 'Enter the main script file for this package, in the format <name>/<entry>.js',
                    }),
                    TextInput({ placeholder: 'Entry File', classes: ['pkgentry'] }),
                    ContentBlock({
                        styles: {
                            textAlign: 'center',
                        },
                        children: [
                            ClickButton({
                                text: 'Install',
                                events: {
                                    click: (ev) => {
                                        const name = this.dom.querySelector('.pkgname');
                                        const source = this.dom.querySelector('.pkgsource');
                                        const entry = this.dom.querySelector('.pkgentry');
                                        install(source, name, entry);
                                    },
                                },
                            }),
                        ],
                    }),
                ],
            })
        );
    }
}

AppLauncher.register('Package Installer', () => {
    const installer = new InstallerGUI();
    installer.show();
});
