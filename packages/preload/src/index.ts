import type { BinaryLike } from 'crypto';
import { createHash } from 'crypto';
import { contextBridge } from 'electron';

const fontList = require('font-list');

/**
 * The "Main World" is the JavaScript context that your main renderer code runs in.
 * By default, the page you load in your renderer executes code in this world.
 *
 * @see https://www.electronjs.org/docs/api/context-bridge
 */

/**
 * After analyzing the `exposeInMainWorld` calls,
 * `packages/preload/exposedInMainWorld.d.ts` file will be generated.
 * It contains all interfaces.
 * `packages/preload/exposedInMainWorld.d.ts` file is required for TS is `renderer`
 *
 * @see https://github.com/cawa-93/dts-for-context-bridge
 */

/**
 * Expose Environment versions.
 * @example
 * console.log( window.versions )
 */
contextBridge.exposeInMainWorld('versions', process.versions);

/**
 * Safe expose node.js API
 * @example
 * window.nodeCrypto('data')
 */
contextBridge.exposeInMainWorld('nodeCrypto', {
  sha256sum(data: BinaryLike) {
    const hash = createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
  },
});

contextBridge.exposeInMainWorld('fontList', {
  getFonts: new Promise((resolve, reject) => {
    fontList
      .getFonts({ disableQuoting: true })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((fonts: any) => resolve(fonts))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => reject(error));
  }),
});
