function assert(condition, messageOrError) {
  if (!condition)
    throw typeof messageOrError == 'string'
      ? new Error(messageOrError)
      : messageOrError;
}

function install(source, name, entry, type = 'localpath') {
  if (type == 'localpath') {
    fetch('/kit/install', {
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

function load(source) {
  let script = document.createElement('script');
  script.src = source;
  document.head.appendChild(script);
}

function style(source) {
  let link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = source;
  document.head.appendChild(link);
}

function wallpaper(source) {
  if (!source) {
    let curr = document.body.style.backgroundImage.replace('url(', '');
    curr = curr.substring(0, curr.lastIndexOf(')'));
    return curr;
  }
  document.body.style.backgroundImage = `url(${source})`;
  document.body.style.backgroundSize = 'cover';
}
