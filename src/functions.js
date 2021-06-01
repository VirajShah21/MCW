import { MODLIST_PATH, STATICPATH } from './macroexp.js';
import { readFile, writeFile } from 'fs';
import * as path from 'path';

export async function registerMod(name, entry) {
    return new Promise((resolve, reject) => {
        readFile(MODLIST_PATH, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            let modlist = JSON.parse(data.toString());
            modlist[name] = path.join(STATICPATH, name, entry);
            writeFile(MODLIST_PATH, JSON.stringify(modlist, null, 4), (err2) => {
                if (err2) reject(err2);
                else resolve();
            });
        });
    });
}
