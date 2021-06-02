/**
 * Contains all the Macro expressions which are exported as constants
 */

import { mkdirSync, existsSync, writeFileSync } from 'fs';
import * as os from 'os';
import * as path from 'path';
import {
  UNIX_DATAPATH,
  DARWIN_OSTYPE,
  LINUX_OSTYPE,
  WIN_OSTYPE,
  WIN_USERSDIR,
} from './constants.js';

/** The server's device username. */
export const USERNAME = os.userInfo().username;

/** The type of operating system the server is running on. */
export const OSTYPE = os.type();

/** The data path for the server (operating system-dependent) */
export const DATAPATH = (() => {
  if (OSTYPE == WIN_OSTYPE) {
    const winpath = path.join(WIN_USERSDIR, 'mcw');
    if (!existsSync(winpath)) mkdirSync(winpath);
  } else if ([LINUX_OSTYPE, DARWIN_OSTYPE].indexOf(OSTYPE) >= 0) {
    if (!existsSync(UNIX_DATAPATH)) mkdirSync(UNIX_DATAPATH);
    return UNIX_DATAPATH;
  } else {
    console.error(
      `Unsupported Operated System: ${OSTYPE}.\nMCW is only supported on Darwin/macOS, Linux, and Windows`
    );
  }
})();

/** The static datapath for the server (relative to the datapath) */
export const STATICPATH = (() => {
  const spath = path.join(DATAPATH, 'static');
  if (!existsSync(spath)) mkdirSync(spath);
  return spath;
})();

/** The path to modlist.json */
export const MODLIST_PATH = (() => {
  const mlpath = path.join(STATICPATH, 'modlist.json');
  if (!existsSync(mlpath)) writeFileSync(mlpath, '{}');
  return mlpath;
})();
