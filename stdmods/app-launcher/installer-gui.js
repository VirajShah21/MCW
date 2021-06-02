// @ts-nocheck

/**
 * The WindowFrame for the install() kit function
 *
 * @class InstallerGUI
 * @extends {WindowFrame}
 */
class InstallerGUI extends WindowFrame {
  constructor() {
    super({
      title: 'Installer GUI',
      width: 700,
      height: 250,
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
          TextLabel({
            styles: {
              display: 'block',
              marginTop: '50px',
              marginBottom: '25px',
            },
            text: 'Please enter the full path to the package/script. Drag/drop may work on certain devices.',
          }),
          TextInput({
            placeholder: 'Full Path (Source)',
            classes: ['pkgsource'],
            styles: {
              width: '500px',
            },
          }),
          ClickButton({
            text: 'Install',
            events: {
              click: (ev) => {
                const source = this.dom.querySelector('.pkgsource').value;
                installViaServer(source);
              },
            },
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
