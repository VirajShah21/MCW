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
  static register(name, startCallback, icon) {
    AppRegistrar[name] = { main: startCallback, icon };
  }

  /**
   * Redraws the application list.
   *
   *
   * @memberOf AppLauncher
   */
  redraw() {
    const children = [];
    for (const appName in AppRegistrar) {
      children.push(
        ClickButton({
          styles: {
            width: `${this.width / 5 - 12.5}px`,
            height: `${this.width / 5 - 12.5}px`,
            float: 'left',
            marginLeft: '12.5px',
          },
          children: [
            SquareIcon({
              src: AppRegistrar[appName].icon || '/app-launcher/gear.png',
              size: 50,
            }),
            TextLabel({
              text: (() => {
                let text = appName;
                if (text.length > 15) text = `${text.substring(0, 12)}...`;
                return text;
              })(),
              styles: {
                fontSize: '10px',
              },
            }),
          ],
          events: {
            click: () => {
              AppRegistrar[appName].main();
            },
          },
        })
      );
    }
    let curr = this.windowContainer.querySelector('.applist');
    if (curr) curr.remove();
    this.windowContainer.appendChild(
      ContentBlock({
        children,
        classes: ['applist'],
      })
    );
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
              float: 'left',
              fontSize: '25px',
            },
          }),
          ClickButton({
            children: [
              SquareIcon({
                src: 'app-launcher/power.png',
              }),
            ],
            events: {
              click: (ev) => {
                document.write('<style>html{background:black}</style>');
              },
            },
            styles: {
              width: '50px',
              height: '50px',
              marginTop: '12.5px',
              marginRight: '12.5px',
              filter: 'hue-rotate(100deg)',
            },
          }),
          ClickButton({
            children: [
              SquareIcon({
                src: 'app-launcher/refresh.png',
              }),
            ],
            events: {
              click: (ev) => {
                document.write('<style>html{background:black}</style>');
                setTimeout(() => {
                  window.location.reload();
                }, 100);
              },
            },
            styles: {
              width: '50px',
              height: '50px',
              marginTop: '12.5px',
              marginRight: '12.5px',
              filter: 'hue-rotate(200deg)',
            },
          }),
          HorizontalDivider({
            styles: {
              background: 'rgba(255, 255, 255, 0.25)',
              height: '1px',
            },
          }),
          TextLabel({ text: 'Loading Applications...', classes: ['applist'] }),
        ],
      })
    );
    setTimeout(() => {
      this.redraw();
    }, 500);
  }
}

const launcher = new AppLauncher();

launcher.show();
