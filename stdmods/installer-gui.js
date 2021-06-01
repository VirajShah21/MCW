// @ts-nocheck

style('/installer-gui.css');

class InstallerGUI extends WindowFrame {
    constructor() {
        super({
            title: 'Installer GUI',
            width: 400,
            height: 500,
        });
        this.oldWallpaper = wallpaper();
    }

    show() {
        super.show();
        this.windowContainer.appendChild(
            ContentBlock({
                styles: {
                    textAlign: 'center',
                },
                children: [
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
                    ClickButton({
                        styles: { display: 'block', float: 'center' },
                        text: 'Install',
                    }),
                ],
            })
        );
    }

    focus() {
        super.focus();
        this.oldWallpaper = wallpaper();
        wallpaper(
            'https://images.unsplash.com/photo-1454117096348-e4abbeba002c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
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

const installer = new InstallerGUI();
installer.show();
