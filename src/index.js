import express from 'express';
import { DATAPATH, STATICPATH } from './macroexp.js';

const app = express();

app.use(express.static(STATICPATH));

app.get('/', (req, res) => {
    res.send([DATAPATH, STATICPATH]);
});

app.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
});
