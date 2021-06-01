// @ts-nocheck

style('/installer-gui.css');

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
                    TextInput({ placeholder: 'Package Named Alias' }),
                    H2Label({ text: 'Source' }),
                    TextLabel({
                        styles: { display: 'block' },
                        text: 'Please enter the full path to the package/script. Drag/drop may work on certain devices.',
                    }),
                    TextInput({ placeholder: 'Full Path (Source)' }),
                    H2Label({ text: 'Entry File' }),
                    TextLabel({
                        styles: { display: 'block' },
                        text: 'Enter the main script file for this package, in the format <name>/<entry>.js',
                    }),
                    TextInput({ placeholder: 'Entry File' }),
                    ContentBlock({
                        styles: {
                            textAlign: 'center',
                        },
                        children: [
                            ClickButton({
                                text: 'Install',
                            }),
                        ],
                    }),
                ],
            })
        );
    }

    focus() {
        super.focus();
        this.oldWallpaper = wallpaper();
        wallpaper(
            'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
        );
    }

    unfocus() {
        super.unfocus();
        if (this.oldWallpaper) {
            wallpaper(this.oldWallpaper);
            this.oldWallpaper = null;
        }
    }
}

AppLauncher.register('Package Installer', () => {
    const installer = new InstallerGUI();
    installer.show();
});
