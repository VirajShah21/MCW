import express from 'express';
import { DATAPATH } from './macroexp.js';

const app = express();

app.get('/', (req, res) => {
    res.send(DATAPATH);
});

app.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
});
