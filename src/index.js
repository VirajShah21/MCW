import express from 'express';
import { DATAPATH, STATICPATH } from './macroexp.js';
import * as path from 'path';
import { URL } from 'url'; // in Browser, the URL in native accessible on window

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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
});
