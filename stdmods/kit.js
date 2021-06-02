/**
 * Asserts that a condition is true.
 *
 * @param {any} condition The condition/boolean
 * @param {any} messageOrError The message or error to throw if false.
 */
function assert(condition, messageOrError) {
  if (!condition)
    throw typeof messageOrError == 'string'
      ? new Error(messageOrError)
      : messageOrError;
}

/**
 * Installs a mod to the static datapath
 *
 * @param {any} source The source folder
 * @param {any} name The name of the folder (and app)
 * @param {any} entry The script file to import for the mod
 * @param {string} [type='localpath'] The installation method
 *
 * @deprecated
 */
function install(source, name, entry, type = 'localpath') {
  if (type == 'localpath') {
    fetch('/kit/install-legacy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // @ts-ignore
        source,
        name,
        entry,
      }),
    })
      .then((data) => {
        return data.json();
      })
      .then((result) => {
        alert(JSON.stringify(result, null, 4));
      })
      .catch((err) => {
        alert(`There was an error:\n${JSON.stringify(err, null, 4)}`);
      });
  } else if (type == 'git') {
    // fetch -> git
    console.warn('git is not implemented yet');
  } else if (type == 'wget') {
    // fetch -> wget
    console.warn('wget is not implemented yet');
  } else {
    assert(
      false,
      `download(assert, type): Parameter "type" must be assigned to either "localpath" (default), "git" or "wget".\n\tCurrent Value: ${type}`
    );
  }
}

/**
 * Installs a package which exists on the server machine.
 *
 * @param {any} source The full path to the zip package
 */
function installViaServer(source) {
  fetch('/kit/install', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // @ts-ignore
      source,
    }),
  })
    .then((data) => {
      return data.json();
    })
    .then((result) => {
      alert(JSON.stringify(result, null, 4));
    })
    .catch((err) => {
      alert(`There was an error:\n${JSON.stringify(err, null, 4)}`);
    });
}

/**
 * Loads a script file to the browser
 *
 * @param {any} source The static path of the script
 */
function load(source) {
  let script = document.createElement('script');
  script.src = source;
  document.head.appendChild(script);
}

/**
 * Loads a css stylesheet to the browser
 *
 * @param {any} source The static path of the stylesheet
 */
function style(source) {
  let link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = source;
  document.head.appendChild(link);
}

/**
 * Sets the window's wallpaper
 *
 * @param {any | undefined} source The static path of the wallpaper image
 * @returns The source of the current wallpaper if no source argument is provided
 */
function wallpaper(source) {
  if (!source) {
    let curr = document.body.style.backgroundImage.replace('url(', '');
    curr = curr.substring(0, curr.lastIndexOf(')'));
    return curr;
  }
  document.body.style.backgroundImage = `url(${source})`;
  document.body.style.backgroundSize = 'cover';
}
