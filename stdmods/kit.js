class GridCell {
    constructor(width = 4) {
        this.width = width;
        this.children = [];
    }

    addChild(element) {
        return this.children.push(element);
    }

    toHtmlString() {
        const div = document.createElement('div');
        this.children.forEach(div.appendChild);
        return div.innerHTML;
    }
}

class GridLayout {
    constructor() {
        this.grid = [];
    }

    addRow(row = []) {
        this.grid.push(row);
    }

    addToRow(rowIndex, element) {
        this.grid[rowIndex].push(element);
    }

    displayTo(query) {
        document.querySelectorAll(query).forEach((container) => {
            container.innerHTML = '';
            // ri: row index    ci: col index
            for (const gridRow of this.grid) {
                let rowDiv = document.createElement('div');
                for (const gridCell of gridRow) {
                    let colDiv = document.createElement('div');
                    colDiv.innerHTML = gridCell.toHtmlString();
                    colDiv.style.width = `${(gridCell.width / 12) * 100}%`;
                    rowDiv.appendChild(colDiv);
                }
                container.appendChild(rowDiv);
            }
        });
    }
}

function assert(condition, messageOrError) {
    if (!condition)
        throw typeof messageOrError == 'string' ? new Error(messageOrError) : messageOrError;
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
    document.body.style.backgroundImage = `url(${source})`;
    document.body.style.backgroundSize = 'cover';
}
