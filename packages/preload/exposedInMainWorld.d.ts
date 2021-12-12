interface Window {
    /**
     * Expose Environment versions.
     * @example
     * console.log( window.versions )
     */
    readonly versions: NodeJS.ProcessVersions;
    /**
     * Get font list of the system
     * @example
     * window.fontList.getFonts().then(fonts => console.log(fonts)).catch(error => console.log(error))
     */
    readonly fontList: { getFonts: Promise<string[]>; };
}
