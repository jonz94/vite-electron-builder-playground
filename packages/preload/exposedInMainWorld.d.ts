interface Window {
  /**
   * Expose Environment versions.
   * @example
   * console.log( window.versions )
   */
  readonly versions: NodeJS.ProcessVersions;
  /**
   * Safe expose node.js API
   * @example
   * window.nodeCrypto('data')
   */
  readonly nodeCrypto: { sha256sum(data: import('crypto').BinaryLike): string };
  /**
   * Get font list of the system
   * @example
   * window.fontList.getFonts().then(fonts => console.log(fonts)).catch(error => console.log(error))
   */
  readonly fontList: { getFonts: Promise<unknown> };
}
