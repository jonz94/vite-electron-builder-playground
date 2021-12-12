import { contextBridge } from 'electron';
import { getFonts } from 'font-list';

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
 * Get font list of the system
 * @example
 * window.fontList.getFonts().then(fonts => console.log(fonts)).catch(error => console.log(error))
 */
contextBridge.exposeInMainWorld('fontList', {
  getFonts: new Promise<string[]>((resolve, reject) => {
    getFonts({ disableQuoting: true })
      // edge case like: "jf\\-openhuninn\\-1.1"
      .then((fonts) => fonts.map((font) => font.replaceAll('\\', '')))
      .then((fonts) => resolve(fonts))
      .catch((error) => reject(error));
  }),
});
