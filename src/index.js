import express from 'express';
import { DATAPATH, MODLIST_PATH, STATICPATH } from './macroexp.js';
import * as path from 'path';
import { existsSync, mkdirSync, rename, mkdir, copyFile, lstatSync } from 'fs';
import { URL } from 'url'; // in Browser, the URL in native accessible on window
import { registerMod } from './functions.js';
import bodyParser from 'body-parser';
import copyDirectory from 'recursive-copy';

// ! jshint/ts checking is disable because of `import.meta.url`
// jshint ignore:start
// @ts-ignore
const __filename = new URL('', import.meta.url).pathname;
// Will contain trailing slash
// @ts-ignore
const __dirname = new URL('.', import.meta.url).pathname;
//jshint ignore:end

const app = express();
app.use(express.static(STATICPATH));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/kit/install', async (req, res) => {
    const { source, name, entry } = Object(req.body);
    if (existsSync(source)) {
        const writeTo = path.join(STATICPATH, name);
        if (lstatSync(source).isFile())
            copyFile(source, writeTo, async () => {
                await registerMod(name, entry);
                res.send({
                    success: true,
                    installationDirectory: writeTo,
                    entry: `${writeTo}`,
                });
            });
        else if (lstatSync(source).isDirectory())
            copyDirectory(source, writeTo, async () => {
                await registerMod(name, entry);
                res.send({
                    success: true,
                    installationDirectory: writeTo,
                    entry: `${writeTo}`,
                });
            });
    } else {
        res.send({
            success: false,
            error: `No source directory ${source}`,
        });
    }
});

app.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
});
