/**
 * Contains all the Macro expressions which are exported as constants
 */
import { mkdirSync, existsSync } from 'fs';
import { type as osName, userInfo } from 'os';
import * as path from 'path';
import {
    UNIX_DATAPATH,
    DARWIN_OSNAME,
    LINUX_OSNAME,
    WIN_OSNAME,
    WIN_USERSDIR,
} from './constants.js';

export const USERNAME = userInfo().username;

export const DATAPATH = (() => {
    if (osName() == WIN_OSNAME) {
        const winpath = path.join(WIN_USERSDIR, 'mcw');
        if (!existsSync(winpath)) mkdirSync(winpath);
    } else if ([LINUX_OSNAME, DARWIN_OSNAME].indexOf(osName()) >= 0) {
        if (!existsSync(UNIX_DATAPATH)) mkdirSync(UNIX_DATAPATH);
        return UNIX_DATAPATH;
    } else {
        console.error(
            `Unsupported Operated System: ${osName()}.\nMCW is only supported on Darwin/macOS, Linux, and Windows`
        );
    }
})();
